console.log("working")
console.log("Alfarooq")

import inquirer from "inquirer";
class EscapeRoom {
    constructor() {
      this.currentRoom = 'Entrance';
    }
  
    displayWelcomeMessage() {
      console.log('Welcome to the Escape Room! Try to find your way out.');
    }
  
    async startGame() {
      this.displayWelcomeMessage();
  
      while (this.currentRoom !== 'Exit') {
        await this.navigate();
      }
  
      console.log('Congratulations! You have successfully escaped the room!');
    }
  
    async navigate() {
      const choices = ['Look around', 'Open the door', 'Check the table', 'Quit'];
  
      const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: `You are in the ${this.currentRoom}. What do you want to do?`,
        choices,
      });
  
      switch (action) {
        case 'Look around':
          this.lookAround();
          break;
        case 'Open the door':
          this.openDoor();
          break;
        case 'Check the table':
          this.checkTable();
          break;
        case 'Quit':
          this.quitGame();
          break;
        default:
          console.log('Invalid choice. Please try again.');
      }
    }
  
    lookAround() {
      console.log(`You look around the ${this.currentRoom}. It's dimly lit.`);
      // You can add more logic or prompts based on the room description.
    }
  
    openDoor() {
      if (this.currentRoom === 'Entrance') {
        console.log('You open the door and find a hallway.');
        this.currentRoom = 'Hallway';
      } else {
        console.log('There is no door to open in this room.');
      }
    }
  
    checkTable() {
      if (this.currentRoom === 'Hallway') {
        console.log('You find a key on the table.');
        this.currentRoom = 'Exit';
      } else {
        console.log('There is no table to check in this room.');
      }
    }
  
    quitGame() {
      console.log('Quitting the game. Better luck next time!');
      process.exit();
    }
  }
  
  // Start the game
  const escapeRoomGame = new EscapeRoom();
  escapeRoomGame.startGame();