import { useDispatch, useSelector } from "react-redux"
import details from '../../images/kebab.svg'
import { SetCurrentEditTimer, SetCheckedTask, SetCurrentTimerTask, SetTimerSettings } from "../../features/timerSlice";
import axios from "axios";
import { useRef } from "react";
import { SetTaskList } from "../../features/taskSlice";

const ListTimerTask = () => {
  const dispatch = useDispatch();
  const { isTaskUpdate, dbTasks } = useSelector((store) => store.task);
  const { currentTimerId, checkedItems, isTimerTaskEdit, dbTimer } = useSelector((store) => store.timer)

  const isSend = useRef(true)

  const handleCheck = (e) => {
    //Separate the string into an array. Being, in order, task_title, focus_amount and is_checked
    const myArray = e.target.value.split("+");

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
      const req = await axios.patch("https://todo-api-teal.vercel.app/TaskCurrent/" + myId, { task_title: title, focus_amount: focus, is_checked: check });
      const resp = await axios.get("https://todo-api-teal.vercel.app/TaskCurrent/");
      dispatch(SetTaskList(resp.data))
      // console.log("Checked");
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  const handleCurrentTask = async (title, taskId) => {
    const id = 1;
    try {
      await axios.patch("https://todo-api-teal.vercel.app/UserSettings/CurrentTask/" + id, { current_task: title, task_id: taskId })
      dispatch(SetTimerSettings({ ...dbTimer, current_task: title }))
    } catch (err) {
      console.log(err);
    }
  }
  // const handleCurrentTask = async (title) => {
  //   const id = 1
  //   try {
  //     await axios.patch("https://todo-api-teal.vercel.app/UserSettings/CurrentTask/" + id, { current_task: title })
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // const handleCurrentTask = async (focus) => {
  //   const id = 1;
  //   try {
  //     await axios.patch("https://todo-api-teal.vercel.app/UserSettings/" + id, timerInput)
  //     dispatch(SetTimerSettings({ ...dbTimer, focus: focus, short: short, long: long }))
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <div className="currentTimerList-container">
      {
        dbTasks.map((task) => {
          const { id, task_title, focus_amount, is_checked, focus_finished } = task
          //Check if the timer is in current editing. When task is editing a window for editing is display the the Task is hidden from the list
          if (id !== currentTimerId) {
            //Not checked items
            if (!is_checked) {
              return (
                <div key={`${id}`} className="listTask-timer">
                  <div className="listTask-title">
                    {/*Verify if logic is redundant*/}
                    <label className="list-text">
                      <input
                        id={id}
                        name="is_checked"
                        // checked
                        className="default-checkboxList"
                        value={`${task_title}+${focus_amount}+${is_checked}`}
                        type="checkbox"
                        title="Mark as completed"
                        onChange={handleCheck}
                      />
                      <span className="checkmarkList"></span>
                      <span className="task-text">{task_title}</span>
                      {/* {task_title} */}
                    </label>
                  </div>
                  <div className="listTask-details" onClick={() => handleCurrentTask(task_title, id)}>
                    <span>{focus_finished}/{focus_amount}</span>
                    {/*Hide details button when editing a task*/}
                    {
                      !isTimerTaskEdit && (
                        <button className="details-task-btn" title="Task settings" onClick={(e) => {
                          e.stopPropagation();
                          dispatch(SetCurrentEditTimer(id));
                        }}>
                          <img className="details-task-img" src={details} alt="" />
                        </button>
                      )
                    }
                    {
                      isTimerTaskEdit && (
                        <button className="details-task-btn" title="Task settings" >
                          <img className="details-task-img-hidden" src={details} alt="" />
                        </button>
                      )
                    }
                  </div>
                </div>
              )
            }
          }
        })
      }
      {/*Display the checked elements at the end*/}
      {
        dbTasks.map((task) => {
          const { id, task_title, focus_amount, is_checked, focus_finished } = task
          // console.log(focus_amount);
          if (id !== currentTimerId) {
            // Checked items
            if (is_checked) {
              return (
                <div key={`${id}`} className="listTask-timer">
                  <div className="listTask-title">
                    <label className="list-text">
                      <input
                        id={id}
                        name="is_checked"
                        checked
                        className="default-checkboxList"
                        value={`${task_title}+${focus_amount}+${is_checked}`}
                        type="checkbox"
                        title="Mark as completed"
                        onChange={handleCheck}
                      />
                      <span className="checkmarkList"></span>
                      <span className="task-text">{task_title}</span>
                    </label>
                  </div>
                  <div className="listTask-details" onClick={() => handleCurrentTask(task_title, id)}>
                    <span>{focus_finished}/{focus_amount}</span>
                    {
                      !isTimerTaskEdit && (
                        <button className="details-task-btn" title="Task settings" onClick={(e) => {
                          e.stopPropagation();
                          dispatch(SetCurrentEditTimer(id));
                        }}>
                          <img className="details-task-img" src={details} alt="" />
                        </button>
                      )
                    }
                    {
                      isTimerTaskEdit && (
                        <button className="details-task-btn" title="Task settings" >
                          <img className="details-task-img-hidden" src={details} alt="" />
                        </button>
                      )
                    }
                  </div>
                </div>
              )
            }
          }
        })
      }
    </div>
  )
}
export default ListTimerTask