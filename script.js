/**
 * Project 3 versions 0-4 - 2D Web Game
 * Name:
 * 
 * Use this template to get started creating a simple 2D game for the web using P5.js. 
 */

// Global variable to track the game state
var gameState = "splash";
var player1;

function setup() {
  createCanvas(600, 400);
  player1 = new Player(width/2, height * 4/5);
  console.log(player1);
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
}

function play() {
  // Display the play screen
  background(0, 200, 0);
  fill(0, 0, 200);
  textAlign(CENTER);
  textSize(16);
  text("This is where the Game happens", width / 2, height / 2);
  player1.display();
}

function gameOver() {
  // Display the game over screen
  background(0);
  fill(255, 0, 0);
  textAlign(CENTER);
  textSize(16);
  text("Game Over!", width / 2, height / 2);
}

function mousePressed() {
  // Check the current game state and transition to the next state
  if (gameState == "splash") {
    gameState = "play"; // Move to the play state
  } else if (gameState == "play") {
    gameState = "gameOver"; // Move to the game over state
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
