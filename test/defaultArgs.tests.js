const test              = require('tape');
const defaultArguments  = require('../');

function add(a, b) {
    return a + b;
}

const add2 = defaultArguments(add, { b: 9 });
const add3 = defaultArguments(add2, { b: 3, a: 2 });
const add4 = defaultArguments(add, { c: 3 });
const add5 = defaultArguments(add3, { a: 1, b: 3 });

test('defaultArguments', t => {
    test('a + b, defaults={b: 9}', t => {
        t.equal(add2(10), 19, 'should use default value // a=10, b=undefined');
        t.equal(add2(10, 7), 17, 'should not use default values // a=10, b=7');
        t.ok(isNaN(add2()), 'should use default value and get NaN // a=undefined, b=undefined');

        t.end();
    });

    test('a + b, defaults={b: 3, a: 2}, override defaults', t => {
        t.equal(add3(10), 13, 'should use default value // a=10, b=undefined');
        t.equal(add3(), 5, 'should use default values // a=undefined, b=undefined');
        t.equal(add3(undefined, 10), 12, 'should use default value // a=undefined, b=10');
        
        t.end();
    });
   
    test('a + b, defaults={c: 3}', t => {
        t.ok(isNaN(add4(10)), 'should not find defalt value and return NaN // a=10, b=undefined');
        t.equal(add4(10, 10), 20, 'should not use default values // a=10, b=10');
        
        t.end();
    });
    
    test('a + b, defaults={a: 1, b: 3}, override defaults twice', t => {
        t.equal(add5(), 4, 'should use default value // a=undefined, b=undefined');
        t.equal(add5(10), 13, 'should use default value // a=10, b=undefined'); 
        
        t.end();
    });

    t.end();
});
