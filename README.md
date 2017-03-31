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

grunt for build : grunt build

grunt for dev build: grunt dev

grunt for run test: grunt test
