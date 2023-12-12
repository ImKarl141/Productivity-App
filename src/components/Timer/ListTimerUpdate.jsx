import { useDispatch, useSelector } from "react-redux"
import { SetTimerListAdd } from "../../features/timerSlice";
import { NumberUpIcon, NumberDownIcon, AddSubtaskIcon } from "../../icons";



const ListTimerEdit = () => {
  const dispatch = useDispatch();
  const { isTimerTaskAdd, isSubtaskTimer } = useSelector((store) => store.timer);

  const handleTaskSubmit = (e) => {
    e.preventDefault();
  }


  return (
    <div>
      {/* {
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
                    <span>1/2</span>
                    <div className="details-numberUpDown">
                      <button>
                        <NumberUpIcon />
                      </button>
                      <button>
                        <NumberDownIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {
                isSubtaskTimer && (
                  <div className="taskTimer-subtask">
                    <input id="title" type="checkbox" value={"Make dinner"} />
                    <label htmlFor="title">Make dinner</label>
                  </div>
                )
              }
            </form>
            <div className="taskTimer-btn">
              <div>
                <button className="taskTimerDetails-btn">
                  Task Details
                </button>
              </div>
              <div className="taskTimerAddCancel-btn">
                <button onClick={() => dispatch(SetTimerListAdd())}>Cancel</button>
                <button>Save</button>
              </div>
            </div>
          </div>
        )
      } */}

    </div>
  )
}
export default ListTimerEdit