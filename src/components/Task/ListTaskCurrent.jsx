import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetTaskList, ShowTaskEdit } from "../../features/taskSlice";
import { AddTaskIcon, EnterTaskIcon, CalendarIconTask } from '../../icons';
import axios from "axios";

const ListTaskCurrent = () => {

  const [dbTasks, setDbTasks] = useState([])
  const dispatch = useDispatch();
  const { dbProjects, dbTags } = useSelector((store) => store.task);

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const resp = await axios.get("http://localhost:8800/TaskCurrent")
        setDbTasks(resp.data)
        dispatch(SetTaskList(dbTasks))
      } catch (err) {
        console.log(err);
      }
    }
    fetchTaskList();
  }, [])

  return (
    <div className='task-focus'>
      <div className='task-focus-add' >
        <label htmlFor='title-task' className='addBtn add-task-btn' onClick={() => dispatch(ShowTaskEdit())}>
          <AddTaskIcon />
          <p className='myTask-text'>Add Task</p>
        </label>
      </div>
      <ul className='list-tasks'>
        {dbTasks.map((myTask) => {
          const { id, task_title, task_desc, task_date, project_name, project_color, tag_name, tag_color } = myTask
          return (
            <li key={id}>
              <div className='task-item-overall-container'>
                <div className='task-item-container'>
                  <input className='default-checkbox checkbox-test' type="checkbox" />
                  <span className='checkmark'></span>
                  <div className='task-item-text'>
                    <span>{task_title}:</span>
                    <span className='task-item-description'>{task_desc}</span>
                  </div>
                  <div className='task-item-details'>
                    {
                      task_date && (
                        <>
                          <span title='Due date'><CalendarIconTask /></span>
                          <span title='Due date' className='next-item'>{task_date}</span>
                        </>
                      )
                    }
                    {
                      project_name && (
                        <span className='next-item' title='Project'>
                          <span className='project-color' style={{ backgroundColor: `${project_color}` }}></span>
                          {project_name}
                        </span>
                      )
                    }
                    {
                      tag_name && (
                        <span title='Tag' style={{ color: `${tag_color}` }}>{tag_name}</span>
                      )
                    }
                  </div>
                </div>
                <button className='task-item-btn' >
                  <EnterTaskIcon />
                </button>
              </div>
            </li>
          )
        })}
      </ul >
    </div >
  )
}
export default ListTaskCurrent