const homeBtn = document.getElementById("home-btn");
const nameInput = document.getElementById("name-input");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const registerBtn = document.getElementById("register-btn");
const registerText = document.getElementById("register-text");

if (localStorage.getItem("Current User") === null) {
  let arr = [];
  localStorage.setItem("Current User", JSON.stringify(arr));
}

if (localStorage.getItem("Stored Users") === null) {
  localStorage.setItem("Stored Users", JSON.stringify([]));
  createAccBarry();
}

let storedUsers = JSON.parse(localStorage.getItem("Stored Users"));
let fetchLastUser = storedUsers[storedUsers.length - 1];

const homeBtnFunc = homeBtn.addEventListener("click", () => {
  window.location.href = "../index.html";
});
const register = registerBtn.addEventListener("click", () => {
  for (let i = 0; i < storedUsers.length; i++) {
    storedUsers[i].isLoggedIn = false;
  }

  const matchedAccountCheck = storedUsers.map(
    (username) => username.username === usernameInput.value
  );
  const check = matchedAccountCheck.includes(true);
  if (check !== true) {
    registerLogic();
  } else {
    registerText.textContent = "Username already exists!";
  }
});
const getRandomId = () => {
  let num = Math.floor(Math.random() * 9999999999);
  return num;
};

const registerLogic = () => {
  let incrementId = fetchLastUser.id + 1;
  if (nameInput.value && usernameInput.value && passwordInput.value !== "") {
    const addUser = {
      name: nameInput.value,
      username: usernameInput.value,
      password: passwordInput.value,
      id: incrementId,
      isLoggedIn: false,
      isAdmin: false,
    };
    addUser.isLoggedIn = true;
    storedUsers.push(addUser);
    localStorage.setItem("Current User", JSON.stringify(addUser));
    localStorage.setItem("Stored Users", JSON.stringify(storedUsers));
    if (addUser.isLoggedIn === true) {
      window.location.href = "../login-page/login.html";
    }
  } else {
    inputValueCheck();
  }
  localStorage.setItem("Stored Users", JSON.stringify(storedUsers));
};

const inputValueCheck = () => {
  if (
    nameInput.value === "" &&
    usernameInput.value === "" &&
    passwordInput.value !== ""
  ) {
    alert("You Didnt Enter A (Name) Or (Username)!");
  } else if (
    usernameInput.value === "" &&
    passwordInput.value === "" &&
    nameInput.value !== ""
  ) {
    alert("You Didnt Enter A (Username) Or (Password)!");
  } else if (
    nameInput.value === "" &&
    passwordInput.value === "" &&
    usernameInput.value !== ""
  ) {
    alert("You Didnt Enter A (Name) Or (Password)!");
  } else if (
    nameInput.value === "" &&
    usernameInput.value &&
    passwordInput.value !== ""
  ) {
    alert("You Didnt Enter A (Name)!");
  } else if (
    usernameInput.value === "" &&
    nameInput.value &&
    passwordInput.value !== ""
  ) {
    alert("You Didnt Enter A (Username)!");
  } else if (
    passwordInput.value === "" &&
    nameInput.value &&
    usernameInput.value !== ""
  ) {
    alert("You Didnt Enter A (Password)");
  } else {
    alert("You Didnt Enter Anything!");
  }
};

const deleteAllUsers = () => {
  localStorage.setItem("Stored Users", JSON.stringify([]));
};

const createAccBarry = () => {
  let bArr = [
    {
      name: "Barry",
      username: "barry",
      password: "hi",
      id: 1,
      isLoggedIn: false,
      isAdmin: true,
    },
  ];
  localStorage.setItem("Stored Users", JSON.stringify(bArr));
};

if (localStorage.getItem("Stored Users") === "[]") {
  createAccBarry();
}

// deleteAllUsers();
// createAccBarry();
