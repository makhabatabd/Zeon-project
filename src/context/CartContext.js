import React, { useReducer } from "react";
import {
  calcTotalPrice,
  calcSubPrice,
  calcDiscount,
  totalCount,
} from "../components/helpers/calcPrice";

export const cartContext = React.createContext();

const INIT_STATE = {
  cart: {},
  cartLength: 0,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_CART":
      return {
        ...state,
        cart: action.payload,
        cartLength: action.payload.products.length,
      };
    default:
      return state;
  }
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  function getCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
        cartDiscount: 0,
        totalCount: 0,
      };
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    cart.totalPrice = calcTotalPrice(cart.products);
    cart.cartDiscount = calcDiscount(cart.products);
    dispatch({
      type: "GET_CART",
      payload: cart,
    });
  }
  function addProductToCart(product) {
    console.log("product", product);
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
        cartDiscount: 0,
      };
    }
    let newProduct = {
      item: product,
      subPrice: product.price,
      discount: product.discount,
      count: 1,
    };
    let isProductInCart = cart.products.some(
      (item) => item.item.color == product.color && item.item.id == product.id
    );
    if (isProductInCart) {
      cart.products = cart.products.filter(
        (item) => item.item.color != product.color && item.item.id != product.id
      );
    } else {
      cart.products.push(newProduct);
    }
    cart.totalPrice = calcTotalPrice(cart.products);
    cart.cartDiscount = calcDiscount(cart.products);
    cart.totalCount = totalCount(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  }

  function checkItemInCart(id, color) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
        cartDiscount: 0,
      };
    }
    let isProductInCart = cart.products.some(
      (item) => item.item.id == id && item.item.color == color
    );
    return isProductInCart;
  }
  function deleteFromCart(id, color) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
        cartDiscount: 0,
      };
    }
    const index = cart.products.findIndex(
      (item) => item.item.id === id && item.item.color === color
    );
    cart.products.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  }
  function changeProductCount(count, color) {
    if (count <= 0) {
      count = 1;
    }
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.products = cart.products.map((item) => {
      if (item.item.color == color) {
        item.count = count;
        item.subPrice = calcSubPrice(item);
        item.discount = calcDiscount(cart.products);
      }
      return item;
    });
    cart.totalPrice = calcTotalPrice(cart.products);
    cart.cartDiscount = calcDiscount(cart.products);
    cart.totalCount = totalCount(cart.products);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCart();
  }

  function deleteAll() {
    localStorage.removeItem("cart");
  }

  return (
    <cartContext.Provider
      value={{
        cartLength: state.cartLength,
        cart: state.cart,
        getCart,
        addProductToCart,
        checkItemInCart,
        deleteFromCart,
        changeProductCount,
        deleteAll,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
export default CartContextProvider;
