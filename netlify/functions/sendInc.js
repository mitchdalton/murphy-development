import fetch from 'node-fetch'
import {parse} from 'querystring'


export const handler = async (event, context) => {
  const {AUTH_CREDENTIALS, ACCOUNT_EMAIL} = process.env
  console.log('EVENT.QUERYSTRINPARAMS STUPID THING!!!!!********!!!!!*******!!!!!!', event.queryStringParameters)
  let body = {}
  try {
    body = JSON.parse(event.body)
  } catch (e) {
    body = parse(event.body)
  }

  console.log('CONSOOOLLLEEE LOGGGING BODDDDYYYYYYYYYYYYYYYYYY&*&^&(@&*^#&@#%$%@^&*#^))@^*@#%^(@#%^&($@^&*#$',body)

  // const name = event.queryStringParameters.name
  // const subject = 'Patient Referral from *doc name*
  // const message = '*doc name* has sent a referral form for *patient name*'

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