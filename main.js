$(document).ready(function(){
    var following = [];

    $.ajax({
        type: "GET",
        url: "https://api.twitch.tv/kraken/streams/freecodecamp",
        headers: {
            'Client-ID': 'br77xr7cxh06qe2w4tar7hf9gp812k'
        },
        success: function(data1) {
            if(data1.stream === null) {
                $("#fcc-status").html("Free Code Camp is currently OFFLINE");
            }
            else {
                $("#fcc-status").html("Free Code Camp is currently ONLINE");
            }
        }
    });

    var followerURL = "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/";
    $.getJSON(followerURL, function(data2) {
        for (var i = 0; i < data.follows.length; i++) {
            var displayName = data2.follows[i].channel.display_name;
            following.push(displayName);
        }
        following.push('comster404');
        following.push('brunofin');
        following.push('ESL_SC2');

        for (var i = 0; i < following.length ;i++) {
            var url2 = 'https://api.twitch.tv/kraken/streams/' + following[i] + '/?callback=?';

            $.getJSON(url2, function(data3) {
                var logo;
                var status;
                var name;
                if (data3.error) {
                    logo = "Insert Logo";
                    name = data3.message;
                    status = data3.error;

                    $("#followerInfo").prepend("<div class = 'row'>" + "<div class='col-md-4'>" + "<img src='" + logo +"'>" +
                        "</div>" + "<div class='cold-md-4'>" + name + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");
                }
                if (data3.stream == null) {
                    $.getJSON(data3._links.channel, function(data5) {
                        status = 'OFFLINE';
                        logo = data5.logo;
                        name = data3.display_name;
                        if (logo === null) {
                            logo = 'http://web.vmc3.com/projects/bufs/branch/marines/logo/NoLogo.jpg';
                        }
                    $("#followerInfo").prepend("<div class = 'row'>" + "<div class='col-md-4'>" + "<img src='" + logo +"'>" +
                        "</div>" + "<div class='cold-md-4'>" + name + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");
                    });
                }
            });
        }
        for (var i = 0; i < following.length; i++) {
            var onlineURL = 'https://api.twitch.tv/kraken/streams/' + following[i];
            $.getJSON(onlineURL, function(data4) {
                    var logo = data4.stream.channel.logo;
                if (logo === null) {
                    logo = 'http://web.vmc3.com/projects/bufs/branch/marines/logo/NoLogo.jpg';
                }
                    var status = data4.stream.channel.status ;
                    var name = data4.stream.channel.display_name;

                $("#followerInfo").prepend("<div class = 'row'>" + "<div class='col-md-4'>" + "<img src='" + logo +"'>" +
                    "</div>" + "<div class='cold-md-4'>" + name + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");
            });
        }
    });
});
