import { LeafNode, OperatorNode } from "./nodes.js";

export default class Shining {

    static get operators() {

        if (this._operators === undefined) 
            this._operators = Object.keys(Shining.priorities);

        return this._operators;
    };

    static get priorities() {

        return {'+' : 5, '-' : 5, '%': 20, '*' : 20, '/' : 20};
    };

    static parse(expression) {

        let operatorLevels = Shining.parseOperatorLevel(expression);
        let maxLevel = Shining.getMaxLevel(operatorLevels);
        return Shining.parseNode(expression, operatorLevels, maxLevel, 0, expression.length - 1);
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

    static parseNode(expression, operatorLevels, level, start, end) {

        if (operatorLevels.length === 0) 
            return new LeafNode(expression.substring(start, end + 1));

        let rootOperator = Shining.getRootOperatorNode(operatorLevels, level);
        let rootIndex = operatorLevels.indexOf(rootOperator);
        let leftOperatorLevels = operatorLevels.slice(0, rootIndex);
        let rightOperatorLevels = operatorLevels.slice(rootIndex + 1);

        let leftMaxLevel = Shining.getMaxLevel(leftOperatorLevels);
        let left = Shining.parseNode(expression, leftOperatorLevels, leftMaxLevel, start, rootOperator.index - 1);
        let leftBracket = left instanceof OperatorNode && 
                                (Shining.priorities[rootOperator.operator] > Shining.priorities[left.operator] || 
                                    level < leftMaxLevel);

        let rightMaxLevel = Shining.getMaxLevel(rightOperatorLevels);
        let right = Shining.parseNode(expression, rightOperatorLevels, rightMaxLevel, rootOperator.index + 1, end);
        let rightBracket = right instanceof OperatorNode && 
                                Shining.priorities[rootOperator.operator] >= Shining.priorities[right.operator];

        return new OperatorNode(left, leftBracket, rootOperator.operator, right, rightBracket);
    };

    static getRootOperatorNode(operatorLevels, level) {

        let result = operatorLevels[operatorLevels.length - 1];
        for (let op of operatorLevels) {

            if (op.level !== level) continue;
            if (Shining.priorities[result.operator] > Shining.priorities[op.operator]) result = op;
        }
        return result;
    };

    static getMaxLevel(operatorLevels) {

        let max = operatorLevels[0];
        for (let op of operatorLevels) {

            if (max.level > op.level) max = op;
        }
        return max === undefined ? -1 : max.level;
    };
}
