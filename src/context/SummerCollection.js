import React, { useReducer } from "react";
import axios from "axios";

export const summerContext = React.createContext();
const INIT_STATE = {
  summer: [],
  summerCount: 0,
};

const API = " http://localhost:8000/summer";

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        summer: action.payload.data,
        summerCount: Math.ceil(action.payload.headers["x-total-count"] / 12),
      };
    default:
      return state;
  }
};

const SummerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  async function getSummer() {
    let result = await axios(`${API}${window.location.search}`);
    dispatch({
      type: "GET_PRODUCTS",
      payload: result,
    });
  }
  return (
    <summerContext.Provider
      value={{
        summer: state.summer,
        summerCount: state.summerCount,
        getSummer,
      }}
    >
      {children}
    </summerContext.Provider>
  );
};

export default SummerContextProvider;
