// Initialize cartCount and cartItems from localStorage if available
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Cart
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () => {
    cart.classList.add("active");
};

closeCart.onclick = () => {
    cart.classList.remove("active");
};

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    var addCart = document.getElementsByClassName('add-to-cart')
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    document.getElementsByClassName('btn-buy')[0].addEventListener("click", buyButtonClicked) // Corrected the event listener here

    // Load cart items when the page loads
    loadCartItems();
    updatetotal();
}

function buyButtonClicked() {
    alert('Your Order is Placed')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
    updateCartCount(); // Update cart count after clearing the cart
    saveCartData(); // Save cart data to localStorage
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
    updateCartCount(); // Update cart count after removing an item
    updateCartItems(); // Update cart items in localStorage
}

function addCartClicked(event) {
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
    updateCartCount(); // Update cart count after adding an item
    saveCartData(); // Save cart data to localStorage
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box"); // Fixed this line
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) { // Compare the text content
            alert("You have already added this item to Cart");
            return;
        }
    }

    var cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">
            ${title}
        </div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <i class="fa-solid fa-trash cart-remove"></i>
    `;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.appendChild(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

    // Update cart items in localStorage
    updateCartItems();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1; // Set to 1 if input is invalid
    }
    updatetotal();
    updateCartItems(); // Update cart items in localStorage
}

function updatetotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('total-price')[0].innerText = "$" + total;
}

// Function to update the cart count
function updateCartCount() {
    cartCount++;
    document.getElementById("cart-count").textContent = cartCount;
    saveCartData(); // Save cart data to localStorage
}

// Function to save cartCount and cartItems to localStorage
function saveCartData() {
    localStorage.setItem('cartCount', cartCount);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to update cart items in localStorage
function updateCartItems() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    cartItems = [];

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var title = cartBox.getElementsByClassName('cart-product-title')[0].innerText;
        var price = cartBox.getElementsByClassName('cart-price')[0].innerText;
        var quantity = cartBox.getElementsByClassName('cart-quantity')[0].value;
        var productImg = cartBox.getElementsByClassName('cart-img')[0].src;

        cartItems.push({
            title: title,
            price: price,
            quantity: quantity,
            productImg: productImg
        });
    }

    saveCartData(); // Save cart data to localStorage
}

// Function to load cart items from localStorage
function loadCartItems() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    cartContent.innerHTML = ''; // Clear the cart content

    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        var cartShopBox = document.createElement("div");
        cartShopBox.classList.add("cart-box");
        var cartBoxContent = `
            <img src="${cartItem.productImg}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">
                    ${cartItem.title}
                </div>
                <div class="cart-price">${cartItem.price}</div>
                <input type="number" value="${cartItem.quantity}" class="cart-quantity">
            </div>
            <i class="fa-solid fa-trash cart-remove"></i>
        `;
        cartShopBox.innerHTML = cartBoxContent;
        cartContent.appendChild(cartShopBox);

        cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
        cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
    
    // Decrease cart count and update cart count element
    cartCount--; // This line decreases the cartCount
    document.getElementById("cart-count").textContent = cartCount;
    
    updateCartItems(); // Update cart items in localStorage
}
