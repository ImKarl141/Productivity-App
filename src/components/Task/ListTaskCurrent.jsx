import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetTaskList, ShowTaskEdit, ShowTaskUpdate, SetCurrentEditId, SetCurrentCheckedId } from "../../features/taskSlice";
import { AddTaskIcon, EnterTaskIcon, CalendarIconTask, DeleteListIcon } from '../../icons';
import axios from "axios";
import RegularTaskItem from "./RegularTaskItem";
import CheckedTaskItem from "./CheckedTaskItem";

const ListTaskCurrent = () => {

  const { isTaskUpdate, dbTasks, currentView, currentCheckedId, currentProjectView, currentTagView } = useSelector((store) => store.task);
  // console.log(currentProjectView);
  // console.log(currentCheckedId);
  // console.log(dbTasks);

  // console.log(dbTasks);
  // const [dbTask, setDbTasks] = useState([])
  const dispatch = useDispatch();

  const partialDate = new Date()
  const currentDate = `${(partialDate.getMonth() + 1)}-${partialDate.getDate()}-${partialDate.getFullYear()}`
  const { all, current, completed } = currentView;
  const [isChecked, setIsChecked] = useState(true)
  // console.log(isChecked);

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
      // const newTask = dbTasks.map((task) => {
      //   //The myId is an string, so parseInt or compare ignoring the datatype.
      //   if (task.id == myId) {
      //     return { ...task, is_checked: check };
      //   }
      //   return task;
      // });
      const resp = await axios.get("http://localhost:8800/TaskCurrent/");
      dispatch(SetTaskList(resp.data))
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (currentProjectView || currentTagView) {
      $(`.task-item-overall-container`).show()
      $(`.task-item-overall-container:not(:contains(${currentProjectView}))`).hide()
      $(`.task-item-overall-container:not(:contains(${currentTagView}))`).hide()

    } else (
      $(`.task-item-overall-container`).show()
    )
  }, [currentProjectView, currentView, currentTagView])

  // task - item - overall - container
  // $("span:contains('Red project')").hide()

  return (
    <section className='task-focus'>
      {/* <button onClick={() => $(".task-item-overall-container:contains('Red project')").hide()}>Test</button> */}
      <div className='task-focus-add' >
        <label className='addBtn add-task-btn' onClick={() => dispatch(ShowTaskEdit())}>
          <AddTaskIcon />
          <p className='myTask-text'>Add Task</p>
        </label>
      </div>
      <ul className='list-tasks'>
        {
          all && (
            <>
              {/*Not checked tasks*/}
              {dbTasks.map((myTask) => {
                const { id, task_title, task_desc, focus_amount, task_date, project_name, project_color, tag_name, tag_color, is_checked } = myTask
                if (!is_checked) {
                  return (
                    <RegularTaskItem key={id} {...myTask} />
                  )
                }
              })}
              {/*Checked tasks*/}
              {dbTasks.map((myTask) => {
                const { id, task_title, task_desc, focus_amount, task_date, project_name, project_color, tag_name, tag_color, is_checked } = myTask
                // console.log(typeof (task_date));
                if (is_checked) {
                  return (
                    <CheckedTaskItem key={id} {...myTask} />
                  )
                }
              })}
            </>
          )
        }
        {
          current && (
            <>
              {/*Not checked tasks*/}
              {dbTasks.map((myTask) => {
                const { id, task_title, task_desc, focus_amount, task_date, project_name, project_color, tag_name, tag_color, is_checked } = myTask
                if (!is_checked && task_date === currentDate) {
                  return (
                    <RegularTaskItem key={id} {...myTask} />
                  )
                }
              })}
              {/*Checked tasks*/}
              {dbTasks.map((myTask) => {
                const { id, task_title, task_desc, focus_amount, task_date, project_name, project_color, tag_name, tag_color, is_checked } = myTask
                // console.log(typeof (task_date));
                if (is_checked && task_date === currentDate) {
                  return (
                    <CheckedTaskItem key={id} {...myTask} />
                  )
                }
              })}
            </>
          )
        }
        {
          completed && (
            dbTasks.map((myTask) => {
              const { id, task_title, task_desc, focus_amount, task_date, project_name, project_color, tag_name, tag_color, is_checked } = myTask
              // console.log(typeof (task_date));
              if (is_checked) {
                return (
                  <CheckedTaskItem key={id} {...myTask} />
                )
              }
            })
          )
        }
      </ul >
    </section >
  )
}
export default ListTaskCurrent