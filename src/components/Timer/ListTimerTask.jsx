import { useSelector } from "react-redux"
import details from '../../images/kebab.svg'




const ListTimerTask = () => {
  const { isTaskUpdate, dbTasks } = useSelector((store) => store.task);
  console.log(dbTasks);
  return (
    <div className="currentTimerList-container">
      {
        dbTasks.map((task) => {
          const { id, task_title } = task
          return (
            <div key={id} className="listTask-timer">
              <div className="listTask-title">
                <input className="default-checkboxList" type="checkbox" />
                <span className="checkmarkList"></span>
                <span className="list-text">{task_title}</span>
              </div>
              <div className="listTask-details">
                <span>0/?</span>
                <button className="details-task-btn" >
                  <img className="details-task-img" src={details} alt="" />
                </button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
export default ListTimerTask