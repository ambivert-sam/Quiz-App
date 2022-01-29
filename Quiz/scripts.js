
const questions = [
    {
      questionText: "Commonly used data types DO NOT include:",
      options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
      answer: "3. alerts",
    },
    {
      questionText: "Arrays in JavaScript can be used to store ______.",
      options: [
        "1. numbers and strings",
        "2. other arrays",
        "3. booleans",
        "4. all of the above",
      ],
      answer: "4. all of the above",
    },
    {
      questionText:
        "String values must be enclosed within _____ when being assigned to variables.",
      options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
      answer: "3. quotes",
    },
    {
      questionText:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      options: [
        "1. JavaScript",
        "2. terminal/bash",
        "3. for loops",
        "4. console.log",
      ],
      answer: "4. console.log",
    },
    {
      questionText:
        "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
      options: ["1. break", "2. stop", "3. halt", "4. exit"],
      answer: "1. break",
    },
  ];
  
  let c = 0;
  let t = 50;
  let score = 0;
  let timerId;
  const No_Of_Highscores = 5;
  const HIGH_SCORES = "highscores"
  
  function startQuiz(){
      Timer();
      hideOthersContainers();
      document.getElementById("questionBox").style.display = "block";
  
      let c = 0;
  
      document.getElementById("question").innerHTML = questions[c].questionText;
      document.getElementById("1").innerHTML = questions[c].options[0];
      document.getElementById("2").innerHTML = questions[c].options[1];
      document.getElementById("3").innerHTML = questions[c].options[2];
      document.getElementById("4").innerHTML = questions[c].options[3];
  }
  
  // Function to show answer for some seconds
  function showAnswer()
  {
      document.getElementById("ansBox").style.display = "block"
      setTimeout(function() { 
          document.getElementById("ansBox").style.display = "none"
      }, 1000)
  
      
  }
  // Function to check answer
  async function checkAns(_id){
      if(_id == questions[c].answer[0])
      {
          document.getElementById("answerText").innerHTML = "Correct";
          score += 10;
      }
      else{
          document.getElementById("answerText").innerHTML = "Incorrect";
          t = t - 10;
  
      }
      
      showAnswer();
      showNext();
  }
  
  function showNext(_id){
      c += 1;
      // document.getElementById("ansBox").style.display = "none";
     
      if(c<questions.length)
      {
          document.getElementById("question").innerHTML = questions[c].questionText;
          document.getElementById("1").innerHTML = questions[c].options[0];
          document.getElementById("2").innerHTML = questions[c].options[1];
          document.getElementById("3").innerHTML = questions[c].options[2];
          document.getElementById("4").innerHTML = questions[c].options[3];
      }
      console.log("showNext function end");
      
      if(c == questions.length)
      {
          endOfQuiz();
      }
  }
  
  function Timer(){
      timerId = setInterval(function(){
          t = t-1;
          if(t<0)
          {
              endOfQuiz();
              return;
          }
         showTime(t);
      }, 1000)
  }
  
  function endOfQuiz(){
      clearTimeout(timerId);
      timerId = null;
      hideOthersContainers()
      document.getElementById("endQuiz").style.display = "block";
  
      document.getElementById("score").innerHTML = score;
      
  }
  
  function onSubmit(e){
      let name = document.querySelector('input'). value;
      checkHighScore(name, score);
  
      
  }
  
  // hide all containers
  function hideOthersContainers(){
      document.getElementById("highScoresBox").style.display = "none";
      document.getElementById("questionBox").style.display = "none";
      document.getElementById("endQuiz").style.display = "none";
      document.getElementById("box1").style.display = "none";
  }
  
  function checkHighScore(name, score){
      const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
      const lowestScore = highScores[No_Of_Highscores - 1]?.score ?? 0;
  
      if(score > lowestScore){
          saveHighScore(name, score, highScores);
          // showHighScores();
      }
      showHighScores();
  }
  
  // save high scores in local storage
  function saveHighScore(name, score, highScores){
      const newScore = {score, name};
  
      // Add to list
      highScores.push(newScore);
  
      // sort the list
      highScores.sort((a, b) => b.score - a.score);
  
      // select new list
      highScores.splice(No_Of_Highscores);
  
      // save to local storage
      localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));
  }
  
  // Show high scores
  function showHighScores(){
      clearTimeout(timerId);
      timerId = null;
      showTime(" ");
  
      hideOthersContainers();
      document.getElementById("highScoresBox").style.display = "block";
      const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) ?? [];
      const highScoreList = document.getElementById("highScores");
    
      highScoreList.innerHTML = highScores
      .map((score) => `<li>${score.name} - ${score.score}`)
      .join('');
  }
  
  function Home(){
      clearTimeout(timerId);
      showTime(" ");
      hideOthersContainers();
      document.getElementById("box1").style.display = "block";
  
      // reinitialize variables
      c = 0;
      t = 50;
      score = 0;
      timerId = null;
  }
  
  function clearStorage(){
      localStorage.clear();
      Home();
  }
  
  function showTime(t){
       document.getElementById("t_count").innerHTML = t;
  }
  
  