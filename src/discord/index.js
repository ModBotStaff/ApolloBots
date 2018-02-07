const Discord = require('eris');
const config = require('config');
const r = require('./../db');
const client = new Discord.Client(config.get('discord').token);
client.on('ready', () => {
	console.log('Discord Bot is online');
	client.editStatus('online', {
		name: config.get('discord').game,
		type: 0
	});
});
client.on('userUpdate', async (user) => {
	if (user && user.bot && user.avatar) {
		const bot = await r.table('bots').get(user.id);
		if (bot && user.avatar !== bot.avatar) {
			r.table('bots')
				.get(user.id)
				.update({
					avatar: user.dynamicAvatarURL('png', 128)
				})
				.run();
		}
	}
});
client.connect();
module.exports = client;
