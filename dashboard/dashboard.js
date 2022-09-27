const homeBtn = document.getElementById("home-btn");
const toggleAdminInput = document.getElementById("toggleadmin-input");
const toggleAdminBtn = document.getElementById("toggleadmin-btn");

const btn = document.getElementById("btn");
const homeBtnFunc = homeBtn.addEventListener("click", () => {
  window.location.href = "../index.html";
});

btn.addEventListener("click", (event) => {
  const audio = new Audio("../audio/nicebeat.mp3");
  audio.play();
});

toggleAdminBtn.addEventListener("click", () => {
  toggleAdmin();
});
const toggleAdmin = () => {
  if (localStorage.getItem("Current User") !== "") {
    let currentUser = JSON.parse(localStorage.getItem("Current User"));
    let storedUsers = JSON.parse(localStorage.getItem("Stored Users"));
    storedUsers = storedUsers.map((user) =>
      user.username === toggleAdminInput.value
        ? { ...user, isAdmin: !user.isAdmin }
        : user
    );
    localStorage.setItem("Stored Users", JSON.stringify(storedUsers));
  }
};
