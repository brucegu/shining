import OperatorNode from "./operatornode.js";
import LeafNode from "./leafnode.js";

export default class Shining {

    static get operators() {

        return ['+', '-', '*', '/', '%'];
    };

    static get priorities() {

        return {'+' : 5, '-' : 5, '%': 20, '*' : 20, '/' : 20};
    };

    static parse(expression) {

        let operatorList = Shining.parseOperatorLevel(expression);
        let maxLevel = Shining.getMaxLevel(operatorList);
        let result = Shining.parseNode(expression, operatorList, maxLevel, 0, expression.length - 1);
        return result;
    };

    static parseOperatorLevel(expression) {

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
        return operatorList;
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

        let operators = [];
        for (let i in operatorList) {
            if (operatorList[i].level === level) operators.push(operatorList[i]);
        }
        let rootIndex = operators.length - 1;
        let prio = Shining.priorities[operators[rootIndex].operator];
        for (let j = operators.length - 1; j >= 0; j--) {
            let p = Shining.priorities[operators[j].operator];
            if (p < prio) {
                rootIndex = j;
                prio = p;
            }
        }
        return operators[rootIndex];
    };

    static getMaxLevel(operatorList) {

        let max = {};
        for (let i in operatorList) {
            if (max.level === undefined) max = operatorList[i];
            if (max.level > operatorList[i].level) max = operatorList[i];
        }
        return max.level;
    };
}
