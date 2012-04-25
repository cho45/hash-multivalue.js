function HashMultiValue (arg) {
	var obj = {};
	for (var key in arg) if (arg.hasOwnProperty(key)) obj[key] = arg[key];

	var constructor = function () { };
	constructor.prototype = {
		get : function (name) {
			return obj.hasOwnProperty(name) ? obj[name][ obj[name].length - 1 ] : undefined;
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
	for (var key in obj) if (obj.hasOwnProperty(key)) ret.set.apply(ret, [ key ].concat( obj[key] ));
	return ret;
}

this.HashMultiValue = HashMultiValue;
