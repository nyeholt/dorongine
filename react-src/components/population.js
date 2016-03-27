var PeopleGroup = React.createClass({
	render: function () {
		var people = this.props.game ? this.props.game.items.People : {};
		var sick = this.props.game ? this.props.game.items.Sick : {};
		var dead = this.props.game ? this.props.game.items.Dead : {};
		return (
			<div id="population" className="holder">
			<h2>Employees</h2>
			<p>Hire employees to do your work (clicking) for you. To get more people, create a Town Hall</p>
				<table>
				<thead>
				<tr>
				<th><img src={people.icon} title="People" class="item-icon" /></th>
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
				
				</tbody>
		
				<tr>
					<td><img src={sick.icon} title="Sick People" class="item-icon" /></td>
					<td>{sick.amount}</td>

					<td><img src={dead.icon} title="Dead People" class="item-icon" /></td>
					<td>{dead.amount}</td>

					<td></td>

					<td></td>
					<td></td>
					<td></td>

				</tr>
		
				</table>
			</div>
		);
	}
});