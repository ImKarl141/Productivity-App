import { useDispatch, useSelector } from "react-redux";
import { EnterTaskIcon, CalendarIconTask } from '../../icons';
import { SetTaskList, ShowTaskUpdate, SetCurrentEditId } from "../../features/taskSlice";
import axios from "axios";


const RegularTaskItem = (props) => {
  const dispatch = useDispatch();
  const { isTaskUpdate } = useSelector((store) => store.task);

  const handle = (e) => {
    const myArray = e.target.value.split("+");

    if (myArray[2] === "0") {
      myArray[2] = true
    } else {
      myArray[2] = false
    }
    handleCheckedSubmit(myArray[0], myArray[1], myArray[2], e.target.id)
  }

  const handleCheckedSubmit = async (title, focus, check, myId) => {
    try {
      await axios.patch("https://todo-api-teal.vercel.app/TaskCurrent/" + myId, { task_title: title, focus_amount: focus, is_checked: check });

      const resp = await axios.get("https://todo-api-teal.vercel.app/TaskCurrent/");
      dispatch(SetTaskList(resp.data))
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <li >
      <div className='task-item-overall-container'>
        <div className='task-item-container'>
          <input
            name="is_checked"
            id={props.id}
            value={`${props.task_title}+${props.focus_amount}+${props.is_checked}`}
            className='default-checkbox checkbox-test'
            type="checkbox"
            onChange={handle}
          />
          <span className='checkmark'></span>
          <div className='task-item-text'>
            <span className="task-item-title">{props.task_title}:</span>
            <span className='task-item-description'>{props.task_desc}</span>
          </div>
          {
            (props.task_date || props.project_name || props.tag_name) && (
              <div className='task-item-details'>
                {
                  props.task_date && (
                    <>
                      <span title='Due date' className="due-date"><CalendarIconTask /></span>
                      <span title='Due date' className='next-item-date'>{props.task_date}</span>
                    </>
                  )
                }
                {
                  props.project_name && (
                    <span className='next-item' title='Project'>
                      <span className='project-color-task' style={{ backgroundColor: `${props.project_color}` }}></span>
                      <span className="next-item-project">{props.project_name}</span>
                    </span>
                  )
                }
                {
                  props.tag_name && (
                    <span className="next-item-tag" title='Tag'>{props.tag_name}</span>
                  )
                }
              </div>
            )
          }
        </div>
        {
          !isTaskUpdate && (
            <button className='task-item-btn'
              onClick={() => {
                dispatch(ShowTaskUpdate());
                dispatch(SetCurrentEditId(props.id))
              }}
            >
              <EnterTaskIcon />
            </button>
          )
        }
      </div>
    </li>
  )
}
export default RegularTaskItem