module.exports = client => {

    client.on("ready", async () =>{
        console.log(`${client.user.username} Wake up :)`);
        setInterval(async () => {
            let ran = [`Nancyy <3`,'WIP 💬'];
            let dom = ran[Math.floor(
            Math.random() * ran.length)];
            client.user.setPresence({
                activity: {
                    name: dom,
                    type: "WATCHING"
                },
                    status: "online"
            });
        }, 5000) // millsecond
    });
}