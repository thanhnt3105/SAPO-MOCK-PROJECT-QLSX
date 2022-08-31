const reducerService = (state = [], action) => {
  switch (action.type) {
    case "START-SET-SERVICE":
      return [...action.payload];
    case "ADD-SERVICE":
      return [...state, action.payload];
    case "REMOVE-SERVICE":
      return state.filter((item) => item.id !== action.payload);
    case "UPDATE-SERVICE":
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            ...action.payload,
          };
        } else {
          return item;
        }
      });
    default:
      return state;
  }
};

export default reducerService;
