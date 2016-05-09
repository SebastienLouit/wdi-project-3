module.exports = {
  database: process.env.MONGOLAB_URI || "mongodb://localhost/streetsmart",
  port: process.env.PORT || 3000
}
