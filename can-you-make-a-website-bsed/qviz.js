const quizData = [
  {
    question: "Ե՞րբ է թագավորել Պապ թագավորը։",
    options: ["մ.թ.ա. 355 - 370", "355 - 370", "370 - 374"],
    answer: 2
  },
  {
    question: "Ո՞ր արքայատոհմի ներկայացուցիչ էր Պապ թագավորը։",
    options: ["Արշակունյաց", "Բագրատունյաց", "Ամատունյաց"],
    answer: 0
  },
  {
    question: "Ո՞ր հռոմեական գործիչը կարողացավ թունավորել Պապ թագավորին։",
    options: ["Վաղես", "Տերենտիոս", "Օկտավիանոս"],
    answer: 1
  }
];

const page = document.querySelector(".quiz-page");
const opener = document.querySelector(".quiz-opener");
const card = document.querySelector(".quiz-card");
const closeButton = document.querySelector(".quiz-close");
const counter = document.querySelector(".quiz-counter");
const question = document.querySelector(".quiz-question");
const options = document.querySelector(".quiz-options");
const feedback = document.querySelector(".quiz-feedback");
const nextButton = document.querySelector(".quiz-next");
const retryButton = document.querySelector(".quiz-retry");

let currentQuestion = 0;
let score = 0;
let answered = false;

function openQuiz() {
  page.classList.add("quiz-open");
  card.setAttribute("aria-hidden", "false");
  renderQuestion();
}

function closeQuiz() {
  page.classList.remove("quiz-open");
  page.classList.remove("quiz-result");
  card.setAttribute("aria-hidden", "true");
}

function renderQuestion() {
  const item = quizData[currentQuestion];
  answered = false;
  counter.textContent = `Հարց ${currentQuestion + 1} / ${quizData.length}`;
  question.textContent = item.question;
  feedback.textContent = "";
  nextButton.disabled = true;
  nextButton.hidden = false;
  retryButton.hidden = true;
  options.innerHTML = "";

  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.textContent = `${["ա", "բ", "գ"][index]}) ${option}`;
    button.addEventListener("click", () => chooseAnswer(index));
    options.append(button);
  });
}

function chooseAnswer(selectedIndex) {
  if (answered) return;

  answered = true;
  const item = quizData[currentQuestion];
  const optionButtons = [...document.querySelectorAll(".quiz-option")];
  const isCorrect = selectedIndex === item.answer;

  if (isCorrect) {
    score += 1;
    feedback.textContent = "Ճիշտ է։";
  } else {
    feedback.textContent = "Սխալ է։ Ճիշտ պատասխանը նշված է կանաչով։";
  }

  optionButtons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.answer) button.classList.add("is-correct");
    if (index === selectedIndex && !isCorrect) button.classList.add("is-wrong");
  });

  nextButton.disabled = false;
  if (currentQuestion === quizData.length - 1) {
    nextButton.textContent = "Տեսնել արդյունքը";
  }
}

function showResult() {
  const resultComments = [
    "Դիտիր դասը և կրկին փորձիր",
    "Միշտ կարող ես ևս մեկ անգամ փորձել",
    "Գրեթե ստացվեց, մի հանձնվիր",
    "Դու լեգենդ ես"
  ];

  page.classList.add("quiz-result");
  counter.textContent = "Արդյունք";
  question.textContent = `${score}/3 ճիշտ`;
  options.innerHTML = "";
  feedback.textContent = resultComments[score];
  nextButton.hidden = true;
  retryButton.hidden = false;
}

function nextQuestion() {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion += 1;
    nextButton.textContent = "Հաջորդ հարցը";
    renderQuestion();
    return;
  }

  showResult();
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  page.classList.remove("quiz-result");
  nextButton.textContent = "Հաջորդ հարցը";
  renderQuestion();
}

if (page && opener && card) {
  opener.addEventListener("click", openQuiz);
  closeButton.addEventListener("click", closeQuiz);
  nextButton.addEventListener("click", nextQuestion);
  retryButton.addEventListener("click", retryQuiz);
}
