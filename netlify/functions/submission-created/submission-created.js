// // optionally configure local env vars
// require('dotenv').config()

// // details in https://css-tricks.com/using-netlify-forms-and-netlify-functions-to-build-an-email-sign-up-widget
const fetch = require('node-fetch')
const { EMAIL_AUTH } = process.env

exports.handler = async event => {
  try {
      fetch('https://rest.sendinc.com/message.json?email=mitchelljdalton@gmail.com&recipients=mitchelljdalton@gmail.com&subject=tim&message=timmerson', {
      method: 'POST', 
      headers: {
        'Authorization': `Basic ${EMAIL_AUTH}`
      }
    })
    .then(res => console.log(res.json()))
    .then(() => console.log('sent successfully'))
  } catch (err) {
    console.log(err)
  }
}



  // const message = JSON.parse(event.body).payload
  // console.log(`Recieved a submission: ${message}`)

  




