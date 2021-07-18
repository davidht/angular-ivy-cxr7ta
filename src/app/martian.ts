import { Shot } from './shot';

export class Martian {
  private bgColor = 'black';
  public color = 'white';
  public x = 0;
  public y = 0;
  public z = 2;

  private lastX = 0;
  private lastY = 0;

  private rndFire = 0.8;

  constructor(private ctx: CanvasRenderingContext2D, x, y, z, type: string) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.lastX = this.x;
    this.lastY = this.y;
    if (type == 'soldier') {
      this.color = 'red';
    }
  }
  public isInto(x, y): boolean {
    var x0 = this.x * this.z;
    var y0 = this.y * this.z;
    var z = this.z;
    if (x0 < x && x0 + z > x && y0 < y && y0 + z > y) return true;
    return false;
  }
  draw() {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.clearRect(
      this.z * this.lastX,
      this.z * this.lastY,
      this.z,
      this.z
    );
    this.ctx.fillStyle = this.color;
    this.lastX = this.x;
    this.lastY = this.y;
    this.ctx.fillRect(
      this.z * this.x + 2,
      this.z * this.y + 2,
      this.z - 2,
      this.z - 2
    );
  }
  fire(): Shot {
    if (Math.random() > this.rndFire) {
      const shot = new Shot(
        this.ctx,
        this.x * this.z + this.z / 2,
        this.y * this.z + this.z
      );
      return shot;
    }
    return null;
  }
  destroy() {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.clearRect(
      this.z * this.lastX,
      this.z * this.lastY,
      this.z,
      this.z
    );
  }
}
