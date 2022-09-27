const homeBtn = document.getElementById("home-btn");
const wrongDetailsText = document.getElementById("wrongdetails-text");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const logInBtn = document.getElementById("login-btn");
const logOutBtn = document.getElementById("logout-btn");
const registerBtn = document.getElementById("register-btn");
const dashboardLink = document.getElementById("dashboard-link");

const kaiCheck = (user) => {
  if (user.name === "kai") {
    return (wrongDetailsText.textContent =
      "This guy is sooo bad at Fortnite! ahahahahaha");
  }
};
const adminSettings = (user) => {
  if (user.isAdmin === true) {
    dashboardLink.textContent = "Dashboard"; // <=== admin settings
    return (wrongDetailsText.textContent = `logged in as ${user.name}`);
  }
};

const createAccBarry = () => {
  const bArr = [
    {
      name: "Barry",
      username: "barry",
      password: "hi",
      id: 0,
      isLoggedIn: false,
      isAdmin: true,
    },
  ];
  localStorage.setItem("Stored Users", JSON.stringify(bArr));
};

if (localStorage.getItem("Current User") === null) {
  localStorage.setItem("Current User", JSON.stringify([]));
}

if (localStorage.getItem("Stored Users") === null) {
  localStorage.setItem("Stored Users", JSON.stringify([]));
  createAccBarry();
}

let storedUsers = JSON.parse(localStorage.getItem("Stored Users"));
let fetchLastUser = storedUsers[storedUsers.length - 1];
let currentUser = JSON.parse(localStorage.getItem("Current User"));

const homeBtnFunc = homeBtn.addEventListener("click", () => {
  window.location.href = "../index.html";
});

const logIn = logInBtn.addEventListener("click", () => {
  logOutLogic();
  logInLogic();
});
const logOut = logOutBtn.addEventListener("click", () => {
  logOutLogic();
});

const register = registerBtn.addEventListener("click", () => {
  window.location.href = "../register-page/register.html";
});
const dashboard = dashboardLink.addEventListener("click", () => {
  window.location.href = "../dashboard/dashboard.html";
});

const logInLogic = () => {
  const mapUser = storedUsers.map((user) => user);
  if (mapUser.isLoggedIn !== true) {
    for (let i = 0; i < mapUser.length; i++) {
      let getUser = mapUser[i];
      if (
        usernameInput.value === getUser.username &&
        passwordInput.value === getUser.password
      ) {
        getUser.isLoggedIn = true;
        localStorage.setItem("Current User", JSON.stringify(getUser));
        storedUsers = storedUsers.map((user) =>
          user.id === getUser.id ? { ...user, isLoggedIn: true } : user
        );
        localStorage.setItem("Stored Users", JSON.stringify(storedUsers));
        wrongDetailsText.textContent = `Logged In as ${getUser.name}!`;
        kaiCheck(getUser);
        return adminSettings(getUser);
      } else if (usernameInput.value === "" && passwordInput.value === "") {
        wrongDetailsText.textContent = "You didnt enter anthing!";
      } else if (
        usernameInput.value !== getUser.username &&
        passwordInput.value !== getUser.password &&
        usernameInput.value !== "" &&
        passwordInput.value !== ""
      ) {
        wrongDetailsText.textContent = "Username or Password is incorrect!";
      }
    }
  }
};

if (currentUser.isLoggedIn === true) {
  wrongDetailsText.textContent = `Logged In as ${currentUser.name}!`;
}
const logOutLogic = () => {
  for (let i = 0; i < storedUsers.length; i++) {
    storedUsers[i].isLoggedIn = false;
  }
  localStorage.setItem("Stored Users", JSON.stringify(storedUsers));
  wrongDetailsText.textContent = "";
  dashboardLink.textContent = "";
  localStorage.setItem("Current User", JSON.stringify([]));
  document.body.style.backgroundColor = "black";
};

kaiCheck(currentUser);
adminSettings(currentUser);
// if (currentUser.name === "kai") {
//   wrongDetailsText.textContent =
//     "This guy is sooo bad at Fortnite! ahahahahaha";
// }
