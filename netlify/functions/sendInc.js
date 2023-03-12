import fetch from 'node-fetch'

export const handler = async (event, context) => {
  const {AUTH_CREDENTIALS, ACCOUNT_EMAIL} = process.env
  console.log(event.queryStringParameters)
  // const name = event.queryStringParameters.name
  // const subject = event.queryStringParameters.subject
  // const message = ''

  const SENDINC_API = `https://rest.sendinc.com/message.json?email=${ACCOUNT_EMAIL}&recipients=dalton05@gmail.com&subject=hello&message=dafuq-`  

  const response = await fetch(SENDINC_API, {
    method: 'POST', 
      headers: {
        'Authorization': `Basic ${Buffer.from(AUTH_CREDENTIALS).toString('base64')}`
      }
  })
  
  console.log(response) 
  
  return {
    statuscode: 200,
    body: response ? response : {}
  }
}