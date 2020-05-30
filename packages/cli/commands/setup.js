const path = require('path')
const fs = require('fs')
const os = require('os')

const { Command } = require('..')

module.exports = class Setup extends Command {
  constructor(program, prompts, chalk) {
    super(program, prompts, chalk)

    this.questions = [
      {
        type: 'text',
        name: 'host',
        message: 'Database host:',
        initial: '127.0.0.1',
      },
      {
        type: 'number',
        name: 'port',
        message: 'Database port:',
        initial: 27017,
      },
      {
        type: 'text',
        name: 'username',
        message: 'username:',
      },
      {
        type: 'password',
        name: 'password',
        message: 'password:',
      },
      {
        type: 'text',
        name: 'name',
        message: 'Database name:',
        initial: 'tetra',
      },
    ]
  }

  configure() {
    this.name = 'setup'

    const program = super.configure()
    program.option('-e, --env <env>', 'set environment', 'development')
    return program
  }

  async execute({ env }) {
    const envFilePath = path.join('./config/environments', `${env}.json`)
    const config = JSON.parse(fs.readFileSync(envFilePath).toString())

    if (config['database']) {
      console.error(this.chalk.red('App is already installed'))
    } else {
      console.log(this.chalk.green('Database connexion'))
      const response = await this.prompts(this.questions)
      config.database = {
        type: 'mongodb',
        ...response,
      }

      fs.writeFileSync(envFilePath, JSON.stringify(config, null, 2) + os.EOL)
    }
  }
}