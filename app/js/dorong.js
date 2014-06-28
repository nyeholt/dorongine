

;(function ($) {
	
	Clicker.init();
	Clicker.load();
	Clicker.start();
	
	$(function () {
		var data = {};
		
		$(document).on('click', '#restart', function () {
			Clicker.init();
			Clicker.start();
		})
		
		$(document).on('click', '#save', function () {
			Clicker.save();
		})

		$(document).on('click', '#load', function () {
			Clicker.load();
		})
		
		$(document).on('click', function () {
			
		})

		var graphDiv;
		var closeGraph = function () {
			graphDiv.hide();
		};
		
		var drawgraph = function () {
			$('#graph').text('Loading...');
			var max = data.max_val;
			var drawn = false;
			
			var include = $('[name=graphitem]');
			
			include.each(function () {
				var key = $(this).val();
				if ($(this).is(':checked')) {
					// create the graph
					$('#graph').sparkline(data[key], {
						width: '100%',
						height: '100%',
						lineColor: Clicker.game().items[key].color,
						fillColor: false,
	//					chartRangeMax: max,
						composite: drawn
					});

					drawn = true;
				}
				
			});
		}
		
		$(document).on('click','#graphbtn', function () {
			var src = $('#graphsrc').val();
			data = Clicker.game().stats[src];
			if (!data) {
				return;
			}

			if (!graphDiv) {
				graphDiv = $('#graphdiv-container');
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
				$('#graphoptions').css('height', '50px');

				$('#graphclose').click(closeGraph);
				$('#redraw').click(drawgraph);
			}

			var graphItems = $('#graphitems');
			graphItems.empty();

			for (var key in data) {
				if (key === 'max_val') {
					continue;
				}
				var opt = $('<input type="checkbox" name="graphitem" checked>');
				opt.val(key);

				graphItems.append($('<label>').append(opt).append(key));
			}

			if (graphDiv.is(':visible')) {
				closeGraph();
				return;
			}
			
			graphDiv.show();
			
			drawgraph();
		});
	});
})(jQuery);