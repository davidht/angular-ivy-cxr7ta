import { Square } from './square';

//<img src="https://i.ibb.co/3Fg69gZ/ship.png" alt="ship" border="0">
//<img src="https://i.ibb.co/DCPNRPf/explosion.png" alt="explosion" border="0">border="0">
export class Ship {
  private bgColor = 'black';
  public color = 'red';
  private x = 0;
  private y = 0;
  public z = 70;
  private lastX = 0;
  private lastY = 0;
  private maxA = 4;
  private minA = 2;
  private a = this.minA;
  private aInc = 0.4;
  //private aDec = 0.05;
  private aDec = 0;
  private movingRight = false;
  private movingLeft = false;

  image1;
  image3;

  destroyed = false;

  constructor(private ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.x = ctx.canvas.width / 2 - this.z / 2;
    this.y = ctx.canvas.height - this.z;

    this.lastX = this.x;
    this.lastY = this.y;

    this.image1 = new Image();
    this.image1.src = 'https://i.ibb.co/3Fg69gZ/ship.png';

    this.image3 = new Image();
    this.image3.src = 'https://i.ibb.co/DCPNRPf/explosion.png';
  }

  moveRight() {
    if (this.destroyed) return;
    this.movingRight = true;
    this.movingLeft = false;
    this.x += this.a;
    if (this.x + this.z > this.ctx.canvas.width)
      this.x = this.ctx.canvas.width - this.z;
  }

  moveLeft() {
    if (this.destroyed) return;
    this.movingRight = false;
    this.movingLeft = true;
    this.x -= this.a;
    if (this.x < 0) this.x = 0;
  }
  acelerate() {
    if (this.a < this.minA) this.a = this.minA;
    this.a += this.aInc;
    if (this.a > this.maxA) this.a = this.maxA;
  }
  decrease() {
    if (this.a > 0) {
      this.a -= this.aDec;
    } else {
      this.a = 0;
      this.movingRight = false;
      this.movingLeft = false;
    }
  }

  moving() {
    if (this.destroyed) return;
    if (this.movingRight) {
      this.moveRight();
    }
    if (this.movingLeft) {
      this.moveLeft();
    }
    this.decrease();
  }
  fire(): Square {
    const square = new Square(this.ctx, this.x + this.z / 2, this.y);
    return square;
  }
  isInto(x, y): boolean {
    var x0 = this.x;
    var y0 = this.y;
    var z = this.z;
    if (x0 < x && x0 + z > x && y0 < y && y0 + z > y) return true;
    return false;
  }
  draw() {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.clearRect(this.lastX, this.lastY, this.z, this.z);
    //this.ctx.fillStyle = this.color;
    this.lastX = this.x;
    this.lastY = this.y;
    //this.ctx.fillRect(this.x + 2, this.y + 2, this.z - 2, this.z - 2);

    var image = this.destroyed ? this.image3 : this.image1;
    this.ctx.drawImage(image, this.x, this.y);
  }
}
