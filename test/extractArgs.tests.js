const test          = require('tape');
const extractArgs   = require('../lib/extractArgs');

const testFnEmpty = () => {};

const testFnArrowOneArg = /* arg => {} */arg/**/ => {
    console.log('hello world');  
};

const testFnArrow = (
    arg1
    ,
    arg2,arg3
    ,arg4,
    /*arg5,arg6,
     arg7*/
    // arg10
    // (some comments())
    arg999) => {
    console.log('hello world');
};

function testFnDecl(
    arg1
    ,
    arg2,arg3
    ,arg4,
    /*arg5,arg6,
     arg7*/
    // arg10
    // (some comments())
    arg999) {
    console.log('hello world');
}

const testFnExpr = function(
    arg1
    ,
    arg2,arg3
    ,arg4,
    /*arg5,arg6,
     arg7*/
    // arg10
    // (some comments())
    arg999) {
    console.log('hello world');
};

const testFnExprNamed = function testFnExprNamed(
    arg1
    ,
    arg2,arg3
    ,arg4,
    /*arg5,arg6,
     arg7*/
    // arg10
    // (some comments())
    arg999) {
    console.log('hello world');
};

test('extractArgs', t => {
    t.ok(
        extractArgs(null).join(',') === '' ,
        'should return empty array if arg is not fn'
    );
    
    t.ok(
        extractArgs(testFnEmpty).join(',') === '',
        'should return empty array if fn is empty'
    );
    t.ok(
        extractArgs(testFnArrowOneArg).join(',') === 'arg' ,
        'should extract array if arrow fn has one arg and no braces'
    );
    
    t.ok(
        extractArgs(testFnArrow).join(',') === 'arg1,arg2,arg3,arg4,arg999',
        'should extract from arrow function'
    );
    
    t.ok(
        extractArgs(testFnDecl).join(',') === 'arg1,arg2,arg3,arg4,arg999',
        'should extract from declared function'
    );
    
    t.ok(
        extractArgs(testFnExpr).join(',') === 'arg1,arg2,arg3,arg4,arg999',
        'should extract from function expression'
    );
    
    t.ok(
        extractArgs(testFnExprNamed).join(',') === 'arg1,arg2,arg3,arg4,arg999',
        'should extract from named function expression'
    );
    
    t.end();
});
