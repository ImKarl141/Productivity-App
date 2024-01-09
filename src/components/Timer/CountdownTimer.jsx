import { useTimer } from 'react-timer-hook';
import { PauseTimerIcon, ResumeTimerIcon } from "../../icons"
import { useSelector } from 'react-redux';
import FinishTimer from '../../assets/clockDigital_Alarm.mp3'



function CountdownTimer({ expiryTimestamp }) {
  const { autoStartRest, currentMessage, } = useSelector((store) => store.timer)
  const { menuToggle } = useSelector((store) => store.menu)
  const { Task, Notes } = menuToggle;

  const finishTimer = new Audio(FinishTimer);

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
      finishTimer.play();
      alert(currentMessage)
    }, autoStart: autoStartRest ? true : false,
  });

  return (
    <div className={(Task || Notes) ? 'countDownContainer-mini' : 'countDownContainer-full'} >
      <div className={(Task || Notes) ? 'countDownMini-numbers' : 'countDownFull-numbers'}>
        <span className='countDown-minutes'>{(minutes <= 9) ? `0${minutes}` : minutes}</span>
        <span className='countDown-separator'>:</span>
        <span className='countDown-seconds'>{(seconds <= 9) ? `0${seconds}` : seconds}</span>
      </div>
      <div className={(Task || Notes) ? 'countDownMini-buttons' : 'countDownFull-buttons'}>
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
            </button>
            <button className='start-buttons-mini' style={{ color: "black" }} onClick={resume} title='timer-resume'>
              Resume
            </button>
          </>
        }

      </div>
    </div>
  );
}

export default CountdownTimer