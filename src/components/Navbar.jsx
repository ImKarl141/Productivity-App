import { useDispatch, useSelector } from 'react-redux'
import { MenuIcon, OptionsIcon, TaskIcon, NotesIcon, UserIcon, LoginIcon } from '../icons';
import TaskMenu from './Task';
import NotesMenu from './Notes'
import { showOption } from '../features/optionSlice';
import Timer from './Timer';
import './Navbar.css'
import './Timer.css'
import { showTask, showMenuOptions, showNotes } from '../features/menuSlice';
import ToastMessage from '../features/ToastMessage';


const Navbar = () => {

  const { menuToggle } = useSelector((store) => store.menu);
  const { Menu, Task, Notes } = menuToggle;

  const dispatch = useDispatch();

  const { optionToggle } = useSelector((store) => store.option)
  const { Options, Settings, logInOut } = optionToggle;

  return (
    <>
      <nav className='navbar-main'>
        <ToastMessage />
        <section className="menu-bar">
          <button className='main-menu' onClick={() => dispatch(showMenuOptions())}>
            <MenuIcon />
          </button>
          <div className={`menu-toggle ${Menu ? 'menu-toggle-active' : ''}`}>
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

          </div>
        </section>
        <Timer />
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
      </nav >
      <TaskMenu />
      <NotesMenu />
    </>
  )

};
export default Navbar
