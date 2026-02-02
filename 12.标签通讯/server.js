const WebsocketServcer = require("ws").Server;

const websocketServcer = new WebsocketServcer({ port: 3411 });

let clients = [];

websocketServcer.on("connection", (client) => {
  clients.push(client);
  process.stdout.write("current online:" + clients.length + "\n");

  client.on("message", (msg) => {
    for (c of clients) {
      if (c === client) continue;
      c.send(msg);
    }
  });

  client.on("close", () => {
    clients.filter((c) => c !== client);
    console.log(client)
    process.stdout.write("current online:" + clients.length + "\n");
  });
});

process.stdout.write("wss on 3411\n");
