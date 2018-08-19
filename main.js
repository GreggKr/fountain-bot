const Eris = require('eris')
const fetch = require('node-fetch')
let token, prefix
try {
    let config = require('./config.json')
    token = config.token
    prefix = config.prefix
} catch(e) {
    token = process.env.TOKEN
    prefix = process.env.PREFIX
}
let IP = 'FountainGames.aternos.me'
const client = new Eris(token)

client.on('ready', () => {
    console.log('ready!')
})

client.on('messageReactionAdd', async (message, emoji, userID) => {
    let msg = await client.getMessage(message.channel.id, message.id)
    msg.removeReaction(emoji.name, userID)
    if(emoji.name == '🔁') {
        let res = await fetch(`https://mcapi.us/server/status?ip=${IP}`)
        let data = await res.json()
        if(IP.toLowerCase() == 'fountaingames.aternos.me') {
            msg.edit(`Server: ${!data.motd.startsWith('This server is offline. ') ? 'online' : 'offline'}\nPlayers: ${data.players.now}/${data.players.max}\nIP: ${IP}`)
        } else {
            msg.edit(`Server: ${data.online ? 'online' : 'offline'}\nPlayers: ${data.players.now}/${data.players.max}\nIP: ${IP}`)
        }
    }
})

client.on('messageCreate', async (message) => {
    if(!message.content.startsWith(prefix)) return
    let args = message.content.substring(prefix.length).split(' ')
    switch(args[0].toLowerCase()) {
        case 'ping': {
            message.channel.createMessage('pong!')
            break;
        }
        case 'setip': {
            if(message.author.id != '235450656335331328' && message.author.id != '333658629582618625') return
            IP = args[1]
            message.channel.createMessage('set IP to ' + args[1])
            break;
        }
    }
})

client.connect()


var http = require("http");

http.createServer((req, res) => {
    res.write('Nothing here')
}).listen(process.env.PORT)
setInterval(function() {
    http.get("http://fountain-bot.herokuapp.com");
}, 300000); // every 5 minutes (300000)