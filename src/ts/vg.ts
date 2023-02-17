/*
1. Se om du kan hitta problem med koden nedan och se om du kan göra den bättre.
*/
export enum Sort {
  PRICE_ASCENDING = "Price low - high",
  PRICE_DESCENDING = "Price high - low",
  NAME_ALPHABETICAL = "From A-Z",
  NAME_ALPHABETICAL_REVERSE = "From Z-A",
}

export class Product {
  constructor(
    public name: string, 
    public price: number
    ) {}
}

export function sortProductsBy(sort: Sort, products: Product[]): Product[] {
  const copiedList: Product[] = [...products];
  let sortedList: Product[] = [];

  switch (sort) {
    case Sort.PRICE_ASCENDING:
      sortedList = sortList("price", copiedList).reverse();
      break;
    case Sort.PRICE_DESCENDING:
      sortedList = sortList("price", copiedList);
      break;
    case Sort.NAME_ALPHABETICAL:
      sortedList = sortList("name", copiedList);
      break;
    case Sort.NAME_ALPHABETICAL_REVERSE:
      sortedList = sortList("name", copiedList).reverse();
      break;
  }

  return sortedList;
}

function sortList(category: keyof Product, products: Product[]): Product[] {
  return products.sort((p1, p2) => {
    if (p1[category] < p2[category]) {
      return -1;
    } else if (p1[category] > p2[category]) {
      return 1;
    }
    return 0;
  });
}

/*
  2. Refaktorera funktionen createProductHtml :)
  */
class Cart {
  addToCart(i: number) {}
}
export let cartList = JSON.parse(localStorage.getItem("savedCartList") || "[]");
export let productList = JSON.parse(localStorage.getItem("savedList") || "[]");

export function createProductHtml() {

  for (let i = 0; i < productList.length; i++) {


    let { dogproduct, dogImgContainer, dogImg }: { dogproduct: HTMLDivElement; dogImgContainer: HTMLDivElement; dogImg: HTMLImageElement; } = createDogImg(i);
    let { cartSymbolContainer, cartSymbol }: { cartSymbolContainer: HTMLDivElement; cartSymbol: HTMLElement; } = createCart();
    let { name, price, info }: { name: HTMLHeadingElement; price: HTMLHeadingElement; info: HTMLHeadingElement; } = displayDogProducts(i);

    dogproduct.appendChild(dogImgContainer);
    dogproduct.appendChild(name);
    dogproduct.appendChild(price);
    dogproduct.appendChild(info);

    dogImgContainer.appendChild(dogImg);
    dogImgContainer.appendChild(cartSymbolContainer);
    cartSymbolContainer.appendChild(cartSymbol);

    addEventListenersDogImg(dogImg, cartSymbolContainer, i);
    addEventListenerCart(cartSymbol, i);

    productList[i].productSpec = false;

    if (productList[i].category === "sassy") {
      let cat1: HTMLElement = document.getElementById("sassy") as HTMLElement;
      cat1.appendChild(dogproduct);
    }
    if (productList[i].category === "criminals") {
      let cat2: HTMLElement = document.getElementById("criminals") as HTMLElement;
      cat2.appendChild(dogproduct);
    }
    if (productList[i].category == "singles") {
      let cat3: HTMLElement = document.getElementById("singlar") as HTMLElement;
      cat3.appendChild(dogproduct);
    }
    if (productList[i].category === "puppy") {
      let cat4: HTMLElement = document.getElementById("puppy") as HTMLElement;
      cat4.appendChild(dogproduct);
    }
    if (productList[i].category === "oldies") {
      let cat5: HTMLElement = document.getElementById("oldies") as HTMLElement;
      cat5.appendChild(dogproduct);
    }
  }

  localStorage.setItem("savedList", JSON.stringify(productList));
  sessionStorage.clear();
}

function displayDogProducts(i: number) {
  let name: HTMLHeadingElement = document.createElement("h5");
  name.innerHTML = productList[i].name;
  let price: HTMLHeadingElement = document.createElement("p");
  price.innerHTML = `$: ${productList[i].price}`;
  let info: HTMLHeadingElement = document.createElement("p");
  info.innerHTML = productList[i].info;
  return { name, price, info };
}

function createCart() {
  let cartSymbolContainer: HTMLDivElement = document.createElement("div");
  cartSymbolContainer.className = "cartSymbolContainer";
  let cartSymbol: HTMLElement = document.createElement("i");
  cartSymbol.className = "bi bi-bag-plus";
  return { cartSymbolContainer, cartSymbol };
}

function createDogImg(i: number) {
  let dogproduct: HTMLDivElement = document.createElement("div");
  dogproduct.className = "dogproduct";
  let dogImgContainer: HTMLDivElement = document.createElement("div");
  dogImgContainer.className = "dog-img-container";
  let dogImg: HTMLImageElement = document.createElement("img");
  dogImg.src = productList[i].picture;
  dogImg.alt = productList[i].pictureAlt;
  return { dogproduct, dogImgContainer, dogImg };
}

function addEventListenerCart(cartSymbol: HTMLElement, i: number) {
  cartSymbol.addEventListener("click", () => {
    let cart = new Cart();
    cart.addToCart(i);
    updateFloatingCart();
  });
}

function addEventListenersDogImg(dogImg: HTMLImageElement, cartSymbolContainer: HTMLDivElement, i: number) {
  dogImg.addEventListener("mouseover", () => {
    cartSymbolContainer.classList.add("hover");
    dogImg.classList.add("hover");
  });

  dogImg.addEventListener("mouseout", () => {
    dogImg.classList.remove("hover");
    cartSymbolContainer.classList.remove("hover");
  });

  dogImg.addEventListener("click", () => {
    productList[i].productSpec = !productList[i].productSpec;
    window.location.href = "product-spec.html#backArrow";
    let saveAsTxt = JSON.stringify(productList);
    localStorage.setItem("savedList", saveAsTxt);
  });
}

function updateFloatingCart() {
  let quantity = cartList.reduce((previous: number, current: number) => {
    return previous + current;
  });

  let floatingCart = document.getElementById(
    "floatingcartnumber"
  ) as HTMLElement;
  floatingCart.innerHTML = "" + quantity;
}

/*
  3. Refaktorera funktionen getfromstorage
  */
class CartProduct {
  constructor(
    public name: string,
    public image: string,
    public price: number,
    public amount: number
  ) {}
}

function getfromstorage(cartProducts: CartProduct) {
  let productsInCart: CartProduct[] = getFromLocalStorage();
  let { titlecontainer, amountContainer, productquantity, totalPriceTitle } = createHtml();
  let totalSum: number = calculateTotalPrice(productsInCart);

  for (let i: number = 0; i < productsInCart.length; i++) {
    let amountqt: HTMLTableCellElement = displayProducts(titlecontainer, productsInCart, i, amountContainer, productquantity);
    createAmountButtons(amountqt);
  }

  displayTotalPrice(totalPriceTitle, totalSum);
}

function displayProducts(titlecontainer: HTMLTableRowElement, productsInCart: CartProduct[], i: number, amountContainer: HTMLDivElement, productquantity: HTMLTableRowElement) {
  let product: HTMLTableCellElement = document.createElement("td");
  titlecontainer.appendChild(product);
  product.innerHTML = productsInCart[i].name;
  product.className = "product-name";

  let amount: HTMLTableCellElement = document.createElement("td");
  amount.className = "product-amount";
  amountContainer.appendChild(amount);
  amount.innerHTML = `x: ${productsInCart[i].amount}`;

  let amountqt: HTMLTableCellElement = document.createElement("td");
  amountqt.className = "product-quantity";
  productquantity.appendChild(amountqt);
  return amountqt;
}

function createHtml() {
  let titlecontainer = document.getElementById(
    "title-container"
  ) as HTMLTableRowElement;
  titlecontainer.innerHTML = "<strong>Products:</strong>";

  let amountContainer = document.getElementById(
    "amount-checkout-container2"
  ) as HTMLDivElement;
  let amountext: HTMLTableCellElement = document.createElement("th");
  amountContainer.appendChild(amountext);
  amountext.innerHTML = "Amount:";

  let productquantity = document.getElementById(
    "product-quantity"
  ) as HTMLTableRowElement;
  let qttext: HTMLTableCellElement = document.createElement("th");
  productquantity.appendChild(qttext);
  qttext.innerHTML = "Change quantity:";

  let totalPriceTitle = document.getElementById(
    "title-total"
  ) as HTMLTableCellElement;
  let totalPriceTxt: HTMLTableCellElement = document.createElement("th");
  totalPriceTitle.appendChild(totalPriceTxt);
  totalPriceTxt.innerHTML = "Total:";
  return { titlecontainer, amountContainer, productquantity, totalPriceTitle };
}

function calculateTotalPrice(productsInCart: CartProduct[]) {
  let totalSum: number = 0;

  for (let i = 0; i < productsInCart.length; i++) {
    totalSum += productsInCart[i].price *= productsInCart[i].amount;
  }
  return totalSum;
}

function displayTotalPrice(totalPriceTitle: HTMLTableCellElement, totalSum: number) {
  let totalPrice: HTMLTableCellElement = document.createElement("td");
  totalPriceTitle.appendChild(totalPrice);
  totalPrice.id = "totalprice";
  totalPrice.innerHTML = totalSum + "$";
}

function getFromLocalStorage() {
  let fromstorage: string = localStorage.getItem("cartArray") || "";
  let productsInCart: CartProduct[] = JSON.parse(fromstorage);
  return productsInCart;
}

function createAmountButtons(amountqt: HTMLTableCellElement) {
  let amountPlusBtn: HTMLButtonElement = document.createElement("button");
  amountPlusBtn.className = "plusbtn";

  let amountMinusBtn: HTMLButtonElement = document.createElement("button");
  amountMinusBtn.className = "minusbtn";

  amountqt.appendChild(amountPlusBtn);
  amountqt.appendChild(amountMinusBtn);

  createBtnIcons(amountPlusBtn, amountMinusBtn);
}

function createBtnIcons(
  amountPlusBtn: HTMLButtonElement,
  amountMinusBtn: HTMLButtonElement
) {
  let iconForMinusBtn: HTMLSpanElement = document.createElement("i");
  iconForMinusBtn.className = "fas fa-minus";

  let iconForPlusBtn: HTMLSpanElement = document.createElement("i");
  iconForPlusBtn.className = "fas fa-plus";

  amountPlusBtn.appendChild(iconForMinusBtn);
  amountMinusBtn.appendChild(iconForPlusBtn);
}

