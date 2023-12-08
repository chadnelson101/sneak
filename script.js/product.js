document.addEventListener("DOMContentLoaded", function() {
    let menuToggle = document.querySelector('.menuToggle');
    let sidebar = document.querySelector('.sidebar');
    let main = document.querySelector('main');
    let sortButton = document.querySelector('.sort-button');
  
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      sidebar.classList.toggle('active');
    });
  
    let product = [];
    let items = JSON.parse(localStorage.getItem('products'));
  
    function renderProducts(productList) {
      main.innerHTML = productList.map(function(item, index) {
        return `
       <div class="card" style="width: 18rem;" id='products'>
           <img src="${item.url}" class="card-img-top" alt="...">
         <div class="card-body">
           <h5 class="card-title">${item.name}</h5>
           <p class="card-text">${item.price}</p>
           <button id='add' data-cart value='${index}'>Add to cart</button>
        </div>
      </div>`;
      }).join('');
    }
  
    renderProducts(items);

  
    function addToCart(index) {
      product = JSON.parse(localStorage.getItem('product')) || [];
      product.push(items[index]);
      localStorage.setItem('product', JSON.stringify(product));
    }
  
    // add to cart function for button
    main.addEventListener('click', function(event) {
      if (event.target.hasAttribute('data-cart')) {
        addToCart(event.target.value);
      }
    });
  
    // Sorting functionality
    sortButton.addEventListener('click', function() {
      // Show/hide dropdown options here
      // For simplicity, let's just toggle a class for demonstration
      sortButton.classList.toggle('active');
    });
    // Implement actual sorting logic here based on user selection
    // For simplicity, let's sort by price
    sortButton.addEventListener('click', function(event) {
      let sortOrder = event.target.classList.contains('active') ? 'asc' : 'desc';
  
      if (sortOrder === 'asc') {
        items.sort((a, b) => a.price - b.price);
      } else {
        items.sort((a, b) => b.price - a.price);
      }
  
      renderProducts(items);
    });
  });

  function edit(index) {
    // getting items to edit
    let productEdit = products[index];

    document.getElementById('editName').value = productEdit.name;
    document.getElementById('editPrice').value = productEdit.price;
    document.getElementById('editImage').value = productEdit.url;

    // show modal
    let modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();

    document.getElementById('saveEdit').setAttribute('data-index', index);
}

// to save edited product
function saveEdit() {
    let index = document.getElementById('saveEdit').getAttribute('data-index');
    let editedProduct = products[index];

    // new values for products
    editedProduct.name = document.getElementById('editName').value;
    editedProduct.price = parseFloat(document.getElementById('editPrice').value);
    editedProduct.url = document.getElementById('editImage').value;

    localStorage.setItem('products', JSON.stringify(products));
    chad();

    // Close the modal
    let modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.hide();
}