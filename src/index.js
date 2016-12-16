import shining from "./shining.js";

let result = new shining("a + b * c");
console.log(result.parse());
console.log(result.parse().toExpression());
