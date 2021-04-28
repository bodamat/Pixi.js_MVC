import { Graphics, Point } from "pixi.js";
import { Utils } from "../Utils";

/** all primitive shape types */
export enum shapeTypes {
  CIRCLE,
  ELLIPSE,
  TRIANGLE,
  SQUARE,
  PENTAGON,
  SIXWALKER,
}

/**
 * Paint primitive shape
 * @extends Graphics contains methods for pritive shapes
 *
 * @public
 */
export class Shape extends Graphics {
  /** vertical velocity */
  public velocityY: double = 0;

  /**
   * the surface area (in px^2) occupied by the shape
   * @readonly for other
   */
  private _area: double = 0;
  get area(): double {
    return this._area;
  }

  /**
   * shape type
   * @readonly
   */
  private readonly _type: shapeTypes;
  get type(): shapeTypes {
    return this._type;
  }

  /** radius what represents the size of the shape */
  private readonly _radius: double;

  /**
   * Init primitive shape with position and radius
   * @param position shape position in world
   * @param radius shape radius
   */
  constructor(position: Point, radius: double) {
    super();

    this.position = position;
    this._radius = radius;

    // init type for shape randomly
    this._type = Utils.getRandomIntInRange(
      0,
      Object.keys(shapeTypes).length / 2 - 1
    );

    this._paintShape();
  }

  /** repaint shape */
  public redraw(): void {
    this._paintShape();
  }

  /** paint shape by type */
  private _paintShape(): void {
    // clear shape visually
    this.clear();

    // go through each type to paint correct shape
    switch (this._type) {
      case shapeTypes.CIRCLE:
        this._paintCircle();
        break;
      case shapeTypes.ELLIPSE:
        this._paintEllipse();
        break;
      case shapeTypes.TRIANGLE:
        this._paintPolygon(3);
        break;
      case shapeTypes.SQUARE:
        this._paintPolygon(4);
        break;
      case shapeTypes.PENTAGON:
        this._paintPolygon(5);
        break;
      case shapeTypes.SIXWALKER:
        this._paintPolygon(6);
        break;
      default:
        this._paintPolygon(Utils.getRandomIntInRange(3, 6));
        break;
    }
  }

  //#region [rgba(28, 188, 156, 0.15)] methods for painting different shapes by type

  /** paint circle */
  private _paintCircle(): void {
    // surface area of shape
    this._area = Math.PI * this._radius * this._radius;

    this.beginFill(Utils.getRandomColor());
    this.drawCircle(0, 0, this._radius);
    this.endFill();
  }

  /** paint ellipse */
  private _paintEllipse(): void {
    // surface area of shape
    this._area = (Math.PI * this._radius * this._radius) / 2;

    this.beginFill(Utils.getRandomColor());
    this.drawEllipse(0, 0, this._radius, this._radius / 2);
    this.endFill();
  }

  /**
   * paint polygon by vertices
   * @param verts vertices in the shape
   */
  private _paintPolygon(verts: int): void {
    // generate edges with the same size and the shape size as radius
    let paths: number[] = [];
    for (let i = 0; i < verts; i++) {
      let xi =
        this._radius * Math.cos((360 / 2) * verts + (2 * Math.PI * i) / verts);
      let yi =
        this._radius * Math.sin((360 / 2) * verts + (2 * Math.PI * i) / verts);
      paths.push(xi, yi);
    }

    // length of edge
    let edge = Math.sqrt(
      Math.pow(paths[0] - paths[2], 2) + Math.pow(paths[1] - paths[3], 2)
    );

    // surface area of shape
    this._area = (1 / 2) * this._radius * verts * edge;

    this.beginFill(Utils.getRandomColor());
    this.drawPolygon(paths);
    this.endFill();
  }

  //#endregion
}
