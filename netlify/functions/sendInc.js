const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

export const handler = async () => {
  const {AUTH_CREDENTIALS, ACCOUNT_EMAIL} = process.env
  const SENDINC_API = `https://rest.sendinc.com/message.json?email=${ACCOUNT_EMAIL}&recipients=${ACCOUNT_EMAIL}}`   //&subject=tim&message=timmerson
  const opts = {
      method: 'POST', 
      headers: {
        'Authorization': `Basic ${Buffer.from(AUTH_CREDENTIALS).toString('base64')}`
      }
    }

  await fetch(SENDINC_API+ACCOUNT_EMAIL, opts)
  .then(response => {
    response.json()
    console.log(response.json())
    console.log('does this part run?')
  })    
    .catch(err => console.log(err))
}