#!/usr/bin/env node

TAP();

var HashMultiValue = require('../lib/hashmultivalue.js').HashMultiValue;


var hash = HashMultiValue({ foo : ['aaa', 'bbb'], bar : ['111', '222', '333'] });
is(hash, { foo: 'bbb', bar: '333' });
is(hash.foo, 'bbb', 'direct');
is(hash.get('foo'), 'bbb', 'get()');
is(hash.getAll('foo'), ['aaa', 'bbb'], 'getAll()');


hash.set('baz', 'aaaa', 'bbbb', 'cccc');
is(hash, { foo: 'bbb', bar: '333', baz: 'cccc' }, 'set()');

hash.add('baz', 'dddd');
is(hash, { foo: 'bbb', bar: '333', baz: 'dddd' }, 'add()');

is(hash.getAll('baz'), [ 'aaaa', 'bbbb', 'cccc', 'dddd' ], 'add()');

hash.remove('foo');
is(hash, { bar: '333', baz: 'dddd' }, 'remove()');
is(hash.foo, undefined, 'remove()');
is(hash.get('foo'), undefined, 'remove()');

hash.clear();
is(hash, {}, 'clear()');


hash.set('get', 'foobar');
is(typeof hash.get, 'function', 'get property is always function');
is(hash.get('get'), 'foobar');

hash = HashMultiValue({ get: ['foobar'] });
is(typeof hash.get, 'function', 'get property is always function');
is(hash.get('get'), 'foobar');

done_testing();


function TAP () {
	var util = require('util');
	var status = 0;
	this.ok = function (bool, name) {
		done_testing.n++;
		var r = bool ? 'ok' : 'not ok';
		if (!bool) status++;
		r += " " + done_testing.n;
		console.log(name ? r + " # " + name : r);
	};
	this.is = function (got, expected, name) {
		got = util.inspect(got, true, 2);
		expected = util.inspect(expected, true, 2);
		if (got === expected) {
			ok(true, name);
		} else {
			ok(false, name);
			console.log("# got:\n" + got.replace(/^/gm, "# "));
			console.log("# expected:\n" + expected.replace(/^/m, "# "));
		}
	};
	this.done_testing = function () {
		var a;
		process.on('exit', function () {
			if (a) {
				var n = done_testing.n;
				console.log('1..' + n);
			} else {
				a = true;
				process.exit(status);
			} 
		});
	};
	this.done_testing.n = 0;
}
