import inquirer from "inquirer";

class EscapeRoom {
  constructor() {
    this.currentRoom = 1;
    this.maxGuesses = 2;
    this.guessCount = 0;
    this.rooms = [
      { description: 'You are in the office room. Look around and find hint to escape the room.', code: this.generateRandomCode() },
      { description: 'You are in the hospital room. Look around and find hint to escape the room.', code: this.generateRandomCode() }      
    ]; // Creates an array of rooms with descriptions and randomly generated codes
  }

//welcome message
  startGame() {
    console.log('Welcome to the Escape Room Game!');
    this.playRoom();
  }

 // Main game loop for playing the current room
  playRoom() {
    this.resetGuessCount(); // Reset guess count for current room
    this.displayRoomDescription(); // Display description of tcurrent room

    inquirer.prompt(this.getActions()).then((action) => {
      this.handleAction(action.choice); // prompt player for actions and handle response
    });
  }

// Reset guess count for current room
  resetGuessCount() {
    this.guessCount = 0;
  }


  displayRoomDescription() {
    console.log(this.rooms[this.currentRoom - 1].description); // Display description of current room
  }

// Define available actions using Inquirer
  getActions() {
    return [
      {
        type: 'list',
        name: 'choice',
        message: 'What do you want to do?',
        choices: [
          'Check the room',
          'Go to the door',
        ],
      },
    ];
  }

// Handle player action
  handleAction(choice) {

    switch (choice) {
      case 'Check the room':
        this.checkRoom();
        break;
      case 'Go to the door':
        this.enterCode();
        break;
      default:
        console.log('Invalid choice. Please choose a valid action.');
        this.playRoom();
    }

  }

// Player checks room to discovers a paper with code
  checkRoom() {
    console.log(`You look around the room and discover a paper with a 4-digit pin code: ${this.rooms[this.currentRoom - 1].code}.`);
    this.playRoom();
  }

// enters a 4-digit pin code
  enterCode() {

    inquirer.prompt({
      type: 'input',
      name: 'code',
      message: 'Enter the 4-digit pin code:',
      validate: (input) => {
        const isValid = /^\d{4}$/.test(input); // Checks if input consists of exactly 4 digits (0-9)

        return isValid || 'Please enter a valid 4-digit number.';
      },

  
    }).then((answer) => { // Check if code is correct
      const isCodeCorrect = this.checkCode(answer.code);

      if (isCodeCorrect) {
        console.log('Congratulations! Code is correct.');
        this.currentRoom++;

        if (this.currentRoom <= this.rooms.length) {
          this.playRoom();
        } else {
          console.log('Congratulations! You escaped the game!');
        }
      } else {
        console.log('Incorrect code.');


        this.guessCount++; // check if player has more guesses
 

        if (this.guessCount < this.maxGuesses) {
          console.log(`You have ${this.maxGuesses - this.guessCount} guess(es) remaining.`);
          this.enterCode();
        } else {
          console.log('The room heated up.');

          // lets player retry or end the game
          inquirer.prompt({
            type: 'confirm',
            name: 'retry',
            message: 'Do you want to try again?',
          }).then((answer) => {
            if (answer.retry) {
              this.playRoom();
            } else {
              this.endGame();
            }
          });
        }
      }
    });
  }

// Check if entered code is correct for current room
  checkCode(code) {
    return code == this.rooms[this.currentRoom - 1].code.toString();
  }

// Display "game over" message
 endGame() { 
    console.log('Game over. Better luck next time!');
  }

// Generate random 4-digit code
  generateRandomCode() { 
    return Math.floor(1000 + Math.random() * 9000);
  }
}

// starting the game
const escapeRoomGame = new EscapeRoom();
escapeRoomGame.startGame();
