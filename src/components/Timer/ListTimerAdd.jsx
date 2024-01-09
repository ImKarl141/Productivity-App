import { useDispatch, useSelector } from "react-redux"
import { SetTimerListAdd } from "../../features/timerSlice";
import { NumberUpIcon, NumberDownIcon } from "../../icons";
import { useState } from "react";
import axios from "axios";
import { AddNewTask } from "../../features/taskSlice";

const ListTimerAdd = () => {
  const dispatch = useDispatch();
  const { isTimerTaskAdd, dbTimer } = useSelector((store) => store.timer);
  const { dbTasks } = useSelector((store) => store.task);

  const [timerInput, setTimerInput] = useState({
    task_title: '',
    task_desc: '',
    task_date: null,
    task_project: null,
    task_tag: null,
    focus_amount: 1,
    focus_finished: 0,
    is_checked: 0,
  })

  const { task_title, focus_amount } = timerInput;

  const increaseNumber = () => {
    setTimerInput({ ...timerInput, focus_amount: focus_amount + 1 })
  }

  const decreaseNumber = () => {
    if (focus_amount > 1) {
      setTimerInput({ ...timerInput, focus_amount: focus_amount - 1 })
    }
  }

  //Toast message
  const showMessage = (idElement) => {
    const spawnMessage = document.getElementById(idElement);

    spawnMessage.style.display = "flex";

    setTimeout(() => {
      spawnMessage.style.display = "none";
    }, 3000)
  }



  const handleTimerSubmit = async (e) => {
    if (!task_title) {
      showMessage("emptyTitle")
      return
    }
    try {
      await axios.post("https://todo-api-teal.vercel.app/TaskCurrent", timerInput);

      const nextId = dbTasks.length >= 1 ? dbTasks[dbTasks.length - 1].id : dbTimer.task_id;
      dispatch(AddNewTask({ ...timerInput, id: nextId + 1 }))

      setTimerInput({
        task_title: '',
        task_desc: '',
        task_date: null,
        task_project: null,
        task_tag: null,
        focus_amount: 1,
        focus_finished: 0,
        is_checked: 0,
      })
      showMessage("taskSubmitted")
    } catch (err) {
      console.log(err);
    }
  }

  const handleChangeInput = (e) => {
    setTimerInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleChangeNumber = (e) => {
    if (e.target.value) {
      setTimerInput((prev) => ({ ...prev, [e.target.name]: parseInt(e.target.value) }))
    } else {
      setTimerInput((prev) => ({ ...prev, [e.target.name]: 1 }))
    }
  }

  return (
    <div className="taskTimerAdd-container">
      {
        !isTimerTaskAdd && (
          <div className="add-task-timer" onClick={() => dispatch(SetTimerListAdd())}>
            <span className="add-timerText">Add Task</span>
          </div>
        )
      }
      {
        isTimerTaskAdd && (
          <div className="taskTimer-details-container">
            <form
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTimerSubmit();
                }
              }}
              className="taskTimer-form"
              onSubmit={handleTimerSubmit}
            >
              <div className="taskTimer-details">
                <input
                  name="task_title"
                  className={task_title.length >= 45 ? 'taskTimer-title errorTitle' : 'taskTimer-title'}
                  maxLength={45}
                  type="text"
                  value={task_title}
                  placeholder="Task title"
                  onChange={handleChangeInput}
                />
                <div className="details-pomodoro">
                  <span>Estimated Pomodoros</span>
                  <div className="details-number">
                    <input
                      name="focus_amount"
                      className="taskTimer-number"
                      type="number"
                      min={0}
                      step={1}
                      value={focus_amount}
                      onChange={handleChangeNumber}
                    />
                    <div className="details-numberUpDown">
                      <button
                        type="button"
                        onClick={() => increaseNumber()}
                      >
                        <NumberUpIcon />
                      </button>
                      <button
                        type="button"
                        onClick={() => decreaseNumber()}
                      >
                        <NumberDownIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="taskTimer-btn">
              <button className="taskTimerDetails-btn">
              </button>
              <div className="taskTimerAddCancel-btn">
                <button className="taskTimerCancel-btn" onClick={() => dispatch(SetTimerListAdd())}>Cancel</button>
                <button className="taskTimerAdd-btn" onClick={handleTimerSubmit}>Save</button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
export default ListTimerAdd