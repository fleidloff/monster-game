import React from "react";
import styles from "./Game.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Card as CardType } from "./gameSlice";
import { RootState } from "../../app/store";
import { setGoalCardState, setClueCardState, init } from "./gameSlice";
import Card from "../card/Card";

function Game() {
  const dispatch = useDispatch();
  const goalCard = useSelector<RootState>(
    (state) => state.game.goalCard
  ) as CardType;
  const clueCards = useSelector<RootState>(
    (state) => state.game.clueCards
  ) as CardType[];

  return (
    <div className={styles.Game}>
      <button onClick={() => dispatch(init())}>init</button>
      <Card
        card={goalCard}
        onClick={(state) => dispatch(setGoalCardState(state))}
      />
      <div className={styles.Clues}>
        {clueCards.map((card, index) => {
          return (
            <Card
              key={index}
              card={card}
              onClick={(state) => {
                dispatch(setClueCardState({ state, index }));
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Game;
