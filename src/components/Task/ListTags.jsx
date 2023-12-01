import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowAddTagEdit, SetTagList, ShowTagUpdate, ShowTagDelete } from "../../features/taskSlice";
import { AddTagsIcon, TagSettingsIcon, EditListIcon, DeleteListIcon, TagIcon, EditTagIcon, DeleteTagIcon } from '../../icons';
import axios from "axios";
import TagEdit from "./TagEdit";

const ListTags = () => {

  // const [dbTags, setDbTags] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTagList = async () => {
      try {
        const resp = await axios.get("http://localhost:8800/TagList")
        // setDbTags(resp.data);
        dispatch(SetTagList(resp.data))
        // console.log("Tags fetched successfully");
      } catch (err) {
        console.log(err);
      }
    }
    fetchTagList();
  }, [])

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete("http://localhost:8800/TagList/" + id)
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  const { addTagEdit, dbTags, isTagUpdate, isTagDelete } = useSelector((store) => store.task);

  return (
    <div className='overall-tags'>
      <div className='list-title'>
        <h2 className='list-title'>Tags</h2>
      </div>
      <div className='tags-container'>
        {dbTags.map((tag) => {
          const { id, tag_name, tag_color } = tag;
          return (
            <a className='myTag' key={id} style={{ backgroundColor: tag_color }} title={tag_name}>
              <span className="tag-name">{tag_name}</span>
              {/* <TagIcon /> */}
              {
                isTagUpdate && (
                  <span title="settings" onClick={() => console.log("Tag settings")}>
                    <EditTagIcon />
                  </span>
                )
              }
              {
                isTagDelete && (
                  <span title="settings" onClick={() => console.log("Tag settings")}>
                    <DeleteTagIcon />
                  </span>
                )
              }
            </a>
          )
        })}
      </div>
      {
        addTagEdit && <TagEdit />
      }
      {
        !addTagEdit && (
          <div className="tag-buttons">
            <button className='addBtn add-tags-btn' onClick={() => dispatch(ShowAddTagEdit())}>
              <AddTagsIcon />
              <p className='myTask-text'>Add Tag</p>
            </button>
            <div className="tag-edit-delete">
              {
                !isTagUpdate && (
                  <>
                    <span className="tag-edit-btn" onClick={() => dispatch(ShowTagUpdate())}>
                      <EditListIcon />
                    </span>
                    <span className="tag-edit-btn" onClick={() => dispatch(ShowTagDelete())}>
                      <DeleteListIcon />
                    </span>
                  </>
                )
              }
              {
                isTagUpdate && (
                  <span className="tag-edit-btn" onClick={() => dispatch(ShowTagUpdate())}>
                    Cancel
                  </span>
                )
              }

            </div>
          </div>
        )
      }
    </div>
  )
}
export default ListTags