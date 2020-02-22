/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What does THAC0 stand for?',
      answers: [
        'To Hit Armor Class 0',
        'The Highest Armor Class, 0',
        'The Holy Angel Council 0',
        'The History A Chronicle: 0'
      ],
      correctAnswer: 'To Hit Armor Class 0'
    },
    {
      question: 'The spell Fireball has which of the following characteristics?',
      answers: [
        'Arcane, Conjuration, 1st level, 2d4/CL 20d4 max',
        'Divine, Elemental Fire, 4th level, 3d8+1/CL 3d8+20 max',
        'Arcane, Evocation, 3rd level, 1d6/CL 10d6 max',
        'Arcane, Incantation, 3rd level, 1d6/CL 15d6 max'
      ],
      correctAnswer: 'Arcane, Evocation, 3rd level, 1d6/CL 10d6 max'
    },
    {
      question: 'Which of the following is a real Sage/Specialist class?',
      answers: [
        'Mystic',
        'Cartographer',
        'Warlock',
        'Songmage'
      ],
      correctAnswer: 'Cartographer'
    },
    {
      question: 'At what level does a Cleric achieve their Lord Level?',
      answers: [
        '10th',
        '11th',
        '8th',
        '9th'
      ],
      correctAnswer: '8th'
    },
    {
      question: 'Which of these is not a real breed of Dragons?',
      answers: [
        'Mercury Dragon',
        'Cloud Dragon',
        'Amethyst Dragon',
        'Ice Dragon'
      ],
      correctAnswer: 'Ice Dragon'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */
renderIntroView()
startQ()

function renderIntroView() {
  store.score = 0;
  store.questionNumber = 0;
  $("main").html(`
  <h2>This Quiz will test useless knowledge about an outdated edition of Dungeons and Dragons!</h2>
  <form id='start'>
    <button class='startButton' input type="submit">Start Quiz</button>
  </form>
  `)
}

function renderQuestionView() {

  $("main").html(`
    <aside>Your current score is ${store.score}!</aside>
    <aside>${store.questionNumber + 1}/5</aside>
    <form id='form'>
    <fieldset>
    <legend><h2>${store.questions[store.questionNumber].question}</h2></legend>
		  <input id='answer' type="radio" name='answer' value='${store.questions[store.questionNumber].answers[0]}' required>
      <label for='answer'>${store.questions[store.questionNumber].answers[0]}</label><br>
      <input id='answer' type="radio" name='answer' value='${store.questions[store.questionNumber].answers[1]}' required>
      <label for='answer'>${store.questions[store.questionNumber].answers[1]}</label><br>
      <input id='answer' type="radio" name='answer' value='${store.questions[store.questionNumber].answers[2]}' required>
      <label for='answer'>${store.questions[store.questionNumber].answers[2]}</label><br>
      <input id='answer' type="radio" name='answer' value='${store.questions[store.questionNumber].answers[3]}' required>
      <label for='answer'>${store.questions[store.questionNumber].answers[3]}</label>
    </fieldset>
      <button class='qButton'>Submit</button>
    </form>`);
}

function renderFeedbackViewC() {
  $("main").html(`
    <aside>Correct!</aside>
    <form id='feedback'>
      <button class='feedButton' input type="submit">Next</button>
    </form>
  `)
  store.questionNumber++
  store.score++
}

function renderFeedbackViewF() {
  $("main").html(`
    <aside>I'm sorry, that answer was incorrect. The correct answer was ${store.questions[store.questionNumber].correctAnswer}.</aside>
    <form id='feedback'>
      <button class='feedButton' input type="submit">Next</button>
    </form>
  `)
  store.questionNumber++
}

function renderResultsView() {
  $("main").html(`
    <h2>Your final score is ${store.score}!</h2>
    <form id='cycle'>
      <button class='resetButton' input type="submit">Try Again?</button>
    </form>
  `)
}

//Render ^
//Event Handler v

function startQ(){
  $("main").on("click", ".startButton", event => {
    event.preventDefault();
    submitQuestion();
    submitFeedback();
    store.quizStarted = true;
    renderQuestionView();
  })
}

function submitQuestion(){
  $("main").on("click", ".qButton", event =>  {
    event.preventDefault();
    if($("input:checked").val() === store.questions[store.questionNumber].correctAnswer){
      renderFeedbackViewC();
    } else {
      renderFeedbackViewF();
    }
  })
}

function submitFeedback(){
  $("main").on("click", ".feedButton", event =>  {
    event.preventDefault();
    if(store.questionNumber === 5){
      renderResultsView();
    } else {
      renderQuestionView();
    }
  })
}

function resetQuiz(){
  $("main").on("click", ".resetButton", event => {
    event.preventDefault();
    renderIntroView();
  })
}