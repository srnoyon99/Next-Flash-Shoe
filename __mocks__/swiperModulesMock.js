// Named exports used by the slider; the real implementations are ESM only.
module.exports = new Proxy(
  {},
  {
    get: (_target, name) => ({ name: String(name) }),
  }
)
