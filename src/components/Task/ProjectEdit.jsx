import { useDispatch, useSelector } from 'react-redux';
import { ShowAddProjectEdit, ChangeProjectName, ChangeProjectColor, AddProjectItem } from '../../features/taskSlice';
import { CancelIcon } from '../../icons';
import { useState } from 'react';
import axios from 'axios';

const ProjectEdit = () => {
  // const { projects, projectInput } = useSelector((store) => store.task);

  const dispatch = useDispatch();

  const [projectInput, setProjectInput] = useState({
    project_name: '',
    project_color: '#FFFFFF',
  })

  const { project_color } = projectInput

  // const handleProjectSubmit = (e) => {
  //   e.preventDefault();
  //   if (!nameProject) {
  //     return;
  //   }
  //   const newProject = { id: Date.now(), nameProject: nameProject, color: projectColor };
  //   const updateProject = [...projects, newProject];
  //   dispatch(AddProjectItem(updateProject))
  //   dispatch(ChangeProjectName(''))
  //   dispatch(ChangeProjectColor('#FFFFFF'))
  // }

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
    <div className='cancel-btn-container'>
      {/* <h1 className="test-element">Hello friend!</h1> */}
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