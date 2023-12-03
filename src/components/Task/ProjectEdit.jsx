import { useDispatch, useSelector } from 'react-redux';
import { ShowAddProjectEdit, ChangeProjectName, ChangeProjectColor, AddProjectItem } from '../../features/taskSlice';
import { CancelIcon } from '../../icons';
import { useState } from 'react';
import axios from 'axios';

const ProjectEdit = () => {
  const dispatch = useDispatch();

  const [projectInput, setProjectInput] = useState({
    project_name: '',
    project_color: '#FFFFFF',
  })

  const { project_color } = projectInput

  const handleChangeInput = (e) => {
    setProjectInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    console.log(projectInput);
  }

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8800/ProjectList', projectInput);
      window.location.reload();
    } catch (err) {
      console.log(err);
    };
  };

  return (
    <div className='form-container'>
      <form className='project-form' onSubmit={handleProjectSubmit}>
        <div className='color-picker-container'>
          <input
            id='color-picker-project'
            name='project_color'
            type="color"
            className='default-colorPicker'
            onChange={handleChangeInput}
          />
          <div className='custom-colorPicker' style={{ backgroundColor: project_color }}>
          </div>
        </div>
        <input
          id='projectName'
          name='project_name'
          type="text"
          className='myInputAddProject'
          placeholder='Project name'
          onChange={handleChangeInput}
        />
      </form>
      <button className='cancel-projects-btn' onClick={() => dispatch(ShowAddProjectEdit())}>
        <CancelIcon />
      </button>
    </div>
  )
}
export default ProjectEdit;