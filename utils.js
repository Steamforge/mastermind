const getColor = colorArray =>
  colorArray[Math.floor(Math.random() * colorArray.length)];

export const getArrayFromNum = num => [...Array(num).keys()];

export const getCode = (pegCount, colorArray) =>
  getArrayFromNum(pegCount).map(peg => ({
    color: getColor(colorArray),
    id: peg,
  }));
