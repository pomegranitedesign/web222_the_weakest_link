// DOM
const timer_text = document.getElementById("timer_text");
const current_bank = document.getElementById("current_bank");
const question = document.getElementById("question");
const answers = document.getElementById("answers");
const money_container = document.getElementById("money_container");
const bank_button = document.getElementById("bank_button");
const name_input = document.getElementById("name");
const name_container = document.getElementById("full_name");

// Classes
class Question {
  constructor(question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
  }

  renderQuestion() {
    question.innerHTML = this.question;

    let firstAnswer = this.answers[0],
      secondAnswer = this.answers[1],
      thirdAnswer = this.answers[2],
      fourthAnswer = this.answers[3];

    answers.children[0].innerHTML = firstAnswer;
    answers.children[1].innerHTML = secondAnswer;
    answers.children[2].innerHTML = thirdAnswer;
    answers.children[3].innerHTML = fourthAnswer;

    // Check if the player's answer is correct
    answers.children[0].addEventListener("click", event =>
      checkAnswer(event, this.correct)
    );

    answers.children[1].addEventListener("click", event =>
      checkAnswer(event, this.correct)
    );

    answers.children[2].addEventListener("click", event =>
      checkAnswer(event, this.correct)
    );

    answers.children[3].addEventListener("click", event =>
      checkAnswer(event, this.correct)
    );
  }
}

// Variables
let current_money = 0;
let current_round = 1;
let timer = 120,
  min = 0,
  sec = 0;

let questions = [
  new Question(
    'Which actor played James Bond in the 1967 film "You Only Live Twice"?',
    ["Roger Moore", "Sean Connery", "George Lazenby", "Optimus Prime"],
    "Sean Connery"
  ),

  new Question(
    "‘Christ the Redeemer’ is located in which place?",
    ["Rio De Janeiro", "Salvador", "Brasilia", "Porto Alegre"],
    "Rio De Janeiro"
  ),

  new Question(
    "Which among the following, religion has the highest population in the world?",
    ["Hinduism", "Buddhism", "Christianity", "Islam"],
    "Christianity"
  ),

  new Question(
    "A premier agency of Intelligence of Pakistan is",
    [
      "Federal Security Bureau (FSB)",
      "Inter-Services Intelligence (ISI)",
      "The Central Intelligence Agency (CIA)",
      "Ministry Of Intelligence"
    ],
    "Inter-Services Intelligence (ISI)"
  ),

  new Question(
    "Name the other house of the Parliament of US other than the House of Representatives?",
    ["Selicate", "Democratic Party", "Setate", "Senate"],
    "Senate"
  ),

  new Question(
    "What percentage of world’s terrestrial biodiversity does forest contain?",
    ["80%", "90%", "85%", "99%"],
    "80%"
  ),

  new Question(
    "Of all the wood produced in the world, what percentage of it is used for energy?",
    ["55%", "50%", "45%", "60%"],
    "50%"
  ),

  new Question(
    "‘Table Mountain’ is located at which place?",
    [
      "Johannesburg, South Africa",
      "Pretoria, South Africa",
      "Cape Town, South Africa",
      "Port Elizabeth, South Africa"
    ],
    "Cape Town, South Africa"
  ),

  new Question(
    "Name the city, where Taj Mahal is located in India?",
    ["Delhi", "Jaipur", "Agra", "Varanasi"],
    "Agra"
  ),

  new Question(
    "Which among the following is a symbol for Peace?",
    ["Green eyed monster", "Jade", "Olive Branch", "Heart"],
    "Olive Branch"
  ),

  new Question(
    "‘The Colosseum ‘is located in which country?",
    ["Venice", "Florence", "Rome", "Milan"],
    "Rome"
  ),

  new Question(
    "What percentage of land area do the mountains cover?",
    ["27%", "38%", "24%", "25%"],
    "25%"
  ),

  new Question(
    "Who is known as the ‘Father of Biology’?",
    ["Galen", "Aristotile", "Socrates", "Avicena"],
    "Aristotile"
  ),

  new Question(
    "Which among the following city is called as ‘The Venice of the North ‘?",
    ["Oslo", "Stockholm", "Copenhagen", "Helsinki"],
    "Stockholm"
  ),

  new Question(
    "When did the first modern Olympic Game held?",
    ["1987", "1896", "1789", "1869"],
    "1896"
  ),

  new Question(
    "The biggest protected area in the world is _",
    ["High Line", "Garden of Gods", "Kings Park", "Marae Moana"],
    "Marae Moana"
  ),

  new Question(
    "What is the currency of Ireland?",
    ["Euro", "Dollar", "Pound", "Dirham"],
    "Euro"
  )
];

let current_active_bank_index = 8;
let randomQuestionIndex = randomIndex(questions);
let current_question = questions[randomQuestionIndex];

// Functions
// Disables all answer buttons if the time is up
function disableAnswers() {
  answers.children[0].disabled = true;
  answers.children[1].disabled = true;
  answers.children[2].disabled = true;
  answers.children[3].disabled = true;
  bank_button.disabled = true;
}

// Check the player's answer
function checkAnswer(event, correct_answer) {
  player_answer = event.target.innerHTML;

  // Correct answer
  if (player_answer === correct_answer) {
    // Alert a message
    window.alert("Correct!");

    // Updates the money tree
    updateMoneyTree();

    // Displays a new question
    randomQuestionIndex = randomIndex(questions);
    current_question = questions[randomQuestionIndex];
    current_question.renderQuestion();
  }
}

// Sets the money tree back to 0
function setTreeBack() {
  money_container.children[current_active_bank_index].classList.remove(
    "active"
  );
  current_active_bank_index = 8;
  money_container.children[current_active_bank_index].classList.add("active");
}

// Timer function
function startTimer() {
  min = parseInt(timer / 60);
  sec = parseInt(timer % 60);

  if (timer < 1) {
    window.alert("Time Is Up!");
    disableAnswers();
    timer_text.innerHTML = `00:00`;
    document.location = "lost.html";
  } else {
    timer_text.innerHTML = `${min.toString()}:${sec.toString()}`;
    timer--;
    setTimeout(_ => startTimer(), 1000);
  }
}

// Returns a random index for the questions
function randomIndex(q) {
  return Math.floor(Math.random() * q.length);
}

function updateMoneyTree() {
  money_container.children[current_active_bank_index].classList.remove(
    "active"
  );
  current_active_bank_index--;
  money_container.children[current_active_bank_index].classList.add("active");
}

// Bank money
function bankMoney() {
  if (money_container.children[current_active_bank_index].innerHTML === "0")
    window.alert("No Money To Bank");

  if (money_container !== 500000) {
    let new_money = parseInt(
      money_container.children[current_active_bank_index].innerHTML
    );

    current_money += new_money;

    // Store the new money into the bank
    current_bank.innerHTML = current_money;

    // Set the money tree back to 0
    money_container.children[current_active_bank_index].classList.remove(
      "active"
    );
    current_active_bank_index = 8;
    money_container.children[current_active_bank_index].classList.add("active");
  }
}

function handleSubmit(event) {
  event.preventDefault();
  
  name_container.textContent = new_name;
}

function handleChange(event) {
  name_input.addEventListener("change", event => {
    const new_name = event.target.value;
  });

}

current_question.renderQuestion();
