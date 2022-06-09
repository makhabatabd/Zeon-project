export function calcTotalPrice(products) {
  let totalPrice = 0;
  if (!products) {
    return totalPrice;
  } else {
    products.forEach((item) => {
      totalPrice += +item.subPrice * 5;
    });
    return totalPrice;
  }
}

export function calcSubPrice(product) {
  return +product.count * +product.item.price;
}

export function calcDiscount(products) {
  let cartDiscount = 0;
  if (!products) {
    return cartDiscount;
  } else {
    products.forEach((item) => {
      if (item.discount) {
        cartDiscount += Math.ceil(
          item.price - (item.price * item.discount) / 100
        );
      } else {
        return (cartDiscount = 0);
      }
    });
    return cartDiscount;
  }
}

export function totalCount(products) {
  let totalCount = 0;
  if (!products) {
    return totalCount;
  } else {
    products.forEach((item) => {
      totalCount += item.count;
    });
    return totalCount;
  }
}
