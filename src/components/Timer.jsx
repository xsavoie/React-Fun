import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';


export default function Timer(props) {

  const { seconds } = props;

  const [timer, setTimer] = useState("");


  let countdown;

  const timerCountdown = (seconds) => {
    clearInterval(countdown);
    const start = Date.now();
    const end = Math.round(start + seconds * 1000);
    displayTimer(seconds);

    countdown = setInterval(() => {
      const secondsLeft = Math.round((end - Date.now()) / 1000);
      if (secondsLeft < 0) {
        clearInterval(countdown);
        return;
      }
      // console.log(displayTimer(secondsLeft))
      return setTimer(secondsLeft)
    }, 1000);
  }

  const displayTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    // renders minutes + seconds
    const display = `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
    // renders only seconds
    // const display = `${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
  
    return display;
  }

  useEffect(() => {
    timerCountdown(seconds);
  }, [seconds])


  let percentage = (timer / seconds) * 100;

  const colorToDisplay = (percentage) => {
    const color = percentage > 25 ? 'green' : 'red';
    return color;
  }

  return (
    <div style={{ width: 200, height: 200 }}>
      <CircularProgressbar
        value={percentage}
        startValue={100}
        text={`${displayTimer(timer)}`}
        styles={{
          path: {
            // Path color
            stroke: `${colorToDisplay(percentage)}`,
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'butt',
            // Customize transition animation
            transition: 'stroke-dashoffset 1s linear 0s',
          
          },
        }}
        // styles={buildStyles({
        //   strokeLinecap: 'butt', //butt or round
        //   pathTransitionDuration: 0.8,
        //   // pathTransition: 'none',
        //   pathColor: `rgba(62, 152, 199, ${percentage})`,
        //   textColor: '#f88',
        //   trailColor: '#d6d6d6', 
        // })}
      />
    </div>
  );

}