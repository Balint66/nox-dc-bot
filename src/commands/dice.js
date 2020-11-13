import { Command } from '../command';

module.exports = new Command(
    {
        name: 'dice',
        triggers: ['d']
    }, async function(client, message, args)
    {

        if(isNaN(Number(args[0])) && args[0] !== undefined)
        {
            message.channel.send('The parameter '+ args[0] + ' cannot be understood! using default 20'); 
        }

        var dice = Number(args[0]) || 20;
        message.channel.send('You roll the '+ dice + ' sided dice...');

        var numero = Math.floor(Math.random() * dice) + 1;

        message.channel.send('And you got: ' + numero + '!');

        if(numero === dice)
        {
            message.channel.send('Critical roll!!')
        }
        else if(numero === 1)
        {
            message.channel.send('That\'s unlucky.')
        }

    })