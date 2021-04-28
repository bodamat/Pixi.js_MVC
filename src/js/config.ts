/** Global game configuration */
export default {
  windowSize: {
    width: 1024,
    height: 768,
  },
  rendererOptions: {
    backgroundColor: 0xffffff,
    autoResize: true,
    resolution: window.devicePixelRatio,
  },
  shapes: {
    radius: 60,
    spawnPerSecond: 15,
    spawnDelay: 1000,
  },
  gravityForce: 9,
};
