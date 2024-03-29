import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { AcceptUpdateIcon, CancelUpdateIcon } from '../../icons';
import { SetCurrentTagId, SetTagList, SetTaskList } from '../../features/taskSlice';
import axios from "axios";


const TagUpdate = () => {
  const { dbTags, currentTagId } = useSelector((store) => store.task);

  const dispatch = useDispatch();

  const [tagInput, setTagInput] = useState({
    tag_name: currentTagId ?
      dbTags.find(tag => tag.id === currentTagId).tag_name : '',
    tag_color: currentTagId ?
      dbTags.find(tag => tag.id === currentTagId).tag_color : ''
  })

  const { tag_name, tag_color } = tagInput

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
  }

  const handleTagSubmit = async (e) => {
    e.preventDefault();
    if (!tag_name) {
      showMessage("emptyTitleTag")
      return;
    }
    try {
      await axios.put('https://todo-api-teal.vercel.app/TagList/' + currentTagId, tagInput);
      const tag = await axios.get('https://todo-api-teal.vercel.app/TagList')
      const task = await axios.get('https://todo-api-teal.vercel.app/TaskCurrent')
      dispatch(SetTaskList(task.data))
      dispatch(SetTagList(tag.data))
      dispatch(SetCurrentTagId(''))
      showMessage("tagUpdated")
    } catch (err) {
      console.log(err);
    };
  };

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
          className='myInputAddTag'
          value={tag_name}
          onChange={handleChangeInput}
        />
      </form>
      <button className='cancel-projects-btn' onClick={() => dispatch(SetCurrentTagId(''))}>
        <CancelUpdateIcon />
      </button>
      <button className='accept-projects-btn' onClick={handleTagSubmit}>
        <AcceptUpdateIcon />
      </button>
    </div>
  )
}
export default TagUpdate