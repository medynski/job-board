import { useEffect, useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [count]);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(0)}>reset</button>
    </div>
  );
};
