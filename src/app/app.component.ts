import { Component, OnInit, VERSION } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
//import { NgZone } from '@angular/core';
import { HostListener } from '@angular/core';
import { LinkDashDevService } from './link-dash-dev.service';

import { Martian } from './martian';
import { Square } from './square';
import { Ship } from './ship';
import { Shot } from './shot';

//<img src="https://i.ibb.co/KX4QDVz/ship-live.png" alt="ship-live" border="0">

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private bgColor = 'black';
  public deadColor = 'white';

  constructor(
    //private ngZone: NgZone,
    private linkDashService: LinkDashDevService
  ) {
    linkDashService.linkApp(this);
    linkDashService.add('Application inited!');
  }

  name = 'Galasy00 Angular ' + VERSION.major;

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;
  requestId;

  interval0 = 4;
  interval1 = 10;
  interval2 = 50;
  interval3 = 100;

  ship: Ship;
  squares: Square[] = [];
  martians: Martian[] = [];
  shots: Shot[] = [];

  lastSquad = 0;
  maxSquads = 4;
  maxSoldiers = 8;

  direction = 1;
  martianMaxX = 0;
  martianSize = 32;
  martinaMargin = 8;
  martianMove = 6;

  shipSize = 30;
  lives = 3;
  score = 0;
  imgLive;
  wait = -1;

  toMove = 0;

  into0 = 0;
  into1 = 0;
  into2 = 0;
  into3 = 0;
  pause = true;

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    this.ctx.fillStyle = 'red';

    this.martianMaxX =
      this.ctx.canvas.width - this.martianSize - this.martinaMargin;

    this.imgLive = new Image();
    this.imgLive.src = 'https://i.ibb.co/KX4QDVz/ship-live.png';

    this.createMartians();
    this.createShip();
    this.drawAll();

    //this.ngZone.runOutsideAngular(() => this.tick());
    setInterval(() => {
      this.tick0();
    }, this.interval0);

    setInterval(() => {
      this.tick1();
    }, this.interval1);

    setInterval(() => {
      this.tick2();
    }, this.interval2);

    setInterval(() => {
      this.tick3();
    }, this.interval3);
  }

  /*
  @HostListener('window:keypress', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code == 'Space') {
      this.fire();
    } else if (event.code == 'ShiftLeft') {
      this.fire();
    }
  }*/
  @HostListener('window:keydown', ['$event'])
  keyEventDown(event: KeyboardEvent) {
    if (event.code == 'ArrowLeft') {
      this.ship.acelerate();
      this.ship.moveLeft();
    } else if (event.code == 'ArrowRight') {
      this.ship.acelerate();
      this.ship.moveRight();
    } else if (event.code == 'Space') {
      this.fire();
    } else if (event.code == 'ShiftLeft') {
      this.fire();
    }
  }
  @HostListener('window:keyup', ['$event'])
  keyEventUp(event: KeyboardEvent) {
    if (event.code == 'ArrowLeft') {
      this.ship.decrease();
    } else if (event.code == 'ArrowRight') {
      this.ship.decrease();
    } else if (event.code == 'Enter') {
      this.pause = !this.pause;
    }
  }

  private createShip(): void {
    const x = this.ctx.canvas.width / this.shipSize / 2;
    const y = this.ctx.canvas.height / this.shipSize - 2;
    this.ship = new Ship(this.ctx);
  }

  private createMartians() {
    var i, j;
    var margin = this.martinaMargin;
    var size = this.martianSize;
    for (i = 0; i < this.maxSquads; i++) {
      for (j = 0; j < this.maxSoldiers; j++) {
        var y = size * 2 + i * (size + margin);
        var x = size + j * (size + margin);
        this.addMartian(x, y);
      }
    }
    this.toMove = 0;
  }

  tick0() {
    if (this.into0 > 0 || this.pause) return;
    this.into0++;
    //console.log('INTO: ' + this.into1);
    this.tickSquares();

    //this.requestId = requestAnimationFrame(() => this.tick);
    this.into0--;
  }

  tick1() {
    if (this.into1 > 0 || this.pause) return;
    this.into1++;
    //console.log('INTO: ' + this.into1);
    this.tickShots();

    //this.requestId = requestAnimationFrame(() => this.tick);
    this.into1--;
  }
  tick2() {
    if (this.into2 > 0 || this.pause) return;
    this.into2++;
    //console.log('INTO: ' + this.into2);
    this.tickShip();
    //this.requestId = requestAnimationFrame(() => this.tick);
    this.into2--;
  }
  tick3() {
    if (this.into3 > 0 || this.pause) return;
    this.into3++;
    //console.log('INTO: ' + this.into3);
    this.tickMartians();
    //this.requestId = requestAnimationFrame(() => this.tick);
    this.into3--;
  }
  private tickSquares(): void {
    this.squares.forEach((square, index) => {
      if (!square.draw()) this.squares.splice(index, 1);
      var found = this.martianIn(square.x, square.y);

      if (found >= 0) {
        this.squares.splice(index, 1);
        this.martians[found].destroyed = true;
        this.martians[found].draw();

        this.score += this.martians[found].score;
        this.drawHead();
      }
    });
  }
  private tickShots(): void {
    this.shots.forEach((shot, index) => {
      if (!shot.draw()) this.shots.splice(index, 1);

      if (this.wait != -1) return;

      var found = this.shipIn(shot.x, shot.y);
      if (found >= 0) {
        this.shots.splice(index, 1);
        this.ship.destroyed = true;
        this.ship.draw();

        this.lives--;

        if (this.lives > 0) this.wait = 1;
        else this.wait = 0;
        this.drawHead();
      }
    });
  }
  private tickMartians(): void {
    var move = this.martianMove;
    var next = this.getNext();
    this.toMove = next;
    const martian: Martian = this.martians[next];
    if (this.direction > 0) {
      if (martian.x < this.martianMaxX) {
        martian.x += move;
        martian.draw();
      } else {
        this.direction = -1;
        this.toMove = 0;
      }
    } else {
      if (martian.x > 1) {
        martian.x -= move;
        martian.draw();
      } else {
        this.direction = 1;
        this.toMove = 0;
      }
    }
    var shot = martian.fire();
    if (shot) this.shot(shot);
    if (martian.destroyed) {
      martian.destroy();
      this.martians.splice(next, 1);
    }
  }
  private tickShip() {
    if (this.wait !=-1) {
      if (this.shots.length>0)
        return;
    }
    if (this.wait !=-1 && this.lives == 0) 
          this.gameOver();
      else this.nextShip();
    }
    this.ship.moving();
    this.ship.draw();
  }
  private martianIn(x, y): number {
    var found = -1;
    this.martians.forEach((martian, index) => {
      if (found < 0 && martian.isInto(x, y)) {
        //DEBUG console.log('[Component.martianIn] Destroyed: ' + index);
        found = index;
      }
    });
    return found;
  }
  private shipIn(x, y): number {
    var found = -1;
    if (this.ship.isInto(x, y)) {
      found = 1;
    }
    return found;
  }

  private isInto(x, y, x0, y0, z): boolean {
    if (x0 < x && x0 + z > x && y0 < y && y0 + z > y) return true;
    return false;
  }

  private getNext(): number {
    var toReturn = this.toMove;
    if (toReturn < this.getLast()) {
      toReturn++;
      //if ((this.martians[this.toMove].color = this.deadColor)) this.toMove++;
    }
    if (toReturn == this.toMove) toReturn = 0;
    return toReturn;
  }

  drawAll() {
    this.martians.forEach((martian: Martian) => {
      martian.draw();
    });
    this.ship.draw();
    this.drawHead();
  }

  private getLast(): number {
    return this.martians.length - 1;
  }

  fire() {
    if (this.squares.length == 0) {
      const square = this.ship.fire();
      this.squares.push(square);
    }
  }

  shot(shot: Shot) {
    this.shots.push(shot);
  }

  addMartian(x, y): Martian {
    const martian = new Martian(this.ctx, x, y);
    this.martians.push(martian);
    return martian;
  }

  ngOnDestroy() {
    clearInterval(this.interval1);
    clearInterval(this.interval2);
    clearInterval(this.interval3);
    cancelAnimationFrame(this.requestId);
  }

  clean() {
    this.ctx.fillStyle = this.bgColor;
    this.ctx.clearRect(0, 0, 640, 60);
  }
  drawHead() {
    this.clean();
    var posLives = 250;
    var size = 32;
    for (var i = 0; i < this.lives; i++) {
      this.ctx.drawImage(this.imgLive, posLives + 32 * i, 12);
    }
    //Lucida Console", "Courier New", monospace
    //this.ctx.font = "italic small-caps bold 40px Helvetica, Arial, sans-serif";
    this.ctx.font = 'small-caps bold 16px Helvetica, Arial, sans-serif';
    this.ctx.fillStyle = 'Red';
    var txt = ' ' + this.score;
    this.ctx.fillText(txt, 150, 32);
  }

  gameOver() {
    this.ctx.font = 'small-caps bold 16px Helvetica, Arial, sans-serif';
    this.ctx.fillStyle = 'White';
    var txt = 'GAME OVER';
    this.ctx.fillText(txt, 200, 300);
  }
  nextShip() {
    this.wait = -1;
    this.ship.destroyed = false;
  }
}
