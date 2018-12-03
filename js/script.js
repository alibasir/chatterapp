// The first log in the console
console.log('Chatter|App is alive.');

// Short form of  "$(document).ready(function)"
$(function(){

    //
    // (( 1 )) Listing Channels Dynamically
    //
    listChannels();

    //
    // (( 2 )) Click event on Stars
    //
    $('li .channel-meta i.fa-star').click(
        function(){
            // Changing the Icon
            $(this).toggleClass('fas').toggleClass('far');
            
            // Changing the state
            var idx = getIndexOfChannel( $(this).closest('li') );
            channels[idx].starred = !(channels[idx].starred);
        }
    );

    
    //
    // (( 3 )) Switching Channels
    //
    $('div#channels ul li').click(
        function(){
            switchChannel(this);
        }
    );
        
    //
    // (( 4 )) Enter into the id="text-message"
    //
    $("#text-message").keyup(function(event) {
        if (event.keyCode === 13) {
            $("#send-button").click();
        }
        return;
    });
}
);



function changeStar( channelName ) {
    $('li:contains(' + channelName + ') i.fa-star').toggleClass('fas').toggleClass('far');
    
}


function selectTab( tabId ) {

    // Remove from other tab buttons
    $(tabId).siblings().removeClass('selected');

    // Adding the class to the newly selected tab
    $(tabId).addClass('selected');
}



