


// Get elements
const confirmButton = document.getElementById('Confirmed');
const popup = document.getElementById('popup');
const closeButton = document.getElementById('close-popup');

// Show the popup when the Confirm button is clicked
confirmButton.addEventListener('click', () => {
    popup.style.display = 'flex';
});

// Close the popup when the Close button is clicked
closeButton.addEventListener('click', () => {
    popup.style.display = 'none';
});




const priceElements = document.querySelectorAll('.p');

  // Calculate the total amount
  let totalAmount = 0;
  priceElements.forEach((priceElement) => {
    const priceText = priceElement.textContent.trim();
    const price = parseFloat(priceText.replace('$', ''));
    if (!isNaN(price)) {
      totalAmount += price;
    }
  });

  // Update the total amount in the <span>
  const totalAmountSpan = document.getElementById('totalAmount');
  totalAmountSpan.textContent = `$${totalAmount}`;

  
// Initialize cartCount from localStorage if available
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;

// Function to update the cart count
function updateCartCount() {
    cartCount++;
    document.getElementById("cart-count").textContent = cartCount;
    saveCartData(); // Save cart data to localStorage
}

// ... (rest of your code)
