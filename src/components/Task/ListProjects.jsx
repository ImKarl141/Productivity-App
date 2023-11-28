import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetProjectList, RemoveProjectItem, ShowAddProjectEdit } from "../../features/taskSlice";
import { AddProjectIcon, EditListIcon, DeleteListIcon } from '../../icons';
import axios from "axios";
import ProjectEdit from "./ProjectEdit";

const ListProjects = () => {
  const dispatch = useDispatch();
  const { addProjectEdit, dbProjects } = useSelector((store) => store.task);

  useEffect(() => {
    const fetchProjectList = async () => {
      try {
        const resp = await axios.get("http://localhost:8800/ProjectList")
        dispatch(SetProjectList(resp.data))
      } catch (err) {
        console.log(err);
      }
    }
    fetchProjectList();
  }, [])


  return (
    <div className='overall-list'>
      <div className='list-title'>
        <h2 className='list-title'>List of Projects</h2>
      </div>
      <div className='projects-container'>
        {dbProjects.map((project) => {
          const { id, project_name, project_color } = project;
          return (
            <button key={id} className='list-projects' >
              <a className='project-title-container' title='Project name' id={id} href={`#${id}`}>
                <div className='project-color' style={{ backgroundColor: project_color }}></div>
                <p className='myTask-text'>{project_name}</p>
              </a>
              <div className='project-settings-btn' >
                <span title='Edit' onClick={() => console.log(`${project_name} Project edited`)}><EditListIcon /></span>
                <span title='Delete' onClick={() => dispatch(RemoveProjectItem(id))} ><DeleteListIcon /></span>
              </div>
            </button>
          )
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
    </div>
  )
}
export default ListProjects