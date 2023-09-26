


document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleButton");
  const hiddenElements = document.querySelectorAll(".box-menu.hide");
  const toggleBtn = document.getElementById("toggleBtn"); // Get the toggle button

  toggleButton.addEventListener("click", function () {
    hiddenElements.forEach(function (element) {
      element.style.display = "block";
    });
    
    // Toggle the display of the additional button
    if (toggleBtn.style.display === "none" || toggleBtn.style.display === "") {
      toggleBtn.style.display = "block";
    } else {
      toggleBtn.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleBtn");
  const hiddenFack = document.querySelectorAll(".box-menu.hide");

  toggleButton.addEventListener("click", function () {
      hiddenFack.forEach(function (element) {
          element.style.display = "none";
      });
  });
});






function buyButtonClicked() {
  var cartContent = document.getElementsByClassName('cart-content')[0];
  var cartBoxes = cartContent.getElementsByClassName('cart-box');

  if (cartBoxes.length === 0) {
      alert('Your cart is empty. Add items to your cart before checking out.');
  } else {
      alert('Your Order is Placed');
      // Here, you can add code to redirect the user to Checkout.html
      window.location.href = 'Checkout.html';

      // Clear the cart after the order is placed
      while (cartContent.hasChildNodes()) {
          cartContent.removeChild(cartContent.firstChild);
      }
      updatetotal();
  }
}


let li = document.querySelectorAll(".faq-text li");
for (var i = 0; i < li.length; i++) { // Change 'Array' to 'li.length'
  li[i].addEventListener("click", (e) => {
    let clickedLi;
    if (e.target.classList.contains("question-arrow")) {
      clickedLi = e.target.parentElement;
    } else {
      clickedLi = e.target.parentElement.parentElement;
    }
    clickedLi.classList.toggle("showAnswer");
  });
}





function Opennav() {
  document.getElementById("navbar").style.right = '0px';
}

function Closenav() {
  document.getElementById("navbar").style.right = '10000px';
}

 
  document.addEventListener('DOMContentLoaded', function() {
    const openFormButton = document.getElementById('open-icon');
    const closeFormButton = document.getElementById('close-form');
    const signUpFormSection = document.querySelector('.form-sign-up-section');

    openFormButton.addEventListener('click', function() {
      signUpFormSection.style.display = 'block';
    });

    closeFormButton.addEventListener('click', function() {
      signUpFormSection.style.display = 'none';
    });
  });

  
 

 