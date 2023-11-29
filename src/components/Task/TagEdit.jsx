import { useDispatch, useSelector } from 'react-redux';
import { ShowTaskEdit, ShowAddProjectEdit, ShowAddTagEdit, ChangeTitleInput, ChangeDescriptionInput, ChangeDateInput, ChangeProjectName, ChangeProjectColor, ChangeProjectNameInput, ChangeProjectColorInput, ChangeTagName, ChangeTagColor, AddTaskItem, RemoveTaskItem, AddProjectItem, RemoveProjectItem, AddTagItem, RemoveTagItem } from '../../features/taskSlice';
import { AddTaskIcon, AllTasksIcon, CurrentTasksIcon, CompletedTasksIcon, AddProjectIcon, AddTagsIcon, EnterTaskIcon, CalendarIconTask, ProjectSettingsIcon, CancelIcon, TagSettingsIcon, EditListIcon, DeleteListIcon } from '../../icons';
import axios from 'axios';
import { useState } from 'react';


const TagEdit = () => {

  // const { taskItems, isEdit, addProjectEdit, projects, tags, addTagEdit, taskInput, taskProjectInput, taskTag, projectInput, tagInput } = useSelector((store) => store.task);

  // Inputs
  // const { taskTitle, taskDescription, taskDate } = taskInput
  // const { taskProjectName, taskProjectColor } = taskProjectInput
  // const { nameProject, projectColor } = projectInput
  // const { nameTag, tagColor } = tagInput

  const [tagInput, setTagInput] = useState({
    tag_name: '',
    tag_color: '#FFFFFF',
  })

  const { tag_color } = tagInput;
  const dispatch = useDispatch();

  const handleChangeInput = (e) => {
    setTagInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    console.log(tagInput);
  }

  const handleTagSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/TagList", tagInput);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <div className='cancel-btn-container'>
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
          className='myInputAddTag'
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