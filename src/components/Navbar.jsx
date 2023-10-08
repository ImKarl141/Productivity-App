import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MenuIcon, OptionsIcon, PlayPauseIcon, StopIcon, TaskIcon, CalendarIcon, NotesIcon, UserIcon, LoginIcon, LogoutIcon } from '../icons';

import './Navbar.css'
import './Task.css'


// import homeMenu from '../images/bars-icon.svg'
import taskMenu from '../images/task-icon.svg'
import calendarMenu from '../images/calendar-icon.svg'
import notesMenu from '../images/notes-icon.svg'
import tagMenu from '../images/tag01-icon.svg'

import timerMini from '../images/timer-stage2-icon.svg'
// import playIcon from '../images/play-icon.svg'
// import pauseIcon from '../images/pause-icon.svg'
// import stopIcon from '../images/stop-icon.svg'

// import optionsMenu from '../images/options-icon.svg'
import userMenu from '../images/user-icon.svg'
import loginMenu from '../images/login-icon.svg'

import footerMenu from '../images/footer-icon.svg'

//menu dispatch
import { showCalendar, showTask, showMenuOptions, showNotes } from '../features/menuSlice';


//option dispatch
import { showOption, showSettings, showUser } from '../features/optionSlice';

const Navbar = () => {
  const [isTask, setIsTask] = useState(false)

  //menu store & destructuring
  const { menuToggle } = useSelector((store) => store.menu);
  const { Menu, Task, Calendar, Notes } = menuToggle;

  //taskItems and destructuring
  const { taskItems } = useSelector((store) => store.task);
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
              <button className={`icon-button ${Calendar ? 'button-clicked' : ''} `} onClick={() => dispatch(showCalendar())}>
                <CalendarIcon />
                {/* <img className='logo' src={calendarMenu} alt="Calendar icon" /> */}
                <p className='icon-text'>Calendar</p>
              </button>
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
        <div className="pomodoro-minibar">
          <div className='timer-stage2-clock'>
            <img className='timer-icon2' src={timerMini} alt="Timer mini icon" />
          </div>
          <div className='timer-stage2-clock'>
            <button className='play-buttons'>
              <PlayPauseIcon />
            </button>
            <button className='play-buttons'>
              <StopIcon />
              {/* <img className='play-option' src={stopIcon} alt="stop" /> */}
            </button>
          </div>
        </div>
        <div className="option-bar">
          <button className='icon-button' onClick={() => dispatch(showOption())}>
            {/* <img className='logo' src={optionsMenu} alt="my icon" /> */}
            <OptionsIcon />
          </button>
          {Options && (
            <>
              <button className={`icon-button ${Settings ? 'button-clicked' : ''} `} onClick={() => dispatch(showSettings())}>
                <UserIcon />
                {/* <img className='logo' src={userMenu} alt="my icon" /> */}
                <p className='icon-text'>User Settings</p>
              </button>
              <button className={`icon-button ${logInOut ? 'button-clicked' : ''} `} onClick={() => dispatch(showUser())}>
                <LoginIcon />
                {/* <img className='logo' src={loginMenu} alt="my icon" /> */}
                {/* <p className='icon-text'>Calendar</p> */}
              </button>
            </>
          )}
        </div>
      </nav >


      {Task && (
        <section className='task-container'>
          <div className='task-overall'>
            <div className='overall-title'>
              <div className=' task-title box1'><h1>Tasks</h1></div>
              <div className=' task-quantity box2'><p>4</p></div>
            </div>
            <div className='overall-myTask'>
              <div className='myTask-container box1'>
                <button>Logo</button>
                <p>All tasks</p>
                <button>Quantity</button>
              </div>
              <div className='myTask-container box2'>
                <button>Logo</button>
                <p>Current</p>
                <button>Quantity</button>
              </div>
              <div className='myTask-container box1'>
                <button>Logo</button>
                <p>Completed</p>
                <button>Quantity</button>
              </div>
            </div>
            <div className='overall-list'>List projects</div>
            <div className='overall-tags'>Tags</div>
          </div>
          <div className='task-focus'>center</div>
          {isTask && (
            <div className='task-details'>right</div>
          )}
          {/* <button className='task-test btn' onClick={() => setIsTask(!isTask)}>Toggle test</button> */}
        </section>
      )
      }
      <footer>
        <button className='footer'>
          <img className='logo-footer' src={footerMenu} alt="footer icon" />
        </button>
      </footer>
    </>
  )

};
export default Navbar
