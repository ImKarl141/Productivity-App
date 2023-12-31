import { useTimer } from 'react-timer-hook';
import { TimerSettings, PlayPauseFullIcon, ResetTimer, SkipFullIcon } from "../../icons"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FinishTimer from '../../assets/clockDigital_Alarm.mp3'
import { SetPaused } from '../../features/timerSlice';
import axios from 'axios';
import { SetTaskList } from '../../features/taskSlice';


function CountdownTimer({ expiryTimestamp }) {
  const { autoStartRest, changeNumber, isTimerSettings, currentMessage, isPaused, dbTimer } = useSelector((store) => store.timer)
  const { dbTasks } = useSelector((store) => store.task)
  const { menuToggle } = useSelector((store) => store.menu)
  const { Menu, Task, Notes } = menuToggle;


  const { task_id, isPlaying } = dbTimer

  const [number, myNumber] = useState(changeNumber)

  const dispatch = useDispatch()
  const finishTimer = new Audio(FinishTimer);

  const handleTaskPomo = async () => {
    const focus_finished = dbTasks.find(task => task.id === task_id).focus_finished
    const userId = 1
    const newCount = dbTimer.PomoCount + 1;
    // console.log(newCount);
    try {
      await axios.patch("http://localhost:8800/TaskCurrent/AddPomo/" + task_id, { focus_finished: focus_finished + 1 })
      await axios.patch("http://localhost:8800/UserSettings/PomoCount/" + userId, { PomoCount: newCount })
      const newTask = dbTasks.map((task) => {
        if (task.id === task_id) {
          return { ...task, focus_finished: focus_finished + 1 }
        }
        return { ...task }
      })
      dispatch(SetTaskList(newTask))
      dispatch(SetTimerSettings({ ...dbTimer, PomoCount: newCount }))
      // console.log(newTask);
    } catch (err) {
      console.log(err);
    }
  }


  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp, onExpire: () => {
      //Actions to perform when the timer is finished:
      //-Validate current rest(short/long)
      //-Add a amount pomo (Axios)
      //-Add pomo finished to the task (if selected) (Axios)


      // const time = new Date();
      // time.setSeconds(time.getSeconds() + 300);
      // restart(time)
      finishTimer.play();
      handleTaskPomo();
      alert(currentMessage)
    }, autoStart: autoStartRest ? true : false,
  });

  // dispatch(SetMySeconds(seconds))
  // const handlePause = () => {
  //   isPaused ?
  //     pause
  //     :
  //     resume
  //   dispatch(SetPaused())
  // }


  return (
    // <div className={!isTimerSettings ? 'countDownTest' : 'test-text'} >
    <div className={(Task || Notes) ? 'countDownContainer-mini' : 'countDownContainer-full'} >
      <div className='countDownFull-numbers'>
        <span className='countDown-minutes'>{(minutes <= 9) ? `0${minutes}` : minutes}</span>
        <span className='countDown-separator'>:</span>
        <span className='countDown-seconds'>{(seconds <= 9) ? `0${seconds}` : seconds}</span>
      </div>
      <div className={(Task || Notes) ? 'countDownMini-buttons' : 'countDownFull-buttons'}>
        {
          console.log(typeof (pause))
        }
        {/* <button onClick={start}>
          Start
          <PlayPauseFullIcon />
        </button> */}
        <button onClick={pause} title='timer-pause'>
          <PlayPauseFullIcon />
        </button>
        <button onClick={resume} title='timer-resume'>
          <PlayPauseFullIcon />
        </button>
      </div>
      {/* <button onClick={() => {
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + changeNumber);
        restart(time, false)
      }}>Restart</button> */}
    </div>
  );
}

export default CountdownTimer