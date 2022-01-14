import { useEffect, useState } from "react";


export default function Timer() {

  const [timer, setTimer] = useState("");

  let countdown;

  const timerParser = (seconds) => {
    // clearInterval(countdown)
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
      return displayTimer(secondsLeft)
    }, 1000);
  }

  const displayTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    const display = `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
    return setTimer(display);
  }

  useEffect(() => {
    timerParser(10)
  }, [])




  return (
    <div>{timer}</div>
  );
}