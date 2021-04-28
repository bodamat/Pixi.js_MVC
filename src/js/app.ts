import { Controller } from "./controller/Controller";
import { Game } from "./model/Game";
import { View } from "./view/View";

/** init game when page load */
window.onload = () => {
  //init main model, view, controller
  const game = new Game();
  const view = new View(game);
  // @ts-ignore for unused variable
  const controller = new Controller(game, view);
};
