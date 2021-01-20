import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import getRandomString from "../../helpers/getRandomString";
import RemoteComponent from "../RemoteComponent";

const App: React.FC = () => {
  const [randomString, setRandomString] = useState(getRandomString());

  useEffect(() => {
    if (!window.React) {
      window.React = React;
    }

    if (!window.ReactDOM) {
      window.ReactDOM = ReactDOM;
    }
  }, []);

  return (
    <div style={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}>
      <span>This is the host application</span>
      <br />
      <span>randomString value: {randomString}</span>
      <button onClick={() => setRandomString(getRandomString())}>
        Generate random name
      </button>
      <div style={{ backgroundColor: "rgba(0, 255, 0, 0.25)" }}>
        <RemoteComponent widgetUrl="http://localhost:5001/widgets/clock-widget" />
      </div>
      <div style={{ backgroundColor: "rgba(255, 0, 0, 0.25)" }}>
        <RemoteComponent
          widgetUrl="http://localhost:5001/widgets/greeter-widget"
          name={randomString}
        />
      </div>
    </div>
  );
};

export default App;
