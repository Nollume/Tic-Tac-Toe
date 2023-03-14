let tiles = document.querySelectorAll("li");
tiles = Array.from(tiles);

const showTile = document.querySelector(".tile");
const turn = document.createElement("p");
turn.classList.add("cross");
showTile.append(turn);

let horizontalArr1 = [];
let horizontalArr2 = [];
let horizontalArr3 = [];

let verticalArr1 = [];
let verticalArr2 = [];
let verticalArr3 = [];

let acrossTopToBottom = [];
let acrossBottomToTop = [];

let allTiles = [
  horizontalArr1,
  horizontalArr2,
  horizontalArr3,
  verticalArr1,
  verticalArr2,
  verticalArr3,
  acrossTopToBottom,
  acrossBottomToTop,
];

let startSign = "X";
let isWin = false;

const createCircleOrCross = () => {
  const sign = document.createElement("p");
  if (startSign === "X") {
    sign.classList.add("cross");
    startSign = "O";
  } else {
    sign.classList.add("circle");
    startSign = "X";
  }
  return sign;
};

const whoIsOnTurn = () => {
  const sign = document.createElement("p");
  if (startSign === "X") {
    sign.classList.add("cross");
  } else {
    sign.classList.add("circle");
  }
  return sign;
};

const getChildrenSign = (tile) => {
  return Array.from(tile.children)[0];
};

tiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    if (isWin) {
      return;
    }
    if (tile.children.length) {
      return;
    }
    const newSign = createCircleOrCross();
    tile.append(newSign);

    if (tile.classList.contains("tile1")) {
      const sign = getChildrenSign(tile);
      horizontalArr1.push(sign);
      verticalArr1.push(sign);
      acrossTopToBottom.push(sign);
    } else if (tile.classList.contains("tile2")) {
      const sign = getChildrenSign(tile);
      horizontalArr1.push(sign);
      verticalArr2.push(sign);
    } else if (tile.classList.contains("tile3")) {
      const sign = getChildrenSign(tile);
      horizontalArr1.push(sign);
      verticalArr3.push(sign);
      acrossBottomToTop.push(sign);
    } else if (tile.classList.contains("tile4")) {
      const sign = getChildrenSign(tile);
      horizontalArr2.push(sign);
      verticalArr1.push(sign);
    } else if (tile.classList.contains("tile5")) {
      const sign = getChildrenSign(tile);
      horizontalArr2.push(sign);
      verticalArr2.push(sign);
      acrossTopToBottom.push(sign);
      acrossBottomToTop.push(sign);
    } else if (tile.classList.contains("tile6")) {
      const sign = getChildrenSign(tile);
      horizontalArr2.push(sign);
      verticalArr3.push(sign);
    } else if (tile.classList.contains("tile7")) {
      const sign = getChildrenSign(tile);
      horizontalArr3.push(sign);
      verticalArr1.push(sign);
      acrossBottomToTop.push(sign);
    } else if (tile.classList.contains("tile8")) {
      const sign = getChildrenSign(tile);
      horizontalArr3.push(sign);
      verticalArr2.push(sign);
    } else if (tile.classList.contains("tile9")) {
      const sign = getChildrenSign(tile);
      horizontalArr3.push(sign);
      verticalArr3.push(sign);
      acrossTopToBottom.push(sign);
    }

    allTiles.forEach((tilesArr) => {
      if (tilesArr.length === 3) {
        const cross = tilesArr.every((t) => t.classList.contains("cross"));
        const circle = tilesArr.every((t) => t.classList.contains("circle"));
        if (cross || circle) {
          tilesArr.forEach((item) => item.parentElement.classList.add("win"));
          isWin = true;
          showTile.classList.add("win");
        }
      }
    });
    const draw = allTiles.every((tArr) => tArr.length === 3);
    const someCross = allTiles.some((tArr) =>
      tArr.every((i) => i.classList.contains("cross"))
    );
    const someCircle = allTiles.some((tArr) =>
      tArr.every((i) => i.classList.contains("circle"))
    );
    if (draw) {
      if (someCross || someCircle) return;
      isWin = true;
      showTile.replaceChildren();
      showTile.textContent = "DRAW";
      showTile.classList.add("draw");
    }
    if (!isWin) {
      const whoTurn = whoIsOnTurn();
      showTile.replaceChildren(whoTurn);
    }
  });
});
const resetGame = document.querySelector("button");
const newGame = () => {
  tiles.forEach((tile) => {
    tile.replaceChildren();
    tile.classList.remove("win");
  });
  showTile.replaceChildren(turn);
  showTile.classList.remove("draw");
  showTile.classList.remove("win");
  horizontalArr1 = [];
  horizontalArr2 = [];
  horizontalArr3 = [];

  verticalArr1 = [];
  verticalArr2 = [];
  verticalArr3 = [];

  acrossTopToBottom = [];
  acrossBottomToTop = [];

  allTiles = [
    horizontalArr1,
    horizontalArr2,
    horizontalArr3,
    verticalArr1,
    verticalArr2,
    verticalArr3,
    acrossTopToBottom,
    acrossBottomToTop,
  ];

  isWin = false;

  startSign = "X";
};

resetGame.addEventListener("click", newGame);
