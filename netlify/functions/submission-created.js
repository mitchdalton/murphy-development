const fetch = require('node-fetch')

export const handler = async () => {
  const {AUTH_CREDENTIALS, ACCOUNT_EMAIL} = process.env
  const SENDINC_API = 'https://rest.sendinc.com/message.json'   //&subject=tim&message=timmerson
  const opts = {
      method: 'POST', 
      headers: {
        'Authorization': `Basic ${Buffer.from(AUTH_CREDENTIALS).toString('base64')}`
      }
    }
  const response = await fetch(SENDINC_API+ACCOUNT_EMAIL, opts)
  const data = await response.json()
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}

