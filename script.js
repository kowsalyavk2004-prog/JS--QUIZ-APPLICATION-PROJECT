// REGISTER FUNCTION


function register() {
  let username = document.getElementById("regUser").value;
  let email = document.getElementById("regEmail").value;
  let password = document.getElementById("regPass").value;
  let confirmPassword = document.getElementById("regConfirmPass").value;
  console.log(register)

  // validation
  if (username === "" || email === "" || password === "" || confirmPassword === "") {
    alert("Fill all fields");
    return;
  }
  if (password.length < 6) {
    alert("Password must contain minimum 6 characters");
    return;
  }

  // confirm password check
  if (password !== confirmPassword) {
    alert("Password mismatch!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  // username check
  let userExists = users.find(function (u) {
    return u.username === username;
  });

  if (userExists) {
    alert("Username already exists!");
    return;
  }

  let emailExists = users.find(function (u) {
    return u.email === email;
  });

  if (emailExists) {
    alert("Email already registered!");
    return;
  }

  // save user
  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registered successfully!");

  // switch to login
  document.getElementById("registerDiv").style.display = "none";
  document.getElementById("loginDiv");

  window.location.href = "login.html";
}



function login() {
  let u = document.getElementById("loginUser").value;
  let p = document.getElementById("loginPass").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let valid = users.find(function (x) {
    return x.username === u && x.password === p;
  });

  if (u === "" || p === "") {
    alert("Fill all fields");
    return;
  }

  if (valid) {
    alert("Login success");
    window.location.href = "quiz.html";

  }

  else {
    alert("Invalid login");
  }

}






// Questions
const questions = [
  { q: "Capital of India?", options: ["Delhi", "Chennai", "Mumbai", "Kolkata"], answer: "Delhi" },
  { q: "2+2?", options: ["3", "4", "5", "6"], answer: "4" },
  { q: "Sun rises in?", options: ["West", "East", "North", "South"], answer: "East" },
  { q: "HTML stands for?", options: ["Hyper Text Markup Language", "High Text", "None", "Home Tool"], answer: "Hyper Text Markup Language" },
  { q: "CSS used for?", options: ["Style", "Logic", "Database", "Server"], answer: "Style" },
  { q: "JS stands for?", options: ["JavaScript", "Java", "Python", "C++"], answer: "JavaScript" },
  { q: "5*5?", options: ["10", "20", "25", "30"], answer: "25" },
  { q: "Water formula?", options: ["H2O", "CO2", "O2", "NaCl"], answer: "H2O" },
  { q: "Largest planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Jupiter" },
  { q: "Color of sky?", options: ["Blue", "Red", "Green", "Yellow"], answer: "Blue" }
];

// Random select 10
let quizQ = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
console.log(quizQ);

let index = 0;
let answers = new Array(10).fill(null);
// loadQ();



function loadQ() {
  let q = quizQ[index];

  document.getElementById("qNumber").innerText = "Question " + (index + 1);
  document.getElementById("question").innerText = q.q;

  let optDiv = document.getElementById("options");
  optDiv.innerHTML = "";

  q.options.forEach(opt => {
    let label = document.createElement("label");

    label.innerHTML = `
      <input type="radio" name="option" value="${opt}">
      <span>${opt}</span>
    `;

    if (answers[index] === opt) {
      label.querySelector("input").checked = true;
    }

    label.querySelector("input").addEventListener("change", () => {
      answers[index] = opt;
    });

    optDiv.appendChild(label);
  });

  // 👉 submit button logic
  if (index === quizQ.length - 1) {
    // window.location.href = "login.html";
    document.getElementById("submitBtn").style.display = "inline-block";
  } else {
    document.getElementById("submitBtn").style.display = "none";
  }

  if (index === quizQ.length - 1) {
    document.getElementById("nextBtn").style.display = "none";

  } else {
    document.getElementById("nextBtn").style.display = "inline-block";
  }

}





// NEXT
function nextQ() {
  if (index < 9) {
    index++;
    loadQ();
  }
}

// PREVIOUS
function prevQ() {
  if (index > 0) {
    index--;
    loadQ();
  }
}

// TIMER
let time = 120;
let timer;

function startTimer() {
  timer = setInterval(() => {
    time--;
    document.getElementById("timer").innerText = "Time: " + time;
    document.getElementById("timer").style.display = "block";

    if (time === 0) {
      submitQuiz();
    }
  }, 1000);
}

// SUBMIT
function submitQuiz() {
  clearInterval(timer);

  let score = 0;
  let resultHTML = "<h3>Result</h3>";

  quizQ.forEach((q, i) => {
    if (answers[i] === q.answer) {
      score++;
      resultHTML += `<p class="correct">Q${i + 1} ✔</p>`;
    } else {
      resultHTML += `<p class="wrong">Q${i + 1} ❌</p>`;
    }
  });

  resultHTML += `<h2>Score: ${score}/10</h2>`;

  document.getElementById("quizBox").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById("result").innerHTML = resultHTML;
  // document.getElementById("registerDiv").style.display = "none";
  // document.getElementById("loginDiv").style.display = "none";

}
window.onload = function () {

  if (document.getElementById("question")) {

    loadQ();
    startTimer();

  }

};
// window.onload = function () { 
//   if (window.location.pathname.includes("quiz.html") && localStorage.getItem("isLogin") !== "true") {
//     window.location.href = "login.html";
//      return;
//   } if (document.getElementById("question")) {
//     loadQ();
//      startTimer();
//   }
// };
function logout() {
  localStorage.removeItem("isLogin");
  window.location.href = "login.html";
}