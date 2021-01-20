import { useEffect } from "react";

interface Props {
  name: string;
}

const App: React.FC<Props> = ({ name }) => {
  useEffect(() => {
    // window.alert("Greeter has been mounted!");
  }, []);

  return <h1>Greetings, {name}!</h1>;
};

export default App;
