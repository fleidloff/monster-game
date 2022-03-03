import React from "react";
import styles from "./App.module.css";
import Game from "./features/game/Game";

function App() {
  return (
    <div className={styles.App}>
      <Game />
    </div>
  );
}

export default App;
