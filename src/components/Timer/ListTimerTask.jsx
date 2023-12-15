import { useDispatch, useSelector } from "react-redux"
import details from '../../images/kebab.svg'
import { SetCurrentEditTimer, SetCheckedTask } from "../../features/timerSlice";

const ListTimerTask = () => {
  const dispatch = useDispatch();
  const { isTaskUpdate, dbTasks } = useSelector((store) => store.task);
  const { currentTimerId, checkedItems } = useSelector((store) => store.timer)
  // console.log(currentTimerId);
  // console.log(checkedItems.includes(20));

  const showId = (id) => {
    console.log(`This is the project with ${id} ID`);
  }


  return (
    <div className="currentTimerList-container">
      {
        dbTasks.map((task) => {
          const { id, task_title, focus_amount } = task
          // console.log(focus_amount);
          if (id !== currentTimerId) {
            if (!(checkedItems.includes(id))) {
              return (
                <div key={`${id}`} className="listTask-timer">
                  <div className="listTask-title">
                    <input id={id}
                      className="default-checkboxList"
                      type="checkbox"
                      title="Mark as checked"
                      onClick={() => dispatch(SetCheckedTask(id))}
                    />
                    <span className="checkmarkList"></span>
                    <label htmlFor={id} className="list-text">{task_title}</label>
                  </div>
                  <div className="listTask-details">
                    <span>0/{focus_amount}</span>
                    <button className="details-task-btn" title="Task settings" onClick={() => dispatch(SetCurrentEditTimer(id))}>
                      <img className="details-task-img" src={details} alt="" />
                    </button>
                  </div>
                </div>
              )
            }
          }
        })
      }
      {/*Display the elements at the end*/}
      {
        dbTasks.map((task) => {
          const { id, task_title, focus_amount } = task
          // console.log(focus_amount);
          if (id !== currentTimerId) {
            if (checkedItems.includes(id)) {
              return (
                <div key={`${id}`} className="listTask-timer">
                  <div className="listTask-title">
                    <input id={id}
                      checked
                      // read
                      className="default-checkboxList"
                      type="checkbox"
                      title="Mark as checked"
                      onChange={() => dispatch(SetCheckedTask(id))}
                    />
                    <span className="checkmarkList"></span>
                    <label htmlFor={id} className="list-text">{task_title}</label>
                  </div>
                  <div className="listTask-details">
                    <span>0/{focus_amount}</span>
                    <button className="details-task-btn" title="Task settings" onClick={() => dispatch(SetCurrentEditTimer(id))}>
                      <img className="details-task-img" src={details} alt="" />
                    </button>
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