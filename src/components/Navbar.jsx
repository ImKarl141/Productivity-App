import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MenuIcon, OptionsIcon, TaskIcon, NotesIcon, UserIcon, LoginIcon } from '../icons';
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
import ToastMessage from '../features/ToastMessage';

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
        <ToastMessage />
        <section className="menu-bar">
          <button className='main-menu' onClick={() => dispatch(showMenuOptions())}>
            {/* <img className='logo' src={homeMenu} alt="my icon" /> */}
            <MenuIcon />
          </button>
          <div className={`menu-toggle ${Menu ? 'menu-toggle-active' : ''}`}>
            <button className={`icon-button ${Task ? 'button-clicked' : ''} `} onClick={() => dispatch(showTask())}>
              {/* <TaskIcon />
                <p className={`icon-text ${Task ? 'icon-text text-clicked' : ''}`}>Task</p> */}
              <span className='icon-button-text'>
                <TaskIcon />
                <p className={`icon-text ${Task ? 'icon-text text-clicked' : ''}`}>Task</p>
              </span>
            </button>
            <button className={`icon-button ${Notes ? 'button-clicked' : ''} `} onClick={() => dispatch(showNotes())}>
              <span className='icon-button-text'>
                <NotesIcon />
                <p className={`icon-text ${Notes ? 'icon-text text-clicked' : ''}`}>Notes</p>
              </span>
            </button>
            {/* {Menu && (
              <>
                <button className={`icon-button ${Task ? 'button-clicked' : ''} `} onClick={() => dispatch(showTask())}>
                  <span className='icon-button-text'>
                    <TaskIcon />
                    <p className={`icon-text ${Task ? 'icon-text text-clicked' : ''}`}>Task</p>
                  </span>
                </button>
                <button className={`icon-button ${Notes ? 'button-clicked' : ''} `} onClick={() => dispatch(showNotes())}>
                  <span className='icon-button-text'>
                    <NotesIcon />
                    <p className={`icon-text ${Notes ? 'icon-text text-clicked' : ''}`}>Notes</p>
                  </span>
                </button>
              </>
            )} */}
          </div>
        </section>
        {/*Minibar display */}
        {/* {
          Task && (
            <MiniBarTimer />
          )
        } */}
        {/*Minibar timer when a Windows is displayed otherwise display timer in full size*/}
        {/* {
          (Task || Calendar || Notes) ? <MiniBarTimer /> : <Timer />
        } */}
        <Timer />

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
        <section className="option-bar">
          <button className='icon-button' onClick={() => dispatch(showOption())}>
            <OptionsIcon />
          </button>
          {Options && (
            <>
              <button className={`icon-button ${Settings ? 'button-clicked' : ''} `} onClick={() => alert("Coming soon")}>
                <span>
                  <UserIcon />
                  <p className='icon-text'>User Settings</p>
                </span>
              </button>
              <button className={`icon-button ${logInOut ? 'button-clicked' : ''} `} onClick={() => alert("Coming soon")}>
                <LoginIcon />
              </button>
            </>
          )}
        </section>
        {/* <div className=''>

        </div> */}
      </nav >
      <TaskMenu />
      {/* {Task && (
      )} */}
      {/* {Calendar && (
        <CalendarMenu />
      )} */}
      <NotesMenu />
      {/* {Notes && (
      )} */}
    </>
  )

};
export default Navbar
