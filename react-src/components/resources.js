
var ItemBuyButton = require('./items').ItemBuyButton;

var ResourceTable = React.createClass({
	render: function () {
		if (!this.props.game) {
			return null;
		}
		return (
			<div id="resources" className="holder">
				<div id="mined-resources">
				<h2>Resources</h2>
				<p>These resources form the basis of items that you can create, and buildings that you can construct</p>
				<p>You can pay for resources in cash, or mine them using a Mine</p>
				<p>Keep an eye out for market variations!</p>
				<table>
				<thead>
				<tr>

				<td></td>
				<td></td>

				<td width="90px">Buy</td>
				<td width="90px">Number</td>
				<td width="90px">Sell</td>

				</tr>
				</thead>
				<tbody>
				{
					this.props.game.byComponent('market').map(function (item) {
						return (
							<ResourceRow resource={item} key={item.name + '-resource'} />
						);
					})
				}
				</tbody>
				</table>
				</div>
			</div>
		);
	}
});

var ResourceRow = React.createClass({
	render: function () {
		var res = this.props.resource;
		
		return (
			<tr>
				<td width="60%">
				<img title={res.name + ' : ' + res.description} className="item-icon" src={res.icon} /> 
				</td>
				<td>
				<span className="resource-count">{res.amount} / {res.maximum}</span>
				</td>

				<td>
				<ItemBuyButton item={res} />
				</td>

				<td>
				todo select buyvolume
				</td>

				<td>
				todo amount volume 
				</td>

				</tr>
		)
	}
})

module.exports = ResourceTable;