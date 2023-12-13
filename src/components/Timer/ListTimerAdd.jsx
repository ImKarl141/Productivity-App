import { useDispatch, useSelector } from "react-redux"
import { SetTimerListAdd } from "../../features/timerSlice";
import { NumberUpIcon, NumberDownIcon, AddSubtaskIcon } from "../../icons";
import { useState } from "react";



const ListTimerAdd = () => {
  const dispatch = useDispatch();
  const { isTimerTaskAdd, isSubtaskTimer, subtasksTest } = useSelector((store) => store.timer);

  const [number, setNumber] = useState(1)
  // console.log(typeof (number));

  const increaseNumber = () => {
    setNumber(number + 1)
  }

  const decreaseNumber = () => {
    if (number > 0) {
      setNumber(number - 1)
    }
  }

  const handleTaskSubmit = (e) => {
    e.preventDefault();
  }

  const handleChangeNumber = (e) => {
    if (e.target.value) {
      setNumber(parseInt(e.target.value))
    } else {
      setNumber(0)
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
            <form className="taskTimer-form" onSubmit={handleTaskSubmit}>
              <div className="taskTimer-details">
                <input className="taskTimer-title" type="text" placeholder="Task title" />
                <div className="details-pomodoro">
                  <span>Estimated Pomodoros</span>
                  <div className="details-number">
                    <input
                      className="taskTimer-number"
                      type="number"
                      min={0}
                      step={1}
                      value={number}
                      onChange={handleChangeNumber}
                    />
                    {/* <span>{number}</span> */}
                    <div className="details-numberUpDown">
                      <button onClick={() => increaseNumber()}>
                        <NumberUpIcon />
                      </button>
                      <button onClick={() => decreaseNumber()}>
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

              {/* <div className="subtaskList">
                {
                  isSubtaskTimer && (
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
                  )
                }
              </div> */}
            </form>
            <div className="taskTimer-btn">
              <button className="taskTimerDetails-btn">
                Task Details
              </button>
              <div className="taskTimerAddCancel-btn">
                <button className="taskTimerCancel-btn" onClick={() => dispatch(SetTimerListAdd())}>Cancel</button>
                <button className="taskTimerAdd-btn">Save</button>
              </div>
            </div>
          </div>
        )
      }

    </div>
  )
}
export default ListTimerAdd