import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddTaskIcon, EnterTaskIcon, CalendarIconTask, DeleteListIcon } from '../../icons';
import { SetTaskList, ShowTaskEdit, ShowTaskUpdate, SetCurrentEditId, SetCurrentCheckedId } from "../../features/taskSlice";
import axios from "axios";


const RegularTaskItem = (props) => {
  const dispatch = useDispatch();
  const { isTaskUpdate, dbTasks, currentView, currentCheckedId } = useSelector((store) => store.task);

  const handle = (e) => {
    //Separate the string into an array. Being, in order, task_title, focus_amount and is_checked
    const myArray = e.target.value.split("+");

    //Change the value of is_checked. If is 0 mean false, so turn true, and vice versa.
    if (myArray[2] === "0") {
      myArray[2] = true
    } else {
      myArray[2] = false
    }
    handleCheckedSubmit(myArray[0], myArray[1], myArray[2], e.target.id)
  }

  const handleCheckedSubmit = async (title, focus, check, myId) => {
    try {
      await axios.patch("http://localhost:8800/TaskCurrent/" + myId, { task_title: title, focus_amount: focus, is_checked: check });

      //Update the local state of the Task List.
      const newTask = dbTasks.map((task) => {
        //The myId is an string, so parseInt or compare ignoring the datatype.
        if (task.id == myId) {
          return { ...task, is_checked: check };
        }
        return task;
      });
      dispatch(SetTaskList(newTask))
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <li >
      <div className='task-item-overall-container'>
        <div className='task-item-container'>
          <input
            name="is_checked"
            id={props.id}
            value={`${props.task_title}+${props.focus_amount}+${props.is_checked}`}
            className='default-checkbox checkbox-test'
            type="checkbox"
            onChange={handle}
          />
          <span className='checkmark'></span>
          <div className='task-item-text'>
            <span>{props.task_title}:</span>
            <span className='task-item-description'>{props.task_desc}</span>
          </div>
          {
            (props.task_date || props.project_name || props.tag_name) && (
              <div className='task-item-details'>
                {
                  props.task_date && (
                    <>
                      <span title='Due date'><CalendarIconTask /></span>
                      <span title='Due date' className='next-item-date'>{props.task_date}</span>
                    </>
                  )
                }
                {
                  props.project_name && (
                    <span className='next-item' title='Project'>
                      <span className='project-color' style={{ backgroundColor: `${props.project_color}` }}></span>
                      {props.project_name}
                    </span>
                  )
                }
                {
                  props.tag_name && (
                    <span title='Tag'>{props.tag_name}</span>
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
                dispatch(SetCurrentEditId(props.id))
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
export default RegularTaskItem