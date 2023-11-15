import inquirer from "inquirer";
class EscapeRoom {
  constructor() {
    this.currentRoom = 1;
    this.maxGuesses = 2;
    this.guessCount = 0;
    this.rooms = [
      { description: 'You are in the office room. Look around and find hint to escape the room.', code: this.generateRandomCode() },
      { description: 'You are in the hospital room. Look around and find hint to escape the room.', code: this.generateRandomCode() }      
    ];
  }

  resetGuessCount() {
    this.guessCount = 0;
  }

  displayRoomDescription() {
    console.log(this.rooms[this.currentRoom - 1].description);
  }

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

  checkRoom() {
    console.log(`You look around the room and discover a paper with a 4-digit pin code: ${this.rooms[this.currentRoom - 1].code}.`);
    this.playRoom();
  }

  enterCode() {
    inquirer.prompt({
      type: 'input',
      name: 'code',
      message: 'Enter the 4-digit pin code:',
      validate: (input) => {
        const isValid = /^\d{4}$/.test(input);
        return isValid || 'Please enter a valid 4-digit number.';
      },
    }).then((answer) => {
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

        this.guessCount++;

        if (this.guessCount < this.maxGuesses) {
          console.log(`You have ${this.maxGuesses - this.guessCount} guess(es) remaining.`);
          this.enterCode();
        } else {
          console.log('The room heats up.');

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
}
