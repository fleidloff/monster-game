import { createSlice } from "@reduxjs/toolkit";

export interface Card {
  front: number;
  back: number[];
  state: "front" | "back";
}

export interface GameState {
  goalCard: Card;
  clueCards: Card[];
  globalShift: number;
}

const getCard = (): Card => ({
  front: 1,
  back: [1, 2, 3],
  state: "back",
});

// TODO: implement getInitialState

const getInitialState = (): GameState => {
  return {
    goalCard: getCard(),
    clueCards: [
      getCard(),
      getCard(),
      getCard(),
      getCard(),
      getCard(),
      getCard(),
    ],
    globalShift: 0, // used for mixing the game state even more
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
