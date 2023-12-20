import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetProjectList, RemoveProjectItem, ShowAddProjectEdit, SetCurrentProjectId, ShowProjectUpdate, DeleteProjectItem, SetTaskList } from "../../features/taskSlice";
import { AddProjectIcon, EditListIcon, DeleteListIcon } from '../../icons';
import axios from "axios";
import ProjectEdit from "./ProjectEdit";
import ProjectUpdate from "./ProjectUpdate";

const ListProjects = () => {
  const dispatch = useDispatch();
  const { addProjectEdit, dbProjects, isProjectUpdate, currentProjectId } = useSelector((store) => store.task);

  const updateChanges = async () => {
    const resp = await axios.get('http://localhost:8800/TaskCurrent')
    dispatch(SetTaskList(resp.data))
  }
  // console.log(dbProjects);
  // console.log(isProjectUpdate);
  // const [updateItem, setUpdateItem] = useState(
  //   dbProjects.map((project) => {
  //     const { id } = project;
  //     return (
  //       { item }
  //     )
  //   })
  // )


  // useEffect(() => {
  //   const fetchProjectList = async () => {
  //     try {
  //       const resp = await axios.get("http://localhost:8800/ProjectList")
  //       dispatch(SetProjectList(resp.data))
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchProjectList();
  // }, [])

  // const handleDeleteProject = async (myId) => {
  //   // let id = 8;
  //   try {
  //     await axios.delete("http://localhost:8800/ProjectList/" + myId)
  //     const projectIndex = dbProjects.findIndex((project) => project.id === myId)
  //     dispatch(DeleteProjectItem(projectIndex))
  //     // console.log();
  //     // console.log(dbProjects);
  //     // console.log(projectIndex);
  //     // console.log(deletedTask);
  //     // dispatch(SetProjectList([...dbProjects, deletedTask ]))
  //     // console.log(dbProjects.splice(projectIndex, 1));
  //     // window.location.reload();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // const test = await Promise.all([
  //   axios.delete("http://localhost:8800/ProjectList/" + myId),
  //   axios.put("http://localhost:8800/TaskCurrent/deleteProject/" + myId),
  // ])

  // const updateChanges = async () => {
  //   const resp = await axios.get('http://localhost:8800/TaskCurrent')
  //   dispatch(SetTaskList(resp.data))
  //   dispatch(ShowTaskUpdate())
  // }



  const handleDeleteProject = async (myId) => {
    try {
      await axios.put("http://localhost:8800/TaskCurrent/deleteProject/" + myId)
      await axios.delete("http://localhost:8800/ProjectList/" + myId)
      const projectIndex = dbProjects.findIndex((project) => project.id === myId)
      dispatch(DeleteProjectItem(projectIndex))
      updateChanges()
    } catch (err) {
      console.log(err);
    }
  }

  // const handleDeleteProject = async (myId) => {
  //   try {
  //     await axios.delete("http://localhost:8800/ProjectList/" + myId);
  //     try {
  //       await axios.put("http://localhost:8800/TaskCurrent/deleteProject/" + myId);
  //     } catch (err) {
  //       console.error("Error nulling project tasks:", err);
  //     }
  //     const projectIndex = dbProjects.findIndex((project) => project.id === myId);
  //     dispatch(DeleteProjectItem(projectIndex));
  //   } catch (err) {
  //     console.error("Error deleting project:", err);
  //   }
  // };

  return (
    <div className='overall-list'>
      <div className='list-title'>
        <h2 className='list-title'>List of Projects</h2>
      </div>
      <div className='projects-container'>
        {dbProjects.map((project) => {
          const { id, project_name, project_color } = project;
          if (currentProjectId !== id) {
            return (
              <button key={id} className='list-projects' >
                <a className='project-title-container' title='Project name' id={id} href={`#${id}`}>
                  <div className='project-color' style={{ backgroundColor: project_color }}></div>
                  <p className='myTask-text'>{project_name}</p>
                </a>
                <div className='project-settings-btn' >
                  <span title='Edit' onClick={() => dispatch(SetCurrentProjectId(id))}><EditListIcon /></span>
                  <span title='Delete' onClick={() => handleDeleteProject(id)} ><DeleteListIcon /></span>
                </div>
              </button>
            )
          } else {
            return (
              <ProjectUpdate key={id} />
            )
          }
        })}
      </div>
      {
        addProjectEdit && <ProjectEdit />
      }

      {
        !addProjectEdit && (
          <button className='addBtn add-project-btn' onClick={() => dispatch(ShowAddProjectEdit())} >
            <AddProjectIcon />
            <p className='myTask-text'>Add Project</p>
          </button>
        )
      }
    </div >
  )
}
export default ListProjects