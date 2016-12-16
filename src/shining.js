import OperatorNode from "./operatornode.js";
import LeafNode from "./leafnode.js";

export default class Shining {

    static get operators() {

        return ['+', '-', '*', '/'];
    };

    static get priorities() {

        return {'+' : 5, '-' : 5, '*' : 10, '/' : 10};
    };

    static parse(expression) {

        let operatorList = [];
        let bl = '1';
        let isOperand = false;
        for (let i = 0; i < expression.length; i++) {

            let ch = expression[i];
            if (ch === '"') isOperand = !isOperand;
            if (isOperand) continue;

            if (ch == '(') bl = bl + '.1';
            if (ch == ')') bl = bl.substr(0, bl.length - 2);
            if (Shining.operators.indexOf(ch) >= 0) {
                let operator = { level: bl, operator: ch, index: i };
                operatorList.push(operator);
            }
        }
        var maxLevel = Shining.getMaxLevel(operatorList);
        var result = Shining.generateBT(expression, operatorList, maxLevel, 0, expression.length - 1);
        return result;
    };

    static generateBT(expression, operatorList, level, start, end) {

        if (operatorList.length == 0) return new LeafNode(expression.substring(start, end + 1));

        var rootOperator = Shining.getRootOperatorNode(operatorList, level);
        var index = operatorList.indexOf(rootOperator);
        var leftOperatorList = operatorList.slice(0, index);
        var rightOperatorList = operatorList.slice(index + 1);
        var left;
        var leftBracket = false;
        var right;
        var rightBracket = false;

        if (leftOperatorList.length > 0) {
            var leftMaxLevel = Shining.getMaxLevel(leftOperatorList);
            left = Shining.generateBT(expression, leftOperatorList, leftMaxLevel, start, rootOperator.index - 1);

            if (left.operator !== undefined) {
                if (Shining.priorities[rootOperator.operator] > Shining.priorities[left.operator] || level < leftMaxLevel) {
                    leftBracket = true;
                }
            }
        } else {
            var leftVal = expression.substring(start, rootOperator.index);
            left = new LeafNode(leftVal);
        }

        if (rightOperatorList.length > 0) {
            var rightMaxLevel = Shining.getMaxLevel(rightOperatorList);
            right = Shining.generateBT(expression, rightOperatorList, rightMaxLevel, rootOperator.index + 1, end);
        } else {
            var rightVal = expression.substring(rootOperator.index + 1, end + 1);
            right = new LeafNode(rightVal);
        }

        if (right.operator !== undefined && Shining.priorities[rootOperator.operator] >= Shining.priorities[right.operator]) {
            rightBracket = true;
        }

        var tree = new OperatorNode(left, leftBracket, rootOperator.operator, right, rightBracket);
        return tree;
    };

    static getRootOperatorNode(operatorList, level) {

        var operators = [];
        for (var i in operatorList) {
            if (operatorList[i].level === level) operators.push(operatorList[i]);
        }
        var rootIndex = operators.length - 1;
        var prio = Shining.priorities[operators[rootIndex].operator];
        for (var j = operators.length - 1; j >= 0; j--) {
            var p = Shining.priorities[operators[j].operator];
            if (p < prio) {
                rootIndex = j;
                prio = p;
            }
        }
        return operators[rootIndex];
    };

    static getMaxLevel(operatorList) {

        var max = {};
        for (var i in operatorList) {
            if (max.level === undefined) max = operatorList[i];
            if (max.level > operatorList[i].level) max = operatorList[i];
        }
        return max.level;
    };
}
