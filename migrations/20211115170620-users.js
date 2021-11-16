module.exports = {
  async up(db) {
    await db.createCollection('users')
    await db.collection('users').createIndex({ email: 1 })
  },

  async down(db) {
    await db.collection('users').drop()
  }
}
