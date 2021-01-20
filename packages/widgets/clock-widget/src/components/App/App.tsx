import { useCallback, useEffect, useState } from "react";

const App: React.FC = () => {
  const [date, setDate] = useState(new Date());

  const tick = useCallback(() => {
    setDate(new Date());
  }, [setDate]);

  useEffect(() => {
    const interval = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(interval);
    };
  }, [tick]);

  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {date.toLocaleTimeString()}.</h2>
    </div>
  );
};

export default App;
