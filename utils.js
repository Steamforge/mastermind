const getColor = colorArray =>
  colorArray[Math.floor(Math.random() * colorArray.length)];

export const getCode = (pegCount, colorArray) =>
  [...Array(pegCount).keys()].map(peg => ({
    color: getColor(colorArray),
    id: peg,
  }));
