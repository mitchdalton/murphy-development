// // optionally configure local env vars
// require('dotenv').config()

// // details in https://css-tricks.com/using-netlify-forms-and-netlify-functions-to-build-an-email-sign-up-widget
const fetch = require('node-fetch')
const { EMAIL_AUTH } = process.env

exports.handler = async event => {
  try {
    const accountInfo = await fetch('https://rest.sendinc.com/account.json?email=dalton05@gmail.com&recipients=dalton05@gmail.com&subject=will this work&message=hey what up', {
      method: 'POST', 
      headers: {
        'Authorization': `Basic ${EMAIL_AUTH}`,
      }
    })
    .then(res => res.json())
    .then(() => console.log('sent successfully'))
  } catch (err) {
    console.log(err)
  }
}



  // const message = JSON.parse(event.body).payload
  // console.log(`Recieved a submission: ${message}`)

  




