// // optionally configure local env vars
// require('dotenv').config()

// // details in https://css-tricks.com/using-netlify-forms-and-netlify-functions-to-build-an-email-sign-up-widget
const fetch = require('node-fetch')
const { EMAIL_AUTH } = process.env

exports.handler = async event => {
  try {
    const accountInfo = await fetch('https://rest.sendinc.com/account.json', {
      method: 'POST', 
      headers: {
        Authorization: `Basic ${EMAIL_AUTH}`,
      }
    })
    console.log(event)
    console.log(EMAIL_AUTH)
    console.log(await accountInfo.json())
  } catch (err) {
    console.log(err)
  }
}



  // const message = JSON.parse(event.body).payload
  // console.log(`Recieved a submission: ${message}`)

  

  // return fetch('https://rest.sendinc.com/message.json', {
  //   method: 'POST',
  //   headers: {
  //     Authorization: `Basic ${EMAIL_AUTH}`,
  //     email: 'dalton05@gmail.com',
  //     recipients: 'mitchelljdalton@gmail.com',
  //     subject: 'First sendinc message',
  //     message: 'Here is the thing posted to website',
  //   }
  // })
  //   .then(response => console.log(response.json()))
  //   .then(data => {
  //     console.log(`Submitted to SendInc:\n ${data}`)
  //   })
  //   .catch(error => ({ statusCode: 422, body: String(error) }))



