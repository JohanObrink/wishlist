module.exports = {
  async up(db) {
    await db.createCollection('lists')
    await db.collection('lists').createIndex({ owner: 1 })
  },

  async down(db) {
    await db.collection('lists').drop()
  }
}
