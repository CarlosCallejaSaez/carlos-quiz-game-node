import readline from 'readline';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import {questions} from './questions.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



let currentQuestion = 0;
let correctAnswers = 0;
let totalQuestions = questions.length;
let score = 0;
let highScore = 0;
let round = 1;

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

function showQuestion() {
    console.log(chalk.yellow(questions[currentQuestion].question));
    questions[currentQuestion].options.forEach((option, index) => {
        console.log(chalk.blue(`${index + 1}. ${option}`));
    });
}

function play() {
    const currentQuestionObj = questions[currentQuestion];
    showQuestion();
    rl.question('Select the number of the correct option (or type "hint" for a hint): ', (response) => {
        if (response.toLowerCase() === 'hint') {
            const hintIndex = Math.floor(Math.random() * currentQuestionObj.options.length);
            const hint = currentQuestionObj.options[hintIndex];
            console.log(chalk.yellow(`Hint: One of the incorrect options is "${hint}".`));
            play();
        } else {
            const selectedOption = parseInt(response);
            if (selectedOption >= 1 && selectedOption <= currentQuestionObj.options.length) {
                const correctAnswerIndex = currentQuestionObj.options.indexOf(currentQuestionObj.answer) + 1;
                if (selectedOption === correctAnswerIndex) {
                    console.log(chalk.green('Correct answer!'));
                   
                    correctAnswers++;
                } else {
                    console.log(chalk.red('Incorrect answer.'));
                    console.log(chalk.green(`The correct answer was: ${currentQuestionObj.answer}`));
                }
                moveNext();
            } else {
                console.log(chalk.red('Please select a valid number or type "hint" for a hint.'));
                play();
            }
        }
    });
}

function moveNext() {
    currentQuestion++;
    if (currentQuestion < totalQuestions) {
        play();
    } else {
        console.log(chalk.blue(`End of round ${round}!`));
        console.log(chalk.yellow(`Correct answers: ${correctAnswers} out of ${totalQuestions}`));
      
        
        rl.question('Would you like to play another round? (yes/no): ', (response) => {
            if (response.toLowerCase() === 'yes') {
                round++;
                currentQuestion = 0;
                correctAnswers = 0;
                score = 0;
                shuffleQuestions();
                play();
            } else {
                console.log(chalk.blue('Thanks for playing!'));
                rl.close();
            }
        });
    }
}


const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms))

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
      'CARLOS QUIZ GAME \n'
    );
  
    await sleep();
    
  
   
  }
  console.clear();

  

await welcome();
console.log("🏁🏁🏆🏆")
console.log(chalk.bgRed(`⠀⠀⠀⠀⢀⣀⣠⣤⣤⣶⣶⣤⣤⣄⣀⡀⠀⠀⠀⠀
⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⠿⠿⠛⠛⠛⠉⠉⠉⠉⠛⠛⠛⠿⢿⣿⣿⣿
⣿⣿⡇⠀⠀⠀⠀⠀⣤⣴⣷⡄⠀⠀⠀⠀⠀⢸⣿⣿
⣿⣿⡇⠀⠀⠀⢀⠴⡄⣸⣿⡏⠀⠀⠀⠀⠀⢸⣿⣿
⢹⣿⣷⠀⠀⠀⠁⡤⢶⣿⣿⣁⠀⢠⠀⠀⠀⣿⣿⡏
⠈⢿⣿⣇⠀⠀⠀⢳⠀⢙⣿⣿⣷⠾⠀⠀⣸⣿⡿⠀
⠀⠘⣿⣿⣆⠀⠀⠠⠤⠾⢹⡏⠀⠀⠀⣰⣿⣿⠃⠀
⠀⠀⠘⢿⣿⣷⡀⠀⠀⠰⠟⠀⠀⢀⣾⣿⡿⠃⠀⠀
⠀⠀⠀⠈⠻⣿⣿⣦⡀⠀⠀⢀⣴⣿⣿⠟⠁⠀⠀⠀
⠀⠀⠀⠀⠀⠈⠻⣿⣿⣷⣾⣿⣿⠟⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠙⠿⠿⠋⠀⠀⠀⠀⠀⠀⠀⠀`))

console.log(chalk.inverse('Answer all questions correctly to win Carlos Quiz Game.'));
console.log(chalk.hex('#DEADED').inverse('Check out my GitHub for more projects:'));
console.log(chalk.hex('#FFA500').underline('https://github.com/CarlosCallejaSaez'));



play();
shuffleQuestions();
