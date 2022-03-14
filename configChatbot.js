const uuid = require('uuid');
const venom = require('venom-bot');
const dialogflow = require('./dialogflow');
const fs = require('fs');
const mime = require('mime-types');
const { error } = require('console');

const sessionIds = new Map();
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
  client.onMessage(async (message) => {
    setSessionAndUser(message.from);
    let session = sessionIds.get(message.from);
    let payload = await dialogflow.sendToDialogFlow(message.body, session)
    let responses = payload.fulfillmentMessages;

    for (const response of responses) {
      await sendMessageToWhatsapp(client, message, response);

    }

    console.log("================================")
    console.log(message.sender.id, "message message")
    await sendImageToWhatsapp(client, message);



    /* if (message.isMedia === true || message.isMMS === true) {
      const buffer = await client.decryptFile(message);
      // At this point you can do whatever you want with the buffer
      // Most likely you want to write it into a file
      const fileName = `some-file-name.${mime.extension(message.mimetype)}`;
      await fs.writeFile(fileName, buffer, (err) => {
      if(err){
        console.log(err);
      }else{
        console.log("File write succes,", fs.readFileSync(fileName))
      }
      });
    } */

  });
}

async function sendMessageToWhatsapp(client, message, response) {
  //await startWriting(client, message.sender.id);
  let promise= new Promise((resolve, reject) => {
    
    client
      .sendText(message.from, response.text.text[0])
      .then((result) => {
        console.log('Result: ', result); //return object success
        resolve(result);
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro);
        reject(erro)
      });

  })
 // await  stoptWriting(client,message.sender.id);

  return promise;
}

async function setSessionAndUser(senderId) {
  try {
    if (!sessionIds.has(senderId)) sessionIds.set(senderId, uuid.v1());
  } catch (error) {
    throw error;
  }
}


async function sendImageToWhatsapp(client, message) {
  console.log("enviando imagen")
  return new Promise((resolve, reject) => {
    if (message.text == "image") {
      console.log("enviando image")
      client
        .sendImage(
          message.sender.id,
          'image/ubicacion.png',
          'ubicacion',
          'Imagen'
        )
        .then((result) => {
          console.log('Result: ', result); //return object success
          resolve(result);
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
          reject(erro)
        });
    }
  }

  ).catch(error => console.log(error))
}

async function startWriting(client, to) {

  return new Promise((resolve, reject) => {

    client
      .startTyping(to)
      .then((result) => {
        console.log('Result: ', result); //return object success
        resolve(result);
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
        reject(erro)
      });
  }
  ).catch(error => console.log(error, "error in the promises"));
}

async function stoptWriting(client, to) {

  return new Promise((resolve, reject) => {

    client
      stopTyping(to)
      .then((result) => {
        console.log('Result: ', result); //return object success
        resolve(result);
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
        reject(erro)
      });
  }
  ).catch(error => console.log(error, "error in the promises"));
}

