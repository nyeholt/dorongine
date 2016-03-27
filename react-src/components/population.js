var ItemDisplay = require('./items').ItemDisplay;

var PeopleGroup = React.createClass({
	render: function () {
		var game = this.props.game;
		
		if (!game) {
			return <span />;
		}
		var people = game.items.People;
		var sick = game.items.Sick; 
		var dead = game.items.Dead; 
		
		var employees = game.byComponent('employable');
		
		return (
			<div id="population" className="holder">
			<h2>Employees</h2>
			<p>Hire employees to do your work (clicking) for you. To get more people, create a Town Hall</p>
				<table>
				<thead>
				<tr>
				<th><img src={people.icon} title="People" className="item-icon" /></th>
				<th width="60px"></th>
				<th width="60px"></th>
				<th>{people.amount} / {people.maximum}</th>

				<th>Required</th>
				<th>Cost</th>
				<th>Gives</th>
				<th>Consumes</th>
				<th>Provides</th>
				<th>Improves</th>

				</tr>
				</thead>
				<tbody>
				
					{
						employees.map(function (item) {
							if (item.meetsRequirements()) {
								return <PersonType item={item} key={item.name} />
							}
							return;
						})
					}
					<tr>
						<td><img src={sick.icon} title="Sick People" className="item-icon" /></td>
						<td>{sick.amount}</td>

						<td><img src={dead.icon} title="Dead People" className="item-icon" /></td>
						<td>{dead.amount}</td>

						<td></td>

						<td></td>
						<td></td>
						<td></td>

					</tr>
				</tbody>
				</table>
			</div>
		)
	}
});

var PersonType = React.createClass({
	hirePerson: function () {
		if (this.props.item.canBuy(1)) {
			Clicker.runInContext("buyItem", this.props.item);
		}
	},
	firePerson: function () {
		if (this.props.item.amount >= 1) {
			Clicker.runInContext("destroy", this.props.item);
		}
	},
	render: function () {
		var item = this.props.item;
		
		var hireButton;
		if (item.canBuy(1)) {
			hireButton = <button onClick={this.hirePerson}>Hire</button>;
		}
		
		var fireButton;
		if (item.amount >= 1) {
			fireButton = <button onClick={this.firePerson}>Fire</button>;
		}

		return (
			<tr>
				<td><img src={item.icon} title={item.name} className="item-icon" /></td>
				<td>{hireButton}</td>
				<td>{fireButton}</td>

				{ ItemDisplay(item) }
			</tr>
		)
	}
})

module.exports = PeopleGroup;