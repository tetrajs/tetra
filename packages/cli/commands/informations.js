const { Command, chalk, envinfo } = require('../')
const packageJson = require(`${process.cwd()}/package.json`)

module.exports = class Informations extends Command {
  configure() {
    this.name = 'informations'
    this.alias = 'info'

    return super.configure()
  }

  execute() {
    console.log(chalk.bold('\nEnvironment Info:'))
    console.log(
      `\n  current version of ${packageJson.name}: ${packageJson.version}`,
    )
    console.log(`  running from ${__dirname}`)
    return envinfo
      .run(
        {
          System: ['OS', 'CPU'],
          Binaries: ['Node', 'npm', 'Yarn'],
          Browsers: ['Chrome', 'Edge', 'Internet Explorer', 'Firefox', 'Safari'],
          Databases: ['MongoDB']
          // npmPackages: packageJson.dependencies,
        },
        {
          duplicates: true,
          showNotFound: true,
        },
      )
      .then(console.log)
  }
}