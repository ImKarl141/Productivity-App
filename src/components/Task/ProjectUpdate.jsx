import { useDispatch, useSelector } from 'react-redux';
import { SetCurrentProjectId, SetProjectList, SetTaskList } from '../../features/taskSlice';
import { AcceptUpdateIcon, CancelUpdateIcon } from '../../icons';
import { useState } from 'react';
import axios from 'axios';

const ProjectUpdate = () => {
  const dispatch = useDispatch();
  const { currentProjectId, dbProjects } = useSelector((store) => store.task)

  const [projectInput, setProjectInput] = useState({
    project_name: currentProjectId ?
      dbProjects.find(project => project.id === currentProjectId).project_name : '',
    project_color: currentProjectId ?
      dbProjects.find(project => project.id === currentProjectId).project_color : ''
  })

  const { project_name, project_color } = projectInput

  //Toast message
  const showMessage = (idElement) => {
    const spawnMessage = document.getElementById(idElement);

    spawnMessage.style.display = "flex";

    setTimeout(() => {
      spawnMessage.style.display = "none";
    }, 3000)
  }

  const handleChangeInput = (e) => {
    setProjectInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!project_name) {
      showMessage("emptyTitleProject")
      return;
    }
    e.preventDefault();
    try {
      await axios.put('https://todo-api-teal.vercel.app/ProjectList/' + currentProjectId, projectInput);
      const resp = await axios.get('https://todo-api-teal.vercel.app/ProjectList')
      const task = await axios.get('https://todo-api-teal.vercel.app/TaskCurrent')
      dispatch(SetTaskList(task.data))
      dispatch(SetProjectList(resp.data))
      dispatch(SetCurrentProjectId(''))
      showMessage("projectUpdated")
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