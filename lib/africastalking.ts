import AfricasTalking from 'africastalking'

const at = AfricasTalking({
  apiKey: process.env.AT_API_KEY ?? '',
  username: process.env.AT_USERNAME ?? 'sandbox',
})

const sms = at.SMS

export async function sendSms(to: string, message: string): Promise<void> {
  await sms.send({
    to: [to],
    message,
    from: process.env.AT_SENDER_ID,
  })
}
