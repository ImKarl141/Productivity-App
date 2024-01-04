import { CheckedIcon } from "../icons"

const ToastMessage = () => {
  return (
    <div className="spawned-message">
      {/* Messages */}

      {/* Project*/}
      <div id="projectSubmitted" className="spawned-message project-created">
        <CheckedIcon />
        <span>Project created!</span>
      </div>
      <div id="projectUpdated" className="spawned-message project-updated">
        <CheckedIcon />
        <span>Project updated</span>
      </div>
      <div id="emptyTitleProject" className="spawned-message missing-title">
        <CheckedIcon />
        <span>Missing Project title!</span>
      </div>
      <div id="projectDeleted" className="spawned-message project-deleted">
        <CheckedIcon />
        <span>Project deleted!</span>
      </div>

      {/* Tag */}
      <div id="tagSubmitted" className="spawned-message tag-created">
        <CheckedIcon />
        <span>Tag created!</span>
      </div>
      <div id="tagUpdated" className="spawned-message tag-updated">
        <CheckedIcon />
        <span>Tag updated</span>
      </div>
      <div id="emptyTitleTag" className="spawned-message missing-title">
        <CheckedIcon />
        <span>Missing Tag title!</span>
      </div>
      <div id="tagDeleted" className="spawned-message tag-deleted">
        <CheckedIcon />
        <span>Tag deleted!</span>
      </div>

      {/* Task and Timer */}
      <div id="taskSubmitted" className="spawned-message task-created">
        <CheckedIcon />
        <span>Task created!</span>
      </div>
      <div id="emptyTitle" className="spawned-message missing-title">
        <CheckedIcon />
        <span>Missing Task title!</span>
      </div>
      <div id="taskUpdated" className="spawned-message task-updated">
        <CheckedIcon />
        <span>Task updated</span>
      </div>
      <div id="taskDeleted" className="spawned-message task-deleted">
        <CheckedIcon />
        <span>Task deleted!</span>
      </div>

      {/* Submit timer-settings */}
      <div id="settings" className="spawned-message timer-settings">
        <CheckedIcon />
        <span>Timer settings changed!</span>
      </div>

      {/* Delete timer-settings */}
      <div id="task-checkedDeleted" className="spawned-message checked-deleted">
        <CheckedIcon />
        <span>All checked task deleted!</span>
      </div>
      <div id="task-allDeleted" className="spawned-message all-deleted">
        <CheckedIcon />
        <span>All task deleted!</span>
      </div>

      {/* Note*/}
      <div id="noteSubmitted" className="spawned-message note-created">
        <CheckedIcon />
        <span>Note created!</span>
      </div>
      <div id="noteUpdated" className="spawned-message note-updated">
        <CheckedIcon />
        <span>Note updated</span>
      </div>
      <div id="emptyTitleNote" className="spawned-message missing-title">
        <CheckedIcon />
        <span>Missing Note title!</span>
      </div>
      <div id="noteDeleted" className="spawned-message note-deleted">
        <CheckedIcon />
        <span>Note deleted!</span>
      </div>
      <div id="notePinned" className="spawned-message note-pinned">
        <CheckedIcon />
        <span>Note pinned!</span>
      </div>
      <div id="noteUnpinned" className="spawned-message note-pinned">
        <CheckedIcon />
        <span>Note Unpinned!</span>
      </div>

      {/* Messages */}
    </div>
  )
}
export default ToastMessage