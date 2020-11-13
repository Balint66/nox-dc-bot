import { Command } from '../command.js';
import { MessageEmbed } from 'discord.js';

module.exports = async function(client, msg)
{
    const { author, content, channel } = msg;
    const { commands } = client;

    if (author.bot)
    {
        return;
    }

    const usedPrefix = process.env.PREFIX;

    const { args, command } = Command.getArgs(msg, usedPrefix);

    if (!Command.isUsingPrefix(msg, usedPrefix)) 
    {
        return;
    }

    const found = commands.get(command)
    if (found) 
    {

        const possibleError = Command.isAllowed(msg, found)
        if (possibleError !== true) 
        {
            return channel.send(possibleError)
                .catch(() => {
                    author.send(possibleError)
                        .catch(() => {})
                });
        }

        var msg, result;

        if (found.run instanceof global.Promise) 
        {
            result = await found.run.bind(client)(client, msg, args);
        }
        else 
        {
            result = found.run.bind(client)(client, msg, args);
        }

        if (result instanceof global.Promise)
        {
            result = await result;
        }

        if (['string', 'object'].includes(typeof result) || result instanceof MessageEmbed)
        {

            if (Array.isArray(result))
            {
                msg = result[0];
                result = result[1];

            }

            if (typeof result === 'object' && !result.embed) {
                result = { embed: result }
            }

            if (typeof result === 'string') 
            {

                msg =
                {

                    embed: 
                    {

                        color: process.env.BASE_EMBED_COLOR,
                        description: result,

                    }

                }

                result = undefined;

            }

            try
            {
                await channel.send(msg, result);
            }
            catch ( err ) 
            {
                const dateNow = new Date().getTime();
                console.log(dateNow + "\n" + err);
                return channel.send("`" + dateNow + "` | Starting stacktrace:... Oh, you are here? Then it's easier, please send a report to the developer ^-^");
            }

        }

    }

}