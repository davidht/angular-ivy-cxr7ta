import { Square } from './square';

export class Ship {
  private bgColor = 'black';
  public color = 'red';
  private x = 0;
  private y = 0;
  private z = 2;
  private lastX = 0;
  private lastY = 0;
  private maxA = 6;
  private minA = 2;
  private a = this.minA;
  private aInc = 0.2;
  //private aDec = 0.05;
  private aDec = 0;
  private movingRight = false;
  private movingLeft = false;

  constructor(private ctx: CanvasRenderingContext2D, x, y, z) {
    this.ctx = ctx;
    this.x = x * z;
    this.y = y * z;
    this.z = z;
    this.lastX = this.x;
    this.lastY = this.y;
  }

  moveRight() {
    this.movingRight = true;
    this.movingLeft = false;
    this.x += this.a;
    if (this.x + this.z > this.ctx.canvas.width)
      this.x = this.ctx.canvas.width - this.z;
  }

  moveLeft() {
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
    this.ctx.fillStyle = this.color;
    this.lastX = this.x;
    this.lastY = this.y;
    this.ctx.fillRect(this.x + 2, this.y + 2, this.z - 2, this.z - 2);
  }
}
