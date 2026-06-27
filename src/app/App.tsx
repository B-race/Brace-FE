import { useState } from "react";
import reactLogo from "../assets/icons/react.svg";
import viteLogo from "../assets/icons/vite.svg";
import heroImg from "../assets/images/hero.png";
import "../styles/App.css";
import ProjectsRegister from "../pages/projects/projectsRegister";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ProjectsRegister />
    </>
  );
}

export default App;
