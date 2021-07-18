import { Shot } from './shot';
/*
https://ibb.co/nMQjsd2
https://ibb.co/bNNFFdG
<img src="https://i.ibb.co/tYgh4gy/mar-sold-3.png" alt="mar-sold-3" border="0">
*/
export class Martian {
  private bgColor = 'black';

  public score = 30;
  public color = 'white';
  public x = 0;
  public y = 0;
  public z = 32;

  private lastX = 0;
  private lastY = 0;

  private rndFire = 0.8;

  private image1;
  private image2;
  private image3;
  private show1 = true;
  public destroyed = false;

  constructor(private ctx: CanvasRenderingContext2D, x, y) {
    this.x = x;
    this.y = y;
    this.lastX = this.x;
    this.lastY = this.y;

    this.image1 = new Image();
    this.image1.src = 'https://i.ibb.co/DfwQDcX/mar-sold-1.png';
    this.image2 = new Image();
    this.image2.src = 'https://i.ibb.co/HGGCCg9/mar-sold-2.png';
    this.image3 = new Image();
    this.image3.src = 'https://i.ibb.co/tYgh4gy/mar-sold-3.png';
  }
  public isInto(x, y): boolean {
    var x0 = this.x;
    var y0 = this.y;
    var z = this.z;
    if (x0 < x && x0 + z > x && y0 < y && y0 + z > y) return true;
    return false;
  }
  draw() {
    this.clean();

    //this.ctx.fillStyle = this.color;
    this.lastX = this.x;
    this.lastY = this.y;

    var image = this.image3;
    if (!this.destroyed) {
      image = this.show1 ? this.image1 : this.image2;
      if (Math.random() > 0.5) this.show1 = !this.show1;
    }
    this.ctx.drawImage(image, this.x, this.y);
  }
  fire(): Shot {
    if (Math.random() > this.rndFire) {
      const shot = new Shot(this.ctx, this.x + this.z / 2, this.y + this.z);
      return shot;
    }
    return null;
  }
  clean() {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.clearRect(this.lastX - 2, this.lastY - 2, this.z + 4, this.z + 4);
  }
  destroy() {
    this.clean();
  }
}
