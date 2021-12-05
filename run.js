const pm2 = require('pm2')
const cron = require('node-cron');
//const fs = require('fs-extra')

pm2.connect((error) => {
    if (error) {
      console.error(error)
    }

    pm2.start({ script: 'index.js' }, (error, apps) => {
      pm2.disconnect()
      if (error) {
        console.error(error)
      }
    })

    cron.schedule("*/10 * * * *", function(){
      //fs.writeFileSync('./lib/database/user/antispam.json', JSON.stringify([]))
      pm2.restart('index', (error) => {
        if (error) {
          console.error(error)
        }
      })
      console.log('[INFO] Time to restart!');
    })

    /*cron.schedule("0 0 * * *", function(){
      let hitsCount = JSON.parse(fs.readFileSync('./lib/database/bot/hits.json'))
      const ResetHitsCount = (_dir) => {
        let position = false
        Object.keys(_dir).forEach((i) => {
            if (_dir[i].id === 'today') {
                position = i
            }
        })
        if (position !== false) {
            console.log('Reset Hits')
            _dir[position].hits = 0
            fs.writeFileSync('./lib/database/bot/hits.json', JSON.stringify(_dir))
        }
    }
    ResetHitsCount(hitsCount)
    console.log('succes')
    pm2.restart('index', (error) => {
      if (error) {
        console.error(error)
      }
    })
    console.log('[INFO] Time to restart!');
  })*/
})