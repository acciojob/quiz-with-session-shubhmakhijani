const userAnswers = JSON.parse(sessionStorage.getItem('progress')) || [];

const questionsElement = document.getElementById('questions-container');

function renderQuestions() {
  questionsElement.innerHTML = '';
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    questionElement.className = "question";
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
      questionElement.appendChild(document.createElement("br"));
    }
    questionsElement.appendChild(questionElement);
  }
}

function saveProgress() {
  const newAnswers = [];
  for (let i = 0; i < questions.length; i++) {
    const selectedOption = document.querySelector(`input[name="question-${i}"]:checked`);
    newAnswers.push(selectedOption ? selectedOption.value : null);
  }
  sessionStorage.setItem('progress', JSON.stringify(newAnswers));
}

function submitQuiz() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    const selectedOption = document.querySelector(`input[name="question-${i}"]:checked`);
    if (selectedOption && selectedOption.value === questions[i].answer) {
      score++;
    }
  }
  const scoreDisplay = document.getElementById('score');
  scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem('score', score);
  sessionStorage.removeItem('progress');
}

questionsElement.addEventListener('change', saveProgress);

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

renderQuestions();