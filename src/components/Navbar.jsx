import { useState } from 'react'

import './Navbar.css'
import './Task.css'


import homeMenu from '../images/bars-icon.svg'
import taskMenu from '../images/task-icon.svg'
import calendarMenu from '../images/calendar-icon.svg'
import notesMenu from '../images/notes-icon.svg'
import tagMenu from '../images/tag01-icon.svg'

import timerMini from '../images/timer-stage2-icon.svg'
import playIcon from '../images/play-icon.svg'
import pauseIcon from '../images/pause-icon.svg'
import stopIcon from '../images/stop-icon.svg'

import optionsMenu from '../images/options-icon.svg'
import userMenu from '../images/user-icon.svg'
import loginMenu from '../images/login-icon.svg'

import footerMenu from '../images/footer-icon.svg'



const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [toggleTask, setToggleTask] = useState(false)
  const [toggleCalendar, setToggleCalendar] = useState(false)
  const [toggleNotes, setToggleNotes] = useState(false)
  const [toggleTag, setToggleTag] = useState(false)


  const [toggleOption, setToggleOption] = useState(false)
  const [toggleSettings, setToggleSettings] = useState(false)
  const [toggleUSer, setToggleUSer] = useState(false)



  const MenuButton = () => {
    setToggleMenu(!toggleMenu);
    setToggleTask(false);
    setToggleCalendar(false);;
    setToggleNotes(false);;
    setToggleTag(false);;
  };

  const TaskButton = () => {
    setToggleTask(!toggleTask);
    setToggleCalendar(false);;
    setToggleNotes(false);;
    setToggleTag(false);;
  };

  const CalendarButton = () => {
    setToggleTask(false);
    setToggleCalendar(!toggleCalendar);;
    setToggleNotes(false);;
    setToggleTag(false);;
  };

  const NotesButton = () => {
    setToggleTask(false);
    setToggleCalendar(false);;
    setToggleNotes(!toggleNotes);;
    setToggleTag(false);;
  };

  const TagButton = () => {
    setToggleTask(false);
    setToggleCalendar(false);
    setToggleNotes(false);
    setToggleTag(!toggleTag);
  };


  const OptionButton = () => {
    setToggleOption(!toggleOption);
    setToggleSettings(false);
    setToggleUSer(false);
  };

  const SettingsButton = () => {
    setToggleSettings(!toggleSettings);
    setToggleUSer(false);
  };

  const UserButton = () => {
    setToggleSettings(false);
    setToggleUSer(!toggleUSer);
  };




  // const icons = require.context('../images', true, /\.(png|svg)$/)
  // const myImage = '../images/user-icons.svg'
  return (
    <>
      <nav className='navbar-main'>
        <div className="menu-bar">
          <button className='main-menu icon-button' onClick={() => MenuButton()}>
            <img className='logo' src={homeMenu} alt="my icon" />
          </button>
          {toggleMenu && (
            <>
              <button className={`icon-button ${toggleTask ? 'button-clicked' : ''} `} onClick={() => TaskButton()}>
                <img className='logo' src={taskMenu} alt="Task icon" />
                <p className='icon-text'>Task</p>
              </button>
              <button className={`icon-button ${toggleCalendar ? 'button-clicked' : ''} `} onClick={() => CalendarButton()}>
                <img className='logo' src={calendarMenu} alt="Calendar icon" />
                <p className='icon-text'>Calendar</p>
              </button>
              <button className={`icon-button ${toggleNotes ? 'button-clicked' : ''} `} onClick={() => NotesButton()}>
                <img className='logo' src={notesMenu} alt="Notes icon" />
                <p className='icon-text'>Notes</p>
              </button>
              <button className={`icon-button ${toggleTag ? 'button-clicked' : ''} `} onClick={() => TagButton()}>
                <img className='logo' src={tagMenu} alt="Tag icon" />
                <p className='icon-text'>Tag</p>
              </button>
            </>
          )}
        </div>
        <div className="pomodoro-minibar">
          <div className='timer-stage2-clock'>
            <img className='timer-icon2' src={timerMini} alt="Timer mini icon" />
          </div>
          <div className='timer-stage2-clock'>
            <button className='play-buttons'>
              <img className='play-option' src={playIcon} alt="play" />
              <img className='play-option' src={pauseIcon} alt="pause" />
            </button>
            <button className='play-buttons'>
              <img className='play-option' src={stopIcon} alt="stop" />
            </button>
          </div>
        </div>
        <div className="option-bar">
          <button className='icon-button' onClick={() => OptionButton()}>
            <img className='logo' src={optionsMenu} alt="my icon" />
          </button>
          {toggleOption && (
            <>
              <button className={`icon-button ${toggleSettings ? 'button-clicked' : ''} `} onClick={() => SettingsButton()}>
                <img className='logo' src={userMenu} alt="my icon" />
                <p className='icon-text'>User Settings</p>
              </button>
              <button className={`icon-button ${toggleUSer ? 'button-clicked' : ''} `} onClick={() => UserButton()}>
                <img className='logo' src={loginMenu} alt="my icon" />
                {/* <p className='icon-text'>Calendar</p> */}
              </button>
            </>
          )}
        </div>
      </nav >
      {toggleTask && (
        <section className='task-background'>
          <div className='task-container-left'>
            <div className='task-element'>
            </div>
            <div className='task-element'>
            </div>
            <div className='task-element'>
            </div>
            <div className='task-element'>
            </div>
          </div>
          <div className='task-container-center'>
            Center
          </div>
          <div className='task-container-right'>
            Right
          </div>
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
