document.addEventListener("DOMContentLoaded", function() {
    let menuToggle = document.querySelector('.menuToggle');
    let sidebar = document.querySelector('.sidebar');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        sidebar.classList.toggle('active');
    });
});
let main = document.querySelector('.main');

// Load existing items from local storage or initialize an empty array
let cart = JSON.parse(localStorage.getItem('product')) || [];


main.innerHTML = cart.map(function(item, index) {
    return `
        <table class="table"z>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><button class='remove-btn' data-index='${index}'>Remove</button></td>
                    <td> <img src="${item.url}"></td>
                    <td>${item.name}</td>
                    <td>R${item.price}</td>
                    <td><input type='number' id='quantity-amount${index}'></td>
                    <td><input type='number' id='total-amount${index}'></td>
                </tr>
            </tbody>
        </table>`;
}).join('');

// adding a eventlister for the remove button
document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', function() {
        let indexToRemove = this.getAttribute('data-index');
        cart.splice(indexToRemove, 1);
        updateLocalStorage();
        location.reload(); // Refresh the page to reflect the changes
    });
});

function updateLocalStorage() {
    localStorage.setItem('product', JSON.stringify(cart));
}