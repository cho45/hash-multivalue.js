Hash MultiValue
===============

Store multiple values per key.

Very inspired from Hash::MultiValue in CPAN.


SYNOPSIS
--------

	var hash = HashMultiValue({
		foo : ['aaa', 'bbb', 'ccc'],
		bar : ['111', '222', '333']
	});

	hash.foo; //=> 'ccc';
	hash.get('foo'); //=> 'ccc';
	hash.getAll('foo'); //=> ['aaa', 'bbb', 'ccc']

This is mainly designed for like query parameters and HTTP headers.


RESTRICTION
-----------

'get', 'getAll', 'set', 'add', 'remove', 'clear' and so on are methods for manipulating instance,
so you can't access the keys named so directly. Eg:

	var hash = HashMultiValue({
		foo : ['aaa', 'bbb', 'ccc'],
		get : ['111', '222']
	});

	hash.foo; //=> 'ccc'; (ok)
	hash.get; //=> [Function]; (ng)
	hash.get('get'); //=> '222' (ok)


