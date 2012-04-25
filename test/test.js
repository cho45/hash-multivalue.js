#!/usr/bin/env node

var assert = require('assert');

var HashMultiValue = require('../lib/hashmultivalue.js').HashMultiValue;


var hash = HashMultiValue({ foo : ['aaa', 'bbb'], bar : ['111', '222', '333'] });
assert.deepEqual(hash, { foo: 'bbb', bar: '333' });
assert.deepEqual(hash.foo, 'bbb', 'direct');
assert.equal(hash.get('foo'), 'bbb', 'get()');
assert.deepEqual(hash.getAll('foo'), ['aaa', 'bbb'], 'getAll()');


hash.set('baz', 'aaaa', 'bbbb', 'cccc');
assert.deepEqual(hash, { foo: 'bbb', bar: '333', baz: 'cccc' }, 'set()');

hash.add('baz', 'dddd');
assert.deepEqual(hash, { foo: 'bbb', bar: '333', baz: 'dddd' }, 'add()');

assert.deepEqual(hash.getAll('baz'), [ 'aaaa', 'bbbb', 'cccc', 'dddd' ], 'add()');

hash.remove('foo');
assert.deepEqual(hash, { bar: '333', baz: 'dddd' }, 'remove()');
assert.equal(hash.foo, undefined, 'remove()');
assert.equal(hash.get('foo'), undefined, 'remove()');

hash.clear();
assert.deepEqual(hash, {}, 'clear()');


hash.set('get', 'foobar');
assert.equal(typeof hash.get, 'function', 'get property is always function');
assert.deepEqual(hash.get('get'), 'foobar');

hash = HashMultiValue({ get: ['foobar'] });
assert.equal(typeof hash.get, 'function', 'get property is always function');
assert.deepEqual(hash.get('get'), 'foobar');

