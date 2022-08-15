export function user(state, action) {
    switch (action.type) {
      case "LOG_IN":
        return { ...state, user: action.payload };
      default:
        return state;
    }
  }