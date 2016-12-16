export default class LeafNode {

    constructor(val) {
        this.val = val.replace(/^\s*/g, '').replace(/\s*$/g, '')
                        .replace(/^[(|)]*/g, '').replace(/[(|)]*$/g, '')
                        .replace(/^"*/g, '').replace(/"*$/g, '');
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
