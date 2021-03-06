paper.install(window);
paper.setup('myCanvas');
const screenW = view.size.width;
const screenH = view.size.height;

const random = function(min, max) {
    return parseInt(Math.random() * (max - min) + min);
};

const randomDecimal = (min, max) => {
    return Math.random() * (max - min) + min;
};

const makeBubble = (fillColor) => {
    const bubble = new Path.Circle({
        center: new Point(random(0, screenW), random(0, screenH)),
        radius: random(5, 40),
        strokeColor: '#FFF',
        fillColor: fillColor
    });
    return {
        item: bubble,
        speed: randomDecimal(0.5, 4)
    };
};

const moveBubble = (bubble) => {
    bubble.item.position.y -= bubble.speed;
    if (bubble.item.position.y < -100) {
        bubble.item.position.y = screenH + 100;
    }
};

const colors = [
    '#41E3D4',
    '#34CBB8',
    '#1EB197',
    '#048E98',
    '#046899'
];

// indeterminate loop (doing something for n-times):
// creates all of the bubbles:
const createBubbles = (numBubbles) => {
      console.log('you should actually create', numBubbles, 'bubbles.')

      const bubbles = [];

      for(var n = 0; n < numBubbles; n++) {
             let bubble = makeBubble(colors[random(0, colors.length)]);
             bubbles.push(bubble);
      }
      return bubbles;
  }
  const bubbles = createBubbles(200);

  view.onFrame = (event) => {
      for (bubble of bubbles) {
          moveBubble(bubble);
      }
  };
