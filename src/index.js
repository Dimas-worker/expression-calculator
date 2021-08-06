function eval() {
    // Do not use eval!!!
    return;
}
const objOperators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b
};
const priorOP = ['*', '/'],
    op = ['+', '-'];

function expressionCalculator(expr) {
    let stack = [],
    arrOutput = [];
    let str = expr.replace(/\s/g, '');
    let newArr = str.split(/([\+\-*\/\(\)])/g);
    let arr = newArr.filter(el => el !== '');

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === ')' && !stack.includes('(')) {
            throw new Error("ExpressionError: Brackets must be paired");
        }
        else if (arr[i] === '(') {
            stack.push(arr[i]);
        }
        else if (arr[i] === ')') {
            while (true) {
                arrOutput.push(stack.pop());
                if (stack[stack.length - 1] === '(') break;
            }
            stack.pop();
        }
        else if (priorOP.includes(arr[i]) && priorOP.includes(stack[stack.length - 1])) {
            arrOutput.push(stack.pop());
            stack.push(arr[i]);
        }
        else if (priorOP.includes(arr[i])) {
            stack.push(arr[i]);
        }
        else if ((op.includes(arr[i]) && priorOP.includes(stack[stack.length - 1])) || (op.includes(arr[i]) && op.includes(stack[stack.length - 1]))) {
            while (true) {
                arrOutput.push(stack.pop());
                if (stack.length === 0 || stack[stack.length - 1] === '(') break;
            }
            stack.push(arr[i]);
        }
        else if (op.includes(arr[i])) {
            stack.push(arr[i]);
        }
        else {
            arrOutput.push(arr[i]);
        }
    }
    while (true) {
        arrOutput.push(stack.pop())
        if (stack[stack.length - 1] === '(' || stack[stack.length - 1] === ')' || stack.length === 0) break;
    }
    if (stack.length !== 0) {
        throw new Error("ExpressionError: Brackets must be paired");
    }
    // math operation
    let result =[];
    for (let j = 0; j < arrOutput.length; j++) {
        if (objOperators[arrOutput[j]]) {
            let a = +result.shift(),
            b = +result.shift();
            if (arrOutput[j] === '/' && a === 0) {
                throw new Error("TypeError: Division by zero.");
            }
            let sum = objOperators[arrOutput[j]](b, a);
            result.unshift(sum);
        } else {
            result.unshift(arrOutput[j]);
        }
    }
    return result[0];
}

module.exports = {
    expressionCalculator
}