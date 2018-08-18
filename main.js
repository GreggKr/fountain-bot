const Eris = require('eris')
const fetch = require('node-fetch')
const config = require('./config.json')
const PREFIX = '!'
//const IP = 'FountainGames.aternos.me'
const IP = 'mc.hypixel.net'
const client = new Eris(config.token)

client.on('ready', () => {
    console.log('ready!')
    //client.getMessage('472481133322305537', '480480949738536984')
})

client.on('messageReactionAdd', async (message, emoji, userID) => {
    let msg = await client.getMessage(message.channel.id, message.id)
    msg.removeReaction(emoji.name, userID)
    if(emoji.name == '🔁') {
        let res = await fetch(`https://mcapi.us/server/status?ip=${IP}`)
        let data = await res.json()
        console.log(data)
        msg.edit(`Server: ${data.online ? 'online' : 'offline'}\nPlayers: ${data.players.now}/${data.players.max}\nIP: ${IP}`)
    }
})

client.on('messageCreate', async (message) => {
    let args = message.content.substring(PREFIX.length).split(' ')
    switch(args[0]) {
        case 'ping': {
            message.channel.createMessage('pong!')
            break;
        }
    }
})

client.connect()