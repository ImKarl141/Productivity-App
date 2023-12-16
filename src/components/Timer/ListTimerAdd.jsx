import { useDispatch, useSelector } from "react-redux"
import { SetTimerListAdd } from "../../features/timerSlice";
import { NumberUpIcon, NumberDownIcon, AddSubtaskIcon } from "../../icons";
import { useState } from "react";
import axios from "axios";



const ListTimerAdd = () => {
  const dispatch = useDispatch();
  const { isTimerTaskAdd, isSubtaskTimer, subtasksTest, currentTimerId } = useSelector((store) => store.timer);

  const [timerInput, setTimerInput] = useState({
    task_title: '',
    task_desc: '',
    task_date: null,
    task_project: null,
    task_tag: null,
    focus_amount: 1,
  })

  const { task_title, focus_amount } = timerInput;

  const increaseNumber = () => {
    // const amount = focus_amount;
    setTimerInput({ ...timerInput, focus_amount: focus_amount + 1 })
  }

  const decreaseNumber = () => {
    if (focus_amount > 1) {
      setTimerInput({ ...timerInput, focus_amount: focus_amount - 1 })
    }
  }

  // const handleTimerSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!task_title) {
  //     return
  //   }
  //   try {
  //     await axios.post("http://localhost:8800/TaskCurrent", timerInput)
  //     window.location.reload();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const handleTimerSubmit = async (e) => {
    // e.preventDefault();
    if (!task_title) {
      return
    }
    try {
      await axios.post("http://localhost:8800/TaskCurrent", timerInput);
      window.location.reload();
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
      // setNumber(parseInt(e.target.value))
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
                  className="taskTimer-title"
                  type="text"
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
                    {/* <span>{number}</span> */}
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
              <button className="taskTimerDetails-btn">
                Task Details
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