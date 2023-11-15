
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