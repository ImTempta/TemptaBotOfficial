const { Client, RichEmbed } = require('discord.js')
const { prefix, token } = require('./confiq.json');
const client = new Client();

const cheerio = require('cheerio');

const request = require('request')

client.once('ready', () => {
    console.log('Tempta Official Bot Is Now Online!')
})

client.on('message', message=>{
    if(message.content === "Hello There!"){
        message.channel.send('**GENERAL KENOBI!**');
    }
})

client.on('message', message =>{
    if(message.content === "sup"){
        message.channel.send("Say `Hello There!` For a surprise! ")
    }
    if(message.content === "its not just a theory"){
        message.channel.send("**It's a Game Theory!**")
    }
})

client.on('message', message =>{
    if(message.content === "Ian"){
        message.channel.send("Mother Fucker!")
    }
    if(message.content === "Tim"){
        message.channel.send("Hello?")
    }
    if(message.content === "Josh"){
        message.channel.send("Who?")
    }
    if(message.content === "Trent"){
        message.channel.send("Alright Boi!")
    }
    if(message.content === "Aaron"){
        message.channel.send("Fuck Me Dude!")
    }
    if(message.content === "Sam"){
        message.channel.send("Really typing in your own name? wow how selfish!")
    }
})

client.on('message', message =>{
    if(message.content.toUpperCase().includes('NIGGER') || message.content.toUpperCase().includes('NIG') || message.content.toUpperCase().includes('NGL')) {
        message.delete()
        message.channel.send(`You Just Had to Say The N Word so Here Some BBC! <@${message.member.id}>!`, { files: [ './imgs/22269562.gif']})
    }
})

client.on('message', message =>{
    if(message.content === "N"){
        message.channel.send("STOP RIGHT THERE, IN THE NAME OF THE LAW!")
    }
})

client.on('message', message =>{
    if(message.content === "n"){
        message.channel.send("STOP RIGHT THERE, IN THE NAME OF THE LAW!")
    }
    if(message.content === "whats your name?"){
        message.channel.send("**Hi, I am the Official Bot For Tempta's Server! Nice To Meet You!**")
    }
})

client.on('message', message => {
    if(message.content === 'ask'){
        const embed = new RichEmbed()
        .setColor(0x26F0F1)
        .setTitle("How Do Aquire The Hentai?")
        .addField('Hentai Images', `${prefix}h.png`)
        .addField('Hentai GIFs', `${prefix}h.gif`)
        .setFooter('Official Tempta Bot | Developed by Tempta#8008')
        .setTimestamp(new Date())
        message.channel.send(embed)
    }
})

client.on('message', message => {
    if(message.content.startsWith(prefix)){

        let args = message.content.split(" ")
        let command = args[0].replace(prefix, "")
    
        switch (command) {
            case 'h.png':
                Hentai_pic(message);
    
                break;

            case 'h.gif':
                hentai_gif(message);
    
                break;

            default:
                console.log(command)
        }
    }
    
})

function Hentai_pic(message) {

    var options = {
        url: 'http://results.dogpile.com/serp?qc=images&q=hentai',
        method: 'GET',
        headers: {
            "Accept": "text/html",
            "User-Agent": "Mozilla/5.0",
           "Cookie": "ws_prefs=vr=1&af=None",
        }
    }

    request(options, function(error, response, responseBody) {
        if (error) {
            console.log(error)
            return;
        }
 
 
        $ = cheerio.load(responseBody);
 
 
        var links = $(".image a.link");
 
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
       
        console.log(urls);
 
        if (!urls.length) {
           
            return;
        }
 
        // Send result
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });

}

function hentai_gif(message) {

    var URL = "https://nekos.life/api/v2/img/Random_hentai_gif"
    _sendRequest(URL, (err, data) => {
        message.channel.send(data.url)
    })

}
function _sendRequest(inputURL, callback) {
    request(inputURL, (err, res, body) => {
        let data = null;
            if(!err) {
                try {
                    data = JSON.parse(body)
                } catch(ex) {
                    return callback(new Error('Malformed JSON'), null)
                }
            }
            if(data) {
                return callback(err, data)
            }
            return callback(err, data)
    })
}



client.login(process.env.BOT_TOKEN);
