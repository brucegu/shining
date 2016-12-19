export class LeafNode {

    constructor(val) {
        this.val = val.replace(/^[(|)|\s|"]*/g, '').replace(/[(|)|\s|"]*$/g, '');
    };

    set val(v) {

        this._val = v;
    };

    get val() {

        return this._val; 
    };

    toExpression() {

        return this.val;
    };
}

export class OperatorNode {

    constructor(left, leftBracket, operator, right, rightBracket) {
        this.left = left;
        this.left.parent = this;
        this.leftBracket = leftBracket;
        this.operator = operator;
        this.right = right;
        this.right.parent = this;
        this.rightBracket = rightBracket;
    };

    set operator(val) {

        this._operator = val;
    };

    get operator() {

        return this._operator;
    };

    set leftBracket(val) {

        this._leftBracket = val;
    };

    get leftBracket() {

        return this._leftBracket;
    };

    set left(val) {

        this._left = val;
    };

    get left() {

        return this._left;
    };

    set rightBracket(val) {

        this._rightBracket = val;
    };

    get rightBracket() {

        return this._rightBracket;
    };

    set right(val) {

        this._right = val;
    };

    get right() {

        return this._right;
    };

    toExpression() {
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
}
