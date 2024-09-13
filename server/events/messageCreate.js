export const name = Events.MessageCreate;

export const execute = async (client, message) => {
    if (message.author.bot) return;

    // Example: command handling logic here
    const command = client.commands.get('ping');
    if (message.content === '!ping' && command) {
        await command.execute(client, message);
    }
};
