const initialState = {
  currentArtist: null,
  status: "idle",
};

export default function artistReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_ARTIST": {
      return {
        ...state,
        status: "loading",
      };
    }

    case "RECEIVE_ARTIST": {
      console.log("[RECEIVE_ARTIST INCOMING DATA]", action.currentArtist);

      const results = {
        ...state,
        currentArtist: action.currentArtist,
        status: "idle",
      };
      return results;
    }

    case "RECEIVE_ARTIST_ERROR": {
      return {
        ...state,
        status: "error",
      };
    }
    default: {
      return state;
    }
  }
}
