import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MenuIcon, OptionsIcon, PlayPauseIcon, StopIcon, TaskIcon, CalendarIcon, NotesIcon, UserIcon, LoginIcon, LogoutIcon, FooterIcon } from '../icons';
import TaskMenu from './Task';
import CalendarMenu from './Calendar'
import NotesMenu from './Notes'
import { showOption, showSettings, showUser } from '../features/optionSlice';
import MiniBarTimer from './MiniBarTimer';
import Timer from './Timer';
import './Navbar.css'
import './Timer.css'
import { showCalendar, showTask, showMenuOptions, showNotes } from '../features/menuSlice';
import timerMini from '../images/timer-stage2-icon.svg'

// import playIcon from '../images/play-icon.svg'
// import pauseIcon from '../images/pause-icon.svg'
// import stopIcon from '../images/stop-icon.svg'

//menu dispatch


//option dispatch

const Navbar = () => {
  const [isTask, setIsTask] = useState(false)

  //menu store & destructuring
  const { menuToggle } = useSelector((store) => store.menu);
  const { Menu, Task, Calendar, Notes } = menuToggle;

  //taskItems and destructuring
  // const { taskItems } = useSelector((store) => store.task);


  const dispatch = useDispatch();


  // options store and destructuring
  const { optionToggle } = useSelector((store) => store.option)
  const { Options, Settings, logInOut } = optionToggle;

  // console.log(dispatch(showTask));

  return (
    <>
      <nav className='navbar-main'>
        <div className="menu-bar">
          <button className='main-menu icon-button' onClick={() => dispatch(showMenuOptions())}>
            {/* <img className='logo' src={homeMenu} alt="my icon" /> */}
            <MenuIcon />
          </button>
          {Menu && (
            <>
              <button className={`icon-button ${Task ? 'button-clicked' : ''} `} onClick={() => dispatch(showTask())}>
                {/* <img className='logo' src={taskMenu} alt="Task icon" /> */}
                <TaskIcon />
                <p className='icon-text'>Task</p>
              </button>
              {/* <button className={`icon-button ${Calendar ? 'button-clicked' : ''} `} onClick={() => dispatch(showCalendar())}>
                <CalendarIcon />
                <p className='icon-text'>Calendar</p>
              </button> */}
              <button className={`icon-button ${Notes ? 'button-clicked' : ''} `} onClick={() => dispatch(showNotes())}>
                <NotesIcon />
                {/* <img className='logo' src={notesMenu} alt="Notes icon" /> */}
                <p className='icon-text'>Notes</p>
              </button>
              {/* <button className={`icon-button ${toggleTag ? 'button-clicked' : ''} `} onClick={() => TagButton()}>
                <img className='logo' src={tagMenu} alt="Tag icon" />
                <p className='icon-text'>Tag</p>
              </button> */}
            </>
          )}
        </div>
        {/*Minibar display */}
        {/* {
          Task && (
            <MiniBarTimer />
          )
        } */}
        {/*Minibar timer when a Windows is displayed otherwise display timer in full size*/}
        {
          (Task || Calendar || Notes) ? <MiniBarTimer /> : <Timer />
        }

        {/* <div className="pomodoro-minibar">
          <div className='timer-stage2-clock'>
            <img className='timer-icon2' src={timerMini} alt="Timer mini icon" />
          </div>
          <div className='timer-stage2-clock'>
            <button className='play-buttons'>
              <PlayPauseIcon />
            </button>
            <button className='play-buttons'>
              <StopIcon />
            </button>
          </div>
        </div> */}
        <div className="option-bar">
          <button className='icon-button' onClick={() => dispatch(showOption())}>
            <OptionsIcon />
          </button>
          {Options && (
            <>
              <button className={`icon-button ${Settings ? 'button-clicked' : ''} `} onClick={() => dispatch(showSettings())}>
                <UserIcon />
                <p className='icon-text'>User Settings</p>
              </button>
              <button className={`icon-button ${logInOut ? 'button-clicked' : ''} `} onClick={() => dispatch(showUser())}>
                <LoginIcon />
              </button>
            </>
          )}
        </div>
      </nav >
      {Task && (
        <TaskMenu />
      )}
      {Calendar && (
        <CalendarMenu />
      )}
      {Notes && (
        <NotesMenu />
      )}
    </>
  )

};
export default Navbar
