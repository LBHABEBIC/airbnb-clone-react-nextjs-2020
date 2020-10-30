import { User, sequelize } from '../../../model.js'

const randomString = (length) => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).end() //Method Not Allowed
    return
  }

  const { email, password, passwordconfirmation } = req.body

  if (password !== passwordconfirmation) {
    res.end(
      JSON.stringify({ status: 'error', message: 'Passwords do not match' })
    )
    return
  }
  const user = await User.create({ email, password })
  res.end(JSON.stringify({ status: 'success', message: 'User added' }))
}
