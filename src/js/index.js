/* eslint-disable no-multi-assign */
/* eslint-disable no-unused-vars */
const container = document.querySelector('.container');
const amountOfProducts = document.querySelector('.amountOfProducts');
const weightOfProducts = document.querySelector('.weightOfProducts');
const modalContent = document.querySelector('.modal-content');
const modal = document.getElementById('myModal');
const editForm = document.querySelector('.editForm');
let editIndex = '';
// Simple addProduct function

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
    productCounter();
    addingDeleteListener();
    addingEditListener();
  } else {
    // eslint-disable-next-line no-alert
    alert('Please fill all fields');
  }
};

const showProducts = () => {
  let products = JSON.parse(localStorage.getItem('products'));
  container.innerHTML = '';
  if (products === null) {
    products = [];
  } else {
    products.forEach(
      (product) =>
        (container.innerHTML += `
    <div class = "productCard">
      <div class = "productCardName">${product.product}</div>
      ${(() => {
            if (product.unit === 'sztuki') {
          // eslint-disable-next-line indent
          return `<div class="productCardAmount">${product.amount} szt.</div>`;
        }
        return `<div class="productCardAmount">${product.amount} kg.</div>`;
      })()}
      <div class = "productCardCategory">${product.category}</div>
      <button class="deleteBtn">Usuń</button>
      <button class="editBtn">Edytuj</button>
    </div>
    `)
    );
  }
  addingEditListener();
};

// Function for counting amount of products
const productCounter = () => {
  const products = JSON.parse(localStorage.getItem('products'));
  amountOfProducts.innerHTML = '';
  weightOfProducts.innerHTML = '';
  let numberOfProducts = 0;
  let weightsOfProducts = 0;
  products.forEach((product) => {
    if (product.unit === 'sztuki') {
      // eslint-disable-next-line radix
      numberOfProducts += parseInt(product.amount);
      amountOfProducts.innerHTML = `${numberOfProducts}szt`;
    } else {
      // eslint-disable-next-line radix
      weightsOfProducts += parseInt(product.amount);
      weightOfProducts.innerHTML = weightsOfProducts;
    }
  });
};
// Delete product function
const deleteProduct = (product) => {
  let products = JSON.parse(localStorage.getItem('products'));
  if (products === 'null') {
    products = [];
  } else {
    const getIndex = (index) => {
      return index.product === product;
    };
    products.splice(products.findIndex(getIndex), 1);
    localStorage.setItem('products', JSON.stringify(products));
  }
  showProducts();
  productCounter();
  addingEditListener();
  addingDeleteListener();
};
const editProduct = (product, amount) => {
  let products = JSON.parse(localStorage.getItem('products'));
  if (products === 'null') {
    products = [];
  } else {
    editForm.innerHTML = `
    <input type="text" class="product" id="productEdited" value=${product}>
    <input type="number" class="amount" id="amountEdited" value=${amount}>
    <div class="units">
      <label><input type="radio" class="unit" name="unitEdited" value="sztuki" checked> Sztuki</label>
      <label><input type="radio" class="unit" name="unitEdited" value="kilogramy"> Kilogramy</label>
      <select class="select" id="selectEdited">
        <option value="default">Wybierz kategorie</option>
        <option value="Warzywa">Warzywa</option>
        <option value="Owoce">Owoce</option>
        <option value="Nabiał">Nabiał</option>
        <option value="Pieczywo">Pieczywo</option>
        <option value="Mięso">Mięso</option>
        <option value="Higiena">Higiena</option>
        <option value="Napoje">Napoje</option>
      </select>
    </div>
    <input type="submit" value="Edytuj" class="submit" id="edit">`;
  }
  addingEditListener();
  addingDeleteListener();
};
const addEditedProduct = (event) => {
  event.preventDefault();
  const product = document.querySelector('#productEdited').value;
  const amount = document.querySelector('#amountEdited').value;
  const unit = document.querySelector('.unit[name=unitEdited]:checked').value;
  const category = document.querySelector('#selectEdited').value;
  const fullProduct = { product, amount, unit, category };
  if (product !== '' && amount !== '' && unit !== null && category !== 'default') {
    let productsArray = JSON.parse(localStorage.getItem('products'));
    if (productsArray === null) {
      productsArray = [];
    }
    const getIndex = (index) => {
      return index.product === editIndex;
    };
    productsArray.splice(productsArray.findIndex(getIndex), 1, fullProduct);
    localStorage.setItem('products', JSON.stringify(productsArray));
    showProducts();
    clear();
    productCounter();
    addingDeleteListener();
    modal.style.display = 'none';
  } else {
    // eslint-disable-next-line no-alert
    alert('Please fill all fields');
  }

  addingEditListener();
  editIndex = '';
};
// Clear input values after adding Product
const clear = () => {
  const product = (document.querySelector('.product').value = '');
  const amount = (document.querySelector('.amount').value = '');
};
const addingDeleteListener = () => {
  document.querySelectorAll('.deleteBtn').forEach((button) => {
    button.addEventListener('click', (e) =>
      deleteProduct(
        // Getting product name to filter through local storage :)
        e.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent
      )
    );
  });
};
const addingEditListener = () => {
  document.querySelectorAll('.editBtn').forEach((button) => {
    button.addEventListener('click', (e) => {
      modal.style.display = 'block';
      editProduct(
        e.target.previousElementSibling.previousElementSibling.previousElementSibling
          .previousElementSibling.textContent,
        e.target.previousElementSibling.previousElementSibling.previousElementSibling.textContent
      );
      editIndex =
        e.target.previousElementSibling.previousElementSibling.previousElementSibling
          .previousElementSibling.textContent;
    });
  });
};
// Content loader
showProducts();
productCounter();
addingDeleteListener();
addingEditListener();

// EVENT LISTENERS
document.querySelector('.form').addEventListener('submit', addProduct);
document.querySelector('.close').addEventListener('click', () => {
  modal.style.display = 'none';
});
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
document.querySelector('.editForm').addEventListener('submit', addEditedProduct);
