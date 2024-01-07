import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetProjectList, RemoveProjectItem, ShowAddProjectEdit, SetCurrentProjectId, ShowProjectUpdate, DeleteProjectItem, SetTaskList, SetCurrentProjectView, SetCurrentTagView } from "../../features/taskSlice";
import { AddProjectIcon, EditListIcon, DeleteListIcon } from '../../icons';
import axios from "axios";
import ProjectEdit from "./ProjectEdit";
import ProjectUpdate from "./ProjectUpdate";

const ListProjects = () => {
  const dispatch = useDispatch();
  const { addProjectEdit, dbProjects, isProjectUpdate, currentProjectId, currentProjectView } = useSelector((store) => store.task);

  const updateChanges = async () => {
    const resp = await axios.get('https://todo-api-teal.vercel.app/TaskCurrent')
    dispatch(SetTaskList(resp.data))
  }

  //Toast message
  const showMessage = (idElement) => {
    const spawnMessage = document.getElementById(idElement);

    spawnMessage.style.display = "flex";

    setTimeout(() => {
      spawnMessage.style.display = "none";
    }, 3000)
  }

  const handleDeleteProject = async (myId) => {
    try {
      await axios.put("https://todo-api-teal.vercel.app/TaskCurrent/deleteProject/" + myId)
      await axios.delete("https://todo-api-teal.vercel.app/ProjectList/" + myId)
      const projectIndex = dbProjects.findIndex((project) => project.id === myId)
      dispatch(DeleteProjectItem(projectIndex))
      updateChanges()
      showMessage("projectDeleted")
    } catch (err) {
      console.log(err);
    }
  }

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
              <button key={id} className='list-projects' style={{ backgroundColor: project_name === currentProjectView ? "var(--pomodoroDark)" : "transparent" }}>
                <div id={id} className='project-title-container' title='Project name' onClick={() => dispatch(SetCurrentProjectView(project_name))}>
                  <div className='project-color' style={{ backgroundColor: project_color }}></div>
                  <p className='myTask-text project-title'>{project_name}</p>
                </div>
                <div className='project-settings-btn' >
                  <span className="project-btn-edit" title='Edit' onClick={() => dispatch(SetCurrentProjectId(id))}><EditListIcon /></span>
                  <span className="project-btn-delete" title='Delete' onClick={() => handleDeleteProject(id)} ><DeleteListIcon /></span>
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