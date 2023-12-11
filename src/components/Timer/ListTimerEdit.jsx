import { useDispatch, useSelector } from "react-redux"
import { SetTimerListAdd } from "../../features/timerSlice";
import { NumberUpIcon, NumberDownIcon } from "../../icons";



const ListTimerEdit = () => {
  const dispatch = useDispatch();
  const { isTimerTaskAdd } = useSelector((store) => store.timer);

  const handleTaskSubmit = (e) => {
    e.preventDefault();
  }


  return (
    <div>
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
                  <span>Pomodoros</span>
                  <div className="details-number">
                    <span>1/2</span>
                    <div className="details-numberUpDown">
                      <NumberUpIcon />
                      <NumberDownIcon />
                    </div>
                  </div>
                </div>
              </div>
              <div className="taskTimer-subtask">
                <span>Subtasks</span>
              </div>
            </form>
            <div className="taskTimer-btn">
              <button onClick={() => dispatch(SetTimerListAdd())}>Cancel</button>
              <button>Save</button>
            </div>
          </div>
        )
      }

    </div>
  )
}
export default ListTimerEdit