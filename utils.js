const getColor = colorArray =>
  colorArray[Math.floor(Math.random() * colorArray.length)];

export const getArrayFromNum = num => [...Array(num).keys()];

export const getCode = (pegCount, colorArray) =>
  getArrayFromNum(pegCount).map(peg => ({
    color: getColor(colorArray),
    id: peg,
  }));

export const convertTime = time => {
  const min = Math.floor(time / 60000);
  const sec = ((time % 60000) / 1000).toFixed(0);
  return `${min}:${sec < 10 ? 0 : ''}${sec}`;
};
