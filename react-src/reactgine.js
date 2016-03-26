
var AppLayout = React.createClass({
	render: function () {
		return (
			<div id="raw-resources">
			<ActionButton type="Cash" colour="#01832D" icon="icons/cash/icon_2709.svg" />
			<ActionButton type="Energy"  colour="#F9B700" icon="icons/energy/icon_2766.svg" />
			</div>
		);
	}
})

var ActionButton = React.createClass({
	clickType: function () {
		console.log(this.props.type);
	},
	render: function () {
		var style = {
			backgroundColor: this.props.colour
		};
		return (
			<div className="raw-res">
			<button onClick={this.clickType} data-type={this.props.type} title={this.props.type} style={style}>
			<img src={this.props.icon} title={this.props.type} className="raw-icon" />
			</button>
			<div className="resource-count">0.00</div>
			<div className="resource-max" title="1">1000000</div>
			<div className="resource-mods"></div>
			</div>
		);
	}
});

ReactDOM.render(
  <AppLayout />,
  document.getElementById('dorongine')
);