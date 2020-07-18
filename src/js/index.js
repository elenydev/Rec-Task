const form = document.querySelector('.form');
const content = document.querySelector('.content');

const addProduct = (e) => {
  e.preventDefault();
  const product = document.querySelector('.product').value;
  const amount = document.querySelector('.amount').value;
  const unit = document.querySelector('.unit[name=unit]:checked').value;
  const category = document.querySelector('.select').value;
  const fullProduct = { product, amount, unit, category };

  if (product !== '' && amount !== '' && unit !== null && category !== 'default') {
    let productsArray = JSON.parse(localStorage.getItem('products'));
    if (productsArray === null) {
      productsArray = [];
    }
    productsArray.push(fullProduct);
    localStorage.setItem('products', JSON.stringify(productsArray));
    const storage = JSON.parse(localStorage.getItem('products'));
    console.log(storage);
    showProducts();
    clear();
  } else {
    console.log('fill all fields');
  }
};

const showProducts = () => {
  let products = JSON.parse(localStorage.getItem('products'));
  content.innerHTML = '';
  if (products === null) {
    products = [];
  } else {
    products.forEach(
      (product) =>
        (content.innerHTML += `
    <div>${product.product}</div>
    `)
    );
  }
};
const clear = () => {
  const product = (document.querySelector('.product').value = '');
  const amount = (document.querySelector('.amount').value = '');
};

showProducts();
form.addEventListener('submit', addProduct);
