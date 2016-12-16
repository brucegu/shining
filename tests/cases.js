import shining from "../src/shining.js"

var assert = require('assert');

describe('Shining', function() {

    it('Case: a + b * c', function() {

        var result = shining.parse("a+b*c");
        assert(result.operator === '+', "root operator should be '+'! ");
        assert(result.left.val === 'a', "left node should be 'a'! ");
        assert(result.right.operator === '*', "right operator should be '*'! ");
        assert(result.right.left.val === 'b', "left leaf should be 'b'! ");
        assert(result.right.right.val === 'c', "right leaf should be 'c'! ");
    });

    it('Case: (a + b) * c', function() {

        var result = shining.parse("(a+b)*c");
        assert(result.operator === '*', "root operator should be '*'! ");
        assert(result.leftBracket === true, "left part should be in bracket");
        assert(result.right.val === 'c', "left node should be 'c'! ");
        assert(result.left.operator === '+', "right operator should be '*'! ");
        assert(result.left.left.val === 'a', "left leaf should be 'a'! ");
        assert(result.left.right.val === 'b', "right leaf should be 'b'! ");
    });

    it('Case: "a bc" + "b" * "c"', function() {

        var result = shining.parse("\"a bc\"+\"b\"*\"c\"");
        assert(result.operator === '+', "root operator should be '+'! ");
        assert(result.left.val === 'a bc', "left node should be 'a bc'! ");
        assert(result.right.operator === '*', "right operator should be '*'! ");
        assert(result.right.left.val === 'b', "left leaf should be 'b'! ");
        assert(result.right.right.val === 'c', "right leaf should be 'c'! ");
    });
});
