class Message {
    constructor(text) {
        this.createdBy = currentLocation.w3w;
        this.latitute = currentLocation.latitute;
        this.longitute = currentLocation.longitute;
        
        this.createdOn = Date.now();
        this.expiresOn = this.createdOn + 15 * 60 * 1000;
        
        this.text = text;
        this.own = true;
    }
}

function formatDate( date_msec ){
    
    var date = new Date( date_msec );

    // Sample formatted Date: "Wed, June 20th, 13:37"
    
    var day_name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var month_name = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"];

    var createdOn_string;
    
    var weekday = day_name[ date.getDay() ];
    var createdOn_string = weekday + ', ';

    var mnth = month_name[ date.getMonth() ];
    createdOn_string += mnth + ' ';
    
    var day_string;
    var day = date.getDate();
    var suffix = ['st, ', 'nd, ', 'rd, ', 'th, '];
    var idx;
    if( day < 4 ){
        idx = day;
    } else {
        idx = 3;
    } 
    day_string = (day+1).toString() + suffix[idx];
    createdOn_string += day_string;

    createdOn_string += date.getHours() + ':' + date.getMinutes();

    return createdOn_string;    
}

function createMessageElement( msgObj ){

    var expiresIn_string = Math.round( ( msgObj.expiresOn - Date.now() ) / (60*1000) ).toString();
    var createdOn_string = formatDate( msgObj.createdOn );

    var data = {
        createdBy: msgObj.createdBy,
        createdOn: createdOn_string,
        expiresIn: expiresIn_string,
        text: msgObj.text
    }
    
    var template_html = $('template#chat-message-template').html();

    var message_elem = Mustache.render(template_html, data);
 
    return message_elem; 
}

function sendMessage( txt ){
    
    // Creating Message Object
    var msg = new Message( txt );

    // Creating and Adding HTML Element of the message, NOT VISIBLE
    var message_elem = createMessageElement( msg );
    $('div.message-zone').append( message_elem );

    // Scrolling the Message Zone to the bottom
    var h = $('div.message-zone').get(0).scrollHeight;
    $('div.message-zone').scrollTop(h);

    // Showing the message animated
    $('div.message:last').css('opacity', '0');
    $('div.message:last').animate({opacity: '1.0'}, 1500);
    
    // Cleaning the Text Input
    $('.footer-bar#text-message').val('');
    
}