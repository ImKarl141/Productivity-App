import { useSelector } from "react-redux"
import details from '../../images/kebab.svg'

const ListTimerTask = () => {
  const { isTaskUpdate, dbTasks } = useSelector((store) => store.task);



  return (
    <div className="currentTimerList-container">
      {
        dbTasks.map((task) => {
          const { id, task_title } = task
          return (
            <div key={`${id}`} className="listTask-timer">
              <div className="listTask-title">
                <input id={id} className="default-checkboxList" type="checkbox" />
                <span className="checkmarkList"></span>
                <label htmlFor={id} className="list-text">{task_title}</label>
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