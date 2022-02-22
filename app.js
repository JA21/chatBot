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
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Welcome ')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })  
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    } else if ((message.body === 'Hola' && message.isGroupMsg===false) || (message.body==='hola' && message.isGroupMsg===false )){
      client
      .sendText(message.from, 'Bienvenido.')
      .then((result) => {
        console.log('Result: ', result); //return object success
      })  
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
    }else if((message.body === 'Como esta' || message.body==='como esta') && ( message.isGroupMsg===false )){
      client
      .sendText(message.from, 'Bien,espero que usted igual, en que te puedo ayudar ?')
      .then((result) => {
        console.log('Result: ', result); //return object success
      })  
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
    }
  });
}
 