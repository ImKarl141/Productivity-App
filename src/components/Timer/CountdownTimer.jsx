import { useTimer } from 'react-timer-hook';
import { TimerSettings, PlayPauseFullIcon, ResetTimer, SkipFullIcon, PauseTimerIcon, ResumeTimerIcon } from "../../icons"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FinishTimer from '../../assets/clockDigital_Alarm.mp3'
import { SetPaused, SetFinish } from '../../features/timerSlice';
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

  // const handleTaskPomo = async () => {
  //   const focus_finished = dbTasks.find(task => task.id === task_id).focus_finished
  //   const userId = 1
  //   const newCount = dbTimer.PomoCount + 1;
  //   // console.log(newCount);
  //   try {
  //     await axios.patch("https://productivity-app-api-production.up.railway.app/TaskCurrent/AddPomo/" + task_id, { focus_finished: focus_finished + 1 })
  //     await axios.patch("https://productivity-app-api-production.up.railway.app/UserSettings/PomoCount/" + userId, { PomoCount: newCount })
  //     const newTask = dbTasks.map((task) => {
  //       if (task.id === task_id) {
  //         return { ...task, focus_finished: focus_finished + 1 }
  //       }
  //       return { ...task }
  //     })
  //     dispatch(SetTaskList(newTask))
  //     // dispatch(SetTimerSettings({ ...dbTimer, PomoCount: newCount }))
  //     // console.log(newTask);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }


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
      finishTimer.play();

      // dispatch(SetFinish(false));
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
      <div className={(Task || Notes) ? 'countDownMini-numbers' : 'countDownFull-numbers'}>
        <span className='countDown-minutes'>{(minutes <= 9) ? `0${minutes}` : minutes}</span>
        <span className='countDown-separator'>:</span>
        <span className='countDown-seconds'>{(seconds <= 9) ? `0${seconds}` : seconds}</span>
      </div>
      <div className={(Task || Notes) ? 'countDownMini-buttons' : 'countDownFull-buttons'}>
        {/* {
          !isPlaying &&
          <div style={{ color: "black" }}>Timer start</div>
        } */}
        {/* <button onClick={start}>
          Start
          <PlayPauseFullIcon />
        </button> */}
        <button className={(Task || Notes) ? 'hide-element' : 'fullTimer-btn'} onClick={resume} title='timer-resume'>
          <ResumeTimerIcon />
        </button>
        <button className={(Task || Notes) ? 'hide-element' : 'fullTimer-btn'} onClick={pause} title='timer-pause'>
          <PauseTimerIcon />
        </button>
        {
          (Task || Notes) &&
          <>
            <button className='start-buttons-mini' style={{ color: "black" }} onClick={pause} title='timer-pause'>
              Pause
              {/* <PauseTimerIcon /> */}
            </button>
            <button className='start-buttons-mini' style={{ color: "black" }} onClick={resume} title='timer-resume'>
              Resume
              {/* <ResumeTimerIcon /> */}
            </button>
          </>
        }

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