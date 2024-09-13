export const name = Events.ClientReady;

export const execute = async (client) => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
};
