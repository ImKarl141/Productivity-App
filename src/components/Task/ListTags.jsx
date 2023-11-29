import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowAddTagEdit, SetTagList } from "../../features/taskSlice";
import { AddTagsIcon, TagSettingsIcon, DeleteListIcon } from '../../icons';
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

  const { addTagEdit, dbTags } = useSelector((store) => store.task);

  return (
    <div className='overall-tags'>
      <div className='list-title'>
        <h2 className='list-title'>Tags</h2>
      </div>
      <div className='tags-container'>
        {dbTags.map((tag) => {
          const { id, tag_name, tag_color } = tag;
          return (
            <button onClick={() => handleDeleteProject(id)} key={id} className='myTag' style={{ backgroundColor: tag_color }} title={tag_name}>
              <span>{tag_name}</span>
              <TagSettingsIcon />
            </button>
          )
        })}
      </div>
      {
        addTagEdit && <TagEdit />
      }
      {
        !addTagEdit && (
          <button className='addBtn add-tags-btn' onClick={() => dispatch(ShowAddTagEdit())}>
            <AddTagsIcon />
            <p className='myTask-text'>Add Tag</p>
          </button>
        )
      }
    </div>
  )
}
export default ListTags