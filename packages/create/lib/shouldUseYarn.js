const execSync = require('child_process').execSync

module.exports = function shouldUseYarn() {
  try {
    const userAgent = process.env.npm_config_user_agent
    if (userAgent) {
      return Boolean(userAgent && userAgent.startsWith('yarn'))
    }
    execSync('yarnpkg --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}
