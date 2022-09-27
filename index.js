const title = document.getElementById("title");
const logInPageBtn = document.getElementById("loginpage-btn");
const greetUserEl = document.getElementById("greet-user");
const hi = document.getElementById("hi");

if (localStorage.getItem("Current User") === null) {
  let arr = [];
  localStorage.setItem("Current User", JSON.stringify(arr));
}

if (localStorage.getItem("Stored Users") === null) {
  localStorage.setItem("Stored Users", JSON.stringify([]));
}

const logInPage = logInPageBtn.addEventListener("click", () => {
  window.location.href = "./login-page/login.html";
});
