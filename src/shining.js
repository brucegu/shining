function ExpressionParser(expression) {
    if (expression == undefined) expression = '';
    this.expression = expression;
}

ExpressionParser.prototype.operators = ['+', '-', '*', '/'];
ExpressionParser.prototype.priorities = {'+' : 5, '-' : 5, '*' : 10, '/' : 10};

ExpressionParser.prototype.parse = function() {
    var operatorList = [];
    var bl = '1';
    var isOperand = false;
    for (var i = 0; i < this.expression.length; i++) {

        var preCh = '';
        var ch = this.expression[i];
        if (i > 0) {
            preCh = this.expression[i - 1];
            if (preCh === '?' && ch === '?') {
                if (isOperand) {
                    isOperand = false;
                } else {
                    isOperand = true;
                }
            }
            if (isOperand) continue;
        }
        if (ch == '(') bl = bl + '.1';
        if (ch == ')') bl = bl.substr(0, bl.length - 2);
        if (this.operators.indexOf(ch) >= 0) {
            var operator = { level: bl, operator: ch, index: i };
            operatorList.push(operator);
        }
    }
    var maxLevel = this.getMaxLevel(operatorList);
    var result = this.generateBT(operatorList, maxLevel, 0, this.expression.length - 1);
    return result;
};

ExpressionParser.prototype.generateBT = function(operatorList, level, start, end) {
    if (operatorList.length == 0) return new LeafNode(this.expression.substring(start, end + 1));

    var rootOperator = this.getRootOperatorNode(operatorList, level);
    var index = operatorList.indexOf(rootOperator);
    var leftOperatorList = operatorList.slice(0, index);
    var rightOperatorList = operatorList.slice(index + 1);
    var left;
    var leftBracket = false;
    var right;
    var rightBracket = false;

    if (leftOperatorList.length > 0) {
        var leftMaxLevel = this.getMaxLevel(leftOperatorList);
        left = this.generateBT(leftOperatorList, leftMaxLevel, start, rootOperator.index - 1);

        if (left.operator !== undefined) {
            if (this.priorities[rootOperator.operator] > this.priorities[left.operator] || level < leftMaxLevel) {
                leftBracket = true;
            }
        }
    } else {
        var leftVal = this.expression.substring(start, rootOperator.index);
        left = new LeafNode(leftVal);
    }

    if (rightOperatorList.length > 0) {
        var rightMaxLevel = this.getMaxLevel(rightOperatorList);
        right = this.generateBT(rightOperatorList, rightMaxLevel, rootOperator.index + 1, end);
    } else {
        var rightVal = this.expression.substring(rootOperator.index + 1, end + 1);
        right = new LeafNode(rightVal);
    }

    if (right.operator !== undefined && this.priorities[rootOperator.operator] >= this.priorities[right.operator]) {
        rightBracket = true;
    }

    var tree = new OperatorNode(left, leftBracket, rootOperator.operator, right, rightBracket);
    return tree;
};

ExpressionParser.prototype.getRootOperatorNode = function(operatorList, level) {
    var operators = [];
    for (var i in operatorList) {
        if (operatorList[i].level === level) operators.push(operatorList[i]);
    }
    var rootIndex = operators.length - 1;
    var prio = this.priorities[operators[rootIndex].operator];
    for (var j = operators.length - 1; j >= 0; j--) {
        var p = this.priorities[operators[j].operator];
        if (p < prio) {
            rootIndex = j;
            prio = p;
        }
    }
    return operators[rootIndex];
};

ExpressionParser.prototype.getMaxLevel = function(operatorList) {
    var max = {};
    for (var i in operatorList) {
        if (max.level === undefined) max = operatorList[i];
        if (max.level > operatorList[i].level) max = operatorList[i];
    }
    return max.level;
};

function OperatorNode(left, leftBracket, operator, right, rightBracket) {
    this.left = left;
    this.left.parent = this;
    this.leftBracket = leftBracket;
    this.operator = operator;
    this.right = right;
    this.right.parent = this;
    this.rightBracket = rightBracket;
};

OperatorNode.prototype.toExpression = function () {
    var result = '';
    var left = this.left.toExpression();
    var right = this.right.toExpression();

    if (this.leftBracket) left = '(' + left + ')';
    result += left;

    result += this.operator;

    if (this.rightBracket) right = '(' + right + ')';
    result += right;

    return result;
};

function LeafNode(val) {
    this.val = val.replace(/^\s*/g, '').replace(/\s*$/g, '').replace(/^[(|)]*/g, '').replace(/[(|)]*$/g, '');
};

LeafNode.prototype.toExpression = function () {
    return this.val;
};
