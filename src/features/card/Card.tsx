import React from "react";
import styles from "./Card.module.css";
import ReactCardFlip from "react-card-flip";
import { Card as CardType } from "../game/gameSlice";

function Card({
  card,
  onClick,
}: {
  card: CardType;
  onClick: (state: string) => void;
}) {
  return (
    <div className={styles.CardContainer}>
      <ReactCardFlip
        isFlipped={card.state === "back"}
        flipDirection="horizontal"
      >
        <div className={styles.Card} onClick={() => onClick("back")}>
          {card.front}
        </div>

        <div className={styles.Card} onClick={() => onClick("front")}>
          {card.back}
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default Card;
