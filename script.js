/**
 * Project 3 versions 0-4 - 2D Web Game
 * Name:
 * 
 * Use this template to get started creating a simple 2D game for the web using P5.js. 
 */

// Global variable to track the game state
var gameState = "splash";
var player1;
var timer; 
var testBox; // a box to preview on the splash screen
var dropTimer; // regulate box drops
var presents = new Array(0); // an empty array called "presents"
var score = 0; // keep track of points (starting at 0)

function setup() {
  createCanvas(600, 400);
  player1 = new Player(width/2, height * 4/5);
  console.log(player1);
  gameTimer = new Timer(5000); // 
  dropTimer = new Timer(1000); // 1 sec
  testBox = new Box(width/2, height/3);
}

function draw() {
  background(200);
  
  // Check the game state and call the appropriate function
  switch (gameState) {
    case "splash":
      splash(); // Display the splash screen
      break;
    case "play":
      play(); // Display the play screen
      break;
    case "gameOver":
      gameOver(); // Display the game over screen
      break;
    default:
      console.log("No match found - check your mousePressed() function!");
  }
}

function splash() {
  // Display the splash screen
  textAlign(CENTER);
  textSize(16);
  text("Let's Play a Game!", width / 2, height / 2);
  textSize(12);
  text("(click the mouse to continue)", width / 2, height / 2 + 30);

  testBox.display();
  testBox.spin();
}

function play() {
  // Display the play screen
  background(0, 200, 0);
  fill(0, 0, 200);
  textAlign(CENTER);
  textSize(16);
  text("This is where the Game happens", width / 2, height / 2);
  player1.display();

  if (gameTimer.isFinished()) {
    gameState = "gameOver"
  }

  if(dropTimer.isFinished()) {
    let p = new Box(random(width), -40);
    // new box, anywhere across the width of the canvas, but 40px above the canvas
    presents.push(p); // add object 'p' to the 'presents' Array
    dropTimer.start(); // restart timer for next drop
  }

  for(let i = 0; i < presents.length; i++) {
    // for each element of the array, represented by 'i', do the following:
  presents[i].display(); // draw it on the canvas
  presents[i].move(); // make it drop
  presents[i].spin() // make it rotate

  if(presents[i].y > height) {
    // present went below the canvas
    presents.splice(i, 1);
    // remove 1 element from from "presents" at index 'i'
    score--; // decrement score by 1
  }

  let d = dist(presents[i].x, presents[i].y, player1.x, player1.y);
  if (d < 50) {
    presents.splice(i, 1);
    score ++; // add 1 point! 


  }
   }

    textAlign(LEFT);
 text("elapsed time: " + gameTimer.elapsedTime, 40, 100);
 // show elapsed time in top left corner
 text("Score: " + score, 20, 40);
}

function gameOver() {
  // Display the game over screen
  background(0);
  fill(255, 0, 0);
  textAlign(CENTER);
  textSize(16);
  text("Game Over!", width / 2, height / 2);
  text("Your final score: " + score, width/2, height * 2/3);
}

function mousePressed() {
  // Check the current game state and transition to the next state
  if (gameState == "splash") {
    gameState = "play"; // Move to the play state
    gameTimer.start(); // starts the timer
    dropTimer.start(); // start the drop timer for presents
    score = 0; // reset score to 0 at start of game
  } else if (gameState == "play") {
    //gameState = "gameOver"; // Move to the game over state
  } else if (gameState == "gameOver") {
    gameState = "splash"; // Move back to the splash state
  }


  console.log("click!");
}

function keyPressed() {
  switch (keyCode){
    case UP_ARROW :
      player1.y -= 30;
      break;
      case DOWN_ARROW :
        player1.y += 30;
        break;
        case LEFT_ARROW :
        player1.x -= 30;
        break;
        case RIGHT_ARROW :
          player1.x += 30;
          break;
          default : 
            console.log("use the arrow keys to move");
  }
}
