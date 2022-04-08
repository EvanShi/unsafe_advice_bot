const Discord = require("discord.js")
require("dotenv.js").config()

const TOKEN = "OTYxNzc3NzUzNjU1NDkyNjI5.Yk97VQ._vqBjs5SwxiEzQy4ZD35IUY0zs8"

const client = new Discord.Client({
    //intents
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

//listeners trigger when bot logs in with token
client.on("ready", () => {
    //anonymous function, once ready event happens, runs this function
    console.log(`Logged in as ${client.user.tag}`)

})

client.on("messageCreate", (message) => {
    if (message.content == "hi"){
        message.reply("Fuck you")
    }
})


client.login(process.env.TOKEN)










