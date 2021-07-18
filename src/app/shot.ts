export class Shot {
  private bgColor = 'black';
  private color = 'yellow';
  public x = 0;
  public y = 0;
  private z = 2;
  private lastX = 0;
  private lastY = 0;
  private speed = 1;

  constructor(private ctx: CanvasRenderingContext2D, x, y) {
    this.x = x;
    this.y = y;
    this.lastX = this.x;
    this.lastY = this.y;
  }

  draw(): boolean {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.clearRect(this.lastX - 1, this.lastY - 1, this.z + 1, this.z + 1);
    this.y += this.speed;
    this.lastX = this.x;
    this.lastY = this.y;
    var max = this.ctx.canvas.height;
    if (this.y < max) {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.z, this.z);
    }
    return this.y < max;
  }
}
