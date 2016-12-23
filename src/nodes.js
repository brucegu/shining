class Node {

    constructor(val) {
        this.val = val.replace(/^[(|)|\s|"]*/g, '')
                        .replace(/[(|)|\s|"]*$/g, '');
    };

    set val(v) {

        this._val = v;
    };

    get val() {

        return this._val; 
    };

}

export class LeafNode extends Node {

    constructor(val) {

        super(val);
    }

    toExpression() {

        return this.val;
    };
}

export class OperatorNode extends Node {

    constructor(left, leftBracket, operator, right, rightBracket) {

        super(operator);
        this.left = left;
        this.left.parent = this;
        this.leftBracket = leftBracket;
        this.right = right;
        this.right.parent = this;
        this.rightBracket = rightBracket;
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
        var left = this.left.toExpression();
        if (this.leftBracket) left = '(' + left + ')';

        var right = this.right.toExpression();
        if (this.rightBracket) right = '(' + right + ')';

        return left + this.operator + right;
    };
}
