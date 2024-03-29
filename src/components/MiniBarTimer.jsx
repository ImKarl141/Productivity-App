import { useEffect, useState } from "react"
import { ResetTimer, PlayPauseMiniIcon, SkipMiniIcon } from "../icons"

const MiniBarTimer = () => {

  const [defaultValues, setDefaultValues] = useState({
    hours: '00',
    minutes: '00',
    seconds: 10,
    isPlaying: false,
  });


  const [timer, setTimer] = useState({
    hours: '00',
    minutes: '00',
    seconds: 10,
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
    setTimer(defaultValues)
    setIsFinish(false)
    console.log("Timer was reset");
  }

  //Finish Pomodoro Component
  const FinishTimer = () => {
    return (
      <div>
        <span>Timer finished</span>
        <button onClick={() => resetTimer()}>Close</button>
      </div>
    )
  }

  return (
    <div className="pomodoro-minibar">
      {
        isFinish && <FinishTimer />
      }
      <div className="timer-container">
        <div className="timer-clock-mini">
          {
            9 >= seconds > 1 ? <span className="timer-text-mini">{`0${seconds}`}</span> :
              <span className="timer-text-mini">{`${seconds}`}</span>
          }
        </div>
      </div>
      <div className='timer-btn-mini'>
        <button className='play-buttons' title="Play/Pause" onClick={() => playTimer()}>
          <PlayPauseMiniIcon />
        </button>
        <button className='play-buttons' title="Stop" onClick={() => stopTimer()}>
          <SkipMiniIcon />
        </button>
        <button className="play-buttons" title="Reset" onClick={() => resetTimer()}>
          <ResetTimer />
        </button>
      </div>
    </div >
  )
}
export default MiniBarTimer