import { useDispatch, useSelector } from 'react-redux';
import { ShowAddProjectEdit, ChangeProjectName, ChangeProjectColor, AddProjectItem, SetProjectList } from '../../features/taskSlice';
import { CancelIcon } from '../../icons';
import { useState } from 'react';
import axios from 'axios';

const ProjectEdit = () => {
  const { dbProjects } = useSelector((store) => store.task)
  // console.log(dbProjects);

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
    // console.log(projectInput);
  }

  // const checkDuplicateProject = dbProjects.find(project => project.project_name === "Red project");
  // console.log(checkDuplicateProject);

  // const checkDuplicateProject = (myInput) => {
  //   for (const listOfProject of dbProjects) {
  //     if (myInput.project_name === listOfProject.project_name) {
  //       console.log("Find duplicate");
  //       return
  //     }
  //   }
  //   console.log("No duplicate was found");
  // }

  // checkDuplicateProject({ project_name: "Red project", project_color: '#FFFFFF' });

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!project_name) {
      // console.log("empty");
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
      await axios.post('http://localhost:8800/ProjectList', projectInput);
      const resp = await axios.get('http://localhost:8800/ProjectList')
      dispatch(SetProjectList(resp.data))
      setProjectInput({
        project_name: '',
        project_color: '#FFFFFF',
      })
      // dispatch(SetProjectList([...dbP]))
      // window.location.reload();
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
          // className='test'
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