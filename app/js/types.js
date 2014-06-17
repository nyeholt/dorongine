Synned.addItem({
	name: 'People',
	maximum: 1000000000,
	onAdd: function (number) {
		
	},
	onConsume: function (number) {
		
	},
	requires: []
});

Synned.addItem({
	name: 'Cash',
	maximum: 1000000000,
	components: {'raw': true},
	onAdd: function (number) {
		
	},
	onConsume: function (number) {
		
	},
	requires: []
});

Synned.addItem({
	name: 'Energy',
	maximum: 1000000000,
	components: {'raw': true},
	onAdd: function (number) {
		
	},
	onConsume: function (number) {
		
	},
	requires: []
});

Synned.addItem({
	name: 'Brainpower',
	maximum: 1000000000,
	components: {'raw': true},
	onAdd: function (number) {
		
	},
	onConsume: function (number) {
		
	},
	requires: []
});

Synned.addItem({
	name: 'Oil',
	maximum: 1000000000,
	components: {'mined': true},
	onAdd: function (number) {
		
	},
	onConsume: function (number) {
		
	}
});


Synned.addItem({
	name: 'Water',
	maximum: 1000000000,
	components: {'mined': true},
	onAdd: function (number) {
		
	},
	onConsume: function (number) {
		
	}
});

Synned.addItem({
	name: 'Copper',
	maximum: 1000000000,
	components: {'mined': true},
	onAdd: function (number) {
		
	},
	onConsume: function (number) {
		
	}
});

Synned.addItem({
	name: 'Silicon',
	maximum: 1000000000,
	components: {'mined': true},
	onAdd: function (number) {
		
	},
	onConsume: function (number) {
		
	}
});

Synned.addItem({
	name: 'Gold',
	maximum: 1000000000,
	components: {'mined': true},
	onAdd: function (number) {
		
	},
	onConsume: function (number) {
		
	}
});


Synned.addItem({
	name: 'Iron',
	maximum: 1000000000,
	components: {'mined': true},
	onAdd: function (number) {
		
	},
	onConsume: function (number) {
		
	}
});


Synned.addItem({
	name: 'Steel',
	maximum: 1000000000,
	requires: {
		'Iron': 10
	},
	onAdd: function (number) {
		
	},
	onConsume: function (number) {
		
	}
});


Synned.addItem({
	name: 'Chip',
	maximum: 1000000000,
	requires: {
		'Gold': 1,
		'Silicon': 2,
		'Copper': 5
	},
	onAdd: function (number) {
		
	},
	onConsume: function (number) {
		
	}
});
