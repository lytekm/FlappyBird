export class InputHandler {
  constructor() {
    this.keys = [];
    //check for key presses
    //adds key to key list
    window.addEventListener("keydown", (event) => {
      if (this.keys.indexOf(event.key) === -1) {
        this.keys.push(event.key);
      }
    });
    //check for key releases
    //removes key from key list
    window.addEventListener("keyup", (event) => {
      this.keys.splice(this.keys.indexOf(event.key), 1);
    });
  }
}
