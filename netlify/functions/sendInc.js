import fetch from 'node-fetch'
import {parse} from 'querystring'


export const handler = async (event, context) => {
  const {AUTH_CREDENTIALS, ACCOUNT_EMAIL} = process.env
  let body = {}
  
  try {
    body = JSON.parse(event.body)
  } catch (e) {
    body = parse(event.body)
  }

  const subject = `Patient referral from ${body.doctor}`
  const message = `${body.doctor} has sent a referral for ${body.patient}`

  const SENDINC_API = `https://rest.sendinc.com/message.json?email=${ACCOUNT_EMAIL}&recipients=dalton05@gmail.com&subject=${subject}&message=${message}`  

  const response = await fetch(SENDINC_API, {
    method: 'POST', 
    headers: {
      'Authorization': `Basic ${Buffer.from(AUTH_CREDENTIALS).toString('base64')}`
    }
  })
  
  if (response) {
    return {
      statuscode: 200,
      body: JSON.stringify({})
    }
  } 
  
  return {
    statuscode: 200,
    body: response ? response : {}
  }
}