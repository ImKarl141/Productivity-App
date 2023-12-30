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


  const { task_id } = dbTimer

  const [number, myNumber] = useState(changeNumber)

  const dispatch = useDispatch()
  const finishTimer = new Audio(FinishTimer);

  const handleTaskPomo = async () => {
    const focus_finished = dbTasks.find(task => task.id === task_id).focus_finished
    try {
      await axios.patch("http://localhost:8800/TaskCurrent/AddPomo/" + task_id, { focus_finished: focus_finished + 1 })
      const newTask = dbTasks.map((task) => {
        if (task.id === task_id) {
          return { ...task, focus_finished: focus_finished + 1 }
        }
        return { ...task }
      })
      dispatch(SetTaskList(newTask))
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
    <div className={!isTimerSettings ? 'countDownTest' : 'test-text'} >
      <div className='countDownTest-numbers'>
        <span>{minutes}</span>:<span>{(seconds < 9) ? `0${seconds}` : seconds}</span>
      </div>
      <div className='countDownTest-buttons'>
        {/* <button onClick={start}>
          Start
          <PlayPauseFullIcon />
        </button> */}
        <button onClick={pause}>
          Pause
        </button>
        <button onClick={resume}>
          Resume
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