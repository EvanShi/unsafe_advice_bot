const Discord = require("discord.js")
require("dotenv.js").config()

// Consts
const welcomeChannelID = "961797126990479394"

// Functions
const generateImage = require("./generateImage.js") //default import so no brackets around generateImage required


// Initialize
const client = new Discord.Client({
    //intents
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

//Listeners trigger when stuff happens

// bot logs in with token
client.on("ready", () => {
    //anonymous function, once ready event happens, runs this function
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
    if (message.content == "hi"){
        message.reply("Fuck you")
    }
})

client.on("guildMemberAdd", async (member) => { //async so we can use await
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelID).send({
        content: `<@${member.id}> Fuck you!`,
        files: [img]
    }) 
})

client.login(process.env.TOKEN)










