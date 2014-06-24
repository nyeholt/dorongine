
Clicker.init();
Clicker.start();

;(function ($) {
	$(function () {
		
		$(document).on('click', '#save', function () {
			Clicker.save();
		})
		
		$(document).on('click', '#load', function () {
			Clicker.load();
		})
		
		$(document).on('click', function () {
			
		})

		var graphDiv;
		$(document).on('click','#graphbtn', function () {
			if (!graphDiv) {
				graphDiv = $('<div id="graphdiv-container"><span id="graph">Loading...</span></div>');
				graphDiv.css({
					position: 'fixed',
					top: '5%',
					left: '5%',
					background: '#fff',
					width: '90%',
					height: '90%',
					margin: '10px auto',
					border: '2px solid #aaa',
					'padding-top': '20px',
					display: 'none'
				});
				$('body').append(graphDiv);
			}
			
			if (graphDiv.is(':visible')) {
				graphDiv.hide();
				return;
			}
			graphDiv.show();
			
			var data = Clicker.game().stats.amounts;
			
			var max = data.max_val;
			var drawn = false;
			for (var key in data) {
				if (key == 'max_val') {
					break;
				}

				// create the graph
				$('#graph').sparkline(data[key], {
					width: '100%',
					height: '90%',
					lineColor: Clicker.game().items[key].color,
					fillColor: false,
					chartRangeMax: max,
					composite: drawn
				});

				drawn = true;
			}
		});
	});
})(jQuery);