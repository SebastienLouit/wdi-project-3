module.exports = {
  database: process.env.MONGODB_URI || "mongodb://localhost/streetsmart",
  port: process.env.PORT || 3000,
  secret:   process.env.SECRET || "secretagentsmanandwomenandnongenderedperson"
}
