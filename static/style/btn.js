// Open Search Bar
document.getElementById("search").addEventListener("click", () => {
  document.querySelector("#input").style.display = "inline";
  document.querySelector("#close").style.display = "inline";
  document.querySelector("#search").style.display = "none";
});
// Close Search Bar
document.getElementById("close").addEventListener("click", () => {
  document.querySelector("#search").style.display = "inline";
  document.querySelector("#input").style.display = "none";
  document.querySelector("#close").style.display = "none";
});

// Login or signup
document.querySelector(".btns").addEventListener("click", () => {
  alert('Sorry, you can't log in or sign in—this is just a simple music page created with love by Sabir. Enjoy the tunes! 🎶')
});


// Open Search Bar
document.querySelector(".open_left_menu").addEventListener("click", () => {
document.querySelector(".left").style.display = "inline";
document.querySelector(".close_left_menu").style.display = "inline";
document.querySelector(".open_left_menu").style.display = "none";
});
// Close Search Bar
document.querySelector(".close_left_menu").addEventListener("click", () => {
  document.querySelector(".open_left_menu").style.display = "inline";
  document.querySelector(".left").style.display = "none";
document.querySelector(".close_left_menu").style.display = "none";

});
