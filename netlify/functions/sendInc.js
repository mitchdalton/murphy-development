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

  const subject = `Patient Referral from ${body.docName}`
  const message = `<p>Referring doctor: ${body.docName}\n
                   Referring doctor's email: ${body.docEmail}\n
                   Patient name: ${body.patientName}\n
                   Service requested: ${body.serviceReq}\n
                   Radiographs: ${body.radiographs}\n
                   Appointment date: ${body.apptTime}\n
                   Additional comments: ${body.comments}</p>`
  //const attachedFiles = body.files 
                   
  const SENDINC_API = `https://rest.sendinc.com/message.json?
                                  email=info@murphyoms.com&
                                  recipients=dalton05@gmail.com&
                                  subject=${subject}&
                                  message=${message}`  

  const response = await fetch(SENDINC_API, {
    method: 'POST', 
    headers: {
      'Authorization': `Basic ${Buffer.from(AUTH_CREDENTIALS).toString('base64')}`,
    }
  })

  console.log(response)
  
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