import OperatorNode from "./operatornode.js";
import LeafNode from "./leafnode.js";

export default class Shining {

    static get operators() {

        if (this._operators === undefined) this._operators = Object.keys(Shining.priorities);
        return this._operators;
    };

    static get priorities() {

        return {'+' : 5, '-' : 5, '%': 20, '*' : 20, '/' : 20};
    };

    static parse(expression) {

        let operatorLevels = Shining.parseOperatorLevel(expression);
        let maxLevel = Shining.getMaxLevel(operatorLevels);
        let result = Shining.parseNode(expression, operatorLevels, maxLevel, 0, expression.length - 1);
        return result;
    };

    static parseOperatorLevel(expression) {

        let operatorLevels = [];
        let bl = 0;
        let isOperand = false;
        for (let i = 0; i < expression.length; i++) {

            let ch = expression[i];
            if (ch === '"') isOperand = !isOperand;
            if (isOperand) continue;

            if (ch === '(') bl++;
            if (ch === ')') bl--; 
            if (Shining.operators.indexOf(ch) >= 0) {
                let operator = { level: bl, operator: ch, index: i };
                operatorLevels.push(operator);
            }
        }
        return operatorLevels;
    }

    static parseNode(expression, operatorList, level, start, end) {

        if (operatorList.length == 0) return new LeafNode(expression.substring(start, end + 1));

        let rootOperator = Shining.getRootOperatorNode(operatorList, level);
        let index = operatorList.indexOf(rootOperator);
        let leftOperatorList = operatorList.slice(0, index);
        let rightOperatorList = operatorList.slice(index + 1);
        let left;
        let leftBracket = false;
        let right;
        let rightBracket = false;

        if (leftOperatorList.length > 0) {
            let leftMaxLevel = Shining.getMaxLevel(leftOperatorList);
            left = Shining.parseNode(expression, leftOperatorList, leftMaxLevel, start, rootOperator.index - 1);

            if (left.operator !== undefined) {
                if (Shining.priorities[rootOperator.operator] > Shining.priorities[left.operator] || level < leftMaxLevel) {
                    leftBracket = true;
                }
            }
        } else {
            let leftVal = expression.substring(start, rootOperator.index);
            left = new LeafNode(leftVal);
        }

        if (rightOperatorList.length > 0) {
            let rightMaxLevel = Shining.getMaxLevel(rightOperatorList);
            right = Shining.parseNode(expression, rightOperatorList, rightMaxLevel, rootOperator.index + 1, end);
        } else {
            let rightVal = expression.substring(rootOperator.index + 1, end + 1);
            right = new LeafNode(rightVal);
        }

        if (right.operator !== undefined && Shining.priorities[rootOperator.operator] >= Shining.priorities[right.operator]) {
            rightBracket = true;
        }

        let tree = new OperatorNode(left, leftBracket, rootOperator.operator, right, rightBracket);
        return tree;
    };

    static getRootOperatorNode(operatorList, level) {

        let result = operatorList[operatorList.length - 1];
        for (let op of operatorList) {

            if (op.level !== level) continue;
            if (Shining.priorities[result.operator] > Shining.priorities[op.operator]) result = op;
        }
        return result;
    };

    static getMaxLevel(operatorList) {

        let max = null;
        for (let op of operatorList) {

            if (max === null) max = op;
            if (max.level > op.level) max = op;
        }
        return max.level;
    };
}
