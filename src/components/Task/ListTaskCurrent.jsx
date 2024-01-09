import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowTaskEdit } from "../../features/taskSlice";
import { AddTaskIcon } from '../../icons';
import RegularTaskItem from "./RegularTaskItem";
import CheckedTaskItem from "./CheckedTaskItem";

const ListTaskCurrent = () => {

  const { dbTasks, currentView, currentProjectView, currentTagView } = useSelector((store) => store.task);

  const dispatch = useDispatch();

  const partialDate = new Date()
  const currentDate = `${(partialDate.getMonth() + 1).toString().padStart(2, '0')}-${partialDate.getDate().toString().padStart(2, '0')}-${partialDate.getFullYear()}`
  const { all, current, completed } = currentView;

  useEffect(() => { //Filter for project and tag view
    if (currentProjectView || currentTagView) {
      $(`.task-item-overall-container`).show()
      $(`.task-item-overall-container:not(:contains(${currentProjectView}))`).hide()
      $(`.task-item-overall-container:not(:contains(${currentTagView}))`).hide()

    } else (
      $(`.task-item-overall-container`).show()
    )
  }, [currentProjectView, currentView, currentTagView])


  return (
    <section className='task-focus'>
      <div className='task-focus-add' >
        <label className='addBtn add-task-btn' onClick={() => dispatch(ShowTaskEdit())}>
          <AddTaskIcon />
          <p className='myTask-text'>Add Task</p>
        </label>
      </div>
      <ul className='list-tasks'>
        {
          all && (
            <>
              {/*Not checked tasks*/}
              {dbTasks.map((myTask) => {
                const { id, is_checked } = myTask
                if (!is_checked) {
                  return (
                    <RegularTaskItem key={id} {...myTask} />
                  )
                }
              })}
              {/*Checked tasks*/}
              {dbTasks.map((myTask) => {
                const { id, is_checked } = myTask
                // console.log(typeof (task_date));
                if (is_checked) {
                  return (
                    <CheckedTaskItem key={id} {...myTask} />
                  )
                }
              })}
            </>
          )
        }
        {
          current && (
            <>
              {/*Not checked tasks*/}
              {dbTasks.map((myTask) => {
                const { id, task_date, is_checked } = myTask
                if (!is_checked && task_date === currentDate) {
                  return (
                    <RegularTaskItem key={id} {...myTask} />
                  )
                }
              })}
              {/*Checked tasks*/}
              {dbTasks.map((myTask) => {
                const { id, task_date, is_checked } = myTask
                // console.log(typeof (task_date));
                if (is_checked && task_date === currentDate) {
                  return (
                    <CheckedTaskItem key={id} {...myTask} />
                  )
                }
              })}
            </>
          )
        }
        {
          completed && (
            dbTasks.map((myTask) => {
              const { id, is_checked } = myTask
              // console.log(typeof (task_date));
              if (is_checked) {
                return (
                  <CheckedTaskItem key={id} {...myTask} />
                )
              }
            })
          )
        }
      </ul >
    </section >
  )
}
export default ListTaskCurrent