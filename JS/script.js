
// NAVIGATION
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.querySelectorAll("nav button").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.page === pageId
    );
  });

  document.getElementById(pageId).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("nav button").forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

// TASK A: RISK ASSESSMENT
function assessRisk() {
  const risk = document.getElementById("riskType").value;

  const data = {
    phishing: {
      level: "High",
      impact: "A user may disclose credentials or sensitive information.",
      control: "Verify the sender, avoid suspicious links and enable MFA."
    },
    weak: {
      level: "High",
      impact: "An attacker may guess or reuse a weak password.",
      control: "Use a long, unique password and a password manager."
    },
    malware: {
      level: "High",
      impact: "Malware may damage files or expose information.",
      control: "Use trusted security software and install updates."
    },
    access: {
      level: "Medium",
      impact: "An unauthorized person may access protected information.",
      control: "Use least-privilege access and MFA."
    }
  };

  const item = data[risk];
  const box = document.getElementById("riskResult");

  box.className = "result warning";
  box.style.display = "block";

  box.innerHTML =
    "<strong>Demonstration risk level: " + item.level + "</strong>" +
    "<br><br><strong>Possible impact:</strong> " + item.impact +
    "<br><br><strong>Suggested control:</strong> " + item.control +
    "<br><br><small>Illustrative rating only.</small>";
}

// TASK B: PHISHING CHECKER
function loadExample() {
  document.getElementById("emailText").value =
    "URGENT! Your bank account will be blocked today. Click this link immediately to verify your password and OTP. You have won a prize. Act now!";
}

function clearEmail() {
  document.getElementById("emailText").value = "";
  document.getElementById("phishingResult").style.display = "none";
}

function checkPhishing() {
  const message = document.getElementById("emailText").value.trim();
  const box = document.getElementById("phishingResult");

  if (!message) {
    box.className = "result warning";
    box.style.display = "block";
    box.textContent = "Please enter a message before analyzing.";
    return;
  }

  const checks = [
    {
      label: "Urgent or threatening language",
      pattern: /\b(urgent|immediately|act now|blocked|suspended|expire|limited time)\b/i
    },
    {
      label: "Password or OTP request",
      pattern: /\b(password|otp|one.time password|verification code|pin)\b/i
    },
    {
      label: "Unexpected link or link instruction",
      pattern: /(https?:\/\/|www\.|click (here|this|the link)|open this link)/i
    },
    {
      label: "Prize or reward language",
      pattern: /\b(won|winner|prize|reward|claim now|free gift)\b/i
    },
    {
      label: "Threatening account language",
      pattern: /\b(account will be closed|account blocked|account suspended)\b/i
    }
  ];

  const found = checks.filter(check => check.pattern.test(message));

  box.style.display = "block";

  if (found.length >= 3) {
    box.className = "result danger";
    box.innerHTML = "<strong>Several phishing warning signs detected.</strong>";
  } else if (found.length > 0) {
    box.className = "result warning";
    box.innerHTML = "<strong>Potential warning signs detected.</strong>";
  } else {
    box.className = "result safe";
    box.innerHTML = "<strong>No listed warning keywords detected.</strong>";
  }

  if (found.length) {
    box.innerHTML +=
      "<br><br><strong>Warning signs:</strong><ul>" +
      found.map(item => "<li>" + item.label + "</li>").join("") +
      "</ul>";
  } else {
    box.innerHTML += "<br><br>No listed warning patterns were found.";
  }

  box.innerHTML +=
    "<br><strong>Important:</strong> This result does not prove whether a message is genuine or malicious. Verify requests independently. Never share passwords or OTPs.";
}

// TASK C: SYNTHETIC LOGIN MONITORING
const loginRecords = [
  {
    time: "09:00",
    location: "Usual location",
    activity: "Normal sign-in",
    status: "Successful",
    unusual: false
  },
  {
    time: "10:14",
    location: "Unknown location",
    activity: "Sign-in attempt",
    status: "Failed",
    unusual: true
  },
  {
    time: "10:16",
    location: "Unknown location",
    activity: "MFA request",
    status: "Denied",
    unusual: true
  },
  {
    time: "10:18",
    location: "Unknown location",
    activity: "MFA request",
    status: "Approved",
    unusual: true
  },
  {
    time: "10:20",
    location: "Unknown location",
    activity: "Session created",
    status: "Successful",
    unusual: true
  }
];

function displayLogins() {
  const rows = document.getElementById("loginRows");

  rows.innerHTML = loginRecords.map(record =>
    "<tr><td>" + record.time +
    "</td><td>" + record.location +
    "</td><td>" + record.activity +
    "</td><td>" + record.status +
    "</td></tr>"
  ).join("");
}

function analyzeLogins() {
  const unusual = loginRecords.filter(record => record.unusual);
  const box = document.getElementById("loginResult");

  box.className = "result warning";
  box.style.display = "block";

  box.innerHTML =
    "<strong>Unusual activity found in the sample timeline.</strong>" +
    "<br><br>Number of unusual records: " + unusual.length +
    "<br><br><strong>Observation:</strong> Multiple attempts came from an unknown location. An MFA request was denied, followed by approval and a successful session." +
    "<br><br><strong>Possible interpretation:</strong> The account may have been accessed by someone other than its owner. The records alone cannot prove this." +
    "<br><br><strong>Recommended actions:</strong><ul>" +
    "<li>Confirm whether the activity was expected.</li>" +
    "<li>Review active sessions and revoke unfamiliar sessions.</li>" +
    "<li>Reset a compromised password through the official service.</li>" +
    "<li>Contact the organization's security team.</li></ul>" +
    "<small>All records are fictional.</small>";
}

// TASK D: SECURITY QUIZ
function showSafetyQuiz() {
  document.getElementById("quiz").style.display = "block";
}

function answerQuiz(correct) {
  const answer = document.getElementById("quizAnswer");

  answer.style.display = "block";
  answer.style.padding = "12px";
  answer.style.marginTop = "10px";

  if (correct) {
    answer.className = "result safe";
    answer.innerHTML =
      "<strong>Correct!</strong> Never send passwords through email. Verify requests using the official website.";
  } else {
    answer.className = "result danger";
    answer.innerHTML =
      "<strong>Incorrect.</strong> Never share your password. Verify unexpected requests through an official channel.";
  }
}

// DISPLAY SAMPLE RECORDS
displayLogins();
