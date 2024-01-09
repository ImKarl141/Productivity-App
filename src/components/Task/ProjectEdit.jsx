import { useDispatch, useSelector } from 'react-redux';
import { ShowAddProjectEdit, SetProjectList } from '../../features/taskSlice';
import { CancelIcon } from '../../icons';
import { useState } from 'react';
import axios from 'axios';

const ProjectEdit = () => {
  const { dbProjects } = useSelector((store) => store.task)

  const dispatch = useDispatch();

  const [projectInput, setProjectInput] = useState({
    project_name: '',
    project_color: '#FFFFFF',
  })

  const { project_name, project_color } = projectInput

  const [isDuplicate, setIsDuplicate] = useState(false)

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
      return
    }
    for (const listOfProject of dbProjects) {
      if (projectInput.project_name.trim() === listOfProject.project_name.trim()) {
        setIsDuplicate(true)
        console.log("Find duplicate");
        return
      }
    }
    try {
      await axios.post('https://todo-api-teal.vercel.app/ProjectList', projectInput);
      const resp = await axios.get('https://todo-api-teal.vercel.app/ProjectList')
      dispatch(SetProjectList(resp.data))
      setProjectInput({
        project_name: '',
        project_color: '#FFFFFF',
      })
      showMessage("projectSubmitted")
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
          className={isDuplicate ? 'test' : 'myInputAddProject'}
          value={project_name}
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