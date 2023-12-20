import { useDispatch, useSelector } from 'react-redux';
import { ShowAddProjectEdit, ChangeProjectName, ChangeProjectColor, AddProjectItem, SetCurrentProjectId, SetProjectList, SetTaskList } from '../../features/taskSlice';
import { CancelIcon, AcceptUpdateIcon, CancelUpdateIcon } from '../../icons';
import { useState } from 'react';
import axios from 'axios';

const ProjectUpdate = () => {
  const dispatch = useDispatch();
  const { currentProjectId, dbProjects } = useSelector((store) => store.task)
  // const currentProject = dbProjects.find(project => project.id === currentProjectId)
  // console.log(currentProject);

  const [projectInput, setProjectInput] = useState({
    project_name: currentProjectId ?
      dbProjects.find(project => project.id === currentProjectId).project_name : '',
    project_color: currentProjectId ?
      dbProjects.find(project => project.id === currentProjectId).project_color : ''
  })

  // console.log(projectInput);
  const { project_name, project_color } = projectInput

  const handleChangeInput = (e) => {
    setProjectInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    // console.log(projectInput);
  }

  const handleProjectSubmit = async (e) => {
    if (!project_name) {
      return;
    }
    e.preventDefault();
    try {
      await axios.put('http://localhost:8800/ProjectList/' + currentProjectId, projectInput);
      const resp = await axios.get('http://localhost:8800/ProjectList')
      const task = await axios.get('http://localhost:8800/TaskCurrent')
      dispatch(SetTaskList(task.data))
      dispatch(SetProjectList(resp.data))
      dispatch(SetCurrentProjectId(''))
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
          className='myInputUpdateProject'
          placeholder='Project name'
          value={project_name}
          //Make the value the same as the dbProject based on the id
          onChange={handleChangeInput}
        />
      </form>
      <button className='cancel-projects-btn' onClick={() => dispatch(SetCurrentProjectId(''))}>
        <CancelUpdateIcon />
      </button>
      <button className='accept-projects-btn' onClick={handleProjectSubmit}>
        <AcceptUpdateIcon />
      </button>
    </div >
  )
}
export default ProjectUpdate;