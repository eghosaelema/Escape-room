import inquirer from &quot;inquirer&quot;;
class EscapeRoom {
  constructor() {
    this.currentRoom = 1;
    this.maxGuesses = 2;
    this.guessCount = 0;
    this.rooms = [
      { description: &#39;You are in the office room. Look around and find hint to
escape the room.&#39;, code: this.generateRandomCode() },
      { description: &#39;You are in the hospital room. Look around and find hint to
escape the room.&#39;, code: this.generateRandomCode() }      
    ]; // Creates an array of rooms with descriptions and randomly generated
codes
  }
//welcome message
  startGame() {
    console.log(&#39;Welcome to the Escape Room Game!&#39;);
    this.playRoom();
  }
 // Main game loop for playing the current room
  playRoom() {
    this.resetGuessCount(); // Reset guess count for current room
    this.displayRoomDescription(); // Display description of tcurrent room
    inquirer.prompt(this.getActions()).then((action) =&gt; {
      this.handleAction(action.choice); // prompt player for actions and handle
response
    });
  }
// Reset guess count for current room
  resetGuessCount() {
    this.guessCount = 0;
  }

  displayRoomDescription() {
    console.log(this.rooms[this.currentRoom - 1].description); // Display
description of current room
  }