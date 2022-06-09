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
      {
        item.item.discount
          ? (cartDiscount +=
              (item.item.price -
                (item.item.price -
                  (item.item.price * item.item.discount) / 100)) *
              5)
          : (cartDiscount = 0);
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
