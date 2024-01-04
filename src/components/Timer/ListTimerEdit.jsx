import { useDispatch, useSelector } from "react-redux"
import { SetTimerListEdit, SetTimerSettings } from "../../features/timerSlice";
import { NumberUpIcon, NumberDownIcon, AddSubtaskIcon, CheckedIcon } from "../../icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { SetTaskList, DeleteTask, } from "../../features/taskSlice";



const ListTimerUpdate = () => {
  const { isTaskUpdate, dbTasks } = useSelector((store) => store.task);
  const { isTimerTaskEdit, isSubtaskTimer, subtasksTest, currentTimerId, dbTimer } = useSelector((store) => store.timer);

  const [timerInput, setTimerInput] = useState({
    task_title: currentTimerId ? dbTasks.find(task => task.id === currentTimerId).task_title : '',
    focus_amount: currentTimerId ? dbTasks.find(task => task.id === currentTimerId).focus_amount : null,
    is_checked: currentTimerId ? dbTasks.find(task => task.id === currentTimerId).is_checked : false,
  })

  const { task_title, focus_amount, is_checked } = timerInput;

  // console.log(focus_amount);

  const dispatch = useDispatch();

  const [number, setNumber] = useState(1)
  // console.log(typeof (number));

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
    // const userId = 1;
    try {
      await axios.patch("http://localhost:8800/TaskCurrent/" + currentTimerId, timerInput);
      const newTask = dbTasks.map((task) => { //Modify only the task with the id selected
        if (task.id == currentTimerId) {
          dispatch(SetTimerSettings({ ...dbTimer, current_task: task_title }))
          return { ...task, task_title: task_title, focus_amount: focus_amount, is_checked: is_checked }
        }
        return task
      })
      // window.location.reload();
      dispatch(SetTaskList(newTask))
      dispatch(SetTimerListEdit(''))
      showMessage("taskUpdated")
    } catch (err) {
      console.log(err);
    }
  }

  const increaseNumber = () => {
    // const amount = focus_amount;
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
      await axios.delete("http://localhost:8800/TaskCurrent/" + id);
      // store the last id of the Task inside the UserSettings table in order to use it when the Task list is empty. This is to retain the auto_increment of the primary key inside SQL
      // console.log(dbTasks.length);

      if (dbTasks.length <= 1) {
        await axios.patch("http://localhost:8800/UserSettings/PomoCount/" + userId, { PomoCount: 0 })
        dispatch(SetTimerSettings({ ...dbTimer, current_task: '', task_id: 0, PomoCount: 0 })) //Clear the id in order to reset the id count of the task
        // console.log("Deleted");
      }

      if (dbTasks.length <= 1) {
        await axios.patch("http://localhost:8800/UserSettings/ClearCurrentTask/" + settingsId, { current_task: null, task_id: id })
        //Update UserSettings
        dispatch(SetTimerSettings({ ...dbTimer, current_task: '', task_id: id }))
      } else { //Clear current_task and task_id
        await axios.patch("http://localhost:8800/UserSettings/ClearCurrentTask/" + settingsId, { current_task: null, task_id: null })
        //Update UserSettings
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