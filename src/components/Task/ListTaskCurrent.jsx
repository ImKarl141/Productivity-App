import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetTaskList, ShowTaskEdit, ShowTaskUpdate, SetCurrentEditId, SetCurrentCheckedId } from "../../features/taskSlice";
import { AddTaskIcon, EnterTaskIcon, CalendarIconTask, DeleteListIcon } from '../../icons';
import axios from "axios";

const ListTaskCurrent = () => {

  const { isTaskUpdate, dbTasks, currentView, currentCheckedId } = useSelector((store) => store.task);
  // console.log(currentCheckedId);

  // console.log(dbTasks);
  // const [dbTask, setDbTasks] = useState([])
  const dispatch = useDispatch();

  const partialDate = new Date()
  const currentDate = `${(partialDate.getMonth() + 1)}-${partialDate.getDate()}-${partialDate.getFullYear()}`
  const { all, current, completed } = currentView;
  const [isChecked, setIsChecked] = useState(true)
  // console.log(isChecked);

  // if (isChecked) {
  //   console.log("Is checked");
  // } else {
  //   console.log("Not checked");
  // }
  // console.log(current);

  // const [currentView, setCurrentView] = useState({
  //   all: true,
  //   current: false,
  //   completed: false
  // })

  const [tempValues, setTempValues] = useState({
    task_title: 'Created',
    focus_amount: 2,
    // is_checked: '',
  })

  // console.log(tempValues);

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

  const handle = (e) => {
    //Separate the string into an array. Being, in order, task_title, focus_amount and is_checked
    const myArray = e.target.value.split("+");

    const title = "Improved again";
    const focus = myArray[1];
    //Change the value of is_checked. If is 0 mean false, so turn true, and vice versa.
    if (myArray[2] === "0") {
      myArray[2] = true
    } else {
      myArray[2] = false
    }
    // const checked = myArray[2];
    // console.log(myArray);
    handleCheckedSubmit(myArray[0], myArray[1], myArray[2], e.target.id)
  }

  const handleCheckedSubmit = async (title, focus, check, myId) => {
    try {
      await axios.patch("http://localhost:8800/TaskCurrent/" + myId, { task_title: title, focus_amount: focus, is_checked: check });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <div className='task-focus'>
      <div className='task-focus-add' >
        <label htmlFor='title-task' className='addBtn add-task-btn' onClick={() => dispatch(ShowTaskEdit())}>
          <AddTaskIcon />
          <p className='myTask-text'>Add Task</p>
        </label>
      </div>
      <ul className='list-tasks'>
        {/*Not checked tasks*/}
        {dbTasks.map((myTask) => {
          const { id, task_title, task_desc, focus_amount, task_date, project_name, project_color, tag_name, tag_color, is_checked } = myTask
          // console.log(typeof (task_date));
          if (!is_checked) {
            return (
              <li key={`${id}`}>
                <div className='task-item-overall-container'>
                  <div className='task-item-container'>
                    {
                      is_checked ? <input
                        name="is_checked"
                        checked
                        id={id}
                        value={`${task_title}+${focus_amount}+${is_checked}`}
                        className='default-checkbox checkbox-test'
                        type="checkbox"
                        onChange={handle}
                      /> :
                        <input
                          name="is_checked"
                          id={id}
                          value={`${task_title}+${focus_amount}+${is_checked}`}
                          className='default-checkbox checkbox-test'
                          type="checkbox"
                          onChange={handle}
                        />
                    }
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
          }
        })}
        {/*Checked tasks*/}
        {dbTasks.map((myTask) => {
          const { id, task_title, task_desc, focus_amount, task_date, project_name, project_color, tag_name, tag_color, is_checked } = myTask
          // console.log(typeof (task_date));
          if (is_checked) {
            return (
              <li key={`${id}`}>
                <div className='task-item-overall-container'>
                  <div className='task-item-container'>
                    {
                      is_checked ? <input
                        name="is_checked"
                        checked
                        id={id}
                        value={`${task_title}+${focus_amount}+${is_checked}`}
                        className='default-checkbox checkbox-test'
                        type="checkbox"
                        onChange={handle}
                      /> :
                        <input
                          name="is_checked"
                          id={id}
                          value={`${task_title}+${focus_amount}+${is_checked}`}
                          className='default-checkbox checkbox-test'
                          type="checkbox"
                          onChange={handle}
                        />
                    }
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
          }
        })}
      </ul >
    </div >
  )
}
export default ListTaskCurrent