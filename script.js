let correctAnswers = parseInt(localStorage.getItem("correctAnswers")) || 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
let shuffledQuiz = [];

const words = [
  { german: "Hund", russian: "Собака" },
  { german: "Katze", russian: "Кіт" },
  { german: "Apfel", russian: "Яблуко" },
  { german: "Haus", russian: "Дом" },
  { german: "Auto", russian: "Автомобіль" },
  { german: "Blume", russian: "Квітка" },
  { german: "Tasche", russian: "Сумка" },
  { german: "Fluss", russian: "Річка" },
  { german: "Buch", russiann: "Книга" },
  { german: "Stuhl", russia: "Стул" },
  { german: "Fenster", russian: "Вікно" },
  { german: "Tür", russian: "Двері" },
  { german: "Straße", russian: "Вулиця" },
  { german: "Stadt", russian: "Город" },
  { german: "Dorf", russian: "Село" },
  { german: "Baum", russian: "Дерево" },
  { german: "Wasser", russian: "Вода" },
  { german: "Feuer", russian: "Вогонь" },
  { german: "Himmel", russian: "Небо" },
  { german: "Erde", russian: "Земля" },
  { german: "Freund", russian: "Друг" },
  { german: "Mädchen", russian: "Дівчинка" },
  { german: "Junge", russian: "Хлопець" },
  { german: "Lehrer", russian: "Вчитель" },
  { german: "Schule", russian: "Школа" },
  { german: "Tisch", russian: "Стіл" },
  { german: "Bett", russian: "Ліжко" },
  { german: "Lampe", russian: "Лампа" },
  { german: "Stift", russian: "Ручка" },
  { german: "Papier", russian: "Бумага" },
  { german: "Milch", russian: "Молоко" },
  { german: "Brot", russian: "Хліб" },
  { german: "Käse", russian: "Сир" },
  { german: "Fisch", russian: "Риба" },
  { german: "Fleisch", russian: "Мясо" },
  { german: "Obst", russian: "Фрукти" },
  { german: "Gemüse", russian: "Овочі" },
  { german: "Zug", russian: "Поїзд" },
  { german: "Flugzeug", russian: "Літак" },
  { german: "Fahrrad", russian: "Велосипед" },
  { german: "Telefon", russian: "Телефон" },
  { german: "Computer", russian: "Компьютер" },
  { german: "Fensterbank", russian: "Подоконник" },
  { german: "Schlüssel", russian: "Ключ" },
  { german: "Uhr", russian: "Часи" }

];


let currentIndex = 0;

function showWord() {
  const wordElement = document.getElementById("word");
  const translationElement = document.getElementById("translation");

  const currentWord = words[currentIndex];
  wordElement.textContent = currentWord.german;
  translationElement.textContent = currentWord.russian;
}

function nextWord() {
  currentIndex = (currentIndex + 1) % words.length;
  showWord();
  generateQuiz(); // обновим тест при смене слова
}

function updateScore() {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Правельних відповідей: ${correctAnswers}`;
}

function playAudio() {
  const currentWord = words[currentIndex];
  const utterance = new SpeechSynthesisUtterance(currentWord.german);
  utterance.lang = "de-DE";
  speechSynthesis.speak(utterance);
}

function shuffleQuiz(array) {
  return array.sort(() => Math.random() - 0.5);
}

function generateQuiz() {
  const quizQuestion = document.getElementById("quiz-question");
  const quizOptions = document.getElementById("quiz-options");

  const currentWord = words[currentIndex];
  quizQuestion.textContent = `Як переводиться слово${currentWord.german}"?`;

  const wrongAnswers = words
    .filter((w, i) => i !== currentIndex)
    .map(w => w.russian);
 const shuffledWrong = shuffleQuiz(wrongAnswers).slice(0, 3);
const allOptions = shuffleQuiz([currentWord.russian, ...shuffledWrong]);

  quizOptions.innerHTML = "";

  allOptions.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => {
      if (option === currentWord.russian) {
        correctAnswers++;
        localStorage.setItem("correctAnswers", correctAnswers);
        alert(`✅ Правильно! : ${correctAnswers}`);
      } else {
        alert(`❌ Неправильно. Правильних відповідей: ${currentWord.russian}`);
      }
      updateScore();
    };
    quizOptions.appendChild(btn);
  });
}

// ✅ Вынесенная отдельно функция сброса
function resetProgress() {
  correctAnswers = 0;
  localStorage.removeItem("correctAnswers");
  updateScore();
  alert("🔄 Обновити прогрес!");
}
const quizData = [
  {
    question: "Що означає слово 'Buch'?",
    options: ["Книга", "Собака", "Вікно", "Місто"],
    answer: 0
  },
  {
    question: "Як перекладається слово  'Straße'?",
    options: ["Село", "Вулиця", "Квітка", "Дом"],
    answer: 1
  },
  {
    question: "Що означає слово 'Apfel'?",
    options: ["Яблоко", "Автомобіль", "Сумка", "Кіт"],
    answer: 0
  },
  {
    question: "Як перекладається слово 'Tasche'?",
    options: ["Сумка", "Крісло", "Вікно", "Двері"],
    answer: 0
  },
  {
    question: "Що означає слово 'Fluss'?",
    options: ["Місто", "Річка", "Село", "Сад"],
    answer: 1
  },

  {
    question: " Як перекладається слово 'Haus'?",
    options: ["Дім", "Вікно", "Школа", "Ліжко"],
    answer: 0
  },
  {
    question: "Як перекладається слово 'Auto'?",
    options: ["Автомобиль", "Ручка", "Книга", "Дерево"],
    answer: 0
  },
  {
    question: "Як перекладається слово 'Blume'?",
    options: ["Квітка", "Сумка", "Дівчинка", "Молоко"],
    answer: 0
  },
  {
    question: "Як перекладається слово 'Fisch'?",
    options: ["Риба", "Мясо", "Фрукти", "Овочі"],
    answer: 0
  },
  {
    question: "Як перекладається слово 'Telefon'?",
    options: ["Телефон", "Компьютер", "Потяг", "Літак"],
    answer: 0
  },
  {
    question: "Як перекладається слово 'Papier'?",
    options: ["Бумага", "Книга", "Стіл", "Лампа"],
    answer: 0
  },
  {
    question: "Як перекладається слово 'Freund'?",
    options: ["Друг", "Вчитель", "Хлопчик", "Місто"],
    answer: 0
  },
  {
    question: "Як перекладається слово 'Milch'?",
    options: ["Молоко", "Сир", "Хліб", "Мясо"],
    answer: 0
  },
  {
    question: "Как переводится 'Tür'?",
    options: ["Двері", "Вікно", "Крісло", "Стіл"],
    answer: 0
  },
  {
    question: "Як перекладається слово 'Stadt'?",
    options: ["Місто", "Село", "Вулиця", "Дім"],
    answer: 0
  }

];


function loadQuiz() {
  const container = document.getElementById("quizContainer");
  container.innerHTML = "";

  // 🔁 Перемешиваем вопросы
 shuffledQuiz = shuffleQuiz([...quizData]);

  shuffledQuiz.forEach((q, index) => {
    const card = document.createElement("div");
    card.className = "quiz-card";

    const question = document.createElement("h3");
    question.textContent = q.question;
    card.appendChild(question);

    q.options.forEach((option, i) => {
      const label = document.createElement("label");
      label.innerHTML = `
        <input type="radio" name="q${index}" value="${i}" />
        <span>${option}</span>
      `;
      card.appendChild(label);
    });

    container.appendChild(card);
  });

  updateProgress();
}
function resetMultiQuiz() {
  document.getElementById("scoreResult").textContent = "";
  loadQuiz(); // ← это должно быть
  updateProgress();
}
function checkAnswers() {
  let score = 0;
 shuffledQuiz.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && parseInt(selected.value) === q.answer) {
      score++;
    }
  });

  const result = document.getElementById("scoreResult");
  result.textContent = `Ваш результат: ${score} из ${quizData.length}`;

  if (score === quizData.length) {
    result.style.color = "green";
    result.textContent += " 🎉 Бездогано!";
  } else {
    result.style.color = "#222";
  }
}
  document.getElementById("scoreResult").textContent = `Ваш результат: ${score} из ${quizData.length}`;


function resetMultiQuiz() {
  quizData.forEach((q, index) => {
    const inputs = document.querySelectorAll(`input[name="q${index}"]`);
    inputs.forEach(input => input.checked = false);
  });

  document.getElementById("scoreResult").textContent = "";

  loadQuiz(); // перемешиваем вопросы
  updateProgress(); // сбрасываем прогрессбар
}
 window.onload = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (user) {
    showWelcome(user.name); // показываем тесты и приветствие
  } else {
    // скрываем всё, если пользователь не вошёл
    document.getElementById("word-section").style.display = "none";
    document.getElementById("single-quiz-section").style.display = "none";
    document.getElementById("multi-quiz-section").style.display = "none";
  }

  showWord();
  generateQuiz();
  updateScore();
  loadQuiz();
};

function updateProgress() {
  let answered = 0;
  quizData.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected) {
      answered++;
    }


  });

   const progressElement = document.getElementById("multi-progress");
progressElement.style.width = `${(answered / quizData.length) * 100}%`; 
}

function register() {
  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  if (name && email && password) {
    const user = { name, email, password };
    localStorage.setItem("user_" + email, JSON.stringify(user));
    alert("✅ Вхій  успішний!");
  } else {
    alert("❗ Будьласка заповніть всі поля.");
  }
}

function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const storedUser = localStorage.getItem("user_" + email);
  if (storedUser) {
    const user = JSON.parse(storedUser);
    if (user.password === password) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      showWelcome(user.name);
    } else {
      alert("❌ Невельний пароль.");
    }
  } else {
    alert("❌ Акаунт не найдений.");
  }
}

function showWelcome(name) {
  document.getElementById("welcome-message").textContent = `👋 Привіт, ${name}!`;
  document.getElementById("logout-btn").style.display = "inline-block";
  document.getElementById("register-form").style.display = "none";
  document.getElementById("login-form").style.display = "none";

  document.getElementById("word-section").style.display = "block";
  document.getElementById("single-quiz-section").style.display = "block";
  document.getElementById("multi-quiz-section").style.display = "block";
}

function logout() {
  localStorage.removeItem("loggedInUser");

  document.getElementById("word-section").style.display = "none";
  document.getElementById("single-quiz-section").style.display = "none";
  document.getElementById("multi-quiz-section").style.display = "none";

  document.getElementById("register-form").style.display = "block";
  document.getElementById("login-form").style.display = "block";
  document.getElementById("welcome-message").textContent = "";
  document.getElementById("logout-btn").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  loadQuiz(); // или generateMultiQuiz()
});
function showWord() {
  const wordElement = document.getElementById("word");
  const translationElement = document.getElementById("translation");
  const imageElement = document.getElementById("word-image");

  const currentWord = words[currentIndex];
  wordElement.textContent = currentWord.german;
  translationElement.textContent = currentWord.russian;

  const imageName = currentWord.german.toLowerCase().replace(/[^a-zäöüß]/gi, "");
  imageElement.src = `img/${imageName}.png`;
  imageElement.alt = currentWord.german;

  // 🛡️ Fallback
  imageElement.onerror = () => {
    imageElement.src = "img/default.png";
  };
}
window.addEventListener("DOMContentLoaded", () => {
  loadQuiz();
});