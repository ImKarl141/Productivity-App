import { useDispatch, useSelector } from "react-redux"
import { SetTimerListEdit, SetTimerSettings } from "../../features/timerSlice";
import { NumberUpIcon, NumberDownIcon } from "../../icons";
import { useState } from "react";
import axios from "axios";
import { SetTaskList, DeleteTask, } from "../../features/taskSlice";



const ListTimerUpdate = () => {
  const { dbTasks } = useSelector((store) => store.task);
  const { currentTimerId, dbTimer } = useSelector((store) => store.timer);

  const [timerInput, setTimerInput] = useState({
    task_title: currentTimerId ? dbTasks.find(task => task.id === currentTimerId).task_title : '',
    focus_amount: currentTimerId ? dbTasks.find(task => task.id === currentTimerId).focus_amount : null,
    is_checked: currentTimerId ? dbTasks.find(task => task.id === currentTimerId).is_checked : false,
  })

  const { task_title, focus_amount, is_checked } = timerInput;

  const dispatch = useDispatch();

  const showMessage = (idElement) => {
    const spawnMessage = document.getElementById(idElement);

    spawnMessage.style.display = "flex";

    setTimeout(() => {
      spawnMessage.style.display = "none";
    }, 3000)
  }

  const handleTimerSubmit = async (e) => {
    // e.preventDefault();
    if (!task_title) {
      showMessage("emptyTitle")
      return
    }
    try {
      await axios.patch("https://todo-api-teal.vercel.app/TaskCurrent/" + currentTimerId, timerInput);
      const newTask = dbTasks.map((task) => {
        if (task.id == currentTimerId) {
          dispatch(SetTimerSettings({ ...dbTimer, current_task: task_title }))
          return { ...task, task_title: task_title, focus_amount: focus_amount, is_checked: is_checked }
        }
        return task
      })
      dispatch(SetTaskList(newTask))
      dispatch(SetTimerListEdit(''))
      showMessage("taskUpdated")
    } catch (err) {
      console.log(err);
    }
  }

  const increaseNumber = () => {
    setTimerInput({ ...timerInput, focus_amount: focus_amount + 1 })
  }

  const decreaseNumber = () => {
    if (focus_amount > 1) {
      setTimerInput({ ...timerInput, focus_amount: focus_amount - 1 })
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

  const handleTimerDelete = async (id) => {
    const settingsId = 1
    const userId = 1
    try {
      await axios.delete("https://todo-api-teal.vercel.app/TaskCurrent/" + id);
      if (dbTasks.length <= 1) {
        await axios.patch("https://todo-api-teal.vercel.app/UserSettings/PomoCount/" + userId, { PomoCount: 0 })
        dispatch(SetTimerSettings({ ...dbTimer, current_task: '', task_id: 0, PomoCount: 0 }))
      }

      if (dbTasks.length <= 1) {
        await axios.patch("https://todo-api-teal.vercel.app/UserSettings/ClearCurrentTask/" + settingsId, { current_task: null, task_id: id })
        dispatch(SetTimerSettings({ ...dbTimer, current_task: '', task_id: id }))
      } else {
        await axios.patch("https://todo-api-teal.vercel.app/UserSettings/ClearCurrentTask/" + settingsId, { current_task: null, task_id: null })
        dispatch(SetTimerSettings({ ...dbTimer, current_task: '', task_id: '' }))
      }
      const indexTask = dbTasks.findIndex(task => task.id == id);
      dispatch(DeleteTask(indexTask))
      dispatch(SetTimerListEdit(''))
      showMessage("taskDeleted")
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="taskTimerAdd-container">
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
              placeholder="Task title"
              value={task_title}
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
                    onClick={() => increaseNumber()}>
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
          <button className="taskTimerDetails-btn" onClick={() => handleTimerDelete(currentTimerId)}>
            Delete
          </button>
          <div className="taskTimerAddCancel-btn">
            <button className="taskTimerCancel-btn" onClick={() => dispatch(SetTimerListEdit(''))}>Cancel</button>
            <button type="submit" className="taskTimerAdd-btn" onClick={handleTimerSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div >
  )
}
export default ListTimerUpdate