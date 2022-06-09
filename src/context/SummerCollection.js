import React, { useReducer } from "react";
import axios from "axios";

export const summerContext = React.createContext();
const INIT_STATE = {
  summer: [],
  summerCount: 0,
  oneSummer: null,
};

let count = 0;
if (window.innerWidth < 321) {
  count = 4;
} else {
  count = 12;
}

const API = " http://localhost:8000/summer";
const API_ORDERS = "http://localhost:8000/order";

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        summer: action.payload.data,
        summerCount: Math.ceil(action.payload.headers["x-total-count"] / count),
      };
    case "GET_ONE_PRODUCT":
      return {
        ...state,
        oneSummer: action.payload.data,
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
  async function getOneProduct(id) {
    let result = await axios(`${API}/${id}`);
    dispatch({
      type: "GET_ONE_PRODUCT",
      payload: result,
    });
  }

  async function addOrder(newOrder) {
    await axios.post(API_ORDERS, newOrder);
  }
  return (
    <summerContext.Provider
      value={{
        summer: state.summer,
        summerCount: state.summerCount,
        getSummer,
        getOneProduct,
        addOrder,
        oneSummer: state.oneSummer,
      }}
    >
      {children}
    </summerContext.Provider>
  );
};

export default SummerContextProvider;
