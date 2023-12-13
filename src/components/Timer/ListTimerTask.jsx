import { useDispatch, useSelector } from "react-redux"
import details from '../../images/kebab.svg'
import { SetCurrentEditTimer } from "../../features/timerSlice";

const ListTimerTask = () => {
  const dispatch = useDispatch();
  const { isTaskUpdate, dbTasks } = useSelector((store) => store.task);
  const { currentTimerId } = useSelector((store) => store.timer)
  // console.log(currentTimerId);

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
            return (
              <div key={`${id}`} className="listTask-timer">
                <div className="listTask-title">
                  <input id={id} className="default-checkboxList" type="checkbox" title="Mark as checked" />
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

          // return (
          //   <div key={`${id}`} className="listTask-timer">
          //     <div className="listTask-title">
          //       <input id={id} className="default-checkboxList" type="checkbox" />
          //       <span className="checkmarkList"></span>
          //       <label htmlFor={id} className="list-text">{task_title}</label>
          //     </div>
          //     <div className="listTask-details">
          //       <span>0/{focus_amount}</span>
          //       <button className="details-task-btn" onClick={() => showId(id)}>
          //         <img className="details-task-img" src={details} alt="" />
          //       </button>
          //     </div>
          //   </div>
          // )
        })
      }
    </div>
  )
}
export default ListTimerTask