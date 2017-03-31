# shining

## description
parse expression to binary tree, example: a * b + c will be parsed.

	        (+)
	       /   \
	    (*)    (c)
	   /   \
	 (a)   (b)

## sample:

    import shining from "../src/shining.js";
    let result = shining.parse("a*b+c");

## build guide

build : grunt

build for dev: grunt dev

build for test: grunt mochaTest
