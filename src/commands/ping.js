import { Command } from '../command';

var lock = false;

module.exports = new Command({

    name: 'ping',

}, async function(client, message, args)
{
    
    if(lock)
    {
        message.channel.send('The command is not usable yet!')
        return;
    }
    lock = true;
    setTimeout(() => {
        lock = false;
    }, 30000);

    var date = Date.now();
    var ms = date - message.createdTimestamp
    message.channel.send('pong! ' + ms + 'ms');

})