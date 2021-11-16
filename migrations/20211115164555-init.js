const {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_DATABASE,
} = process.env

module.exports = {
  async up(db) {
    await db
      .admin()
      .addUser(MONGODB_USERNAME, MONGODB_PASSWORD, {
        dbName: MONGODB_DATABASE,
        roles: 'readWrite',
      })
  },

  async down(db) {
    await db.removeUser(MONGODB_USERNAME)
  }
}
