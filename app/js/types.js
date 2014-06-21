Clicker.addItem({
	name: 'People',
	maximum: 10000000,
	defaultAmount: 5,
	components: {
		increment: {
			rate: 1
		}
	}
});

Clicker.addItem({
	name: 'Employee',
	
	maximum: 5000,
	components: {
		employable: true,
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
	icon: 'icons/miner/icon_39492.svg',
	maximum: 200,
	components: {
		employable: true,
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
				Cash: 10,
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
	icon: 'icons/scientist/icon_19851.svg',
	maximum: 100,
	components: { 
		employable: true,
		worker: {
			rate: 5,
			provides: {
				Brainpower: 1
			}
		},
		created: {
			time: 20,
			cost: {
				Cash: 1000,
				Employee: 1
			}
		},
		consumer: { // consumers 
			rate: 60,
			consumes: {
				Cash: 30,
				Energy: 10
			}
		},
		requires: {
			topics: {
				'Education': 1,
				'Technology': 1
			}
		}
	}
});

Clicker.addItem({
	name: 'Cash',
	maximum: 1000000000,
	formattedAmount: function () { return Number(this.amount).toFixed(2); },
	components: {'raw': {rate: 1}}
});

Clicker.addItem({
	name: 'Brainpower',
	maximum: 1000000000,
	formattedAmount: function () { return Number(this.amount).toFixed(2); },
	components: {'raw': {rate: 1}}
});

Clicker.addItem({
	name: 'Energy',
	maximum: 1000000000,
	formattedAmount: function () { return Number(this.amount).toFixed(2); },
	components: {'raw': {rate: 1}}
});

Clicker.addItem({
	name: 'Ore',
	maximum: 1000000000,
	formattedAmount: function () { return Number(this.amount).toFixed(2); },
	components: {'raw': {rate: 1}}
});

Clicker.addItem({
	name: 'Water',
	maximum: 1000000000,
	formattedAmount: function () { return Number(this.amount).toFixed(2); },
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
	name: 'Glass',
	icon: 'icons/glass/icon_20953.svg',
	maximum: 1000000000,
	components: {
		goods: true,
		created: {
			time: 2,
			cost: {
				'Cement': 2
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
	name: 'Steel',
	icon: 'icons/steel/icon_18535.svg',
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
	name: 'Mining Tools',
	icon: 'icons/tools/icon_543.svg',
	maximum: 1000000000,
	components: {
		goods: true,
		created: {
			time: 5,
			cost: {
				'Steel': 100
			}
		},
		requires: {
			topics: {
				'Manufacturing': 1
			},
			items: {
				'Miner': 20
			}
		},
		improves: {
			Ore: 0.02
		}
	}
});

Clicker.addItem({
	name: 'Chip',
	icon: 'icons/chip/icon_25352.svg',
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
				'Technology': 1,
				'Manufacturing': 3
			}
		}
	}
});

Clicker.addItem({
	name: 'Computer',
	icon: 'icons/computer/icon_3633.svg',
	maximum: 1000000000,
	components: {
		goods: true,
		created: {
			time: 100,
			cost: {
				'Gold': 1,
				'Chip': 2,
				'Glass': 2,
				'Copper': 10
			}
		},
		requires: {
			topics: {
				'Technology': 2,
				'Manufacturing': 2
			}
		},
		improves: {
			Brainpower: 0.01
		}
	}
});

Clicker.addItem({
	name: 'Reinforced Concrete',
	icon: 'icons/reinforced/icon_14927.svg',
	maximum: 1000000000,
	components: {
		goods: true,
		created: {
			time: 5,
			cost: {
				'Cement': 1,
				'Steel': 1
			}
		},
		requires: {
			topics: {
				'Manufacturing': 3
			}
		}
	}
});


// Buildings
Clicker.addItem({
	name: 'Solar Panel',
	icon: 'icons/solar/icon_2062.svg',
	maximum: 20,
	components: {
		building: true,
		improves: {
			Energy: 0.10
		},
		worker: {
			rate: 5,
			provides: {
				Energy: 1
			}
		},
		created: {
			time: 100,
			cost: {
				'Cash': 100,
				'Glass': 1,
				'Steel': 1,
				'Silicon': 1
			}
		},
		requires: {
			topics: {
				'Education': 1,
				'Manufacturing': 1
			}
		}
	}
});

Clicker.addItem({
	name: 'School',
	icon: 'icons/school/icon_4405.svg',
	maximum: 100,
	components: {
		building: true,
		improves: {
			Brainpower: 0.10
		},
		created: {
			time: 300,
			cost: {
				'Cash': 1000,
				'Cement': 100,
				'Iron': 100,
				'Computer': 20
			}
		},
		requires: {
			topics: {
				'Education': 2
			}
		}
	}
});


Clicker.addItem({
	name: 'University',
	icon: 'icons/uni/icon_2402.svg',
	maximum: 10,
	components: {
		building: true,
		improves: {
			Brainpower: 0.50
		},
		created: {
			time: 1200,
			cost: {
				'Cash': 10000,
				'Reinforced Concrete': 100,
				'Steel': 100,
				'Computer': 100
			}
		},
		requires: {
			topics: {
				'Education': 3,
				'Civics': 2
			}
		}
	}
});

// Research topics
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
	name: 'Education',
	levelUp: function (newLevel) {
		var current = Clicker.game().items.Brainpower.rates.raw;
		Clicker.game().items.Brainpower.rates.raw = current + current * (newLevel / 10);
	}
});

Clicker.addTopic({
	name: 'Civics',
	levelUp: function (newLevel) {
		var current = Clicker.game().items.Cash.rates.raw;
		Clicker.game().items.Cash.rates.raw = current + current * (newLevel / 10);
		Clicker.game().items.People.rates.increment = newLevel;
	}
});

Clicker.addTopic({
	name: 'Economics',
	levelUp: function (newLevel) {
		var current = Clicker.game().items.Cash.rates.raw;
		Clicker.game().items.Cash.rates.raw = current + current * (newLevel / 4);
	}
});
Clicker.addTopic({
	name: 'Technology',
	levelUp: function () {
		
	}
});

Clicker.addTopic({
	name: 'Manufacturing',
	levelUp: function () {
		
	}
});
