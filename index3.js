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

  checkCode(code) {
    return code == this.rooms[this.currentRoom - 1].code.toString();
  }

  endGame() {
    console.log('Game over. Better luck next time!');
  }

  generateRandomCode() {
    return Math.floor(1000 + Math.random() * 9000);
  }
}

const escapeRoomGame = new EscapeRoom();
escapeRoomGame.startGame();