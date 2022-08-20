import { Application, Graphics } from "pixi.js";

class Point {
  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Line {
  point1;
  point2;

  constructor(x1, y1, x2, y2) {
    this.point1 = new Point(x1, y1);
    this.point2 = new Point(x2, y2);
  }

  midPoint() {
    return new Point(
      (this.point1.x + this.point2.x) * 0.5,
      (this.point1.y + this.point2.y) * 0.5
    );
  }

  length() {
    return Math.sqrt(
      (this.point2.x - this.point1.x) * (this.point2.x - this.point1.x) +
        (this.point2.y - this.point1.y) * (this.point2.y - this.point1.y)
    );
  }

  angle() {
    return Math.atan2(
      this.point2.y - this.point1.y,
      this.point2.x - this.point1.x
    );
  }
}

function dragonPoint(line) {
  const length = line.length();
  const halfLength = length * 0.5;

  const hypotenuse = Math.sqrt(
    halfLength * halfLength + halfLength * halfLength
  );

  let angle = line.angle(); // * (180 / Math.PI);
  angle += Math.PI * 0.25;

  let x = line.point1.x + Math.cos(angle) * hypotenuse;
  let y = line.point1.y + Math.sin(angle) * hypotenuse;

  return new Point(x, y);
}

function dragonLines(line) {
  const point = dragonPoint(line);

  const line1 = new Line(line.point1.x, line.point1.y, point.x, point.y);
  const line2 = new Line(line.point2.x, line.point2.y, point.x, point.y);

  return [line1, line2];
}

function dragon(line, lines, depth = 0) {
  if (depth === 0) {
    lines.push(line);
    return;
  }

  const dLines = dragonLines(line);

  for (let i = 0; i < dLines.length; ++i) {
    dragon(dLines[i], lines, depth - 1);
  }

  return;
}

export class DragonCurve extends Application {
  constructor(options) {
    super(options);

    const lines = [];
    const line = new Line(200, 300, 300, 300);

    dragon(line, lines, 10);

    const graphics = new Graphics();
    graphics.lineStyle(2, 0x333333, 1);
    this.stage.addChild(graphics);

    for (let i = 0; i < lines.length; ++i) {
      const line = lines[i];
      graphics.moveTo(line.point1.x, line.point1.y);
      graphics.lineTo(line.point2.x, line.point2.y);
    }
  }
}
