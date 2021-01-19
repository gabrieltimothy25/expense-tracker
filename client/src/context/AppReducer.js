export default function AppReducer(state, action) {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        loading: false,
        transactions: [...state.transactions, action.payload],
      };
    case "FETCH_TRANSACTIONS":
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) =>
            transaction._id.toString() !== action.payload.toString()
        ),
      };
    case "TRANSACTION_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
