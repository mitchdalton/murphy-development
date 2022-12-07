import fetch from 'node-fetch'

export const handler = async (event, context) => {
  const {AUTH_CREDENTIALS, ACCOUNT_EMAIL} = process.env
  const SENDINC_API = `https://rest.sendinc.com/message.json?email=${ACCOUNT_EMAIL}&recipients=${ACCOUNT_EMAIL}`
  const opts = {
      method: 'POST', 
      headers: {
        'Authorization': `Basic ${Buffer.from(AUTH_CREDENTIALS).toString('base64')}`
      }
    }
  console.log(SENDINC_API+ACCOUNT_EMAIL, opts)
  const response = await fetch(SENDINC_API+ACCOUNT_EMAIL, opts)
  if (response) {
    console.log(response)
  } 

  return {
    statuscode: 200,
    body: response ? response : {}
  }
}