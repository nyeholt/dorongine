Clicker.addItem({
	name: 'People',
	maximum: 10000000,
	defaultAmount: 5
});

Clicker.addItem({
	name: 'Employee',
	maximum: 5000,
	components: {
		worker: {
			rate: 5,
			provides: {
				Cash: 1
			}
		},
		created: {
			time: 2,
			cost: {
				Cash: 10,
				People: 1
			}
		},
		consumer: { // consumers 
			rate: 60,
			consumes: {
				Cash: 5,
				Energy: 1
			}
		}
	}
});

Clicker.addItem({
	name: 'Miner',
	maximum: 200,
	components: {
		worker: {
			rate: 5,
			provides: {
				Ore: 1
			}
		},
		created: {
			time: 3,
			cost: {
				Cash: 50,
				Employee: 1
			}
		},
		consumer: { // consumers 
			rate: 60,
			consumes: {
				Cash: 20,
				Energy: 1
			}
		},
		requires: {
			topics: {
				'Mining': 1
			}
		}
	}
});

Clicker.addItem({
	name: 'Scientist',
	maximum: 100,
	components: { 
		worker: {
			rate: 5,
			provides: {
				Brainpower: 1
			}
		},
		created: {
			time: 5,
			cost: {
				Cash: 1000,
				Employee: 1
			}
		},
		consumer: { // consumers 
			rate: 60,
			consumes: {
				Cash: 100,
				Energy: 10
			}
		},
		requires: {
			topics: {
				'Education': 1,
				'Computers': 1
			}
		}
	}
});

Clicker.addItem({
	name: 'Cash',
	maximum: 1000000000,
	components: {'raw': {rate: 1}}
});

Clicker.addItem({
	name: 'Brainpower',
	maximum: 1000000000,
	components: {'raw': {rate: 1}}
});

Clicker.addItem({
	name: 'Energy',
	maximum: 1000000000,
	components: {'raw': {rate: 1}}
});

Clicker.addItem({
	name: 'Ore',
	maximum: 1000000000,
	components: {'raw': {rate: 1}}
});

Clicker.addItem({
	name: 'Water',
	maximum: 1000000000,
	components: {raw: {rate: 1}, 'weather': true }
});


Clicker.addItem({
	name: 'Oil',
	maximum: 1000000000,
	components: {'mined': { rate: 0 } }
});

Clicker.addItem({
	name: 'Cement',
	maximum: 1000000000,
	components: {'mined': { rate: 80 }}
});

Clicker.addItem({
	name: 'Copper',
	maximum: 1000000000,
	components: {'mined': { rate: 20 }}
});

Clicker.addItem({
	name: 'Silicon',
	maximum: 1000000000,
	components: {'mined': { rate: 10 }}
});

Clicker.addItem({
	name: 'Gold',
	maximum: 1000000000,
	components: {'mined': { rate: 10 }}
});


Clicker.addItem({
	name: 'Iron',
	maximum: 1000000000,
	components: {'mined': { rate: 50 }}
});

Clicker.addItem({
	name: 'Steel',
	maximum: 1000000000,
	components: {
		goods: true,
		created: {
			time: 2,
			cost: {
				'Iron': 10
			}
		},
		requires: {
			topics: {
				'Manufacturing': 1
			}
		}
	}
});

Clicker.addItem({
	name: 'Chip',
	maximum: 1000000000,
	components: {
		goods: true,
		created: {
			time: 20,
			cost: {
				'Gold': 1,
				'Silicon': 2,
				'Copper': 5
			}
		},
		requires: {
			topics: {
				'Manufacturing': 3
			}
		}
	}
});


// Research topic

Clicker.addTopic({
	increaseBy: 10,
	name: 'Mining',
	levelUp: function (newLevel) {
		if (Clicker.game().globalRates.mined < 100) {
			Clicker.game().globalRates.mined += this.increaseBy;
		}
		if (Clicker.game().globalRates.mined > 100) {
			Clicker.game().globalRates.mined = 100;
		}
		
	}
});

Clicker.addTopic({
	name: 'Politics',
	levelUp: function () {
		
	}
});

Clicker.addTopic({
	name: 'Education',
	levelUp: function () {
		
	}
});

Clicker.addTopic({
	name: 'Civics',
	levelUp: function () {
		
	}
});

Clicker.addTopic({
	name: 'Computers',
	levelUp: function () {
		
	}
});

Clicker.addTopic({
	name: 'Manufacturing',
	levelUp: function () {
		
	}
});
