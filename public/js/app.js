$(document).ready(function(){
    $(".container").on('submit','#search_form',function(e){
        e.preventDefault();

        $("#result_error").html('Loading data....');
        $("#result_forecast").html('');
        $("#result_location").html('');
        $("#result_latlong").html('');

        var address = $.trim( $("#search_location").val() );

        var datastr = "address=" + address;
        $.ajax({
            type: "get",
            url: "http://localhost:3010/weather",
            data: datastr,
            cache: false,
            success: function (data) {
                if(data.error){
                    $("#result_error").html(data.error);
                } else{
                    $("#result_error").html('');
                    $("#result_forecast").html(data.forecast);
                    $("#result_location").html('<b>Location: </b>' + data.location);
                    $("#result_latlong").html('<b>Longitude: </b>' + data.longitude + '&nbsp;<b>Latitude: </b>' + data.latitude);
                }
            },
            error: function (jqXHR, status, err) {
                console.log(err);
            }
        });
    });
});