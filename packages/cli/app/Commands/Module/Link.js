const { database, event, cache } = require('@tetrajs/core')
const { Command } = require('../../..')
const { ModuleService } = require('../../Services')

class Link extends Command {
  configure() {
    this.name = 'link'
    this.description = 'Link tetra module'

    return super.configure()
  }

  syntax() {
    console.log(
      this.kleur.green(`tetra <options> ${this.name} [module1 module2]`),
    )
  }

  execute(args) {
    args.map(async (module) => {
      try {
        cache.clear('modules')
        const pkg = require(`${module}/package.json`)

        await ModuleService.findOrCreate(
          { name: pkg.name },
          {
            name: pkg.name,
            version: pkg.version,
          },
        )

        event.emit(`tetra:cmd:${this.name}`, { name: pkg.name, version: pkg.version })
      } catch (error) {
        database.mongoose.connection.close(true)
      }
    })
  }
}

module.exports = Link
