const venom = require('venom-bot');

venom
  .create({
    session: 'session-name', //name of session
    multidevice: false // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    console.log(client);
      client
        .sendText(message.from, 'Welcome ')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })  
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    
  });
}
 