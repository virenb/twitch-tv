$(document).ready(function () {

	$.ajax({
		type: "GET",
		url: "https://api.twitch.tv/kraken/streams/freecodecamp",
		headers: {
			'Client-ID': 'br77xr7cxh06qe2w4tar7hf9gp812k'
		},
		success: function (data1) {
			if (data1.stream === null) {
				$("#fcc-status").html("Free Code Camp is currently OFFLINE");
			} else {
				$("#fcc-status").html("Free Code Camp is currently ONLINE");
			}
		}
	});

	$.ajax({
		type: "GET",
		url: "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/",
		headers: {
			'Client-ID': 'br77xr7cxh06qe2w4tar7hf9gp812k'
		},
		success: function (data2) {
			for (var i = 0; i < data2.follows.length; i++) {
				var displayName = data2.follows[i].channel.display_name;
				var logo = data2.follows[i].channel.logo;
				var status = data2.follows[i].channel.status;

				if (logo == null) {
					logo = 'https://www.coachimo.de/static/images/icon_not_found.png';
				}
				$("#followerInfo").prepend("<div class ='row'>" + "<div class='col-md-4'>" +
					"<img src='" + logo + "'>" +
					"</div>" + "<div class='col-md-4'>" + displayName + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");
			}
		}
	});

	var deletedFollowers = ['brunofin', 'comster404'];
	for (var i = 0; i < deletedFollowers.length; i++) {
		$.ajax({
			type: "GET",
			url: "https://api.twitch.tv/kraken/streams" + deletedFollowers[i],
			headers: {
				'Client-ID': 'br77xr7cxh06qe2w4tar7hf9gp812k'
			},
			error: function (data3) {
				var logo = 'https://www.coachimo.de/static/images/icon_not_found.png';
				var displayName = data3.statusText;
				console.log(data3.statusText);
				var status = data3.status;
				$("#followerInfo").prepend("<div class ='row'>" + "<div class='col-md-4'>" +
					"<img src='" + logo + "'>" +
					"</div>" + "<div class='col-md-4'>" + displayName + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");
			}
		});
	}
});
