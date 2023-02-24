import jwtFetch from "./jwt";

const RECEIVE_GAME = "games/RECEIVE_GAME";
const RECEIVE_GAMES = "games/RECEIVE_GAMES";

const receiveGame = (game) => ({
  type: RECEIVE_GAME,
  game,
});

const receiveGames = () => ({
  type: RECEIVE_GAMES,
  games,
});

export const fetchGames = (userId) => async (dispatch) => {
  const response = await jwtFetch(`/api/games/${userId}`);
  const games = await response.json();
  dispatch(receiveGames(games));
};

export const fetchGame = (gameId) => async (dispatch) => {
  const response = await jwtFetch(`/api/games/${gameId}`);
  const game = await response.json();
  dispatch(receiveGame(game));
};

export const saveGame = (game) => async (dispatch) => {
  const response = await jwtFetch(`/api/games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  });

  const gameinfo = await response.json();
  dispatch(receiveGame(gameinfo));
};

const gamesReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_GAME:
      return { 0: action.game };
    case RECEIVE_GAMES:
      return { ...action.games };
    default:
      return state;
  }
};

export default gamesReducer;
