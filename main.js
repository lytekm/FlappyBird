import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Pipe } from "./pipe.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.pipeList = [
        new Pipe(this, pipeUP, 600 - 320),
        new Pipe(this, pipeDOWN, 100 - 320),
      ];
      this.state = "mainMenu";
      this.scoreCount = 0;
    }

    //spawn pipes
    spawnPipes() {
      const gap = 100;
      var pipeHeight = Math.floor(Math.random() * (300 - 112)) + 112;

      this.pipeList.push(new Pipe(this, pipeUP, pipeHeight + gap));
      this.pipeList.push(new Pipe(this, pipeDOWN, pipeHeight - 320));
    }

    //remove pipes
    removePipes() {
      this.pipeList.pop(0);
      this.pipeList.pop(1);
    }

    //update game
    update() {
      //player movement
      this.player.update(this.input.keys);
      //pipe movement
      for (let pipe of this.pipeList) {
        pipe.update();
      }

      //collision detection
      //collision with ground
      if (this.player.y + this.player.height >= this.height - 112) {
        this.player.y = this.height - 112 - this.player.height;
        this.state = "gameOver";
      }
      //collision with pipes
      for (let pipe of this.pipeList) {
        if (
          this.player.x + this.player.width >= pipe.x &&
          this.player.x <= pipe.x + pipe.width &&
          this.player.y + this.player.height >= pipe.y &&
          this.player.y <= pipe.y + pipe.height
        ) {
          this.state = "gameOver";
        }
      }

      //keep score
      if (this.pipeList[0].x + this.pipeList[0].width == 100) {
        this.scoreCount++;
        console.log(this.scoreCount);
      }
    }

    //draw things to canvas
    draw(ctx) {
      //draw background
      ctx.drawImage(background, 0, 0, this.width, this.height);

      //draw player
      this.player.draw(ctx);
      //draw pipe
      for (let pipe of this.pipeList) {
        pipe.draw(ctx);
      }

      //draw floor
      ctx.drawImage(floor, 0, this.height - 112, this.width, 112);

      //draw main menu
      if (this.state == "mainMenu") {
        ctx.drawImage(message, 100, 150, 200, 202);
      }
      //draw game over
      if (this.state == "gameOver") {
        ctx.drawImage(gameOver, 100, 150, 192, 42);
      }

      //draw score
      if (this.state == "running") {
        const numbers = [
          zero,
          one,
          two,
          three,
          four,
          five,
          six,
          seven,
          eight,
          nine,
        ];

        var scoreArray = this.scoreCount.toString().split("");
        for (let i = 0; i < scoreArray.length; i++) {
          ctx.drawImage(
            numbers[scoreArray[i]],
            this.width / 2 - 24 + 24 * i,
            20,
            24,
            36
          );
        }
      }
    }

    //check the state and update accordingly
    checkState() {
      if (this.state == "mainMenu") {
        this.draw(ctx);
      } else if (this.state == "gameOver") {
        this.draw(ctx);
        this.player.update();
        if (this.player.y + this.player.height >= this.height - 112) {
          this.player.y = this.height - 112 - this.player.height;
        }
      } else if (this.state == "running") {
        this.update();
        this.draw(ctx);
      }
    }

    //reset the game
    reset() {
      this.state = "mainMenu";
      this.player.y = 200;
      this.scoreCount = 0;
      this.pipeList = [
        new Pipe(this, pipeUP, 600 - 320),
        new Pipe(this, pipeDOWN, 100 - 320),
      ];
    }
  }

  //detect mouse click (i havent figured out how to do it in the input.js file yet)
  canvas.addEventListener("click", function () {
    if (game.state == "mainMenu") {
      game.state = "running";
    } else if (game.state == "gameOver") {
      game.reset();
    }
  });

  const game = new Game(width, height);
  function animate() {
    game.checkState();
    for (let pipe of game.pipeList) {
      if (pipe.x < -52) {
        game.removePipes();
        game.spawnPipes();
      }
    }

    requestAnimationFrame(animate);
  }
  animate();
});
