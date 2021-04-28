import { Application, Rectangle } from "pixi.js";
import { Game } from "../model/Game";
import { Shape } from "../model/Shape";
import cfg from "../config";

/**
 * main view for rendering shapes
 */
export class View {
  /**
   * application to render all things and create a window for it
   * @readonly
   */
  private readonly _app: Application;
  get app(): PIXI.Application {
    return this._app;
  }

  /** main gmae model */
  protected _game: Game;

  //#region [rgba(28, 188, 156, 0.15)] Input elements
  /** @readonly */

  private readonly _shapeSpawnSpeedInput: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("shape-spawn-speed")
  );
  private readonly _gravityInput: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("gravity-value")
  );
  private readonly _numberOfShapesInput: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("number-of-shapes")
  );
  private readonly _areaOfShapesInput: HTMLInputElement = <HTMLInputElement>(
    document.getElementById("area-of-shapes")
  );

  //#endregion

  /**
   * init view with game model
   * @param game main game model
   */
  constructor(game: Game) {
    this._game = game;

    // init Application
    this._app = new Application({
      ...cfg.rendererOptions,
      width: cfg.windowSize.width,
      height: cfg.windowSize.height,
    });
    document.getElementById("game-view")?.appendChild(this._app.view);

    // add trigger for user interactions
    this._app.stage.interactive = true;
    this._app.stage.hitArea = new Rectangle(
      0,
      0,
      cfg.windowSize.width,
      cfg.windowSize.height / this._app.renderer.resolution
    );

    // add ticker
    this._app.ticker.add((delta) => {
      this._render(delta);
    });

    // init values and observers
    this._connectObservers();
    this._initDefaultValues();
  }

  /** init default values for inputs */
  private _initDefaultValues(): void {
    this._setShapesCount(0);
    this._setShapesArea(0);
    this._setShapesPerSec(cfg.shapes.spawnPerSecond);
    this._setGravityForce(cfg.gravityForce);
  }

  /**
   * update shapes spawn speed in input
   * @param shapeSpawnSpeed shape spawn speed number
   */
  private _setShapesPerSec(shapeSpawnSpeed: double): void {
    this._shapeSpawnSpeedInput.value = String(shapeSpawnSpeed);
  }

  /**
   * update number of shapes in input
   * @param shapesCount number of shapes
   */
  private _setShapesCount(shapesCount: int): void {
    this._numberOfShapesInput.value = String(shapesCount);
  }

  /**
   * update gravity force in input
   * @param area the surface area (in px^2) occupied by the shape
   */
  private _setShapesArea(area: double): void {
    this._areaOfShapesInput.value = String(Math.floor(area));
  }

  /**
   * update gravity force in input
   * @param gravityForce gravity speed
   */
  private _setGravityForce(gravityForce: double): void {
    this._gravityInput.value = String(gravityForce);
  }

  /** connect all signals for listening for */
  private _connectObservers(): void {
    this._game.instantiateShape.connect((shape) => {
      // add shape to screen and enable interact
      shape.interactive = true;
      this._app.stage.addChild(shape);
    });

    this._game.shapesCountChange.connect(this._setShapesCount.bind(this));
    this._game.shapesAreaChange.connect(this._setShapesArea.bind(this));
    this._game.shapesPerSecChange.connect(this._setShapesPerSec.bind(this));
    this._game.gravityForceChange.connect(this._setGravityForce.bind(this));
  }

  /**
   * animate falling for each shape
   * @param delta difference between last frame and now
   */
  private _animateFalling(delta: double): void {
    // iterate objects in stage and animate falling
    this._app.stage.children.forEach((displayObject) => {
      // check if displayObject is primitive shape
      const shape: Shape = <Shape>displayObject;
      if (!shape) return;

      // auto destroy shape when falls out the window
      if (
        shape.position.y - cfg.shapes.radius * 2 >
        this._app.renderer.height / this._app.renderer.resolution
      ) {
        this._game.removeShape(shape);
        return;
      }
      // calculate vertical velocity and store it in a shape
      shape.velocityY += cfg.gravityForce * delta;
      // update vertical shape position
      shape.position.y += shape.velocityY / 1000 / delta;
    });
  }

  /**
   * viewport render. Render all in the game loop
   * @param delta difference between last frame and now
   */
  protected _render(delta: double): void {
    this._animateFalling(delta);
  }
}
