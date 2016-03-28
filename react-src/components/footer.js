
var FooterBar = React.createClass({
	restart: function () {
		Clicker.init();
		Clicker.save();
		Clicker.start();
	},
	save: function () {
		Clicker.save();
	},
	load: function () {
		Clicker.load();
	},
	render: function () {
		var game = this.props.game;
		if (!game) {
			return null;
		}
		return (
			<div id="footer">
				<div id="build-queue" className="queue-container">

				{
					game.buildQueue.map(function (job, index) {
						return (
							<div className="buildQueueItem" key={"job-" + index}>
								<img title={job.item.name} src={job.item.icon} className="item-icon" /> 
								<div className="buildProgress">
								<progress max={job.totalSteps} value={job.currentStep}></progress>
								</div>
							</div>
						);
					})
				}
					<div className="emptyfor spacing" dangerouslySetInnerHTML={{__html: '&nbsp;'}}></div>
				</div>

				<div id="messages" className="queue-container">
				{
					game.messages.map(function (msg, index) {
						return (
							<div className={"message " + msg.class} key={'message-' + index}>
							<span className="msg-time">{msg.time}</span> {msg.message}
							</div>
						);
					})
				}
					<div className="emptyfor spacing" dangerouslySetInnerHTML={{__html: '&nbsp;'}}></div>
				</div>

				<div id="options" className="queue-container right-align-contents">
				<div className="graphopts">
					<select id="graphsrc">
					<option value="amounts">Amounts</option>
					<option value="rates">Rates</option>
					<option value="totals">Total</option>
					</select>
					<button id="graphbtn">~</button>
				</div>

				<div>
					<a href="#updates-page" className="dialog-link">Updates</a> .
					<a href="#about-page" className="dialog-link">About</a> . 
					<button id="restart" onClick={this.restart}>Restart</button>
					<button id="load" onClick={this.load}>load</button>
					<button id="save" onClick={this.save}>save</button>
				</div>
	
			</div>
			</div>
		);
	}
})

module.exports = FooterBar;