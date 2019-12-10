const Discord = require('discord.js');
const {prefix,token} = require('./config.json');
const fs = require('fs');

const client = new Discord.Client();

const file = JSON.parse(fs.readFileSync('file.json', 'utf-8'));
const rt = JSON.parse(fs.readFileSync('test.json', 'utf-8'));
const addons = JSON.parse(fs.readFileSync('doc/addons.json', 'utf-8'));
const help = fs.readFileSync('./doc/help.txt', 'utf-8');
const info = fs.readFileSync('./doc/info.txt', 'utf-8');
const rank = fs.readFileSync('./doc/rank.txt', 'utf-8');

const {exampleEmbed} = require('./epgp/epgp.js');

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
  // вывоб информации
  if (message.content.startsWith(`${prefix}help`)) {
    message.channel.send(help);
  }

  // вывоб информации
  if (message.content.startsWith(`${prefix}info`) || message.content.startsWith(`${prefix}инфо`)) {
    message.channel.send(info);
  }

  // вывод EPGP
  if (message.content.startsWith(`${prefix}epgp`) || message.content.startsWith(`${prefix}епгп`)) {
    message.channel.send(exampleEmbed);
  }

  //Вывод аддонов
  if (message.content.startsWith(`${prefix}addons`) || message.content.startsWith(`${prefix}аддоны`)) {
    // message.reply('Данный раздел находится в разработке');
    message.channel.send({embed: addons})
  }

  //Вывод званий
  if (message.content.startsWith(`${prefix}rank`) || message.content.startsWith(`${prefix}звания`)) {
    message.channel.send(rank);
  }

  //Вывод очередей
  if (message.content.startsWith(`${prefix}turn`) || message.content.startsWith(`${prefix}очередь`)) {
    message.reply('Данный раздел находится в разработке');
  }

  // Расписание рт
  if (message.content.startsWith(`${prefix}рт`)) {
    message.channel.send({embed: file.RaidTime});
  }

  // Очко ги
  if (message.content.startsWith(`${prefix}Очко ги`)) {
    message.channel.send('ХЕЛ - ЗОЛОТО!, ТЕРРАЛИОН - СЕРЕБРО!, ВАЗИЛИН - БРОНЗА!');
  }

  // вывод очереди на кровь
  if (message.content.startsWith(`${prefix}blood`) || message.content.startsWith(`${prefix}кровь`)) {
    const bloodList = [];
    file.blood.turn[0].value.forEach((value, key, map) => {
      let keys = key + 1;
      let val = keys + ': ' + value + ' \n';

      bloodList.push(val)
    });
    var embedBlood = bloodList.join('');
    const embedBloodLink = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle('Очередь на кровь')
    .setDescription(embedBlood)
    .setTimestamp()
    message.channel.send(embedBloodLink);
  }

  // очередь на кровь
  if(message.content.startsWith(`${prefix}add_blood`)) {
    if (message.member.roles.get('641649098591830067')) {
      const addMessage = message.content;
      const addNickPlayer = addMessage.toUpperCase().replace(/\s/g, '').substring(10).toString();

      if (file.blood.turn[0].value.indexOf(addNickPlayer) != -1) {
        message.reply("Данный ник уже добавлен в очередь");
      } else {
        file.blood.turn[0].value.push(addNickPlayer)
        fs.writeFileSync('file.json', JSON.stringify(file, null, 1));

        message.reply(`${addNickPlayer}, успешно добавлен в очередь`);
      };
    } else {
      message.reply("Для добавления себя в очередь, вам необходимо быть 'рейдером'!");
    }
  }
})


// var log = file.blood;

// file.blood.forEach( blood => {
//   console.log(blood);
// });
// var fileRt = file.RaidTime

// file.RaidTime.Raid.forEach((value) => {
//   console.log(`${value}`);
// });

// console.log(file.blood.fields[0].name)
// console.log(file.blood.turn[0].value)

client.login(token);
