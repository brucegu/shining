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
});
