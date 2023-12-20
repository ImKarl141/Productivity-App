import { useDispatch, useSelector } from "react-redux"
import { SetTimerListEdit } from "../../features/timerSlice";
import { NumberUpIcon, NumberDownIcon, AddSubtaskIcon } from "../../icons";
import { useState } from "react";
import axios from "axios";
import { SetTaskList, DeleteTask } from "../../features/taskSlice";



const ListTimerUpdate = () => {
  const { isTaskUpdate, dbTasks } = useSelector((store) => store.task);
  const { isTimerTaskEdit, isSubtaskTimer, subtasksTest, currentTimerId } = useSelector((store) => store.timer);

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

  const handleTimerSubmit = async (e) => {
    // e.preventDefault();
    if (!task_title) {
      return
    }
    try {
      await axios.patch("http://localhost:8800/TaskCurrent/" + currentTimerId, timerInput);
      const newTask = dbTasks.map((task) => {
        if (task.id == currentTimerId) {
          return { ...task, task_title: task_title, focus_amount: focus_amount, is_checked: is_checked }
        }
        return task
      })
      // window.location.reload();
      dispatch(SetTaskList(newTask))
      dispatch(SetTimerListEdit(''))
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
      // setNumber(parseInt(e.target.value))
    } else {
      setTimerInput((prev) => ({ ...prev, [e.target.name]: 1 }))
    }
  }

  const handleTimerDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/TaskCurrent/" + id);
      const indexTask = dbTasks.findIndex(task => task.id == id);
      dispatch(DeleteTask(indexTask))
      dispatch(SetTimerListEdit(''))
      // window.location.reload();
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
              className="taskTimer-title"
              type="text"
              placeholder="Task title"
              value={task_title}
              onChange={handleChangeInput}
            />
            <div className="details-pomodoro">
              <span>Estimated Pomodoros</span>
              <div className="details-number">
                {/* <span className="taskTimer-number">
                  {focus_amount}
                </span> */}
                {/* <input type="text" value={focus_amount} /> */}
                {/* <textarea name="" id="" cols="2" rows="2" value={focus_amount}></textarea> */}
                {/* <textarea
                  name=""
                  id=""
                  cols="2"
                  rows="2"
                  value={focus_amount}
                  onChange={handleChangeNumber}
                >
                </textarea> */}
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
          {
            (subtasksTest.length > 0) && (
              <div className="subtaskList">
                {
                  subtasksTest.map((subtask) => {
                    const { id, title } = subtask
                    return (
                      <div key={id} className="taskTimer-subtask">
                        <input className="subtask-checkbox" id={id} type="checkbox" />
                        <label
                          className="subtask-title"
                          htmlFor={id}
                          title={title}
                        >
                          {title}
                        </label>
                      </div>
                    )
                  })
                }
              </div>
            )
          }
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