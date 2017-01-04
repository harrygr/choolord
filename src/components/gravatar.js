const md5 = require('blueimp-md5')
const html = require('choo/html')

module.exports = email => {
  return html`<img src="${getAvatar(email)}" alt="Avatar from ${email}" style="width:100%; height: 100%"/>`
}

const getAvatar = email => {
  const hash = generateHash(email)
  const defaultAvatar = encodeURIComponent(getDefaultAvatar(hash))
  const size = 900

  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=${defaultAvatar}`
}

/**
 * Get a default avatar based off the email
 * @return {String}
 */
const getDefaultAvatar = hash => {
  const pad = (str, size) => '0'.repeat(size - str.toString().length) + str
  const defaults = new Array(20).fill().map((value, index) => `https://cdn-goodlord-co.s3.amazonaws.com/avatars/avatar_${pad(index + 1, 3)}.png`)
  return defaults[parseInt(hash.substring(0, 13), 16) % defaults.length]
}

/**
 * Generate the hash for a user's email address
 * @param  {String} email
 * @return {String}
 */
const generateHash = email => md5(email.trim().toLowerCase())
