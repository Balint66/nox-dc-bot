class Command {

    constructor({
                    name,
                    triggers,
                    permissions,
                    bot_permissions,
                    dev_only
                }, run = function(client, message, args) { return 'command.incomplete' }) {

        this.run = run
        this.name = name
        this.dev_only = dev_only || false
        this.triggers = triggers !== undefined ? [ name, ...triggers ] : [ name ]
        this.permissions = permissions || []
        this.bot_permissions = bot_permissions || []
    }

    static getArgs(message, usedPrefix) 
    {
        const { content } = message
        const prefixLength = usedPrefix.length || process.env.PREFIX.length || 1
        const args = content.slice(prefixLength).trim().split(/ +/g)
        const command = args.shift().toLowerCase()
        return { args, command }
    }

    static isUsingPrefix(message, usedPrefix)
    {
        const { content } = message
        return !content.toLowerCase().trim().indexOf(usedPrefix.toLowerCase().trim()) !== 0
    }

    static isAllowed(message, command)
    {

        const { member } = message

        /// DEVELOPER
        if (process.env.DEVELOPERS.includes(member.id)) 
        {
            return true
        }
        if (command.dev_only && !process.env.DEVELOPERS.includes(member.id)) {
            return 'Stupid! This command is not for you to use! instead have a cookie. 🍪'
        }

        if(command.permissions[0] && command.permissions.some(p => !member.hasPermission(p))){
            return true
        }

        if(command.bot_permissions[0] && command.bot_permissions.some(p => !message.guild.me.hasPermission(p))){
            return "Hey darling, I'm missing permissions on this server! Please make sure I have the following permissions in this server: \n" + command.bot_permissions.map(l => l.join("\n"))
        }

        if(!command.permissions[0] && !command.dev_only){
            return true
        }

        else return "Sorry Darling, you don't have permission to run this command"

    }

}


module.exports = { Command }