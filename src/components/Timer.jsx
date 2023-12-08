import { useEffect, useState } from "react"
import { PlayPauseIcon, StopIcon, ResetTimer } from "../icons"
import timerMini from '../images/timer-stage2-icon.svg'

const PomodoroTimer = () => {

  // const [isPlaying, setIsPlaying] = useState(true)
  const [defaultValues, setDefaultValues] = useState({
    hours: '00',
    minutes: '00',
    seconds: 3,
    isPlaying: false,
  });


  const [timer, setTimer] = useState({
    hours: '00',
    minutes: '00',
    seconds: 3,
    isPlaying: false,
  });

  const { hours, minutes, seconds, isPlaying } = timer;
  const [isFinish, setIsFinish] = useState(false)

  useEffect(() => {
    if (seconds >= 1) {
      const myInterval = setInterval(() => {
        updateTime();
      }, 1000);
      return () => clearInterval(myInterval);
    }
    console.log("Timer finished");
    console.log(timer);
    setIsFinish(true);
  }, [timer])

  const updateTime = () => {
    if (isPlaying) {
      const newValue = { ...timer, seconds: timer.seconds - 1 }
      setTimer(newValue)
      console.log(timer);
    } else {
      return;
    }
  }

  //Play & Stop functions
  const playTimer = () => {
    const newValue = { ...timer, isPlaying: !isPlaying }
    setTimer(newValue)
  }

  const stopTimer = () => {
    const newValue = { ...timer, seconds: 0, isPlaying: false }
    setTimer(newValue)
    console.log("Timer was stopped");
  }

  const resetTimer = () => {
    // const newValue = { ...timer, seconds: 0, isPlaying: false }
    setTimer(defaultValues)
    setIsFinish(false)
    console.log("Timer was reset");
  }

  //Finish Pomodoro Component
  const FinishTimer = () => {
    return (
      <div>
        <span>Timer finished</span>
        <button onClick={() => setIsFinish(false)}>Close</button>
      </div>
    )
  }

  return (
    <div className="pomodoro-minibar">
      {
        isFinish && <FinishTimer />
      }
      {
        seconds <= 9 ? <span>{`${hours}:${minutes}:0${seconds}`}</span> : <span>{`${hours}:${minutes}:${seconds}`}</span>
      }
      <div className='timer-stage2-clock'>
        <img className='timer-icon2' src={timerMini} alt="Timer mini icon" />
      </div>
      <div className='timer-stage2-clock'>
        <button className='play-buttons' title="Play/Pause" onClick={() => playTimer()}>
          <PlayPauseIcon />
        </button>
        <button className='play-buttons' title="Stop" onClick={() => stopTimer()}>
          <StopIcon />
          {/* <img className='play-option' src={stopIcon} alt="stop" /> */}
        </button>
        <button className="play-buttons" title="reset" onClick={() => resetTimer()}>
          <ResetTimer />
        </button>
      </div>
    </div >
  )
}
export default PomodoroTimer