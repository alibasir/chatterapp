class Channel {
    constructor(name, createdOn, createdBy, starred, expiresIn, messageCount) {
        this.name = name;
        this.createdOn = createdOn;
        this.createdBy = createdBy;
        this.starred = starred;
        this.expiresIn = expiresIn;
        this.messageCount = messageCount;
    }
}

channels = [
    new Channel('#Yummy',           new Date(2016, 3, 1),   'minus.plus.yummy',           false,    100, 999),
    new Channel('#SevenContinents', new Date(2016, 3, 1),   'minus.plus.sevenContinents', true,    100, 999),
    new Channel('#KillerApp',       new Date(2016, 3, 1),   'minus.plus.killerApp',       false,    100, 999),
    new Channel('#FirstPersonOnMars', new Date(2016, 3, 1), 'minus.plus.firstPersonOnMars', true,  100, 999),
    new Channel('#Octoberfest',     new Date(2016, 3, 1),   'minus.plus.octoberfest',      false,   100, 999)];

function getIndexOfChannel( elem ){
    var id_attr = $(elem).attr('id');
    return Number( id_attr.slice(0, id_attr.indexOf('-')));
}

function switchChannel( elem ) {

    var channelObj = channels[ getIndexOfChannel( elem ) ];

    console.log('Turning into channel "' + channelObj.name + '"');
    $('#channel-name').html( channelObj.name );

    var htmlContent = '<a href="http://w3w.co/' + channelObj.createdBy + '"' + ' target="_blank">' + channelObj.createdBy + '</a>';

    $('#chat-channel-location').html( htmlContent );
    
    $(elem).siblings().removeClass('selected');
    $(elem).addClass('selected');
    
    // Setting the Star icon
    $('#chat h1 i').attr( 
                        'class',
                        ( channelObj.starred ? 'fas' : 'far' ) + ' fa-star'
                        );

    // The Current channel
    currentChannel = channelObj;
}

function addOneItem( item, index ){
    console.log(index + ': Adding  ' + item.name );
    
    // #Yummy ==> yummy
    var fName = item.name.charAt(1).toLowerCase() + item.name.slice(2);
    
    var message_elem = Mustache.render(
                            $('template#channel-template').html()
                            ,{name: item.name, formattedName: fName, idx: index});

    // Adding Star state
    //
    var msg = $(message_elem);
    msg.find('i.fa-star').addClass( item.starred ? 'fas' : 'far' );
    
    // Box of Expiration
    var box_style = {
            'border-radius' : '2px',
            'background-color' : '#3F51B5',
            'font-size' : '12px',
            'padding' : '2px 4px',
            'margin' : '2px',
            'color' : 'white'

    };

    var box_exp = $('<div>').css( box_style ).addClass('box-exp').html(item.expiresIn + ' min');
    //var box_exp = $('<div>').addClass('box-exp').html(item.expiresIn + ' min');
    msg.find('i.fa-star').after(box_exp);
    
    box_exp = $('<div>').css( box_style ).addClass('box-exp').html(item.messageCount + ' new');
    //box_exp = $('<div>').addClass('box-exp').html(item.messageCount + ' new');
    msg.find('div.box-exp').after(box_exp);
    
    // Appending the node
    $('div#channels ul').append(msg);

    return;
}
function listChannels(){
    channels.forEach(addOneItem);
}    