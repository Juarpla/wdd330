export function animateCartIcon() {
  const cartIcon = document.querySelector(".cart svg");
  // Add animation class to the cart icon
  cartIcon.classList.add("animate");

  // Remove the animation class after a certain duration
  setTimeout(() => {
    cartIcon.classList.remove("animate");
  }, 500);
}
