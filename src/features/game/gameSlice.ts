import { createSlice } from "@reduxjs/toolkit";
import { shuffleArray } from "../../util/shuffleArray";

export interface Card {
  front: number;
  back: number[];
  state: "front" | "back";
}

export interface GameState {
  goalCard: Card;
  clueCards: Card[];
}

const getCard = (
  { front, back }: { front: number; back: number[] },
  numberShift: number
): Card => ({
  front: ((front + numberShift) % 7) + 1,
  back: back.map((number) => ((number + numberShift) % 7) + 1),
  state: "back",
});

// TODO: add alternative plays
//1 2 3 === 13  3  1      2   3  1  2
//4 5 6 ===     5  6      4   5  6  4
//4 7 3 ===     4  7      3   7  3  7
//2 5 1 === 51  1  2      5   2  5  1
//1 7 3 === 73  7  3      1   1  7  3
//2 5 6 === 2   2  5      6   6  2  5
//4 7 6 ===     6  4      7   4  4  6

const cardOptions = [
  [
    { back: [1, 2, 3], front: 3 },
    { back: [4, 5, 6], front: 5 },
    { back: [4, 7, 3], front: 4 },
    { back: [2, 5, 1], front: 1 },
    { back: [1, 7, 3], front: 7 },
    { back: [2, 5, 6], front: 2 },
    { back: [4, 7, 6], front: 6 },
  ],
  [
    { back: [1, 2, 3], front: 1 },
    { back: [4, 5, 6], front: 6 },
    { back: [4, 7, 3], front: 7 },
    { back: [2, 5, 1], front: 2 },
    { back: [1, 7, 3], front: 3 },
    { back: [2, 5, 6], front: 5 },
    { back: [4, 7, 6], front: 4 },
  ],
  [
    { back: [1, 2, 3], front: 2 },
    { back: [4, 5, 6], front: 4 },
    { back: [4, 7, 3], front: 3 },
    { back: [2, 5, 1], front: 5 },
    { back: [1, 7, 3], front: 1 },
    { back: [2, 5, 6], front: 6 },
    { back: [4, 7, 6], front: 7 },
  ],
  [
    { back: [1, 2, 3], front: 3 },
    { back: [4, 5, 6], front: 5 },
    { back: [4, 7, 3], front: 7 },
    { back: [2, 5, 1], front: 2 },
    { back: [1, 7, 3], front: 1 },
    { back: [2, 5, 6], front: 6 },
    { back: [4, 7, 6], front: 4 },
  ],
  [
    { back: [1, 2, 3], front: 1 },
    { back: [4, 5, 6], front: 6 },
    { back: [4, 7, 3], front: 3 },
    { back: [2, 5, 1], front: 5 },
    { back: [1, 7, 3], front: 7 },
    { back: [2, 5, 6], front: 2 },
    { back: [4, 7, 6], front: 4 },
  ],
  [
    { back: [1, 2, 3], front: 2 },
    { back: [4, 5, 6], front: 4 },
    { back: [4, 7, 3], front: 7 },
    { back: [2, 5, 1], front: 1 },
    { back: [1, 7, 3], front: 3 },
    { back: [2, 5, 6], front: 5 },
    { back: [4, 7, 6], front: 6 },
  ],
];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const getInitialState = (): GameState => {
  const cards = cardOptions[getRandomInt(cardOptions.length)];
  shuffleArray(cards);
  const numberShift = getRandomInt(7);
  return {
    goalCard: getCard(cards[0], numberShift),
    clueCards: [
      getCard(cards[1], numberShift),
      getCard(cards[2], numberShift),
      getCard(cards[3], numberShift),
      getCard(cards[4], numberShift),
      getCard(cards[5], numberShift),
      getCard(cards[6], numberShift),
    ],
  };
};

const initialState: GameState = getInitialState();

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGoalCardState(state, action) {
      state.goalCard.state = action.payload;
    },
    setClueCardState(state, action) {
      state.clueCards[action.payload.index].state = action.payload.state;
    },
    init(state) {
      const initialState = getInitialState();
      state.goalCard = initialState.goalCard;
      state.clueCards = initialState.clueCards;
    },
  },
});

export const { setGoalCardState, setClueCardState, init } = gameSlice.actions;

export default gameSlice.reducer;
