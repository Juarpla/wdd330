const cartIcon = document.querySelector(".cart svg");

export function animateCartIcon() {
  // Add animation class to the cart icon
  cartIcon.classList.add("animate");

  // Remove the animation class after a certain duration
  setTimeout(() => {
    cartIcon.classList.remove("animate");
  }, 500);
}
