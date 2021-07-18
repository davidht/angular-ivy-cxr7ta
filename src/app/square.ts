export class Square {
  private bgColor = 'black';
  private color = 'yellow';
  public x = 0;
  public y = 0;
  private z = 2;
  private lastX = 0;
  private lastY = 0;
  private speed = -1;

  constructor(private ctx: CanvasRenderingContext2D, x, y) {
    this.x = x;
    this.y = y;
    this.lastX = this.x;
    this.lastY = this.y;
  }

  draw(): boolean {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.clearRect(this.lastX - 2, this.lastY - 2, this.z + 4, this.z + 4);
    this.y += this.speed;
    this.lastX = this.x;
    this.lastY = this.y;
    if (this.y > 0) {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.z, this.z);
    }
    return this.y > 0;
  }
}
