import { useDispatch, useSelector } from 'react-redux';
import { ShowTaskEdit, ShowAddProjectEdit, ShowAddTagEdit, ChangeTitleInput, ChangeDescriptionInput, ChangeDateInput, ChangeProjectName, ChangeProjectColor, ChangeProjectNameInput, ChangeProjectColorInput, ChangeTagName, ChangeTagColor, AddTaskItem, RemoveTaskItem, AddProjectItem, RemoveProjectItem, AddTagItem, RemoveTagItem, SetTagList } from '../../features/taskSlice';
import { AddTaskIcon, AllTasksIcon, CurrentTasksIcon, CompletedTasksIcon, AddProjectIcon, AddTagsIcon, EnterTaskIcon, CalendarIconTask, ProjectSettingsIcon, CancelIcon, TagSettingsIcon, EditListIcon, DeleteListIcon } from '../../icons';
import axios from 'axios';
import { useState } from 'react';


const TagEdit = () => {

  const { dbTags } = useSelector((store) => store.task);

  // Inputs
  // const { taskTitle, taskDescription, taskDate } = taskInput
  // const { taskProjectName, taskProjectColor } = taskProjectInput
  // const { nameProject, projectColor } = projectInput
  // const { nameTag, tagColor } = tagInput

  const [tagInput, setTagInput] = useState({
    tag_name: '',
    tag_color: '#FFFFFF',
  })

  const { tag_name, tag_color } = tagInput;
  const [isDuplicate, setIsDuplicate] = useState(false)

  const dispatch = useDispatch();

  //Toast message
  const showMessage = (idElement) => {
    const spawnMessage = document.getElementById(idElement);

    spawnMessage.style.display = "flex";

    setTimeout(() => {
      spawnMessage.style.display = "none";
    }, 3000)
  }

  const handleChangeInput = (e) => {
    setTagInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    // console.log(tagInput);
  }

  const handleTagSubmit = async (e) => {
    e.preventDefault();
    if (!tag_name) {
      showMessage("emptyTitleTag")
      return
    }
    for (const listOfTags of dbTags) {
      if (tagInput.tag_name.trim() === listOfTags.tag_name.trim()) {
        setIsDuplicate(true)
        console.log("Find duplicate");
        return
      }
    }
    try {
      await axios.post("https://todo-api-teal.vercel.app/TagList", tagInput);
      const resp = await axios.get('https://todo-api-teal.vercel.app/TagList')
      dispatch(SetTagList(resp.data))
      setTagInput({
        tag_name: '',
        tag_color: '#FFFFFF',
      })
      // window.location.reload();
      showMessage("tagSubmitted")
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <div className='form-container'>
      <form className='tag-form' onSubmit={handleTagSubmit}>
        <div className='color-picker-container'>
          <input
            id='color-picker-tag'
            name='tag_color'
            type="color"
            className='default-colorPicker'
            onChange={handleChangeInput}
          />
          <div className='custom-colorPicker' style={{ backgroundColor: tag_color }}>
          </div>
        </div>
        <input
          id='tagName'
          name='tag_name'
          placeholder='Tag name'
          type="text"
          value={tag_name}
          className={isDuplicate ? 'test' : 'myInputAddTag'}
          // className='myInputAddTag'
          onChange={handleChangeInput}
        />
      </form>
      <button className='cancel-tags-btn' onClick={() => dispatch(ShowAddTagEdit())}>
        <CancelIcon />
      </button>
    </div>
  )
}
export default TagEdit