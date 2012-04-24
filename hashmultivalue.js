function HashMultiValue (arg) {
	var obj = {};
	for (var key in arg) if (arg.hasOwnProperty(key)) obj[key] = arg[key];

	var constructor = function () { };
	constructor.prototype = {
		get : function (name) {
			return obj.hasOwnProperty(name) ? obj[name][ obj[name].length - 1 ] : undefined;
		},

		getOne : function (name) {
			if (obj.hasOwnProperty(name)) {
				return this[name];
			} else {
				throw "No values for " + name;
			}
		},

		getAll : function (name) {
			return obj[name];
		},

		set : function (name, value) {
			var values = Array.prototype.slice.call(arguments, 1);
			obj[name] = values;

			if (!constructor.prototype[name])
			this[name] = obj[name][ obj[name].length - 1 ];
		},

		add : function (name, value) {
			var values = Array.prototype.slice.call(arguments, 1);
			obj[name] = obj[name].concat(value);

			if (!constructor.prototype[name])
			this[name] = obj[name][ obj[name].length - 1 ];
		},

		remove : function (name) {
			delete obj[name];
			delete this[name];
		},

		clear : function () {
			obj = {};
			for (var key in this) if (this.hasOwnProperty(key)) delete this[key];
		}
	};

	var ret = new constructor();
	for (var key in obj) if (obj.hasOwnProperty(key)) ret[key] = obj[key][ obj[key].length - 1 ];
	return ret;
}

var a = HashMultiValue({ foo : ['aaa', 'bbb'], bar : ['111', '222', '333'] });
console.log(a); //=> { foo: 'bbb', bar: '333' }
console.log(a.foo); //=> 'bbb'
console.log(a.get('foo')); //=> 'bbb'
console.log(a.getAll('foo')); //=> ['aaa', 'bbb']

a.set('baz', 'aaaa', 'bbbb', 'cccc');
console.log(a); //=> { foo: 'bbb', bar: '333', baz: 'cccc' }

a.add('baz', 'dddd');
console.log(a); //=> { foo: 'bbb', bar: '333', baz: 'dddd' }
console.log(a.getAll('baz')); //=> [ 'aaaa', 'bbbb', 'cccc', 'dddd' ]

a.remove('foo');
console.log(a); //=> { bar: '333', baz: 'dddd' }

a.clear();
console.log(a); //=> {}

// notice: You must use the method to get values for same key with HashMultiValue's methods.
console.log(a.get('get')); //=> undefined
console.log(a.get); //=> [Function] // always [Function]

a.set('get', 'foobar');
console.log(a.get('get')); //=> 'foobar'
console.log(a.get); //=> [Function] // always [Function]