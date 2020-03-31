module.exports = {
  env: {
    AIRTABLE_TOKEN: process.env.AIRTABLE_TOKEN
  },
  webpack: (config, options) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    return config
  }
}
