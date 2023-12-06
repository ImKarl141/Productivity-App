import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetTaskList, ShowTaskEdit, ShowTaskUpdate, SetCurrentEditId } from "../../features/taskSlice";
import { AddTaskIcon, EnterTaskIcon, CalendarIconTask, DeleteListIcon } from '../../icons';
import axios from "axios";

const ListTaskCurrent = () => {

  const { isTaskUpdate, dbTasks } = useSelector((store) => store.task);
  // console.log(dbTasks);
  // const [dbTask, setDbTasks] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const resp = await axios.get("http://localhost:8800/TaskCurrent")
        // setDbTasks(resp.data)
        dispatch(SetTaskList(resp.data))
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
                  {
                    (task_date || project_name || tag_name) && (
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
                            <span title='Tag'>{tag_name}</span>
                          )
                        }
                      </div>
                    )
                  }
                </div>
                {
                  !isTaskUpdate && (
                    <button className='task-item-btn'
                      onClick={() => {
                        dispatch(ShowTaskUpdate());
                        dispatch(SetCurrentEditId(id))
                      }}
                    >
                      <EnterTaskIcon />
                    </button>
                  )
                }
              </div>
            </li>
          )
        })}
      </ul >
    </div >
  )
}
export default ListTaskCurrent