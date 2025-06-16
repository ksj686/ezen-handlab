// module.exports = 객체 1개만 내보낼 수 있기 때문에 객체 안에 넣어서 내보낸다.
const area = {
  square: function (len) {
    // 정사각형 면적
    return len * len;
  },
  circle: function (radius) {
    //   원의 면적
    return Math.PI * radius * radius;
  },
  triangle: function (w, h) {
    return (w * h) / 2;
  },
};

module.exports = area;
// ex06_require.js 에서 require해서 square(), circle(), triangle() 호출해보기
