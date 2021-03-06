module.exports = (permit, query, blank = true) => {
  let params = {}

  for (const key of permit) {
    if (query[key] !== undefined) {
      if (blank) {
        params[key] = query[key]
      } else {
        if (query[key] !== '') {
          params[key] = query[key]
        }
      }
    }
  }

  return params
}
