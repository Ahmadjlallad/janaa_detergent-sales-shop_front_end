import { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState([
    new Date().toLocaleDateString(),
    new Date().toLocaleTimeString(),
  ]);
  useEffect(() => {
    const myInterval = setInterval(() => {
      setTime([
        new Date().toLocaleDateString(),
        new Date().toLocaleTimeString(),
      ]);
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, []);

  return (
    <>
      <div>{time[0]}</div>
      <div>{time[1]}</div>
    </>
  );
};

export default Clock;
