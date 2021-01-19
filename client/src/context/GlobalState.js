import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

import API from "../api";

// Initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function fetchTransactions() {
    API({
      method: "get",
      url: "/transactions",
    })
      .then((res) => {
        dispatch({
          type: "FETCH_TRANSACTIONS",
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "TRANSACTION_ERROR",
          payload: err,
        });
      });
  }

  function deleteTransaction(id) {
    API({
      method: "delete",
      url: `transactions/${id}`,
    })
      .then((res) => {
        dispatch({
          type: "DELETE_TRANSACTION",
          payload: id,
        });
      })
      .catch((err) => {
        dispatch({
          type: "TRANSACTION_ERROR",
          payload: err.message,
        });
      });
  }

  function addTransaction(transaction) {
    API({
      method: "post",
      url: "/transactions",
      data: transaction,
    })
      .then((res) => {
        dispatch({
          type: "ADD_TRANSACTION",
          payload: {
            _id: res.data.id,
            text: transaction.text,
            amount: transaction.amount,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: "TRANSACTION_ERROR",
          payload: err.message,
        });
      });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        fetchTransactions,
        loading: state.loading,
        error: state.error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
