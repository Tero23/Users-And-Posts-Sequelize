// let results = [];
// let finalResults = [];
// function findLucky(arr) {
//   for (let i of arr) {
//     let counter = 0;
//     for (let j of arr) {
//       if (j === i) counter++;
//     }
//     results.push([i, counter]);
//   }
//   for (let [i, j] of results) {
//     if (i === j) finalResults.push(i);
//   }
//   if (finalResults.length === 0) return -1;
//   return Math.max(...finalResults);
// }

// const twoSumLessThanK = function (A, K) {
//   let sums = [];
//   var result = null;
//   let arr = A.filter((num) => num < K);
//   if (arr.length === 0) {
//     result = -1;
//     return result;
//   }
//   while (arr.length !== 0) {
//     for (let [i, j] of arr.entries()) {
//       while (i + 1 < arr.length) {
//         sums.push(j + arr[i + 1]);
//       }
//       arr.shift();
//     }
//   }
//   const finalSums = sums.filter((num) => num < K);
//   result = Math.max(...finalSums);
//   return result;
// };

// twoSumLessThanK([11, 12, 31, 14, 15, 61, 71], 8);
