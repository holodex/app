const execSync = require('child_process').execSync

module.exports = {
  db: {
    client: 'pg',
    connection: {
      host     : execSync('docker-machine ip default').toString().trim(),
      user: 'postgres',
      //password : 'postgres',
      database : 'postgres'
    },
    pool: {
      min: 0,
      max: 1
    }
  }
}
