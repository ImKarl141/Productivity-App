import { useDispatch, useSelector } from "react-redux";
import { ShowAddTagEdit, ShowTagUpdate, ShowTagDelete, ShowTagCancel, SetCurrentTagId, SetTaskList, DeleteTagItem, SetCurrentTagView } from "../../features/taskSlice";
import { AddTagsIcon, EditListIcon, DeleteListIcon, EditTagIcon, DeleteTagIcon } from '../../icons';
import axios from "axios";
import TagEdit from "./TagEdit";
import TagUpdate from "./TagUpdate";


const ListTags = () => {

  const { addTagEdit, dbTags, isTagUpdate, isTagDelete, currentTagId, currentTagView } = useSelector((store) => store.task);
  const dispatch = useDispatch();

  const updateChanges = async () => {
    const resp = await axios.get('https://todo-api-teal.vercel.app/TaskCurrent')
    dispatch(SetTaskList(resp.data))
  }

  //Toast message
  const showMessage = (idElement) => {
    const spawnMessage = document.getElementById(idElement);

    spawnMessage.style.display = "flex";

    setTimeout(() => {
      spawnMessage.style.display = "none";
    }, 3000)
  }

  const handleDeleteTag = async (myId) => {
    try {
      await axios.put("https://todo-api-teal.vercel.app/TaskCurrent/deleteTag/" + myId)
      await axios.delete("https://todo-api-teal.vercel.app/TagList/" + myId)
      const tagIndex = dbTags.findIndex((tag) => tag.id === myId)
      dispatch(DeleteTagItem(tagIndex))
      updateChanges()
      showMessage("tagDeleted")
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='overall-tags'>
      <div className='list-title'>
        <h2 className='list-title'>Tags</h2>
      </div>
      <div className='tags-container'>
        {dbTags.map((tag) => {
          const { id, tag_name, tag_color } = tag;
          if (currentTagId !== id) {
            return (
              <div
                className='myTag'
                key={id}
                style={{ backgroundColor: tag_color, opacity: currentTagView === tag_name ? "0.8" : '0.4' }}
                title={tag_name}
              >
                <span className="tag-name" onClick={() => dispatch(SetCurrentTagView(tag_name))}>{tag_name}</span>
                {/* <TagIcon /> */}
                {
                  isTagUpdate && (
                    <div title="settings" onClick={() => dispatch(SetCurrentTagId(id))}>
                      <EditTagIcon />
                    </div>
                  )
                }
                {
                  isTagDelete && (
                    <span title="settings" onClick={() => handleDeleteTag(id)}>
                      <DeleteTagIcon />
                    </span>
                  )
                }
              </div>
            )
          } else {
            return (
              <TagUpdate key={id} />
            )
          }
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
            <div className="tag-edit">
              {
                (!isTagUpdate && !isTagDelete) && (
                  <>
                    <span className="tag-edit-btn edit-btn" onClick={() => dispatch(ShowTagUpdate())}>
                      <EditListIcon />
                    </span>
                    <span className="tag-edit-btn" onClick={() => dispatch(ShowTagDelete())}>
                      <DeleteListIcon />
                    </span>
                  </>
                )
              }
              {
                (isTagUpdate || isTagDelete) && (
                  <span className="tag-cancel-btn" onClick={() => dispatch(ShowTagCancel())}>
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