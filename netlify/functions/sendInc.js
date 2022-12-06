const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

export const handler = async () => {
  console.log('hey hey hey it looks like this is running')
  const {AUTH_CREDENTIALS, ACCOUNT_EMAIL} = process.env
  const SENDINC_API = 'https://rest.sendinc.com/message.json'   //&subject=tim&message=timmerson
  const opts = {
      method: 'POST', 
      headers: {
        'Authorization': `Basic ${Buffer.from(AUTH_CREDENTIALS).toString('base64')}`
      }
    }

  await fetch(SENDINC_API+ACCOUNT_EMAIL, opts)
  .then(response => response.json())
  .catch(err => console.log(err))
}