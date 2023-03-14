export class Pipe {
  constructor(game, image, y) {
    this.game = game;
    this.width = 52;
    this.height = 320;
    this.x = 400;
    this.y = y;
    this.image = image;
  }

  //update pipe
  update() {
    this.x -= 2;
  }

  //draw pipe
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
