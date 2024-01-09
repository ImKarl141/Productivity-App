import { useDispatch, useSelector } from "react-redux"
import details from '../../images/kebab.svg'
import { SetCurrentEditTimer, SetCheckedTask, SetCurrentTimerTask, SetTimerSettings } from "../../features/timerSlice";
import axios from "axios";
import { SetTaskList } from "../../features/taskSlice";

const ListTimerTask = () => {
  const dispatch = useDispatch();
  const { dbTasks } = useSelector((store) => store.task);
  const { currentTimerId, isTimerTaskEdit, dbTimer } = useSelector((store) => store.timer)

  const handleCheck = (e) => {
    const myArray = e.target.value.split("+");

    if (myArray[2] === "0") {
      myArray[2] = true
    } else {
      myArray[2] = false
    }
    handleCheckedSubmit(myArray[0], myArray[1], myArray[2], e.target.id)
  }

  const handleCheckedSubmit = async (title, focus, check, myId) => {
    try {
      const req = await axios.patch("https://todo-api-teal.vercel.app/TaskCurrent/" + myId, { task_title: title, focus_amount: focus, is_checked: check });
      const resp = await axios.get("https://todo-api-teal.vercel.app/TaskCurrent/");
      dispatch(SetTaskList(resp.data))
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

  return (
    <div className="currentTimerList-container">
      {
        dbTasks.map((task) => {
          const { id, task_title, focus_amount, is_checked, focus_finished } = task
          if (id !== currentTimerId) {
            if (!is_checked) {
              return (
                <div key={`${id}`} className="listTask-timer">
                  <div className="listTask-title">
                    <label className="list-text">
                      <input
                        id={id}
                        name="is_checked"
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
      {
        dbTasks.map((task) => {
          const { id, task_title, focus_amount, is_checked, focus_finished } = task
          if (id !== currentTimerId) {
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