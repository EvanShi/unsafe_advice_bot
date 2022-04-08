const Canvas = require("canvas")
const Discord = require("discord.js")

// use url to image hosting service
const background = "image url"

const dim = {
    height: 675,
    width: 1200,
    margin: 50
}
const av = {
    size: 256,
    x: 480,
    y: 170
}

const generateImage = async (member) => {
    let username = member.user.username
    let discrim = member.user.disciminator // 4 numbers at end of username
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic:false, size:av.size})
// 1200x670 sized image by default

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")

    //load image in the background
    const backimg = await Canvas.loadImage(background)
    ctx.drawImage(backimg, 0,0)

    ctx.fillStyle = "rgba(0,0,0,0.8)" // black tinted box
    ctx.fillRect(dim.margin, dim.margin, dim.width- 2*dim.margin, dim.height - 2*dim.margin)

    const avimg = await Canvas.loadImage(avatarURL)
    //Clipping - paste image into a selection
    ctx.save()

    // Draw circle to put avatar in
    ctx.beginPath()
    ctx.arc(av.x + av.size/2, av.y + av.size/2, av.size/2, 0, Math.Pi * 2) //center, radius, start angle, end angle (rad)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()

    // draw text
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.font = "50px Times New Roman"
    ctx.fillText("Welcome", dim.width/2, dim.margin + 70)

    // draw in username
    ctx.font = "70px Times New Roman"
    ctx.fillText(username + discrim, dim.width/2, dim.height - dim.margin - 125)

    // draw into server
    ctx.font = "40 px Times New Roman"
    ctx.fillText("to the server", dim.width/2, dim.height - dim.margin - 50)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
    return attachment
}

module.exports = generateImage

