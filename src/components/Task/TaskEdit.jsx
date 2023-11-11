import '../Task.css'

export const TaskEdit = () => {
  return (
    <div className='task-details'>
      <div className='task-details-task'>
        <h1>Task:</h1>
        <form className='taskForm' onSubmit={handleTaskSubmit}>
          <input
            id='title-task'
            name='taskTitle'
            className='myInput'
            type="text"
            placeholder='Title name'
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <textarea
            id='description'
            name='taskDescription'
            type="text"
            placeholder='Description'
            className='myInput myInput-description'
            value={taskDescription}
            onChange={(e) => {
              setTaskDescription(e.target.value)
            }
            }
          />

          <div className='task-details-info'>
            <p className='details-text'>Due date</p>
            <input
              className='myInput-date'
              type="date"
              name='dueDate'
              onChange={(e) => {
                const [year, month, day] = e.target.value.split('-')
                // console.log(`${day}-${month}-${year}`)
                setTaskDate(`${month}-${day}-${year}`)
                // console.log(e.target.value)
              }}
            />
          </div>
          <div className='task-details-info'>
            <p className='details-text'>List</p>
            <select
              onChange={(e) => {
                const selectedProject = listOfProjects.find((myProject) => myProject.id == e.target.value)
                setTaskProjectName(selectedProject.nameProject)
                setTaskProjectColor(selectedProject.color)
              }
              }
            >
              {listOfProjects.map((listProjects) => {
                const { id, nameProject } = listProjects;
                return (
                  <option key={id} value={id} >{nameProject}</option>
                )
              })}
            </select>
          </div>
          <div className='task-details-info'>
            <p className='details-text'>Tags</p>
            <select
              name='Tags'
              onChange={(e) => {
                setTaskTag(e.target.value)
              }
              }
            >
              {listOfTags.map((listTag) => {
                const { id, nameTag } = listTag;
                return (
                  <option key={id}>{nameTag}</option>
                )
              })}
            </select>
          </div>
        </form>
      </div>
      <div className='task-details-subtask'>
        <h1>Subtask:</h1>
        <button className='add-subtask-btn'>
          <AddTaskIcon />
          <p className='myTask-text'>Add Subtask</p>
        </button>
      </div>
      <div className='task-details-button'>
        <button className='detailsBtn saveBtn' onClick={handleTaskSubmit}>Save Changes</button>
        <button className='detailsBtn' onClick={() => dispatch(ShowTaskEdit())}>Cancel Task</button>
        <button className='detailsBtn deleteBtn' >Delete Task</button>
      </div>
    </div>
  )
}