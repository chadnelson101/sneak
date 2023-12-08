document.addEventListener("DOMContentLoaded", function() {
    let menuToggle = document.querySelector('.menuToggle');
    let sidebar = document.querySelector('.sidebar');
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        sidebar.classList.toggle('active');
    });
    
    

    function addProduct() {
    // Get values from the form fields
    // let savedProduct = products[index];

    let Name = document.getElementById('name').value;
    let Price = parseFloat(document.getElementById('price').value);
    let Image = document.getElementById('image').value;

    // Create a new product object
    let newProduct = new Constructor(products.length + 1, Name, Price, Image);

    // Add the new product to the array
    products.push(newProduct);
    
    // Update the local storage
    localStorage.setItem('products', JSON.stringify(products));

    
    // Refresh the table
    chad();

     // Set the data-save attribute on the 'Add' button
     addButton.setAttribute('data-save', products.length - 1);
    
    // Close the modal
    let Modal = new bootstrap.Modal(document.getElementById('Modal'));
    Modal.hide();
}

let addButton = document.getElementById('addButton');
addButton.addEventListener('click', addProduct);

// to save added product
function saveAddedProduct() {
    // Get the index from the 'data-save' attribute of the addButton
    let index = document.getElementById('addButton').getAttribute('data-save');

    // Get the saved product from the array
    let savedProduct = products[index];

    // Update the saved product with new values
    savedProduct.Name = document.getElementById('name').value;
    savedProduct.Price = parseFloat(document.getElementById('price').value);
    savedProduct.Image = document.getElementById('image').value;

    // Update the product in the array
    products[index] = savedProduct;

    // Update local storage and refresh the table
    localStorage.setItem('products', JSON.stringify(products));
    chad();
}

});


// products will be stored
let products = []

// creating objects
function Constructor(id, name, price, url) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.url = url;
}

// first product
let product1 = new Constructor(1, 'Nike Air Uptempo Grey Sneaker', 3399.95, 'https://i.postimg.cc/MKyFJNmC/99969092-800-800.png');
let product2 = new Constructor(2, 'Nike Dunk Yellow/Black Sneaker', 2399.95, 'https://i.postimg.cc/fTKfKNKR/101336002-800-800.png');
let product3 = new Constructor(3, 'Nike Air Force 1 Low sneaker', 2799.95, 'https://i.postimg.cc/mr0YD2b8/101232837-800-800.png');
let product4 = new Constructor(4, 'Nike Air Max 2  Black Sneaker', 3199.95, 'https://i.postimg.cc/y6TRqTSf/101350119-800-800.png');
let product5 = new Constructor(5, 'Puma MB 03 Hills Grey Sneaker', 3299.95, 'https://i.postimg.cc/bvzX5pXV/100737988-800-800.png');
let product6 = new Constructor(6, 'Puma X-Ray White Sneaker', 1799.95, 'https://i.postimg.cc/5NL2d4Gf/101313698-800-800.png');
let product7 = new Constructor(7, 'Puma CA Multicolour Sneaker', 1799.95, 'https://i.postimg.cc/VNLfCjNN/101313399-800-800.png');
let product8 = new Constructor(8, 'adidas Courtblock  Sneaker', 1099.95, 'https://i.postimg.cc/QCpgTL61/101326519-800-800.png');
let product9 = new Constructor(9, 'adidas Grand Court Sneaker', 999.95, 'https://i.postimg.cc/KjwXRMHR/101079733-800-800.png');
let product10 = new Constructor(10, 'adidas Duramo  Sneaker', 1299.95, 'https://i.postimg.cc/c4z1nKn7/100834738-800-800.png');

// pushing products to an array
products.push(product1, product2, product3, product4, product5, product6, product7, product8, product9, product10);

// setting the array in local storage
localStorage.setItem('products', JSON.stringify(products));

// getting products stored in the browser
products = JSON.parse(localStorage.getItem('products'));

let table = document.querySelector('table');

// edit function
function edit(index) {
    // getting items to edit
    let productEdit = products[index];

    document.getElementById('editName').value =productEdit.name;
    document.getElementById('editPrice').value = productEdit.price;
    document.getElementById('editImage').value = productEdit.url;

    // show modal
    let modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();

    document.getElementById('save').setAttribute('data-index', index);
}

// to save edited product
function save() {
    let index = document.getElementById('save').getAttribute('data-index');
    let editedProduct = products[index];
    // new values for products
    editedProduct.name = document.getElementById('editName').value;
    editedProduct.price = parseFloat(document.getElementById('editPrice').value);
    editedProduct.url = document.getElementById('editImage').vaule;

    products[index] = editedProduct;

    localStorage.setItem('products', JSON.stringify(products));
    chad();
}

function chad() {
    let items = products.map(function(item, index) {
        return `<tr>
                 <td><img class='product-images' src="${item.url}"/></td>
                 <td>${item.id}</td>
                 <td class='name'>${item.name}</td>
                 <td class='price'>R${item.price}</td>
                 <td><button class='edit' onclick="edit(${index})">Edit</button></td>
                 <td><button class='delete' value='${index}'>Delete</button></td>
                </tr>`;
    })
    table.innerHTML = items.join('');
}

chad();

function nelson() {
    localStorage.setItem('products', JSON.stringify(products));
    products = JSON.parse(localStorage.getItem('products'));
}

let btnButton = document.querySelector('.delete');

function remove(position) {
    products.splice(position, 1);
    localStorage.setItem('products', JSON.stringify(products));
    nelson();
    chad();
}

table.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
        // remove(event.target.parentNode.rowIndex - 1);
        let products = event.target.getAttribute('value');
        remove(products)
    }
});