// // optionally configure local env vars
// require('dotenv').config()

// // details in https://css-tricks.com/using-netlify-forms-and-netlify-functions-to-build-an-email-sign-up-widget
require('dotenv').config()
const fetch = require('node-fetch')
const { EMAIL_TOKEN } = process.env

exports.handler = async event => {
  const message = JSON.parse(event.body).payload
  console.log(`Recieved a submission: ${message}`)
  return fetch('https://rest.sendinc.com/message.json', {
    method: 'POST',
    headers: {
      email: 'dalton05@gmail.com',
      recipients: 'mitchelljdalton@gmail.com',
      subject: 'First sendinc message',
      message: 'Here is the thing posted to website',
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(`Submitted to SendInc:\n ${data}`)
    })
    .catch(error => ({ statusCode: 422, body: String(error) }))
}


