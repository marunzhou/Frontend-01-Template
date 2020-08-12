var add = require('../src/add.js');
// var assert = require('assert');

// describe('add', function () {
//     it('add(3, 4) should be 7', function () {
//         assert.equal(add.add(3, 4), 7);
//     });
// });


const test = require('ava');

test('foo', t => {
    if (add.add(3, 4) === 7)
	    t.pass();
});