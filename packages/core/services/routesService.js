const { cache } = require('..')
const { ModulesService } = require('./')

class RoutesService {
  static get cacheName() {
    return 'routers'
  }

  static async get() {
    if (await cache.exist(RoutesService.cacheName)) {
      return cache.get(RoutesService.cacheName, JSON.parse)
    } else {
      return RoutesService.caching()
    }
  }

  static async caching() {
    const modules = await ModulesService.get()
    let routers = []

    for (const key in modules) {
      try {
        const routes = require(`${modules[key].path}/config/routes.js`)
        routers = [...routers, routes]
      } catch(e) {}
    }
    cache.set(RoutesService.cacheName, JSON.stringify(routers))

    return routers
  }
}

module.exports = RoutesService
