
var ActionBar = React.createClass({
	rawResources: function () {
		
	},
	render: function () {
		var collectable = [];
		if (this.props.game) {
			collectable = this.props.game.byComponent('collected');
		}
		
		return (
			<div id="raw-resources">
			{
				collectable.map(function (item) {
					if (item.meetsRequirements(true)) {
						return <CommandButton commandName="collectItem" key={item.name} item={item} />
					} 
					return <div key={item.name} className="empty" />;
				})
			}
			</div>
		);
	}
});

var CommandButton = React.createClass({
	clickType: function () {
		Clicker.runInContext(this.props.commandName, this.props.item);
	},
	render: function () {
		var item = this.props.item;
		
		var style = {
			backgroundColor: item.color
		};
		
		return (
			<div className="raw-res">
			<button onClick={this.clickType} data-type={item.type} title={item.name + ': ' + item.description} style={style}>
			<img src={item.icon} title={item.type} className="raw-icon" />
			</button>
			<div className="resource-count">{item.formattedAmount()}</div>
			<div className="resource-max" title={item.rates.raw}>{item.maximum}</div>
			<div className="resource-mods"></div>
			</div>
		);
	}
});

module.exports = ActionBar