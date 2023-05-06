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

  const subject = `Website Patient Referral from ${body.docName}`
  const message = `<p style="padding: 20px">
                      <b>Referring doctor:</b> ${body.docName} <br><br>
                      <b>Doctor email:</b> ${body.docEmail} <br><br>
                      <b>Patient name:</b> ${body.patientName} <br><br>
                      <b>Service requested:</b> ${body.serviceReq} <br><br>
                      <b>Radiographs:</b> ${body.radiographs} <br><br>
                      <b>Appointment date:</b> ${body.apptTime} <br><br>
                      <b>Additional comments:</b> ${body.comments}
                  </p>`

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
    body: response ? response : {'did it work?':'no'}
  }
}