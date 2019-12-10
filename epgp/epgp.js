const Discord = require('discord.js');

// const epgpImg = new Discord.Attachment('./epgp/img.jpg');

const exampleEmbed = new Discord.RichEmbed()
.setColor('#0099ff')
.setTitle('Что такое EPGP?')
.addField('аддон EPGP ( для вызова в игре пропишите /epgp )', 'тут вы можете смотреть свой приоритет и ваши очки EP и GP')
.attachFiles(['./epgp/post-11279-0-42660500-1376783988.png'])
.attachFiles(['./epgp/img.jpg'])
.attachFiles(['./epgp/lut.jpg'])
.setAuthor('EPGP download ( кликните сюда что бы скачать аддон )', 'attachment://img.jpg', 'https://yadi.sk/d/gfbcd0IpSEoQAw')
.setThumbnail('attachment://post-11279-0-42660500-1376783988.png')
.setDescription('EPGP - это система лута где вещи распределяются автоматически между игроками в зависимости от приоритета, следующим образом. Ходя в рейды вы зарабатывает очки EP(Effort Points) которые делятся на очки GP(Gear Points) которые вы получается за затупы в рейде, когда получаете вещь и т.д , разделив эти очки вы получаете PR(Priority Point) и собственно у кого этот показатель выше тот и получает вещь.так же стоит отметить что каждую недели эти очки урезаются на 15% (p.s приоритет у вас от этого меняться не будет)Кроме этого аддона вам будет необходим еще один аддон под названием EPGP Lootmaster. Он обслуживает непосредственно процесс распределения лута во время рейда, сильно уменьшая время, которое на это требуется.')
.addField('Важная информация', 'Что бы аддон корректно отображался и работал вам необходимо скачать версию аддона ввыше по ссылке')
.addBlankField()
.addField('аддон EPGP Lootmaster', 'тут вы выбираете на какой спек вам надо вещь или отказываетесь от неё')
.setImage('attachment://lut.jpg')
.setTimestamp()

module.exports.exampleEmbed = exampleEmbed;
// module.exports.epgpImg = epgpImg;
