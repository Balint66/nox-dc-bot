import { Command } from '../command';

module.exports = new Command({

    name: 'reload',
    triggers: ['r']

}, async function(client, message, args)
{
    if(args === undefined || args === null || args.length !== 1 )
    { 
        await message.reply("To reload a command, you must provide one command name.");
        return;
    }

    const commandName = args[0];
    const command = require('./' + commandName + '.js');
    var found = false;

    for(const trigger of command.triggers)
    {

        if(!client.commands.has(trigger) && !found)
        {

            message.reply('Unfortunetely the command ' + trigger + ' does not exist. :o');
            continue;

        }

        client.commands.delete(trigger);
        found = true;

    }

    delete require.cache[require.resolve('./'+commandName+'.js')];

    const newCommand = require('./' + commandName + '.js');

    for (const trigger of newCommand.triggers) 
    {

        client.commands.set(trigger, newCommand)

    }

    message.reply('The command ' + commandName + ' has been reloaded');
    console.log('The command ' + commandName + ' has been reloaded');

})