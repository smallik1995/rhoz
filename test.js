const Discord = require('discord.js');
const {
  prefix,
  token,
} = require('./config.json');
const ytdl = require('ytdl-core');

const client = new Discord.Client();

const queue = new Map();

client.once('ready', () => {
  console.log('Ready!');
});

client.once('reconnecting', () => {
  console.log('Reconnecting!');
});

client.once('disconnect', () => {
  console.log('Disconnect!');
});

client.on('message', async message => {
  if (message.content.startsWith(`${prefix}test`)) {
    message.channel.send({ embed });
  }

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stop`)) {
    stop(message, serverQueue);
    return;
  } else {
    message.channel.send('You need to enter a valid command!')
  }
});

async function execute(message, serverQueue) {
  const args = message.content.split(' ');

  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
    return message.channel.send('I need the permissions to join and speak in your voice channel!');
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
    title: songInfo.title,
    url: songInfo.video_url,
  };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 1,
      playing: true,
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    return message.channel.send(`${song.title} has been added to the queue!`);
  }

}

function skip(message, serverQueue) {
  if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
  if (!serverQueue) return message.channel.send('There is no song that I could skip!');
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
  .on('end', () => {
    console.log('Music ended!');
    serverQueue.songs.shift();
    play(guild, serverQueue.songs[0]);
  })
  .on('error', error => {
    console.error(error);
  });
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

//
// const rt = new Discord.RichEmbed()
// 	.setColor('#0099ff')
// 	.setTitle(rtTitle)
// 	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
// 	.addField('Regular field title', 'Some value here')
// 	.addBlankField()
// 	.addField('Inline field title', 'Some value here', true)
// 	.addField('Inline field title', 'Some value here', true)
// 	.addField('Inline field title', 'Some value here', true)
// 	.setImage('https://i.imgur.com/wSTFkRM.png')
// 	.setTimestamp()
// 	.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
//
//
//
// const embed = {
//   "title": "Заголовок",
//   "description": "this supports [named links](https://discordapp.com) description. ```\n !test - description```",
//     // "url": "https://discordapp.com",
//     "color": 25500,
//     // "timestamp": "2019-11-11T01:34:31.002Z",
//     // "footer": {
//     //   "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
//     //   "text": "footer text"
//     // },
//     // "thumbnail": {
//     //   "url": "https://cdn.discordapp.com/embed/avatars/0.png"
//     // },
//     // "image": {
//     //   "url": "https://cdn.discordapp.com/embed/avatars/0.png"
//     // },
//     // "author": {
//     //   "name": "author name",
//     //   "url": "https://discordapp.com",
//     //   "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
//     // },
//     "fields": [
//       {
//         "name": "\n test 1",
//         "value": "msg 1"
//       },
//       {
//         "name": "\n test 2",
//         "value": "msg 2"
//       },
//       {
//         "name": "test 1-1",
//         "value": "an informative error should show up, and this view will remain as-is until all issues are fixed",
//         "inline": true
//       },
//       {
//         "name": "test 1-2",
//         "value": "these last two",
//         "inline": true
//       },
//       {
//         "name": "test 1-3",
//         "value": "are inline fields",
//         "inline": true
//       },
//       {
//         "name": "test 1-4",
//         "value": "are inline fields",
//         "inline": true
//       },
//       {
//         "name": "test 1-5",
//         "value": "are inline fields",
//         "inline": true
//       }
//     ]
//   };


  client.login(token);
