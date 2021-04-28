import { Game } from "../model/Game";
import { View } from "../view/View";
import { Shape } from "../model/Shape";

/**
 * Main controller in the game what control all mouse and buttons event
 * @public
 */
export class Controller {
  /** main game model and view */
  protected _game: Game;
  protected _view: View;

  /** check if we click to shape for priority click */
  private _shapeClick: boolean = false;

  /**
   * Init controller with model and view
   * @param game main game model
   * @param view main view
   */
  constructor(game: Game, view: View) {
    this._game = game;
    this._view = view;

    this._addListeners();
    this._startObservers();
  }

  /** start listening for all signals and add function for respond to */
  private _startObservers(): void {
    this._game.instantiateShape.connect((shape) => {
      // add handlers for new shape
      this._initShapeControls(shape);
    });
  }

  /** init all event listeners in the game */
  private _addListeners(): void {
    // Click event on game window
    this._view.app.stage.on("click", (e: any) => {
      if (this._shapeClick) {
        this._shapeClick = false;
        return;
      }

      this._game.createShape(e.data.global);
    });

    //#region [rgba(28, 188, 156, 0.15)] Gravity controls

    const buttonGravityInc = document.querySelector(
      ".gravity-value-controls button.inc"
    );
    const buttonGravityDec = document.querySelector(
      ".gravity-value-controls button.dec"
    );

    buttonGravityInc?.addEventListener("click", (e) => {
      e.preventDefault();
      this._game.incGravity();
    });
    buttonGravityDec?.addEventListener("click", (e) => {
      e.preventDefault();
      this._game.decGravity();
    });

    //#endregion

    //#region [rgba(28, 188, 156, 0.15)] Shape spawning speed controls

    const buttonShapeSpawnSpeedInc = document.querySelector(
      ".shape-spawn-speed-controls button.inc"
    );
    const buttonShapeSpawnSpeedDec = document.querySelector(
      ".shape-spawn-speed-controls button.dec"
    );

    buttonShapeSpawnSpeedInc?.addEventListener("click", (e) => {
      e.preventDefault();
      this._game.incShapesSpawningSpeed();
    });
    buttonShapeSpawnSpeedDec?.addEventListener("click", (e) => {
      e.preventDefault();
      this._game.decShapesSpawningSpeed();
    });

    //#endregion
  }

  /**
   * init event listeners / controls for new shape
   * @param shape shape to attach a controls
   */
  private _initShapeControls(shape: Shape): void {
    shape.on("click", () => {
      this._shapeClick = true;
      this._game.changeColorWithSimilarShapeType(shape.type);
      this._game.removeShape(shape);
    });
  }
}
