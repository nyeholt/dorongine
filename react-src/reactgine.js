
var AppLayout = React.createClass({
	componentDidMount: function () {
		Clicker.init();
		Clicker.load();
		Clicker.start(redrawAll);
		
		var game = Clicker.game();
		this.setState({game: game})
	},
	render: function () {
		var game = this.state ? this.state.game : null;
		return (
			<div id="app-layout">
			<ActionBar game={game} />
			</div>
		);
	}
});


var redrawAll = function () {
	ReactDOM.render(
		<AppLayout />,
		document.getElementById('dorongine')
	);
}
redrawAll();