import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import "./App.font.css";
import Navigation from "./Navigation";

function App() {
  return (
    <>
      <Navigation className={styles.nav} />
      <div className={styles.body}>
        <Outlet />
      </div>
    </>
  );
}

export default App;
