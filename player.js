export class Player {
  constructor(game) {
    this.game = game;
    this.width = 34;
    this.height = 24;
    this.x = 40;
    this.y = 300;
    this.image = player;
    this.jumping = false;
  }

  //update player
  update(input) {
    if (input == "ArrowUp") {
      this.jumping = true;
      this.y -= 5;
    } else {
      this.jumping = false;
      this.y += 3;
    }
  }

  //draw player
  draw(ctx) {
    ctx.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
