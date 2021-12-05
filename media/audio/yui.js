require('dotenv').config()
const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const ffmpeg = require('fluent-ffmpeg')
const axios = require('axios')
const moment = require('moment-timezone')
const getYouTubeID = require('get-youtube-id')
const os = require('os')
const get = require('got')
const speed = require('performance-now')
const color = require('./lib/color')
const fetch = require('node-fetch')
const { spawn, exec } = require('child_process')
const urlShortener = require('./lib/shortener')
const nhentai = require('nhentai-js')
const { API } = require('nhentai-api')
const google = require('google-it')
const translatte = require('translatte')
const { stdout } = require('process')
const quotedd = require('./lib/quote')
const translate = require('translatte')
//const { getStickerMaker } = require('./lib/ttp')
const Math_js = require('mathjs');
const imageToBase64 = require('image-to-base64')
const bent = require('bent')
const request = require('request')
const { addFilter, isFiltered } = require('./lib/msgFilter')

/*
THX BUAT YANG UDAH GUNAIN SCRIPT INI
JANGAN LUPA JOIN GRUP WHATSAPP
AGAR BISA MENGEMBANGKAN BOT BUKAN COPY DOANG

BAGI YANG NANYA2 MASANG APIKEY DIMANA??
BACA README NYA, PERCUMA W BUAT README

INGAT JANGAN JUAL SCRIPT Yui KEPADA ORANG LAIN!
INGIN PREMIUM? CHAT yui!

Yui BOT V3
*/

const { 
    downloader,
    liriklagu,
    quotemaker,
    randomNimek,
    sleep,
    jadwalTv,
    processTime,
    nulis
    } = require('./lib/functions')

const { 
    help,
    commandd,
    roleplay,
    premu,
    nopremu,
    premcmd,
    admincmd,
    ownercmd,
    nsfwcmd,
    kerangcmd,
    mediacmd,
    animecmd,
    othercmd,
    downloadcmd,
    praycmd,
    groupcmd,
    bahasalist,
    sewa,
    snk, 
    info, 
    sumbang, 
    readme, 
    listChannel,
    commandArray
    } = require('./lib/help')

const {
    instagram,
    tiktok,
    facebook,
    smule,
    joox,
    starmaker,
    twitter
    } = require('./lib/downloader')

const {
    stickerburn,
    stickerlight
    } = require('./lib/sticker')

const { 
    uploadImages, 
    custom
    } = require('./lib/fetcher')

// LOAD FILE
let banned = JSON.parse(fs.readFileSync('./lib/database/banned.json'))
let nsfw_ = JSON.parse(fs.readFileSync('./lib/database/nsfwz.json'))
let simi_ = JSON.parse(fs.readFileSync('./lib/database/Simsimi.json'))
let limit = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
let welkom = JSON.parse(fs.readFileSync('./lib/database/welcome.json'))
let left = JSON.parse(fs.readFileSync('./lib/database/left.json'))
let muted = JSON.parse(fs.readFileSync('./lib/database/muted.json'))
let setting = JSON.parse(fs.readFileSync('./lib/database/setting.json'))
let msgLimit = JSON.parse(fs.readFileSync('./lib/database/msgLimit.json'))
let adminNumber = JSON.parse(fs.readFileSync('./lib/database/admin.json'))
let premium = JSON.parse(fs.readFileSync('./lib/database/premium.json'))
let antilink = JSON.parse(fs.readFileSync('./lib/database/antilink.json'))
let antibadword = JSON.parse(fs.readFileSync('./lib/database/antibadword.json'))

let { 
    limitCount,
    memberLimit, 
    groupLimit,
    banChats,
    barbarkey,
    vhtearkey,
    restartState: isRestart,
    mtc: mtcState
    } = setting

let state = {
    status: () => {
        if(banChats){
            return 'Nonaktif'
        }else if(mtcState){
            return 'Nonaktif'
        }else if(!mtcState){
            return 'Aktif'
        }else{
            return 'Aktif'
        }
    }
}

moment.tz.setDefault('Asia/Jakarta').locale('id')

module.exports = yui = async (yui, message) => {
    try {
        const { 
            type, 
            id, 
            from, 
            t, 
            sender, 
            isGroupMsg, 
            chat, 
            chatId, 
            caption, 
            isMedia, 
            mimetype,
            quotedMsg, 
            quotedMsgObj, 
            author, 
            mentionedJidList 
            } = message

        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName } = sender
        pushname = pushname || verifiedName
        const commands = caption || body || ''
        const prefix = '!'
        const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''
        const command = commands.toLowerCase().split(' ')[0] || ''
        const args =  commands.split(' ')
        const argx = commands.toLowerCase()
        const isCmd = command.startsWith(prefix)
        
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedAudio = quotedMsg && (quotedMsg.type === 'audio' || quotedMsg.type === 'ptt' || quotedMsg.type === 'ppt')
        const isQuotedFile = quotedMsg && quotedMsg.type === 'document'

        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''

        function restartAwal(client){
            setting.restartState = false
            isRestart = false
            yui.sendText(setting.restartId, 'Restart Succesfull!')
            setting.restartId = 'undefined'
            fs.writeFileSync('./lib/setting.json', JSON.stringify(setting, null,2));
        }
 
        const isMuted = (chatId) => {
          if(muted.includes(chatId)){
            return false
        }else{
            return true
            }
        }

        function banChat () {
            if(banChats == true) {
            return false
        }else{
            return true
            }
        }

        if (typeof Array.prototype.splice === 'undefined') {
            Array.prototype.splice = function (index, howmany, elemes) {
                howmany = typeof howmany === 'undefined' || this.length;
                var elems = Array.prototype.slice.call(arguments, 2), newArr = this.slice(0, index), last = this.slice(index + howmany);
                newArr = newArr.concat.apply(newArr, elems);
                newArr = newArr.concat.apply(newArr, last);
                return newArr;
            }
        }

        const apakah = [
            'Ya',
            'Tidak',
            'Coba Ulangi'
            ]

        const bisakah = [
            'Bisa',
            'Tidak Bisa',
            'Coba Ulangi'
            ]

        const kapankah = [
            '1 Minggu lagi',
            '1 Bulan lagi',
            '1 Tahun lagi',
            '1 Abad lagi',
            'Impossible'
            ]

        const rate = [
            '100%',
            '95%',
            '90%',
            '85%',
            '80%',
            '75%',
            '70%',
            '65%',
            '60%',
            '55%',
            '50%',
            '45%',
            '40%',
            '35%',
            '30%',
            '25%',
            '20%',
            '15%',
            '10%',
            '5%'
            ]

        const mess = {
            wait: '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar',
            magernulissatu: 'Harap Tunggu, BOT Sedang Menulis Di Buku 1!',
            error: {
                St: '[❗] Kirim gambar dengan caption *!sticker* atau tag gambar yang sudah dikirim',
                Ti: '[❗] Replay sticker dengan caption *!stickertoimg* atau tag sticker yang sudah dikirim',
                Qm: '[❗] Terjadi kesalahan, mungkin themenya tidak tersedia!',
                Yt3: '[❗] Terjadi kesalahan, tidak dapat meng konversi ke mp3!',
                Yt4: '[❗] Terjadi kesalahan, mungkin error di sebabkan oleh sistem.',
                Ig: '[❗] Terjadi kesalahan, mungkin karena akunnya private',
                Ki: '[❗] Bot tidak bisa mengeluarkan Admin group!',
                Sp: '[❗] Bot tidak bisa mengeluarkan Admin',
                Ow: '[❗] Bot tidak bisa mengeluarkan Owner',
                Bk: '[❗] Bot tidak bisa memblockir Owner',
                Ad: '[❗] Tidak dapat menambahkan target, mungkin karena di private',
                Iv: '[❗] Link yang anda kirim tidak valid!'
            }
        }

        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const botNumber = await yui.getHostNumber()
        const blockNumber = await yui.getBlockedIds()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await yui.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const serial = sender.id

        const isAdmin = adminNumber.includes(sender.id)
        const isPrem = premium.includes(sender.id)
        const ownerNumber = '6281358181668@c.us'
        const isOwner = ownerNumber.includes(sender.id)

        if(isOwner) {
            var roleid = 'Papa YUI'
        } else if(isPrem) {
            var roleid = 'Premium'
        } else if(!isPrem) {
            var roleid = 'Free'
        }
        
        
        const isWhite = (chatId) => adminNumber.includes(chatId) ? true : false
        const isWhiteList = (chatId) => {
            if(adminNumber.includes(sender.id)){
                if(muted.includes(chatId)) return false
                return true
            }else{
                return false
            }
        }
        // PROTECT
        const isDetectorLink = antilink.includes(chatId)
        const isDetectorBadword = antibadword.includes(chatId)
        
        const isBanned = banned.includes(sender.id)
        const isBlocked = blockNumber.includes(sender.id)
        const isNsfw = isGroupMsg ? nsfw_.includes(chat.id) : false
        const isSimi = isGroupMsg ? simi_.includes(chat.id) : false
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~!=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~!?&/=]*)/gi)
        const url = args.length !== 0 ? args[0] : ''

        const tutor = 'https://i.ibb.co/Hp1XGbL/a4dec92b8922.jpg'
        const errorurl = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
        const errorurl2 = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
        // FUNCTION
                function isMsgLimit(id){
                    if (isPrem) {return false;}
                    let found = false;
                    for (let i of msgLimit){
                        if(i.id === id){
                            if (i.msg >= 12) {
                                found === true 
                                yui.reply(from, '*[ANTI-SPAM]*\nMaaf, Nomer anda kami blok karena SPAM, Hubungi Papa untuk unblock', id)
                                yui.contactBlock(id)
                                banned.push(id)
                                fs.writeFileSync('./lib/database/banned.json', JSON.stringify(banned))
                                return true;
                            }else if(i.msg >= 7){
                                found === true
                                yui.reply(from, '*[ANTI-SPAM]*\nNomor anda terdeteksi spam!\nMohon tidak spam 5 pesan lagi atau nomor anda saya BLOK!', id)
                                return true
                            }else{
                                found === true
                                return false;
                            }   
                        }
                    }
                    if (found === false){
                        let obj = {id: `${id}`, msg:1};
                        msgLimit.push(obj);
                        fs.writeFileSync('./lib/database/msgLimit.json',JSON.stringify(msgLimit));
                        return false;
                    }  
                }
                function addMsgLimit(id){
                    if (isPrem) {return;}
                    var found = false
                    Object.keys(msgLimit).forEach((i) => {
                        if(msgLimit[i].id == id){
                            found = i
                        }
                    })
                    if (found !== false) {
                        msgLimit[found].msg += 1;
                        fs.writeFileSync('./lib/database/msgLimit.json',JSON.stringify(msgLimit));
                    }
                }
                function isLimit(id){
                    if (isPrem) {return false;}
                    let found = false;
                    for (let i of limit){
                        if(i.id === id){
                            let limits = i.limit;
                            if (limits >= limitCount) {
                                found = true;
                                yui.reply(from, 'Limit anda sudah mencapai batas, coba esok hari :)', id)
                                return true;
                            }else{
                                limit
                                found = true;
                                return false;
                            }
                        }
                    }
                    if (found === false){
                        let obj = {id: `${id}`, limit:1};
                        limit.push(obj);
                        fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit));
                        return false;
                    }  
                }
                function limitAdd (id) {
                    if (isPrem) {return;}
                    var found = false;
                    Object.keys(limit).forEach((i) => {
                        if(limit[i].id == id){
                            found = i
                        }
                    })
                    if (found !== false) {
                        limit[found].limit += 1;
                        fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit));
                    }
                }
        
                function monospace(string) {
                    let _3 = '`'.repeat(3)
                    return _3 + string + _3
                }
                // END HELPER FUNCTION
                if (isGroupMsg && isDetectorLink && !isGroupAdmins && !isPrem && !isOwner){
                    if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                        const check = await yui.inviteInfo(chats);
                        if (!check) {
                            return
                        } else {
                            yui.reply(from, `*「 GROUP LINK DETECTOR 」*\nKamu mengirimkan link grup chat, maaf kamu di kick dari grup :(`, id).then(() => {
                                yui.removeParticipant(groupId, sender.id)
                            })
                        }
                    }
                }
                // MRHRTZ
                if (isGroupMsg && isDetectorBadword && !isGroupAdmins && !isAdmin && !isOwner){
                    if (chats.match("anjing") || chats.match("gblk") || chats.match("tolol") || chats.match("kntl")) {
                        if (!isGroupAdmins) {
                            return yui.reply(from, "JAGA UCAPAN DONG!! 😠", id)
                            .then(() => yui.removeParticipant(groupId, sender.id))
                            .then(() => {
                                yui.sendText(from, `*「 ANTI BADWORD 」*\nKamu berkata kasar, maaf kamu di kick dari grup 🙁`)
                            }).catch(() => yui.sendText(from, `Untung Yui bukan admin group, kalo iya udah ku kick kamu -_-`))
                        } else {
                            return yui.reply(from, "Tolong jaga ucapan, banyak anak kecil", id)
                        }
                    }
                }
                
                if(body === '!mute' && isMuted(chatId) == true){
                    if(isGroupMsg) {
                        if (!isGroupAdmins) return yui.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh admin Yui!', id)
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        muted.push(chatId)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        yui.reply(from, 'Bot telah di mute pada chat ini! !unmute untuk unmute!', id)
                    }else{
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        muted.push(chatId)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        reply(from, 'Bot telah di mute pada chat ini! !unmute untuk unmute!', id)
                    }
                }
                if(body === '!unmute' && isMuted(chatId) == false){
                    if(isGroupMsg) {
                        if (!isGroupAdmins) return yui.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh admin Yui!', id)
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        let index = muted.indexOf(chatId);
                        muted.splice(index,1)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        yui.reply(from, 'Bot telah di unmute!', id)         
                    }else{
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        let index = muted.indexOf(chatId);
                        muted.splice(index,1)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        yui.reply(from, 'Bot telah di unmute!', id)                   
                    }
                }
                if (body === '!unbanchat') {
                    if (!isOwner) return yui.reply(from, 'Maaf, perintah ini hanya dapat dilakukan oleh Papa Yui!', id)
                    if(setting.banChats === false) return
                    setting.banChats = false
                    banChats = false
                    fs.writeFileSync('./lib/database/setting.json', JSON.stringify(setting, null, 2))
                    yui.reply('Global chat has been disable!')
                }

        // [BETA] Avoid Spam Message
        if (isCmd && isFiltered(from) && !isGroupMsg) { return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname)) }
        if (isCmd && isFiltered(from) && isGroupMsg) { return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle)) }
        //
        if (isCmd && !isGroupMsg) {console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))}
        if (isCmd && isGroupMsg) {console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))}

        // [BETA] Avoid Spam Message
        //addFilter(from)
        if (isMuted(chatId) && banChat() && !isBlocked && !isBanned || isOwner ) {
        switch(command) {

        case '!banchat':
            if (setting.banChats === true) return
            if (!isOwner) return yui.reply(from, 'Perintah ini hanya bisa di gunakan oleh Papa Yui!', id)
            setting.banChats = true
            banChats = true
            fs.writeFileSync('./lib/database/setting.json', JSON.stringify(setting, null, 2))
            yui.reply('Global chat has been enable!')
            break

        case '!unmute':
            console.log(`Unmuted ${name}!`)
            await yui.sendSeen(from)
            break
        case '!unbanchat':
            console.log(`Banchat ${name}!`)
            await yui.sendSeen(from)
            break
        case '!sticker':
        case '!stiker':
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await yui.sendImageAsSticker(from, imageBase64)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await yui.sendImageAsSticker(from, imageBase64)
            } else if (args.length === 2) {
                const url = args[1]
                if (url.match(isUrl)) {
                    await yui.sendStickerfromUrl(from, url, { method: 'get' })
                        .catch(err => console.log('Caught exception: ', err))
                } else {
                    yui.reply(from, mess.error.Iv, id)
                }
            } else {
                    yui.reply(from, mess.error.St, id)
            }
            break
        /*case '!ttp':
                if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', message.id)
                yui.reply(from, 'Fitur ini masih diperbaiki')
                try
                {
                    const string = body.toLowerCase().includes('!ttp') ? body.slice(5) : body.slice(5)
                    if(args)
                    {
                        if(quotedMsgObj == null)
                        {
                            const gasMake = await getStickerMaker(string)
                            if(gasMake.status == true)
                            {
                                try{
                                    await yui.sendImageAsSticker(from, gasMake.base64)
                                }catch(err) {
                                    await yui.reply(from, 'Gagal membuat.', id)
                                } 
                            }else{
                                await yui.reply(from, gasMake.reason, id)
                            }
                        }else if(quotedMsgObj != null){
                            const gasMake = await getStickerMaker(quotedMsgObj.body)
                            if(gasMake.status == true)
                            {
                                try{
                                    await yui.sendImageAsSticker(from, gasMake.base64)
                                }catch(err) {
                                    await yui.reply(from, 'Gagal membuat.', id)
                                } 
                            }else{
                                await yui.reply(from, gasMake.reason, id)
                            }
                        }
                       
                    }else{
                        await yui.reply(from, 'Tidak boleh kosong.', id)
                    }
                }catch(error)
                {
                    console.log(error)
                }*/
            break
        case '!ttp':
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return yui.reply(from, `Kirim perintah *!ttp [ Teks ]*, contoh *!ttp Yui*`, id)
            const ttp2t = body.slice(5)
            const lttp2 = ["Orange","White","Green","Black","Purple","Red","Yellow","Blue","Navy","Grey","Magenta","Brown","Gold"]
            const rttp2 = lttp2[Math.floor(Math.random() * (lttp2.length))]
            await yui.sendStickerfromUrl(from, `https://api.vhtear.com/textmaker?text=${ttp2t}&warna=${rttp2}&apikey=${vhtearkey}`)
            break
        case '!ttg':
            if (!isGroupMsg) return yui.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            try {
                if (quotedMsgObj == null) {
                    if (args.length === 1) return yui.reply(from, `Kirim perintah *!ttg [ Teks ]*, contoh *!ttg aku bukan boneka*`, id)
                        await yui.sendStickerfromUrl(from, `https://api.vhtear.com/textxgif?text=${body.slice(5)}&apikey=${vhtearkey}`)
                        limitAdd(serial)
                } else {
                    await yui.sendStickerfromUrl(from, `https://api.vhtear.com/textxgif?text=${quotedMsgObj}&apikey=${vhtearkey}`)
                    limitAdd(serial)
                }
            } catch(e) {
                console.log(e)
                yui.reply(from, 'Maaf, Server sedang Error')
            }
            break
        case '!magernulis1': // BY MFARELS
                if (args.length === 4) return await yui.reply(from, 'Kirim Perintah *!magernulis1 --[Nama]--[Kelas]--[Teks]*\n\n*Contoh :*\n!magernulis1 --DwiRizqi--8A--Biologi bab 2 blalbalba', id) // https://github.com/MFarelS/RajinNulis-BOT
                yui.reply(from, 'Fitur Ini Sedang Di Perbaiki')
                /*arg = body.trim().split('--') // INSTALL IMAGEMAGICK KALO MAU WORK
                const diNama = arg[1] // WAKTU INSTALL, CENTANG KOLOM 1,2,3,5,6
                const diKelas = arg[2] // SUBSCRIBE MFARELS CH
                const diTulis = arg[3] // FOLLOW INSTAGRAM @mfarelsyahtiawan
                await yui.reply(from, mess.magernulissatu, id) // NAMA, KELAS, WAKTU, BY ST4RZ
                const panjangKalimat = diTulis.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangNama = diNama.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangKelas = diKelas.replace(/(\S+\s*){1,10}/g, '$&\n')
                const panjangBaris = panjangKalimat.split('\n').slice(0, 30).join('\n')
                const panjangBarisNama = panjangNama.split('\n').slice(0, 30).join('\n')
                const panjangBarisKelas = panjangKelas.split('\n').slice(0, 30).join('\n')
                var months = ['- 1 -', '- 2 -', '- 3 -', '- 4 -', '- 5 -', '- 6 -', '- 7 -', '- 8 -', '- 9 -', '- 10 -', '- 11 -', '- 12 -'];
                var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
                var date = new Date();
                var day = date.getDate();
                var month = date.getMonth();
                var thisDay = date.getDay(),
                    thisDay = myDays[thisDay];
                var yy = date.getYear();
                var year = (yy < 1000) ? yy + 1900 : yy;
                const waktu = (day + ' ' + months[month] + ' ' + year)
                const hari = (thisDay)
                spawn('convert', [
                    './mager/magernulis/magernulis1.jpg',
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '700x960',
                    '-pointsize',
                    '20',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+806+78',
                    hari,
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '700x960',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+806+102',
                    waktu,
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '700x960',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+360+100',
                    panjangBarisNama,
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '700x960',
                    '-pointsize',
                    '18',
                    '-interline-spacing',
                    '1',
                    '-annotate',
                    '+360+120',
                    panjangBarisKelas, 
                    '-font',
                    './font/Zahraaa.ttf',
                    '-size',
                    '700x960',
                    '-pointsize',
                    '20',
                    '-interline-spacing',
                    '-7.5',
                    '-annotate',
                    '+344+142',
                    panjangBaris,
                    './mager/magernulis√/magernulis1√.jpg'
                ])
                .on('error', () => yui.reply(from, 'Error?, Report ke !papa', id))
                .on('exit', () => {
                    yui.sendImage(from, './mager/magernulis√/magernulis1√.jpg', 'FarelZahra.jpg', '*Sukses✓ Nulis DiBuku ✓*\n\n*YouTube : MFarelS CH*\n*Instagram : @mfarelsyahtiawan*\n*Twitter : @MSyahtiawan*\n*GitHub : @MFarelS*\n*Saweria : MFarelS*\n\n*© Powered By BOT✓*', id)
                })*/
            break // BY MFARELS
        case '!toimg':
            if (quotedMsg && quotedMsg.type == 'sticker') {
                const mediaData = await decryptMedia(quotedMsg)
                yui.reply(from, `[WAIT] Sedang di proses⏳ silahkan tunggu!`, id)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await yui.sendFile(from, imageBase64, 'imagesticker.jpg', 'Success Convert Sticker to Image!', id)
            } else if (!quotedMsg) return yui.reply(from, `Mohon tag sticker yang ingin dijadikan gambar!`, id)
            break
        case '!stickergif': // INSTALL FFMPEG, IF YOU WANT THIS COMMAND WORK!
        case '!stikergif': // TUTORIAL IN README, PLEASE READ!
        case '!sgif': // MRHRTZ
            yui.reply(from, `[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!`, id)
            if (isMedia || isQuotedVideo) {
                if (mimetype === 'video/mp4' && message.duration < 10 || mimetype === 'image/gif' && message.duration < 10) {
                    var mediaData = await decryptMedia(message, uaOverride)
                    //yui.reply(from, '[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!', id)
                    var filename = `./media/stickergif.${mimetype.split('/')[1]}`
                    await fs.writeFileSync(filename, mediaData)
                    await exec(`gify ${filename} ./media/stickergf.gif --fps=30 --scale=240:240`, async function (error, stdout, stderr) {
                        var gif = await fs.readFileSync('./media/stickergf.gif', { encoding: "base64" })
                        await yui.sendImageAsSticker(from, `data:image/gif;base64,${gif.toString('base64')}`)
                        .catch(() => {
                            yui.reply(from, 'Maaf filenya terlalu besar!', id)
                        })
                    })
                  } else {
                    yui.reply(from, `[❗] Kirim gif dengan caption *${prefix}stickergif* max 10 sec!`, id)
                   }
                } else {
		    yui.reply(from, `[❗] Kirim gif dengan caption *${prefix}stickergif*`, id)
	        }
            break
        case '!stickerlightning':
        case '!slightning':
        case '!slight':
             yui.reply(from, `[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!`, id)
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const getUrle = await uploadImages(mediaData, false)
                const imgnye = await stickerlight(getUrle)
                const Slight = imgnye.result.imgUrl
                await yui.sendStickerfromUrl(from, Slight)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const getUrle = await uploadImages(mediaData, false)
                const imgnye = await stickerlight(getUrle)
                const Slight = imgnye.result.imgUrl
                await yui.sendStickerfromUrl(from, Slight)
            } else {
                await yui.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan !slight`, id)
            }
            break
        case '!stickerfire':
        case '!sfire':
            yui.reply(from, `[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!`, id)
            if (isMedia && type === 'image') {
                const mediaData = await decryptMedia(message, uaOverride)
                const getUrli = await uploadImages(mediaData, false)
                const imgnya = await stickerburn(getUrli)
                const Sfire = imgnya.result.imgUrl
                await yui.sendStickerfromUrl(from, Sfire)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                const getUrli = await uploadImages(mediaData, false)
                const imgnya = await stickerburn(getUrli)
                const Sfire = imgnya.result.imgUrl
                await yui.sendStickerfromUrl(from, Sfire)
            } else {
                await yui.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan !sfire`, id)
            }
            break
        case '!groupinfo' :
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', message.id)
            isMuted(chatId) == false
            var totalMem = chat.groupMetadata.participants.length
            var desc = chat.groupMetadata.desc
            var groupname = name
            var welgrp = welkom.includes(chat.id)
            var leftgrp = left.includes(chat.id)
            var ngrp = nsfw_.includes(chat.id)
            var antlink = antilink.includes(chat.id)
            var simu = simi_.includes(chat.id)
            var antbad = antibadword.includes(chat.id)
            var grouppic = await yui.getProfilePicFromServer(chat.id)
            if (grouppic == undefined) {
                 var pfp = errorurl
            } else {
                 var pfp = grouppic 
            }
            await yui.sendFileFromUrl(from, pfp, 'group.png', `*「 GROUP INFO 」*
*➤ *Nama : ${groupname}* 
*➤ Member : ${totalMem}*
*➤ Welcome : ${welgrp ? 'Aktif' : 'Tidak Aktif'}*
*➤ Left : ${leftgrp ? 'Aktif' : 'Tidak Aktif'}*
*➤ NSFW : ${ngrp ? 'Aktif' : 'Tidak Aktif'}*
*➤ Simsimi : ${simu ? 'Aktif' : 'Tidak Aktif'}*
*➤ Anti Link : ${antlink ? 'Aktif' : 'Tidak Aktif'}*
*➤ Anti Badword : ${antbad ? 'Aktif' : 'Tidak Aktif'}*
*➤ Deskripsi Group* 
${desc}`)
            break
        case '!quoterandom' :
        case '!quote' :
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            yui.sendText(from, quotedd())
            break
        case '!tts':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            try {
                if (args.length === 1) return yui.reply(from, 'Kirim perintah *!tts [ Bahasa ] [ Teks ]*, contoh *!tts id halo semua*')
                var dataBhs = args[1]      
                const ttsHZ = require('node-gtts')(dataBhs)
                var dataText = body.slice(8)
                if (dataText === '') return yui.reply(from, 'Masukkan teksnya', id)
                if (dataText.length > 500) return yui.reply(from, 'Teks terlalu panjang! Maks 500', id)
                var dataBhs = body.slice(5, 7)
                ttsHZ.save('./media/tts.mp3', dataText, function () {
                yui.sendPtt(from, './media/tts.mp3', id)
                })
            } catch (err){
                console.log(err)
                yui.reply(from, bahasa_list, id)
            }
            break
        case '!koin':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const side = Math.floor(Math.random() * 2) + 1
            if (side == 1) {
              yui.sendStickerfromUrl(from, 'https://i.ibb.co/YTWZrZV/2003-indonesia-500-rupiah-copy.png', { method: 'get' })
            } else {
              yui.sendStickerfromUrl(from, 'https://i.ibb.co/bLsRM2P/2003-indonesia-500-rupiah-copy-1.png', { method: 'get' })
            }
            break
        case '!dadu':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const dice = Math.floor(Math.random() * 6) + 1
            await yui.sendStickerfromUrl(from, 'https://www.random.org/dice/dice' + dice + '.png', { method: 'get' })
            break
        case '!kapankah':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const when = args.join(' ')
            const ans = kapankah[Math.floor(Math.random() * (kapankah.length))]
            if (!when) yui.reply(from, '⚠️ Format salah! Ketik *!menu* untuk penggunaan.')
            await yui.sendText(from, `Pertanyaan: *${when}* \n\nJawaban: ${ans}`)
            break
        case '!nilai':
        case '!rate':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const rating = args.join(' ')
            const awr = Math.floor(Math.random() * 100)
            if (!rating) yui.reply(from, '⚠️ Format salah! Ketik *!menu* untuk penggunaan.')
            await yui.sendText(from, `Pertanyaan: *${rating}* \n\nJawaban: ${awr}`)
            break
        case '!apakah':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const nanya = args.join(' ')
            const jawab = apakah[Math.floor(Math.random() * (apakah.length))]
            if (!nanya) yui.reply(from, '⚠️ Format salah! Ketik *!menu* untuk penggunaan.')
            await yui.sendText(from, `Pertanyaan: *${nanya}* \n\nJawaban: ${jawab}`)
            break
         case '!bisakah':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const bsk = args.join(' ')
            const jbsk = bisakah[Math.floor(Math.random() * (bisakah.length))]
            if (!bsk) yui.reply(from, '⚠️ Format salah! Ketik *!menu* untuk penggunaan.')
            await yui.sendText(from, `Pertanyaan: *${bsk}* \n\nJawaban: ${jbsk}`)
            break
        case '!owner':
        case '!papa':
            await yui.sendImage(from, './media/img/owner.jpg', 'owner.jpg', '《📍》 *Nama:* Dwi Rizqi\n《⌛》 *Umur:* 13\n《📆》 *Ulang Tahun:* Mei 07\n《❤》 *Status*: JOMBLO :v')
            yui.sendContact(chatId, `6281358181668@c.us`)
            break
        // ON OFF
        case '!antibadword':
            if (!isGroupMsg) return yui.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (!isGroupAdmins) return yui.reply(from, `Perintah ini hanya bisa di gunakan oleh Admin group!`, id)
            if (!isBotGroupAdmins) return yui.reply(from, `Perintah ini hanya bisa di gunakan jika Bot menjadi Admin!`, id)
            if (args[1] == 'enable') {
                var cek = antibadword.includes(chatId);
                if(cek){
                    return yui.reply(from, `*「 ANTI BADWORD 」*\nSudah diaktifkan di grup ini`, id)
                } else {
                    antibadword.push(chatId)
                    fs.writeFileSync('./lib/database/antibadword.json', JSON.stringify(antibadword))
                    yui.reply(from, `*「 ANTI BADWORD 」*\nPerhatian Untuk Member Grup ${name}\nHarap Jangan Toxic Di Sini Atau Yui Akan Kick!`, id)
                }
            } else if (args[1] == 'disable') {
                var cek = antibadword.includes(chatId);
                if(!cek){
                    return yui.reply(from, `*「 ANTI BADWORD 」*\nSudah dinonaktifkan di grup ini`, id)
                } else {
                    let nixx = antibadword.indexOf(chatId)
                    antibadword.splice(nixx, 1)
                    fs.writeFileSync('./lib/database/antibadword.json', JSON.stringify(antibadword))
                    yui.reply(from, `*「 ANTI BADWORD 」*\nPerhatian Untuk Member Grup ${name}\nHarap Jangan Toxic Di Sini Atau Yui Akan Kick!`, id)
                }
            } else {
                yui.reply(from, `Pilih enable atau disable udin!`, id)
            } 
            break   
        case '!antilink':
            if (!isGroupMsg) return yui.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (!isGroupAdmins) return yui.reply(from, `Perintah ini hanya bisa di gunakan oleh Admin group!`, id)
            if (!isBotGroupAdmins) return yui.reply(from, `Perintah ini hanya bisa di gunakan jika Bot menjadi Admin!`, id)
            if (args[1] == 'enable') {
                var cek = antilink.includes(chatId);
                if(cek){
                    return yui.reply(from, `*「 ANTI GROUP LINK 」*\nSudah diaktifkan di grup ini`, id)
                } else {
                    antilink.push(chatId)
                    fs.writeFileSync('./lib/database/antilink.json', JSON.stringify(antilink))
                    yui.reply(from, `*「 ANTI GROUP LINK 」*\nPerhatian Untuk Member Grup ${name}\nJika Ingin Kirim Link Harap Izin Ke Admin Group`, id)
                }
            } else if (args[1] == 'disable') {
                var cek = antilink.includes(chatId);
                if(!cek){
                    return yui.reply(from, `*「 ANTI GROUP LINK 」*\nSudah dinonaktifkan di grup ini`, id)
                } else {
                    let nixx = antilink.indexOf(chatId)
                    antilink.splice(nixx, 1)
                    fs.writeFileSync('./lib/database/antilink.json', JSON.stringify(antilink))
                    yui.reply(from, `*「 ANTI GROUP LINK 」*\nPerhatian Untuk Member Grup ${name}\nJika Ingin Kirim Link Harap Izin Ke Admin Group`, id)
                }
            } else {
                yui.reply(from, `Pilih enable atau disable!`, id)
            } 
            break   
        case '!nsfw':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return yui.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return yui.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                var cek = nsfw_.includes(chatId);
                if(cek){
                    return yui.reply(from, `NSFW Sudah diaktifkan di grup ini`, id)
                } else {
                nsfw_.push(chat.id)
                fs.writeFileSync('./lib/database/nsfwz.json', JSON.stringify(nsfw_))
                yui.reply(from, 'NSFW berhasil di aktifkan di group ini! kirim perintah *!nsfwMenu* untuk menu', id)
                }
            } else if (args[1].toLowerCase() === 'disable') {
                var cek = nsfw_.includes(chatId);
                /*if(!cek){
                    return yui.reply(from, `NSFW Sudah dinonaktifkan di grup ini`, id)
                } else {*/
                nsfw_.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/nsfwz.json', JSON.stringify(nsfw_))
                yui.reply(from, 'NSFW berhasil di nonaktifkan di group ini!', id)
                //}
            } else {
                yui.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
        case '!simi':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isPrem) return yui.reply(from, 'Perintah ini hanya bisa di gunakan oleh User Premium!', id)
            if (args.length === 1) return yui.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                var cek = simi_.includes(chatId);
                if(cek){
                    return yui.reply(from, `Simsimi Sudah diaktifkan di grup ini`, id)
                } else {
                simi_.push(chat.id)
                fs.writeFileSync('./lib/database/Simsimi.json', JSON.stringify(simi_))
                yui.reply(from, 'Simsimi berhasil di aktifkan di group ini! Kirim perintah *! [teks]*\nContoh : *! halo*', id)
                }
            } else if (args[1].toLowerCase() === 'disable') {
                var cek = simi_.includes(chatId);
                if(cek){
                    return yui.reply(from, `Simsimi Sudah diaktifkan di grup ini`, id)
                } else {
                simi_.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/Simsimi.json', JSON.stringify(simi_))
                yui.reply(from, 'Simsimi berhasil di nonaktifkan di group ini!', id)
                }
            } else {
                yui.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
        case '!group':
            if (!isGroupMsg) return yui.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return yui.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return yui.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (args.length === 1) return yui.reply(from, 'Pilih unlock atau lock!', id)
            if (args[1].toLowerCase() === 'open') {
                yui.setGroupToAdminsOnly(groupId, false)
                yui.sendTextWithMentions(from, `Group telah dibuka oleh admin @${sender.id.replace('@c.us','')}\nSekarang *semua member* dapat mengirim pesan`)
            } else if (args[1].toLowerCase() === 'close') {
                yui.setGroupToAdminsOnly(groupId, true)
                yui.sendTextWithMentions(from, `Group telah ditutup oleh admin @${sender.id.replace('@c.us','')}\nSekarang *hanya admin* yang dapat mengirim pesan`)
            } else {
                yui.reply(from, 'Pilih unlock atau lock!', id)
            }
            break
        case '!left':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return yui.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return yui.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                left.push(chat.id)
                fs.writeFileSync('./lib/database/left.json', JSON.stringify(left))
                yui.reply(from, 'Fitur left berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'disable') {
                left.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/left.json', JSON.stringify(left))
                yui.reply(from, 'Fitur left berhasil di nonaktifkan di group ini!', id)
            } else {
                yui.reply(from, 'Pilih enable atau disable!', id)
            }
            break
        case '!welcome':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return yui.reply(from, 'Perintah ini hanya bisa di gunakan oleh Admin group!', id)
            if (args.length === 1) return yui.reply(from, 'Pilih enable atau disable!', id)
            if (args[1].toLowerCase() === 'enable') {
                welkom.push(chat.id)
                fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(welkom))
                yui.reply(from, 'Fitur welcome berhasil di aktifkan di group ini!', id)
            } else if (args[1].toLowerCase() === 'disable') {
                welkom.splice(chat.id, 1)
                fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(welkom))
                yui.reply(from, 'Fitur welcome berhasil di nonaktifkan di group ini!', id)
            } else {
                yui.reply(from, 'Pilih enable atau disable udin!', id)
            }
            break
        // ANIME //
        /*case '!otakudesu':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!otakudesu [query]*\nContoh : *!otakudesu darling in the franxx*', id)
            const animes = await axios.get('https://mhankbarbar.herokuapp.com/api/otakudesu?q=' + body.slice(7) + '&apiKey=' + barbarkey)
            if (animes.data.error) return yui.reply(from, animes.data.error, id)
            const res_animes = `${animes.data.title}\n\n${animes.data.info}\n\n${animes.data.sinopsis}`
            yui.sendFileFromUrl(from, animes.data.thumb, 'otakudesu.jpg', res_animes, id)
            break*/
        /*case '!kusonime':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!kusonime [query]*\nContoh : *!kusonime darling in the franxx*', id)
            const animeq = await axios.get('https://tobz-api.herokuapp.com/v1/kuso?q=' + body.slice(7))
            if (animeq.data.error) return yui.reply(from, animeq.data.error, id)
            const res_animeq = `${animeq.data.title}\n\n${animeq.data.info}\n\n${animeq.data.sinopsis}\n\n${animeq.data.link_dl}`
            yui.sendFileFromUrl(from, animeq.data.thumb, 'kusonime.jpg', res_animeq, id)
            break
        case '!dewabatch':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!dewabatch [query]*\nContoh : *!dewabatch darling in the franxx*', id)
            const animek = await axios.get('https://tobz-api.herokuapp.com/v1/dewabatch?q=' + body.slice(7))
            if (animek.data.error) return yui.reply(from, animek.data.error, id)
            const res_animek = `${animek.data.result}\n\n${animek.data.sinopsis}`
            yui.sendFileFromUrl(from, animek.data.thumb, 'dewabatch.jpg', res_animek, id)
            break
        case '!komiku':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!komiku [query]*\nContoh : *!komiku darling in the franxx*', id)
            const animep = await axios.get('https://mhankbarbar.herokuapp.com/api/komiku?q=' + body.slice(7) + '&apiKey=' + barbarkey)
            if (animep.data.error) return yui.reply(from, animep.data.error, id)
            const res_animep = `${animep.data.info}\n\n${animep.data.sinopsis}\n\n${animep.data.link_dl}`
            yui.sendFileFromUrl(from, animep.data.thumb, 'komiku.jpg', res_animep, id)
            break*/
        case '!images':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!images [text]*\nContoh : *!images Yui*', id)
            const ptrsq = body.slice(8)
            const ptrst = await fetch(`https://api.vhtear.com/pinterest?query=${ptrsq}&apikey=${vhtearkey}`)
            if (!ptrst.ok) throw new Error(`Error Images : ${ptrst.statusText}`)
            const ptrs = await ptrst.json()
            const ptrsn = ptrs.result
            const b = JSON.parse(JSON.stringify(ptrsn))
            const ptrs2 =  b[Math.floor(Math.random() * b.length)]
            const image = await bent("buffer")(ptrs2)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            await yui.sendImage(from, base64, 'ptrs.jpg', `*${ptrsq}*`)
            await limitAdd(serial)
            break
        case '!nhentai':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return yui.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!nhentai [212121]*\nContoh : *!nhentai 321421*', id)
            yui.reply(from, '*!PERINGATAN!*\nYui akan spam gambar, gomenne')
            const nhsh = body.slice(9)
            const nhsh2 = await axios.get('https://mnazria.herokuapp.com/api/nhentai?code='+nhsh)
            for (let i = 0; i < nhsh2.length; i++) {
                await yui.sendImage(from, nhsh2[i].data, 'thumbserc.jpg', '', id)
                }
            break
        case '!loli':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const loli = await axios.get(`https://api.vhtear.com/randomloli&apikey=${vhtearkey}`)
            const loly = loli.data.result
            yui.sendFileFromUrl(from, loly.result, 'loli.jpeg', '*LOLI*', id)
            break
        case '!shota':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const imageToBase64 = require('image-to-base64')
            var shouta = ['shota anime','anime shota'];
            var shotaa = shouta[Math.floor(Math.random() * shouta.length)];
            var urlshot = "https://api.fdci.se/rep.php?gambar=" + shotaa;
            
            axios.get(urlshot)
            .then((result) => {
            var sht = JSON.parse(JSON.stringify(result.data));
            var shotaak =  sht[Math.floor(Math.random() * sht.length)];
            imageToBase64(shotaak)
            .then(
                (response) => {
            let img = 'data:image/jpeg;base64,'+response
            yui.sendFile(from, img, "shota.jpg", `*SHOTA*`, id)
                    }) 
                .catch(
                    (error) => {
                        console.log(error);
                    })
            })
            break
        case '!waifu':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const waifu = await axios.get(`https://api.vhtear.com/randomwibu&apikey=${vhtearkey}`)
            yui.sendFileFromUrl(from, waifu.data.result.foto, 'Waifu.jpg', `➤ Name : ${waifu.data.result.nama}\n➤ Description : ${waifu.data.result.deskripsi}\n\n➤ Source : ${waifu.data.result.sumber}`, id)
            break
        case '!husbu':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const diti = fs.readFileSync('./lib/database/husbu.json')
            const ditiJsin = JSON.parse(diti)
            const rindIndix = Math.floor(Math.random() * ditiJsin.length)
            const rindKiy = ditiJsin[rindIndix]
            yui.sendFileFromUrl(from, rindKiy.image, 'Husbu.jpg', rindKiy.teks, id)
            break
        case '!randomnekonime':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const nekonime = await axios.get(`https://api.vhtear.com/randomnekonime&apikey=${vhtearkey}`)
            const nekon = nekonime.data.result
            yui.sendFileFromUrl(from, nekon.result, '', 'Nekonime!', id)
            break
        // MFARELS
        case '!bokep': // MFARELS
        case '!randombokep': // MFARELS
        case '!bkp': // MFARELS
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id) // MFARELS
            if (!isNsfw) return yui.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id) // MFARELS
            if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id) // MFARELS
            
            await limitAdd(serial) // MFARELS
            const ange = fs.readFileSync('./lib/database/18+.json')
            const angean = JSON.parse(ange)
            const sangean = Math.floor(Math.random() * angean.length)
            const noco = angean[sangean]
            yui.sendFileFromUrl(from, noco.image, '18+.jpg', noco.teks, id)
            break
        // MFARELS
        case '!randomtrapnime':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return yui.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const trapnime = await axios.get('https://tobz-api.herokuapp.com/api/nsfwtrap')
            const trapn = trapnime.data.result
            yui.sendImage(from, trapn, '', 'Trapnime!', id)
            break
        case '!randomhentai':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return yui.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const hentai = await axios.get(`https://api.vhtear.com/randomhentai?apikey=${vhtearkey}`)
            const henta = hentai.data.result
            yui.sendImage(from, henta.url, '', 'Random Hentai!', id)
            break
        case '!randomnsfwneko':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return yui.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const nsfwneko = await axios.get('https://tobz-api.herokuapp.com/api/nsfwneko')
            const nsfwn = nsfwneko.data
            if (nsfwn.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            yui.sendImage(from, nsfwn.result, `NsfwNeko${ext}`, 'NsfwNeko!', id)
            break
        case '!randomanime':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const ranime = await axios.get('https://tobz-api.herokuapp.com/api/randomanime')
            const ranimen = ranime.data
            if (ranimen.result.endsWith('.png')) {
                var ext = '.png'
            } else {
                var ext = '.jpg'
            }
            yui.sendFileFromUrl(from, ranimen.result, `RandomAnime${ext}`, 'Random Anime!', id)
            break
        case '!blowjob':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (!isNsfw) return yui.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            await limitAdd(serial)
            const sblow = await axios.get('https://tobz-api.herokuapp.com/api/nsfwblowjob')
            const rblow = sblow.data
            yui.sendFileFromUrl(from, rblow.result, `RandoBlow${ext}`, 'Random Blowjob!', id)
            break
        // ROLEPLAY
        case '!hug':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const shug = await axios.get('https://tobz-api.herokuapp.com/api/hug')
            const rhug = shug.data
            yui.sendFileFromUrl(from, rhug.result, `RandomHug${ext}`, 'Random Hug!', id)
            break
        case '!cry':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const scry = await axios.get('https://tobz-api.herokuapp.com/api/cry')
            const rcry = scry.data
            yui.sendFileFromUrl(from, rcry.result, `RandomCry${ext}`, 'Random Cry!', id)
            break
        case '!kiss':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const skiss = await axios.get('https://tobz-api.herokuapp.com/api/kiss')
            const rkiss = skiss.data.result
            yui.sendFileFromUrl(from, rkiss, 'kiss.mp4', 'Kiss')
            break
        //
        case '!sr':
            arg = body.trim().split(' ')
            const sr = arg[1]
            try {
            const response1 = await axios.get('https://meme-api.herokuapp.com/gimme/' + sr + '/');
            const { postLink, title, subreddit, url, nsfw, spoiler } = response1.data
                if (nsfw == true) {
                    if ((isGroupMsg) && (isNsfw)) {
                        await yui.sendFileFromUrl(from, `${url}`, 'Reddit.jpg', `*Title*: ${title}` + '\n\n*Postlink*:' + `${postLink}`)
                    } else if ((isGroupMsg) && (!isNsfw)) {
                        await yui.reply(from, `Nsfw belum diaktifkan di Grup *${name}*`, id)
                    }
                } else { 
                    await yui.sendFileFromUrl(from, `${url}`, 'Reddit.jpg', `*Title*: ${title}` + '\n\n*Postlink*:' + `${postLink}`)
                }
            } catch(err) {
                await yui.sendFileFromUrl(from, errorurl, id) 
            }
            break
        case '!nhder':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return yui.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length >=2){
                const code = args[1]
                const url = 'https://nhder.herokuapp.com/download/nhentai/'+code+'/zip'
                const short = []
                const shortener = await urlShortener(url)
                url['short'] = shortener
                short.push(url)
                const caption = `*DOUJIN DOWNLOADER*\n\nLink: ${shortener}`
                yui.sendText(from, caption)
            } else {
                yui.sendText(from, 'Maaf tolong masukan code nuclear')
            }
            break
        /*case '!wallanime' :
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const walnime = ['https://wallpaperaccess.com/full/395986.jpg','https://wallpaperaccess.com/full/21628.jpg','https://wallpaperaccess.com/full/21622.jpg','https://wallpaperaccess.com/full/21612.jpg','https://wallpaperaccess.com/full/21611.png','https://wallpaperaccess.com/full/21597.jpg','https://cdn.nekos.life/wallpaper/QwGLg4oFkfY.png','https://wallpaperaccess.com/full/21591.jpg','https://cdn.nekos.life/wallpaper/bUzSjcYxZxQ.jpg','https://cdn.nekos.life/wallpaper/j49zxzaUcjQ.jpg','https://cdn.nekos.life/wallpaper/YLTH5KuvGX8.png','https://cdn.nekos.life/wallpaper/Xi6Edg133m8.jpg','https://cdn.nekos.life/wallpaper/qvahUaFIgUY.png','https://cdn.nekos.life/wallpaper/leC8q3u8BSk.jpg','https://cdn.nekos.life/wallpaper/tSUw8s04Zy0.jpg','https://cdn.nekos.life/wallpaper/sqsj3sS6EJE.png','https://cdn.nekos.life/wallpaper/HmjdX_s4PU4.png','https://cdn.nekos.life/wallpaper/Oe2lKgLqEXY.jpg','https://cdn.nekos.life/wallpaper/GTwbUYI-xTc.jpg','https://cdn.nekos.life/wallpaper/nn_nA8wTeP0.png','https://cdn.nekos.life/wallpaper/Q63o6v-UUa8.png','https://cdn.nekos.life/wallpaper/ZXLFm05K16Q.jpg','https://cdn.nekos.life/wallpaper/cwl_1tuUPuQ.png','https://cdn.nekos.life/wallpaper/wWhtfdbfAgM.jpg','https://cdn.nekos.life/wallpaper/3pj0Xy84cPg.jpg','https://cdn.nekos.life/wallpaper/sBoo8_j3fkI.jpg','https://cdn.nekos.life/wallpaper/gCUl_TVizsY.png','https://cdn.nekos.life/wallpaper/LmTi1k9REW8.jpg','https://cdn.nekos.life/wallpaper/sbq_4WW2PUM.jpg','https://cdn.nekos.life/wallpaper/QOSUXEbzDQA.png','https://cdn.nekos.life/wallpaper/khaqGIHsiqk.jpg','https://cdn.nekos.life/wallpaper/iFtEXugqQgA.png','https://cdn.nekos.life/wallpaper/deFKIDdRe1I.jpg','https://cdn.nekos.life/wallpaper/OHZVtvDm0gk.jpg','https://cdn.nekos.life/wallpaper/YZYa00Hp2mk.jpg','https://cdn.nekos.life/wallpaper/R8nPIKQKo9g.png','https://cdn.nekos.life/wallpaper/_brn3qpRBEE.jpg','https://cdn.nekos.life/wallpaper/ADTEQdaHhFI.png','https://cdn.nekos.life/wallpaper/MGvWl6om-Fw.jpg','https://cdn.nekos.life/wallpaper/YGmpjZW3AoQ.jpg','https://cdn.nekos.life/wallpaper/hNCgoY-mQPI.jpg','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/iQ2FSo5nCF8.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/CmEmn79xnZU.jpg','https://cdn.nekos.life/wallpaper/MAL18nB-yBI.jpg','https://cdn.nekos.life/wallpaper/FUuBi2xODuI.jpg','https://cdn.nekos.life/wallpaper/ez-vNNuk6Ck.jpg','https://cdn.nekos.life/wallpaper/K4-z0Bc0Vpc.jpg','https://cdn.nekos.life/wallpaper/Y4JMbswrNg8.jpg','https://cdn.nekos.life/wallpaper/ffbPXIxt4-0.png','https://cdn.nekos.life/wallpaper/x63h_W8KFL8.jpg','https://cdn.nekos.life/wallpaper/lktzjDRhWyg.jpg','https://cdn.nekos.life/wallpaper/j7oQtvRZBOI.jpg','https://cdn.nekos.life/wallpaper/MQQEAD7TUpQ.png','https://cdn.nekos.life/wallpaper/lEG1-Eeva6Y.png','https://cdn.nekos.life/wallpaper/Loh5wf0O5Aw.png','https://cdn.nekos.life/wallpaper/yO6ioREenLA.png','https://cdn.nekos.life/wallpaper/4vKWTVgMNDc.jpg','https://cdn.nekos.life/wallpaper/Yk22OErU8eg.png','https://cdn.nekos.life/wallpaper/Y5uf1hsnufE.png','https://cdn.nekos.life/wallpaper/xAmBpMUd2Zw.jpg','https://cdn.nekos.life/wallpaper/f_RWFoWciRE.jpg','https://cdn.nekos.life/wallpaper/Y9qjP2Y__PA.jpg','https://cdn.nekos.life/wallpaper/eqEzgohpPwc.jpg','https://cdn.nekos.life/wallpaper/s1MBos_ZGWo.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/32EAswpy3M8.png','https://cdn.nekos.life/wallpaper/Z6eJZf5xhcE.png','https://cdn.nekos.life/wallpaper/xdiSF731IFY.jpg','https://cdn.nekos.life/wallpaper/Y9r9trNYadY.png','https://cdn.nekos.life/wallpaper/8bH8CXn-sOg.jpg','https://cdn.nekos.life/wallpaper/a02DmIFzRBE.png','https://cdn.nekos.life/wallpaper/MnrbXcPa7Oo.png','https://cdn.nekos.life/wallpaper/s1Tc9xnugDk.jpg','https://cdn.nekos.life/wallpaper/zRqEx2gnfmg.jpg','https://cdn.nekos.life/wallpaper/PtW0or_Pa9c.png','https://cdn.nekos.life/wallpaper/0ECCRW9soHM.jpg','https://cdn.nekos.life/wallpaper/kAw8QHl_wbM.jpg','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/WVEdi9Ng8UE.png','https://cdn.nekos.life/wallpaper/IRu29rNgcYU.png','https://cdn.nekos.life/wallpaper/LgIJ_1AL3rM.jpg','https://cdn.nekos.life/wallpaper/DVD5_fLJEZA.jpg','https://cdn.nekos.life/wallpaper/siqOQ7k8qqk.jpg','https://cdn.nekos.life/wallpaper/CXNX_15eGEQ.png','https://cdn.nekos.life/wallpaper/s62tGjOTHnk.jpg','https://cdn.nekos.life/wallpaper/tmQ5ce6EfJE.png','https://cdn.nekos.life/wallpaper/Zju7qlBMcQ4.jpg','https://cdn.nekos.life/wallpaper/CPOc_bMAh2Q.png','https://cdn.nekos.life/wallpaper/Ew57S1KtqsY.jpg','https://cdn.nekos.life/wallpaper/hVpFbYJmZZc.jpg','https://cdn.nekos.life/wallpaper/sb9_J28pftY.jpg','https://cdn.nekos.life/wallpaper/JDoIi_IOB04.jpg','https://cdn.nekos.life/wallpaper/rG76AaUZXzk.jpg','https://cdn.nekos.life/wallpaper/9ru2luBo360.png','https://cdn.nekos.life/wallpaper/ghCgiWFxGwY.png','https://cdn.nekos.life/wallpaper/OSR-i-Rh7ZY.png','https://cdn.nekos.life/wallpaper/65VgtPyweCc.jpg','https://cdn.nekos.life/wallpaper/3vn-0FkNSbM.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/3VjNKqEPp58.jpg','https://cdn.nekos.life/wallpaper/NoG4lKnk6Sc.jpg','https://cdn.nekos.life/wallpaper/xiTxgRMA_IA.jpg','https://cdn.nekos.life/wallpaper/yq1ZswdOGpg.png','https://cdn.nekos.life/wallpaper/4SUxw4M3UMA.png','https://cdn.nekos.life/wallpaper/cUPnQOHNLg0.jpg','https://cdn.nekos.life/wallpaper/zczjuLWRisA.jpg','https://cdn.nekos.life/wallpaper/TcxvU_diaC0.png','https://cdn.nekos.life/wallpaper/7qqWhEF_uoY.jpg','https://cdn.nekos.life/wallpaper/J4t_7DvoUZw.jpg','https://cdn.nekos.life/wallpaper/xQ1Pg5D6J4U.jpg','https://cdn.nekos.life/wallpaper/aIMK5Ir4xho.jpg','https://cdn.nekos.life/wallpaper/6gneEXrNAWU.jpg','https://cdn.nekos.life/wallpaper/PSvNdoISWF8.jpg','https://cdn.nekos.life/wallpaper/SjgF2-iOmV8.jpg','https://cdn.nekos.life/wallpaper/vU54ikOVY98.jpg','https://cdn.nekos.life/wallpaper/QjnfRwkRU-Q.jpg','https://cdn.nekos.life/wallpaper/uSKqzz6ZdXc.png','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/N1l8SCMxamE.jpg','https://cdn.nekos.life/wallpaper/n2cBaTo-J50.png','https://cdn.nekos.life/wallpaper/ZXcaFmpOlLk.jpg','https://cdn.nekos.life/wallpaper/7bwxy3elI7o.png','https://cdn.nekos.life/wallpaper/7VW4HwF6LcM.jpg','https://cdn.nekos.life/wallpaper/YtrPAWul1Ug.png','https://cdn.nekos.life/wallpaper/1p4_Mmq95Ro.jpg','https://cdn.nekos.life/wallpaper/EY5qz5iebJw.png','https://cdn.nekos.life/wallpaper/aVDS6iEAIfw.jpg','https://cdn.nekos.life/wallpaper/veg_xpHQfjE.jpg','https://cdn.nekos.life/wallpaper/meaSEfeq9QM.png','https://cdn.nekos.life/wallpaper/Xa_GtsKsy-s.png','https://cdn.nekos.life/wallpaper/6Bx8R6D75eM.png','https://cdn.nekos.life/wallpaper/zXOGXH_b8VY.png','https://cdn.nekos.life/wallpaper/VQcviMxoQ00.png','https://cdn.nekos.life/wallpaper/CJnRl-PKWe8.png','https://cdn.nekos.life/wallpaper/zEWYfFL_Ero.png','https://cdn.nekos.life/wallpaper/_C9Uc5MPaz4.png','https://cdn.nekos.life/wallpaper/zskxNqNXyG0.jpg','https://cdn.nekos.life/wallpaper/g7w14PjzzcQ.jpg','https://cdn.nekos.life/wallpaper/KavYXR_GRB4.jpg','https://cdn.nekos.life/wallpaper/Z_r9WItzJBc.jpg','https://cdn.nekos.life/wallpaper/Qps-0JD6834.jpg','https://cdn.nekos.life/wallpaper/Ri3CiJIJ6M8.png','https://cdn.nekos.life/wallpaper/ArGYIpJwehY.jpg','https://cdn.nekos.life/wallpaper/uqYKeYM5h8w.jpg','https://cdn.nekos.life/wallpaper/h9cahfuKsRg.jpg','https://cdn.nekos.life/wallpaper/iNPWKO8d2a4.jpg','https://cdn.nekos.life/wallpaper/j2KoFVhsNig.jpg','https://cdn.nekos.life/wallpaper/z5Nc-aS6QJ4.jpg','https://cdn.nekos.life/wallpaper/VUFoK8l1qs0.png','https://cdn.nekos.life/wallpaper/rQ8eYh5mXN8.png','https://cdn.nekos.life/wallpaper/D3NxNISDavQ.png','https://cdn.nekos.life/wallpaper/Z_CiozIenrU.jpg','https://cdn.nekos.life/wallpaper/np8rpfZflWE.jpg','https://cdn.nekos.life/wallpaper/ED-fgS09gik.jpg','https://cdn.nekos.life/wallpaper/AB0Cwfs1X2w.jpg','https://cdn.nekos.life/wallpaper/DZBcYfHouiI.jpg','https://cdn.nekos.life/wallpaper/lC7pB-GRAcQ.png','https://cdn.nekos.life/wallpaper/zrI-sBSt2zE.png','https://cdn.nekos.life/wallpaper/_RJhylwaCLk.jpg','https://cdn.nekos.life/wallpaper/6km5m_GGIuw.png','https://cdn.nekos.life/wallpaper/3db40hylKs8.png','https://cdn.nekos.life/wallpaper/oggceF06ONQ.jpg','https://cdn.nekos.life/wallpaper/ELdH2W5pQGo.jpg','https://cdn.nekos.life/wallpaper/Zun_n5pTMRE.png','https://cdn.nekos.life/wallpaper/VqhFKG5U15c.png','https://cdn.nekos.life/wallpaper/NsMoiW8JZ60.jpg','https://cdn.nekos.life/wallpaper/XE4iXbw__Us.png','https://cdn.nekos.life/wallpaper/a9yXhS2zbhU.jpg','https://cdn.nekos.life/wallpaper/jjnd31_3Ic8.jpg','https://cdn.nekos.life/wallpaper/Nxanxa-xO3s.png','https://cdn.nekos.life/wallpaper/dBHlPcbuDc4.jpg','https://cdn.nekos.life/wallpaper/6wUZIavGVQU.jpg','https://cdn.nekos.life/wallpaper/_-Z-0fGflRc.jpg','https://cdn.nekos.life/wallpaper/H9OUpIrF4gU.jpg','https://cdn.nekos.life/wallpaper/xlRdH3fBMz4.jpg','https://cdn.nekos.life/wallpaper/7IzUIeaae9o.jpg','https://cdn.nekos.life/wallpaper/FZCVL6PyWq0.jpg','https://cdn.nekos.life/wallpaper/5dG-HH6d0yw.png','https://cdn.nekos.life/wallpaper/ddxyA37HiwE.png','https://cdn.nekos.life/wallpaper/I0oj_jdCD4k.jpg','https://cdn.nekos.life/wallpaper/ABchTV97_Ts.png','https://cdn.nekos.life/wallpaper/58C37kkq39Y.png','https://cdn.nekos.life/wallpaper/HMS5mK7WSGA.jpg','https://cdn.nekos.life/wallpaper/1O3Yul9ojS8.jpg','https://cdn.nekos.life/wallpaper/hdZI1XsYWYY.jpg','https://cdn.nekos.life/wallpaper/h8pAJJnBXZo.png','https://cdn.nekos.life/wallpaper/apO9K9JIUp8.jpg','https://cdn.nekos.life/wallpaper/p8f8IY_2mwg.jpg','https://cdn.nekos.life/wallpaper/HY1WIB2r_cE.jpg','https://cdn.nekos.life/wallpaper/u02Y0-AJPL0.jpg','https://cdn.nekos.life/wallpaper/jzN74LcnwE8.png','https://cdn.nekos.life/wallpaper/IeAXo5nJhjw.jpg','https://cdn.nekos.life/wallpaper/7lgPyU5fuLY.jpg','https://cdn.nekos.life/wallpaper/f8SkRWzXVxk.png','https://cdn.nekos.life/wallpaper/ZmDTpGGeMR8.jpg','https://cdn.nekos.life/wallpaper/AMrcxZOnVBE.jpg','https://cdn.nekos.life/wallpaper/ZhP-f8Icmjs.jpg','https://cdn.nekos.life/wallpaper/7FyUHX3fE2o.jpg','https://cdn.nekos.life/wallpaper/CZoSLK-5ng8.png','https://cdn.nekos.life/wallpaper/pSNDyxP8l3c.png','https://cdn.nekos.life/wallpaper/AhYGHF6Fpck.jpg','https://cdn.nekos.life/wallpaper/ic6xRRptRes.jpg','https://cdn.nekos.life/wallpaper/89MQq6KaggI.png','https://cdn.nekos.life/wallpaper/y1DlFeHHTEE.png']
            let walnimek = walnime[Math.floor(Math.random() * walnime.length)]
            yui.sendFileFromUrl(from, walnimek, 'Nimek.jpg', '', id)
            break*/
        case '!quotesnime':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const skya = await axios.get('https://tobz-api.herokuapp.com/api/quotesnime/random')
            skya_ = skya.data
            yui.reply(from, `➤ *Quotes* : ${skya_.quote}\n➤ *Character* : ${skya_.character}\n➤ *Anime* : ${skya_.anime}`, id)
            break
        case '!meme':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const response = await axios.get('https://meme-api.herokuapp.com/gimme/wholesomeanimemes')
            const { postlink, title, subreddit, url, nsfw, spoiler } = response.data
            yui.sendFileFromUrl(from, `${url}`, 'meme.jpg', `${title}`)
            break
        /* case '!nekopoi':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return yui.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!nekopoi [linkNekopoi]*\nContoh : *!nekopoi https://nekopoi.care/tsunpuri-episode-1-subtitle-indonesia/*', id)
            try {
            yui.reply(from, mess.wait, id)
            const nekipoi = await axios.get('https://mhankbarbar.herokuapp.com/api/nekopoi?url=' + body.slice(7) + '&apikey=' + vhtearkey)
            const nekop = nekipoi.data.result
            const nekop2 = `*Anime Ditemukan!*\n➤ Judul : ${nekop.judul}\n➤ Dilihat : ${nekop.dilihat}\n➤ Info : ${nekop.info}`
            const image = await bent("buffer")(nekop.thumbnail)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            yui.sendImage(from, base64, judul, nekop2)
            } catch (err) {
             console.error(err.message)
             await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
             yui.sendText(ownerNumber, 'Nekopoi Error : ' + err)
           } 
            break*/
        /*case '!quoteanime':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
                        if(args[1]){
                            if(args[1] === 'anime'){
                                const anime = body.slice(13)
                                axios.get('https://animechanapi.xyz/api/quotes?anime='+anime).then(({ data }) => {
                                    let quote = data.data[0].quote 
                                    let char = data.data[0].character
                                    let anime = data.data[0].anime
                                    yui.sendText(from, `"${quote}"\n\nCharacter : ${char}\nAnime : ${anime}`)
                                }).catch(err => {
                                    yui.sendText('Quote Char/Anime tidak ditemukan!')
                                })
                            }else{
                                const char = body.slice(12)
                                axios.get('https://animechanapi.xyz/api/quotes?char='+char).then(({ data }) => {
                                    let quote = data.data[0].quote 
                                    let char = data.data[0].character
                                    let anime = data.data[0].anime
                                    yui.sendText(from, `"${quote}"\n\nCharacter : ${char}\nAnime : ${anime}`)
                                }).catch(err => {
                                    yui.sendText('Quote Char/Anime tidak ditemukan!')
                                })
                            }
                        }else{
                            axios.get('https://animechanapi.xyz/api/quotes/random').then(({ data }) => {
                                let penyanyi = data.result[0].penyanyi 
                                let judul = data.result[0].judul
                                let linkimg = data.result[0].linkImg
                                let lagu = data.result[0].linkMp3 
                                let size = data.result[0].filesize
                                let durasi = data.result[0].duration
                                yui.sendText(from, `"${quote}"\n\nCharacter : ${char}\nAnime : ${anime}`)                               
                            }).catch(err => {
                                console.log(err)
                            })
                        }
            break*/
        case '!anime':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const keyword = message.body.replace('!anime', '')
            try {
            const data = await fetch(
           `https://api.jikan.moe/v3/search/anime?q=${keyword}`
            )
            const parsed = await data.json()
            if (!parsed) {
              await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan', id)
              return null
              }
            const { title, synopsis, episodes, url, rated, score, image_url } = parsed.results[0]
            const content = `*Anime Ditemukan!*
✨️ *Title:* ${title}
🎆️ *Episodes:* ${episodes}
💌️ *Rating:* ${rated}
❤️ *Score:* ${score}
💚️ *Synopsis:* ${synopsis}
🌐️ *URL*: ${url}`

            const image = await bent("buffer")(image_url)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            yui.sendImage(from, base64, title, content)
           } catch (err) {
             console.error(err.message)
             await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Anime tidak ditemukan')
           }
          break
        case '!character':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const keywords = message.body.replace('!character', '')
            try {
            const data = await fetch(
           `https://api.jikan.moe/v3/search/character?q=${keywords}`
            )
            const parsed = await data.json()
            if (!parsed) {
              await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Character tidak ditemukan', id)
              return null
              }
            const { name, alternative_names, url, image_url } = parsed.results[0]
            const contentt = `*Character Ditemukan!*

✨️ *Name:* ${name}
💌️ *Alternative Names:* ${alternative_names}
🌐️ *URL*: ${url}`

            const image = await bent("buffer")(image_url)
            const base64 = `data:image/jpg;base64,${image.toString("base64")}`
            yui.sendImage(from, base64, name, contentt)
           } catch (err) {
             console.error(err.message)
             await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Character tidak ditemukan')
           }
          break
        // ISLAM //
        case '!jadwalshalat':
        case '!jadwalsholat':
            if (!isGroupMsg) return yui.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return yui.reply(from, `[❗] Kirim perintah *!jadwalShalat [ Daerah ]*\ncontoh : *!jadwalShalat Tangerang*\nUntuk list daerah kirim perintah *!listDaerah*`)
            const daerah = body.slice(14)
            const jadwalShalat = await axios.get(`https://api.vhtear.com/jadwalsholat?query=${daerah}&apiKey=${vhtearkey}`)
            if (jadwalShalat.data.error) return yui.reply(from, jadwalShalat.data.error, id)
            const { Shubuh, Zduhur, Ashr, Magrib, Isya, kota } = await jadwalShalat.data
            arrbulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
            tgl = new Date().getDate()
            bln = new Date().getMonth()
            thn = new Date().getFullYear()
            const resultJadwal = `「 JADWAL SHALAT 」\n\nJadwal shalat di ${kota}, ${tgl}-${arrbulan[bln]}-${thn}\n\nSubuh : ${Shubuh}\nDzuhur : ${Zduhur}\nAshar : ${Ashr}\nMaghrib : ${Magrib}\nIsya : ${Isya}`
            await limitAdd(serial)
            break
        case '!quran':
            if (!isGroupMsg) return yui.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return yui.reply(from, `Kirim perintah Surah Quran kamu dengan cara ketik perintah :\n*!quran* [ Urutan Surat ]\nContoh :\n*!quran 1*`, id)
            const qura = `https://api.vhtear.com/quran?no=${args[1]}&apikey=${vhtearkey}`
            const quraan = await axios.get(qura)
            const quraann = quraan.data
            let hasqu = `*「 AL-QURAN 」*\n\n*Surah : ${quraann.result.surah}*\n*Quran* : ${quraann.result.quran}*`
            await yui.reply(from, `${hasqu}`, id).catch((e) => yui.reply(from, `*Terdapat kesalahan saat mencari surat ${args[1]}*`, id))
            await limitAdd(serial)
            break
        case '!listsurah':
            if (!isGroupMsg) return yui.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            try {
                axios.get('https://raw.githubusercontent.com/ArugaZ/scraper-results/main/islam/surah.json')
                .then((response) => {
                    let hehex = '*「 DAFTAR SURAH 」*\n\n___________________________\n'
                    let nmr = 1
                    for (let i = 0; i < response.data.data.length; i++) {
                        hehex += nmr + '. ' +  monospace(response.data.data[i].name.transliteration.id.toLowerCase()) + '\n'
                        nmr++
                            }
                        hehex += '___________________________'
                    yui.reply(from, hehex, id)
                })
            } catch(err) {
                yui.reply(from, err, id)
            }
            break
        case '!infosurah':
            if (!isGroupMsg) return yui.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length == 1) return yui.reply(from, `Kirim perintah *!infosurah [ Nama Surah ]*\nContoh : *!infosurah al-fatihah*`, message.id)
                var responseh = await axios.get('https://raw.githubusercontent.com/ArugaZ/scraper-results/main/islam/surah.json')
                var { data } = responseh.data
                var idx = data.findIndex(function(post, index) {
                if((post.name.transliteration.id.toLowerCase() == args[1].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[1].toLowerCase()))
                    return true;
                });
                try {
                    var pesan = "*「 INFORMASI SURAH 」*\n\n___________________________\n\n"
                    pesan = pesan + "➤ *Nama* : "+ data[idx].name.transliteration.id + "\n" + "➤ *Asma* : " +data[idx].name.short+"\n"+"➤ *Arti* : "+data[idx].name.translation.id+"\n"+"➤ *Jumlah ayat* : "+data[idx].numberOfVerses+"\n"+"➤ *Nomor surah* : "+data[idx].number+"\n"+"Jenis : "+data[idx].revelation.id+"\n"+"➤ *Keterangan* : "+data[idx].tafsir.id
                    pesan += '\n\n___________________________'
                    yui.reply(from, pesan, message.id)
                    limitAdd(serial)
                }catch{
                    yui.reply(from, 'Data tidak ditemukan, atau nama surah salah', id)
                }
            break
        case '!tafsir':
            if (!isGroupMsg) return yui.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length == 1) return yui.reply(from, `Kirim perintah *!tafsir [ Nama Surah ] [ Ayat ]*\nContoh : *!tafsir al-fatihah 2*`, message.id)
                var responsh = await axios.get('https://raw.githubusercontent.com/ArugaZ/scraper-results/main/islam/surah.json')
                var {data} = responsh.data
                var idx = data.findIndex(function(post, index) {
                if((post.name.transliteration.id.toLowerCase() == args[1].toLowerCase())||(post.name.transliteration.en.toLowerCase() == args[1].toLowerCase()))
                    return true;
                });
            try{
                nmr = data[idx].number
                if(!isNaN(nmr)) {
                var responsih = await axios.get('https://api.quran.sutanlab.id/surah/'+nmr+"/"+args[2])
                    var {data} = responsih.data
                    pesan = ""
                    pesan = pesan + "*「 TAFSIR 」*\n\nTafsir Q.S. "+data.surah.name.transliteration.id+":"+args[2]+"\n\n"
                    pesan = pesan + data.text.arab + "\n\n"
                    pesan = pesan + "_" + data.translation.id + "_" + "\n\n" +data.tafsir.id.long
                    pesan += '\n\n___________________________'
                    yui.reply(from, pesan, message.id)
                    limitAdd(serial)
                }
            }catch{
                yui.reply(from, 'Data tidak ditemukan, mungkin nama surah/ayat salah', id)
            }
            break
        // MEDIA //
        case '!infogempa':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const bmkg = await axios.get(`https://arugaz.herokuapp.com/api/infogempa`)
            const { potensi, lokasi,  kedalaman, magnitude, map } = bmkg.data.result
            const hasil = `*${bmkg.data.result.waktu}*\n📍 *Lokasi* : *${lokasi}*\n〽️ *Kedalaman* : *${kedalaman}*\n💢 *Magnitude* : *${magnitude}*\n🔘 *Potensi* : *${potensi}*`
            yui.sendFileFromUrl(from, map, 'gempa.jpg', hasil, id)
            break
        case '!ss':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!ss [linkWeb]*\nContoh : *!ss https://otakudesu.tv*', id)
            const ssw = 'https://nurutomo.herokuapp.com/api/ssweb?url=' + body.slice(4)
            yui.sendFileFromUrl(from, ssw, 'ssweb.jpg', '', id)
            break
        case '!shorturl':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!shorturl [linkWeb]*\nContoh : *!shorturl https://otakudesu.tv*', id)
            const sorturl = body.slice(10)
            const surl = await axios.get(`https://api.vhtear.com/shortener?link=${sorturl}&apikey=${vhtearkey}`)
            const surll = surl.data.result
            if (surll.error) return yui.reply(from, ssww.error, id)
            const surl2 = `Link : ${sorturl}\nShort URL : ${surll.short}`
            yui.sendText(from, surl2, id)
            break
        case '!cuaca':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            yui.reply(from, 'ERROR!')
            /*if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!cuaca [tempat]*\nContoh : *!cuaca tangerang', id)
            const tempat = body.slice(7)
            const weather = await axios.get('https://mhankbarbar.herokuapp.com/api/cuaca?q='+ tempat +'&apiKey='+ barbarkey)
            const weatherr = weather.data
            if (weatherr.error) {
                yui.reply(from, weatherr.error, id)
            } else {
                yui.reply(from, `➤ Tempat : ${weatherr.result.tempat}\n\n➤ Angin : ${weatherr.result.angin}\n➤ Cuaca : ${weatherr.result.cuaca}\n➤ Deskripsi : ${weatherr.result.desk}\n➤ Kelembapan : ${weatherr.result.kelembapan}\n➤ Suhu : ${weatherr.result.suhu}\n➤ Udara : ${weatherr.result.udara}`, id)
            }*/
            break
        case '!covid':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const country = await slicedArgs.join(' ')
            console.log(country)
            const response2 = await axios.get('https://coronavirus-19-api.herokuapp.com/countries/' + country + '/')
            const { cases, todayCases, deaths, todayDeaths, active } = response2.data
                await yui.sendText(from, '🌎️ Covid Info - ' + country + ' 🌍️\n\n✨️ Total Cases: ' + `${cases}` + '\n📆️ Today\'s Cases: ' + `${todayCases}` + '\n☣️ Total Deaths: ' + `${deaths}` + '\n☢️ Today\'s Deaths: ' + `${todayDeaths}` + '\n⛩️ Active Cases: ' + `${active}` + '.')
            break
        case '!spamcall':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM', id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const spam = await slicedArgs.join(' ')
            console.log(spam)
            const call2 = await axios.get('https://tobz-api.herokuapp.com/api/spamcall?no=' + spam)
            const { logs } = call2.data
                await yui.sendText(from, `${logs}` + '.')
            break
        case '!ytmp4':
            if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            if (!isGroupMsg) return yui.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return yui.reply(from, `Kirim perintah *!ytmp4 [ Link Yt ]*, untuk contoh silahkan kirim perintah *!readme*`)
            let isLin = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
            if (!isLin) return yui.reply(from, mess.error.Iv, id)
            try {
                yui.reply(from, mess.wait, id)
                const ytvh = await fetch(`http://api.vhtear.com/ytdl?link=${args[1]}&apikey=${vhtearkey}`)
                if (!ytvh.ok) throw new Error(`Error Get Video : ${ytvh.statusText}`)
                const ytvh2 = await ytvh.json()
                 if (ytvh2.status == false) {
                    yui.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                } else {
                    if (Number(ytvh2.result.size.split(' MB')[0]) > 30.00) return yui.sendFileFromUrl(from, ytvh2.result.UrlVideo, `${title}.mp4`, `*「 YOUTUBE MP4 」*\n\n• *Judul* : ${ytvh2.result.title}\n• *Filesize* : ${ytvh2.result.size}\n\n__Maaf, Durasi video melebihi 30 MB. Silahkan download video melalui link dibawah_.\n${ytvh2.result.UrlVideo}`, id)
                    const { title, UrlVideo, imgUrl, size } = await ytvh2.result
                    yui.sendFileFromUrl(from, imgUrl, 'thumb.jpg', `*「 YOUTUBE MP4 」*\n\n• *Judul* : ${title}\n• *Filesize* : ${size}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`, id)
                    await yui.sendFileFromUrl(from, UrlVideo, `${title}.mp4`, '', id).catch(() => yui.reply(from, mess.error.Yt4, id))
                    await limitAdd(serial)
                }
            } catch (err) {
                yui.sendText(ownerNumber, 'Error ytmp4 : '+ err)
                yui.reply(from, mess.error.Yt4, id)
                console.log(err)
            }
            break
        case '!play':
            if (!isPrem) return yui.reply(from, `Perintah ini hanya bisa di gunakan User Premium`, id)
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !ceklimit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length == 1) return yui.reply(from, `Untuk mencari lagu dari youtube\n\nPenggunaan: !play judul lagu`, id)
            try {
                yui.reply(from, mess.wait, id)
                const serplay = body.slice(6)
                const webplay = await fetch(`https://api.vhtear.com/ytmp3?query=${serplay}&apikey=${vhtearkey}`)
                if (!webplay.ok) throw new Error(`Error Get Video : ${webplay.statusText}`)
                const webplay2 = await webplay.json()
                 if (webplay2.status == false) {
                    yui.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                } else {
                    if (Number(webplay2.result.size.split(' MB')[0]) >= 10.00) return yui.reply(from, 'Maaf durasi music sudah melebihi batas maksimal 10 MB!', id)
                    const { image, mp3, size, ext, title, duration } = await webplay2.result
                    const captplay = `*「 PLAY 」*\n\n➸ *Judul* : ${title}\n➸ *Durasi* : ${duration}\n➸ *Filesize* : ${size}\n➸ *Exp* : ${ext}\n\n_*Music Sedang Dikirim*_`
                    yui.sendFileFromUrl(from, image, `thumb.jpg`, captplay, id)
                    await yui.sendFileFromUrl(from, mp3, `${title}.${ext}`, '', id).catch(() => yui.reply(from, mess.error.Yt4, id))
                    await limitAdd(serial)
                }
            } catch (err) {
                yui.sendText(ownerNumber, 'Error Play : '+ err)
                yui.reply(from, mess.error.Yt3, id)
            }
            break
        case '!ytmp3':
            if (!isPrem) return yui.reply(from, `Perintah ini hanya bisa di gunakan User Premium`, id)
            if (!isGroupMsg) return yui.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return yui.reply(from, `Kirim perintah *!ytmp3 [ Link Yt ]*, untuk contoh silahkan kirim perintah *!readme*`, id)
            let isLinks = args[1].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
            if (!isLinks) return yui.reply(from, mess.error.Iv, id)
            try {
                yui.reply(from, mess.wait, id)
                const vhtearyt3 = await fetch(`https://api.vhtear.com/ytdl?link=${args[1]}&apikey=${vhtearkey}`)
                if (!vhtearyt3.ok) throw new Error(`Error ytmp3 3 : ${vhtearyt3.statusText}`)
                const vhtearyt33 = await vhtearyt3.json()
                 if (vhtearyt33.status == false) {
                    yui.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                } else {
                    if(Number(vhtearyt33.result.size.split(' MB')[0]) >= 10.00) return yui.sendFileFromUrl(from, vhtearyt33.result.imgUrl, `thumb.jpg`, `*「 YOUTUBE MP3 」*\n\n• *Judul* : ${vhtearyt33.result.title}\n• *Filesize* : ${vhtearyt33.result.size}\n\n_Maaf, Durasi audio melebihi 10 MB. Silahkan download audio melalui link dibawah_.\n${vhtearyt33.result.UrlMp3}`, id)
                    const { title, ext, size, UrlMp3, status, imgUrl } = await vhtearyt33.result
                    console.log(`VhTear Giliran ${ext}\n${size}\n${status}`)
                    const captions = `*「 YOUTUBE MP3 」*\n\n• *Judul* : ${title}\n• *Filesize* : ${size}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                    yui.sendFileFromUrl(from, imgUrl, `thumb.jpg`, captions, id)
                    //await yui.sendFile(from, UrlMp3, `${title}.mp3`, '', id)
                    await yui.sendFileFromUrl(from, UrlMp3, `${title}.mp3`, '', id).catch(() => yui.reply(from, mess.error.Yt4, id))
                    await limitAdd(serial)
                }
            } catch (err) {
                yui.sendText(ownerNumber, 'Error ytmp3 : '+ err)
                yui.reply(from, mess.error.Yt3, id)
            }
            break
        case '!ytcari':
            //if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            if (!isGroupMsg) return yui.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return yui.reply(from, `Kirim perintah *!ytcari judul*, untuk contoh silahkan kirim perintah *!readme*`, id)
            try {
                yui.reply(from, mess.wait, id)
                const nyeh = body.slice(8)
                const vhtearyt3 = await fetch(`https://api.vhtear.com/youtube?query=${nyeh}&apikey=${vhtearkey}`)
                if (!vhtearyt3.ok) throw new Error(`Error ytcari : ${vhtearyt3.statusText}`)
                const vhtearyt33 = await vhtearyt3.json()
                if (vhtearyt33.status == false) {
                    yui.reply(from, `*Maaf Terdapat kesalahan saat mengambil data, mohon pilih media lain...*`, id)
                } else {
                    const cariyt = vhtearyt33.result
                    const saye = cariyt[Math.floor(0)]
                    yui.sendFileFromUrl(from, saye.image, 'thumb.jpg', `━━━━━━━━━━━━━━━━━\n➤ *Judul:* ${saye.title}\n➤ *Channel:* ${saye.channel}\n➤ *Dilihat:* ${saye.views}x\n➤ *Durasi:* ${saye.duration}\n━━━━━━━━━━━━━━━━━\n\nUntuk mendownload video gunakan *!ytmp4 https://youtu.be/${saye.id}\nUntuk mendownload audio gunakan !ytmp3 https://youtu.be/${saye.id}`).catch(() => yui.reply(from, mess.error.Yt4, id))
                    await limitAdd(serial)
                }
            } catch (err) {
                yui.sendText(ownerNumber, 'Error ytcari : '+ err)
                yui.reply(from, mess.error.Yt3, id)
            }
            break  
        case '!google':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            yui.reply(from, mess.wait, id)
            const googleQuery = body.slice(8)
            if(googleQuery == undefined || googleQuery == ' ') return yui.reply(from, `*Hasil Pencarian : ${googleQuery}* tidak ditemukan`, id)
            google({ 'query': googleQuery }).then(results => {
            let vars = `_*Hasil Pencarian : ${googleQuery}*_\n`
            for (let i = 0; i < results.length; i++) {
                vars +=  `\n━━━━━━━━━━━━━━━━━\n\n*Judul* : ${results[i].title}\n\n*Deskripsi* : ${results[i].snippet}\n\n*Link* : ${results[i].link}\n\n`
            }
                yui.reply(from, vars, id);
            }).catch(e => {
                console.log(e)
                yui.sendText(ownerNumber, 'Google Error : ' + e);
            })
            break
        case '!translate':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if(args[1] == undefined || args[2] == undefined) return
            if(args.length >= 2){
                var codelang = args[1]
                var text = body.slice(11+codelang.length);
                translatte(text, {to: codelang}).then(res => {
                    yui.sendText(from,res.text);
                    limitAdd(serial)
                }).catch(err => {
                     yui.sendText(from,`[ERROR] Teks tidak ada, atau kode bahasa ${codelang} tidak support\n~> *!bahasa* untuk melihat list kode bahasa`);
                });
            }
            break
        /*case '!nhentai': // SEARCH NHENTAI
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            yui.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281311850715', id)
          break*/
        /*case '!getnhentai': // DOWNLOADER NHENTAI PDF FROM !NHENTAI
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            yui.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281311850715', id)
          break
        case '!xvideos': // SEARCH VIDEO FROM YOUTUBE
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            yui.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281311850715', id)
            break
        case '!getxvideos': // DOWNLOADER VIDEO FROM !VIDEO
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            yui.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281311850715', id)
            break
        case '!video': // SEARCH VIDEO FROM YOUTUBE
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            yui.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281311850715', id)
            break
        case '!getvideo': // DOWNLOADER VIDEO FROM !VIDEO
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            yui.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281311850715', id)
            break
        case '!music': // SEARCH MUSIC FROM YOUTUBE
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            yui.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281311850715', id)
            break
        case '!getmusic': // DOWNLOADER MUSIC FROM !MUSIC
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            yui.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281311850715', id)
            break
        case '!youtubesearch': // SEARCH YOUTUBE
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            yui.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281311850715', id)
            break
        case '!shopee': // SEARCH SHOPEE PRODUCT
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            yui.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281311850715', id)
            break
        case '!playstore': // SEARCH PLAYSTORE
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            yui.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281311850715', id)
            break
        case '!neonime': // SEARCH ANIME
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            yui.reply(from, 'PREMIUM COMMAND, HUBUNGI : wa.me/6281311850715', id)
            break*/
        case '!otaku':
            if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!otaku [optional]*\nContoh: !otaku Yui')
            try {
                yui.reply(from, mess.wait, id)
                const gambaro = body.slice(7)
                const gamotaku = await axios.get(`https://api.vhtear.com/otakusearch?query=${gambaro}&apikey=${vhtearkey}`)
                const otakugam = gamotaku.data.result.data
                 if (otakugam.error) {
                    yui.reply(from, ytvv.error, id)
                } else {
                    const apotaku = otakugam[Math.floor(Math.random() * otakugam.length)]
                    await yui.sendFileFromUrl(from, apotaku.image, `${apotaku.title}.jpg`, `*Title* : ${apotaku.title}\n*Waktu* : ${apotaku.datetime}`)}
            } catch (err) {
                console.log(err)
                await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Gambar tidak ditemukan')
                yui.sendText(ownerNumber, 'otaku Error : ' + err)
            }
            break
        case '!otakulatest':
            if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            try {
                const laotaku = await axios.get(`https://api.vhtear.com/otakulatest&apikey=${vhtearkey}`)
                const otakula = laotaku.data.result.data
                 if (otakula.error) {
                    yui.reply(from, ytvv.error, id)
                } else {
                    const otakulat = otakula[Math.floor(Math.random() * otakula.length)]
                    await yui.sendFileFromUrl(from, otakulat.image, `${otakulat.title}.jpg`, `*Title* : ${otakulat.title}\n*Waktu* : ${otakulat.datetime}`)}
            } catch (err) {
                console.log(err)
                await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Gambar tidak ditemukan')
                yui.sendText(ownerNumber, 'otakulatest Error : ' + err)
            }
            break
        case '!shopee':
            if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!shopee [optional]*\nContoh: !shopee xiaomi')
            try {
                yui.reply(from, mess.wait, id)
                const produk = body.slice(8)
                const jualan = await axios.get(`https://api.vhtear.com/shopee?query=${produk}&count=1&apikey=${vhtearkey}`)
                const jualanyaa = jualan.data.result.items
                 if (jualanyaa.error) {
                    yui.reply(from, ytvv.error, id)
                } else {
                    const jualanya = jualanyaa[Math.floor(0)]
                    await yui.sendFileFromUrl(from, jualanya.image_cover, `${jualanya.nama}.jpg`, `➤ *Produk* : ${jualanya.nama}\n➤ *Harga* : ${jualanya.harga}\n➤ *Terjual* : ${jualanya.terjual}\n➤ *Lokasi Toko* : ${jualanya.shop_location}\n➤ *Link* : ${jualanya.link_product}\n➤ *Deskripsi* : ${jualanya.description}`)}
            } catch (err) {
                console.log(err)
                await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Produk tidak ditemukan')
                yui.sendText(ownerNumber, 'Shopee Error : ' + err)
            }
            break
        case '!playstore':
            if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!playstore [optional]*\nContoh: !playstore genshin impact')
            try {
                yui.reply(from, mess.wait, id)
                const app = body.slice(11)
                const appk = await axios.get(`https://api.vhtear.com/playstore?query=${app}&apikey=${vhtearkey}`)
                const apkk = appk.data.result
                 if (apkk.error) {
                    yui.reply(from, ytvv.error, id)
                } else {
                    const apk = apkk[Math.floor(0)]
                    await yui.sendFileFromUrl(from, apk.icon, `${apk.title}.jpg`, `➤ *APP* : ${apk.title}\n➤ *Developer* : ${apk.developer}\n➤ *Harga* : ${apk.price}\n➤ *Score* : ${apk.score}\n➤ *Link* : https://play.google.com${apk.url}\n➤ *Deskripsi* : ${apk.description}`)}
            } catch (err) {
                console.log(err)
                await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Aplikasi tidak ditemukan')
                yui.sendText(ownerNumber, 'playstore Error : ' + err)
            }
            break
        case '!xsearch':
            if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return yui.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!xsearch [query]*, untuk contoh silahkan kirim perintah *!readme*')
            try {
                yui.reply(from, mess.wait, id)
                const samngeanlu = body.slice(9)
                const reqx = await axios.get(`https://api.vhtear.com/xxxsearch?query=${samngeanlu}&apikey=${vhtearkey}`)
                const reqxs = reqx.data.result.data
                 if (reqxs.error) {
                    yui.reply(from, ytvv.error, id)
                } else {
                    const reqsangean = reqxs[Math.floor(Math.random() * reqxs.length)]
                    await yui.sendFileFromUrl(from, reqsangean.image, `${reqsangean.title}.jpg`, `*Judul* : ${reqsangean.title}\n*Durasi* : ${reqsangean.duration}\n*Url* : ${reqsangean.url}\n\nDownload videonya pakai !xdown ${reqsangean.url}`)}
            } catch (err) {
                console.log(err)
                await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
                yui.sendText(ownerNumber, 'Xnxx Error : ' + err)
            }
            break
        case '!xdown':
            if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return yui.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!xdown [linkXnxx]*, untuk contoh silahkan kirim perintah *!readme*')
            if (!args[1].match(isUrl) && !args[1].includes('xtube.com')) return yui.reply(from, mess.error.Iv, id)
            try {
                yui.reply(from, mess.wait, id)
                const resq = await axios.get(`https://api.vhtear.com/xxxdownload?link=${args[1]}&apikey=${vhtearkey}`)
                const resp = resq.data.result
                const respq = resq.data.result.urlVideo
                 if (resp.error) {
                    yui.reply(from, ytvv.error, id)
                } else {
                    //if (Number(resp.result.size.split(' MB')[0]) > 20.00) return yui.reply(from, 'Maaf durasi video sudah melebihi batas maksimal 20 menit!', id)
                    //yui.sendFileFromUrl(from, resp.result.thumb, 'thumb.jpg', `➤ *Judul* : ${resp.result.judul}\n➤ *Deskripsi* : ${resp.result.desc}\n➤ *Filesize* : ${resp.result.size}\n\nSilahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit.`, id)
                    const reqxn = respq[Math.floor(3)]
                    await yui.sendFileFromUrl(from, reqxn.videoUrl, `${resp.title}.${reqxn.format}`, `${resp.title}`, id)}
            } catch (err) {
                console.log(err)
                await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Video tidak ditemukan')
                yui.sendText(ownerNumber, 'Xdown Error : ' + err)
            }
            break
        case '!ramalpasangan':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!ramalpasangan [kamu|pasangan]*\nContoh : *!ramalpasangan Papa|Mama*', id)
            arg = body.trim().split('|')
            if (arg.length >= 2) {
            yui.reply(from, mess.wait, id)
            const kamu = arg[0]
            const pacar = arg[1]
            const rpmn = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn2 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn3 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn4 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn5 = rate[Math.floor(Math.random() * (rate.length))]
            const rpmn6 = rate[Math.floor(Math.random() * (rate.length))]
            const rjh2 = `*Hasil Pengamatan!*\nPasangan dengan nama ${kamu} dan ${pacar}\n\n➤ Cinta : ${rpmn}\n➤ Jodoh : ${rpmn2}\n➤ Kemiripan : ${rpmn3}\n➤ Kesukaan : ${rpmn4}\n➤ Kesamaan : ${rpmn5}\n➤ Kebucinan ${rpmn6}`
            yui.reply(from, rjh2, id)
            } else {
            await yui.reply(from, 'Wrong Format!', id)
            }
            break
        case '!artinama':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!artinama [query]*\nContoh : *!artinama Rizqi*', id)
            try {
            const resp = await axios.get('https://api.vhtear.com/artinama?nama=' + body.slice(10) + '&apikey=' + vhtearkey)
            if (resp.data.error) return yui.reply(from, resp.data.error, id)
            const anm2 = `➤ Artinama : ${resp.data.result.hasil}`
            yui.reply(from, anm2, id)
            } catch (err) {
                console.error(err.message)
                await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
                yui.sendText(ownerNumber, 'Artinama Error : ' + err)
           }
            break
        case '!zodiak':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!zodiak [zodiak kamu]*\nContoh : *!zodiak scorpio*', id)
            try {
            const resp = await axios.get('https://api.vhtear.com/zodiak?query=' + body.slice(8) + '&apikey=' + vhtearkey)
            if (resp.data.error) return yui.reply(from, resp.data.error, id)
            const anm2 = `➤ Zodiak : ${resp.data.result.zodiak}\n➤ Ramalan : ${resp.data.result.ramalan}\n➤ Nomor Keberuntungan : ${resp.data.result.nomorKeberuntungan}\n➤ Motivasi : ${resp.data.result.motivasi}\n➤ Inspirasi : ${resp.data.result.inspirasi}`
            yui.reply(from, anm2, id)
            } catch (err) {
                console.error(err.message)
                await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Zodiak tidak ditemukan')
                yui.sendText(ownerNumber, 'Zodiak Error : ' + err)
           }
           break
        case '!caklontong':
            if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            try {
            const resp = await axios.get('https://api.vhtear.com/funkuis&apikey=' + vhtearkey)
            if (resp.data.error) return yui.reply(from, resp.data.error, id)
            const anm2 = `➤ Soal : ${resp.data.result.soal}\n➤ Deskripsi :-\n➤ Poin : ${resp.data.result.poin}`
            const jwban = `➤ Jawaban : ${resp.data.result.jawaban}`
            yui.reply(from, anm2, id)
            yui.sendText(from, `30 Detik Lagi...`, id)
            await sleep(10000)
            yui.sendText(from, `20 Detik Lagi...`, id)
            await sleep(10000)
            yui.sendText(from, `10 Detik Lagi...`, id)
            await sleep(10000)
            yui.reply(from, jwban, id)
            } catch (err) {
                console.error(err.message)
                await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Soal Quiz tidak ditemukan')
                yui.sendText(ownerNumber, 'Zodiak Error : ' + err)
           }
           break
         case '!tebakgambar':
            if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            try {
            const resp = await axios.get('https://api.vhtear.com/tebakgambar&apikey=' + vhtearkey)
            if (resp.data.error) return yui.reply(from, resp.data.error, id)
            const jwban = `➤ Jawaban : ${resp.data.result.jawaban}`
            yui.sendFileFromUrl(from, resp.data.result.soalImg, 'tebakgambar.jpg', '_Silahkan Jawab Maksud Dari Gambar Ini_', id)
            yui.sendText(from, `30 Detik Lagi...`, id)
            await sleep(10000)
            yui.sendText(from, `20 Detik Lagi...`, id)
            await sleep(10000)
            yui.sendText(from, `10 Detik Lagi...`, id)
            await sleep(10000)
            yui.reply(from, jwban, id)
            } catch (err) {
                console.error(err.message)
                await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Soal Quiz tidak ditemukan')
                yui.sendText(ownerNumber, 'Tebak Gambar Error : ' + err)
           }
           break
         case '!family100':
            //if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            try {
            const resp = await axios.get('https://api.vhtear.com/family100&apikey=' + vhtearkey)
            if (resp.data.error) return yui.reply(from, resp.data.error, id)
            const anm2 = `➤ Soal : ${resp.data.result.soal}\n_Silahkan DiJawab_`
            const jwban = `➤ Jawaban : ${resp.data.result.jawaban}`
            yui.reply(from, anm2, id)
            yui.sendText(from, `30 Detik Lagi...`, id)
            await sleep(10000)
            yui.sendText(from, `20 Detik Lagi...`, id)
            await sleep(10000)
            yui.sendText(from, `10 Detik Lagi...`, id)
            await sleep(10000)
            yui.reply(from, jwban, id)
            } catch (err) {
                console.error(err.message)
                await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Soal Quiz tidak ditemukan')
                yui.sendText(ownerNumber, 'Family100 Error : ' + err)
           }
           break
        case '!heroml':
            if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!heroml [nama hero]*\nContoh : *!heroml akai*', id)
            try {
            const resp = await axios.get('https://api.vhtear.com/herodetail?query=' + body.slice(8) + '&apikey=' + vhtearkey)
            if (resp.data.error) return yui.reply(from, resp.data.error, id)
            const anm2 = `➤ Title : ${resp.data.result.title}\n➤ Quotes : ${resp.data.result.quotes}\n➤ Info : ${resp.data.result.info}\n➤ Atribut : ${resp.data.result.attributes}`
            yui.sendFileFromUrl(from, resp.data.result.pictHero, 'hero.jpg', anm2, id)
            } catch (err) {
                console.error(err.message)
                await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Hero tidak ditemukan')
                yui.sendText(ownerNumber, 'Heroml Error : ' + err)
           }
            break
        case '!nomorhoki':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!nomorhoki [no hp kamu]*\nContoh : *!nomorhoki 0895384009405*', id)
            try {
            const resp = await axios.get('https://api.vhtear.com/nomerhoki?no=' + body.slice(11) + '&apikey=' + vhtearkey)
            if (resp.data.error) return yui.reply(from, resp.data.error, id)
            const anm2 = `➤ Hasil :\n ${resp.data.result.hasil}`
            yui.reply(from, anm2, id)
            } catch (err) {
                console.error(err.message)
                await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Nomor Hoki tidak ditemukan')
                yui.sendText(ownerNumber, 'Nomorhoki Error : ' + err)
           }
            break
        case '!artimimpi':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!artimimpi [mimpi]*\nContoh : *!artimimpi makan*', id)
            try {
            const resp = await axios.get('https://api.vhtear.com/artimimpi?query=' + body.slice(11) + '&apikey=' + vhtearkey)
            if (resp.data.error) return yui.reply(from, resp.data.error, id)
            const anm2 = `➤ Artimimpi : ${resp.data.result.hasil}`
            yui.reply(from, anm2, id)
            } catch (err) {
                console.error(err.message)
                await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Mimpi tidak ditemukan')
                yui.sendText(ownerNumber, 'Artimimpi Error : ' + err)
           }
            break
        case '!wiki':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return yui.reply(from, `Kirim perintah *!wiki [ Query ]*\nContoh : *!wiki asu*`, id)
            const queryz_ = body.slice(6)
            const wiki = await axios.get(`https://api.vhtear.com/wikipedia?query=${queryz_}&apikey=${vhtearkey}`)
            if (wiki.data.error) {
                yui.reply(from, wiki.data.error, id)
            } else {
                yui.sendFileFromUrl(from, wiki.data.result.ImgResult, '', `*「 WIKI 」*\n\n➤ *Query* : ${queryz_}\n\n➤ *Result* : ${wiki.data.result.Info}`, id)
                await limitAdd(serial)
            }
        case '!kbbi':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return yui.reply(from, `Kirim perintah *!kbbi [ Query ]*\nContoh : *!kbbi asu*`, id)
            const kbbl = body.slice(6)
            const kbbl2 = await axios.get(`https://api.vhtear.com/kbbi?query=${kbbl}&apikey=${vhtearkey}`)

            if (kbbl2.data.error) {
                yui.reply(from, kbbl2.data.error, id)
            } else {
                yui.sendText(from, `*「 KBBI 」*\n\n➤ *Query* : ${kbbl}\n\n➤ *Result* : ${kbbl2.data.result.hasil}`, id)
                await limitAdd(serial)
            }
            break
        case '!googleimage':
            if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            argz = body.trim().split('|')
            if (argz.length >= 2) {
            const qwery = argz[1]
            const jum = argz[2]
            if(!qwery) return await yui.reply(from, `Kirim perintah *!googleimage [ |Query|Jumlah ]*, contoh = !googleimage |loli|3`, id)
            if(!jum) return await yui.reply(from, `Jumlah gambar diperlukan, contoh = !googleimage |loli|3`, id)
            if(jum >= 5) return await yui.reply(from, 'Jumlah terlalu banyak! Max 4', id)
            var gis = require('g-i-s');
            var opts = {
                searchTerm: qwery
                };
                gis(opts, logResults);
                    
                function logResults(error, results) {
                    if (error) {
                        yui.reply(from, 'Maaf, Fitur Sedang Error', id)
                    } else {
                        const item = results.slice(0, jum)
                        item.forEach(async(res) => {
                        console.log(res)
                        const yurl = await urlShortener(res.url)
                        yui.sendImage(from, res.url, null, `➤ Link : ${yurl}\n➤ Image size : ${res.height} x ${res.width}`)  
                        limitAdd(serial) 
                        })
                    }
                }
            }
        case '!sand': 
        if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1)  return yui.reply(from, 'Kirim perintah *!sand [ Teks ]*\nContoh *!sand Papa*', id)
            const swrt = body.slice(6)
            try {
            const swrt2 = await axios.get('https://api.vhtear.com/sand_writing?text1=' + swrt + '&apikey=' + vhtearkey)
            const { imgUrl } = swrt2.data.result
            const swrt3 = `*「 SAND WRITING 」*

*Text : ${swrt}*`
            const pictk = await bent("buffer")(imgUrl)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            yui.sendImage(from, base64, swrt3)
            } catch (err) {
             console.error(err.message)
             await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             yui.sendText(ownerNumber, 'Sand Writing Error : ' + err)
           }
          break
        case '!tahta':
            if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
             if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
             if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
    
             await limitAdd(serial)
             const jreng = body.slice(7)
             if (!jreng) return yui.reply(from, 'Kirim perintah *!tahta [teks]*\n\nContoh *!tahta Yui*', id)
             if (jreng.length > 7) return yui.reply(from, 'Maksimal 7 Huruf!', id)
             yui.sendText(from, '_Sedang diproses, mohon tunggu sebentar!..._', id)
             await yui.sendFileFromUrl(from, `https://api.vhtear.com/hartatahta?text=${jreng}&apikey=${vhtearkey}`,`${jreng}.jpg`,`Harta Tahta ${jreng}`, id)        
             break
        case '!resep':
            if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1)  return yui.reply(from, 'Kirim perintah *!resep [optional]*\nContoh *!resep tahu*', id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const rmk = await slicedArgs.join(' ')
            console.log(rmk)
            try {
            const resp = await axios.get('https://api.vhtear.com/resepmasakan?query=' + rmk + '&apikey=' + vhtearkey)
            const { bahan, cara, image, title  } = resp.data.result
            const rmk3 = `*Resep Ditemukan!*
➤ *Judul:* ${title}
➤ *Bahan:* ${bahan}
➤ *Cara:* ${cara}`

            const pictk = await bent("buffer")(image)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            yui.sendImage(from, base64, title, rmk3)
            } catch (err) {
             console.error(err.message)
             await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Resep tidak ditemukan')
             yui.sendText(ownerNumber, 'Resepmasakan Error : ' + err)
           }
           break
        /*case '!twitterstalk':
        case '!twtstalk':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1)  return yui.reply(from, 'Kirim perintah *!twtstalk @username*\nContoh *!twtstalk @miakhalifah*', id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const twstalk = await slicedArgs.join(' ')
            console.log(twstalk)
            try {
            const twstalk2 = await axios.get('https://mhankbarbar.herokuapp.com/api/twstalk?username=' + twstalk + '&apiKey=' + barbarkey)
            const { followers_count, full_name, name, profile_pic, status_count } = twstalk2.data
            const twstalk3 = `*User Ditemukan!*

➤ *Nama:* ${name}
➤ *Nama Panjang:* ${full_name}
➤ *Jumlah Pengikut:* ${followers_count}
➤ *Jumlah Postingan:* ${status_count}`

            const pictk = await bent("buffer")(profile_pic)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            yui.sendImage(from, base64, name, twstalk3)
            } catch (err) {
             console.error(err.message)
             await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             yui.sendText(ownerNumber, 'Twitter Error : ' + err)
           }
          break*/
        case '!igstalk':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1)  return yui.reply(from, 'Kirim perintah *!igstalk @username*\nContoh *!igstalk duar_amjay*', id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const istalk = await slicedArgs.join(' ')
            console.log(istalk)
            try {
                const istalk2 = await axios.get('https://api.vhtear.com/igprofile?query=' + istalk + '&apikey=' + vhtearkey)
                const { biography, follower, follow, picture, post_count, full_name, username, is_private } = istalk2.data.result
                const istalk3 = `*User Ditemukan!*
    
➤ *Username:* ${username}
➤ *Nama:* ${full_name}
➤ *Bio:* ${biography}
➤ *Mengikuti:* ${follow}
➤ *Pengikut:* ${follower}
➤ *Jumlah Postingan:* ${post_count}
➤ *Private:* ${is_private}`
                
                const pictk = await bent("buffer")(picture)
                const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                yui.sendImage(from, base64, username, istalk3)
                } catch (err) {
                 console.error(err.message)
                 await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
                 yui.sendText(ownerNumber, 'Igstalk Error : ' + err)
               }
              break
        case '!tiktokstalk':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1)  return yui.reply(from, 'Kirim perintah *!tiktokstalk username*\nContoh *!tiktokstalk riaricis*', id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const tstalk = await slicedArgs.join(' ')
            console.log(tstalk)
            try {
            const tstalk2 = await axios.get('https://api.vhtear.com/tiktokprofile?query=' + tstalk + '&apikey=' + vhtearkey)
            const { username, bio, follow, follower, title, like_count, video_post, description, picture, url_account } = tstalk2.data.result
            const tiktod = `*User Ditemukan!*
➤ *Username:* ${username}
➤ *Judul:* ${title}
➤ *Bio:* ${bio}
➤ *Mengikuti:* ${follow}
➤ *Pengikut:* ${follower}
➤ *Jumlah Like*: ${like_count}
➤ *Jumlah Postingan:* ${video_post}
➤ *Deskripsi:* ${description}
➤ *Link:* ${url_account}`

            const pictk = await bent("buffer")(picture)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            yui.sendImage(from, base64, title, tiktod)
            } catch (err) {
             console.error(err.message)
             await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             yui.sendText(ownerNumber, 'Error Tiktokstalk : '+ err)
           }
          break
        case '!smulestalk':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!smulestalk username*\nContoh : *!smulestalk loli*', id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const sstalk = await slicedArgs.join(' ')
            console.log(sstalk)
            try {
            const sstalk2 = await axios.get('https://api.vhtear.com/smuleprofile?query=' + sstalk + '&apikey=' + vhtearkey)
            const { username, full_name, follower, follow, biography, is_vip, picture, recording } = sstalk2.data.result
            const smule = `*User Ditemukan!*
➤ *Username:* ${username}
➤ *Full Name:* ${title}
➤ *Biografi:* ${biography}
➤ *Mengikuti:* ${follow}
➤ *Pengikut:* ${follower}
➤ *VIP*: ${is_vip}
➤ *Total Rekaman:* ${recording}`

            const pictk = await bent("buffer")(picture)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            yui.sendImage(from, base64, title, smule)
            } catch (err) {
             console.error(err.message)
             await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             yui.sendText(ownerNumber, 'Error Smulestalk : '+ err)
            }
          break
        case '!':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isSimi) return yui.reply(from, 'command/Perintah Simi belum di aktifkan di group ini!', id)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *! [teks]*\nContoh : *! halo*')
            const que = body.slice(2)
            const sigo = await axios.get(`http://simsumi.herokuapp.com/api?text=${que}&lang=id`)
            const sigot = sigo.data
            yui.reply(from, sigot.success, id)
            console.log(sigot)
            break
        case '!ig': 
        case '!instagram':
            //if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return yui.reply(from, `Kirim perintah *!ig [ Link Instagram ]* untuk contoh silahkan kirim perintah *!readme*`)
            if (!args[1].match(isUrl) && !args[1].includes('instagram.com')) return yui.reply(from, `Maaf, link yang kamu kirim tidak valid. [Invalid Link]`, id)
            await yui.reply(from, mess.wait, id);
            instagram(args[1]).then(async(res) => {
                let username = res.owner_username;
                for (let i = 0; i < res.post.length; i++) {
                if (res.post[i].type == "image") {
                        await yui.sendFileFromUrl(from, res.post[i].urlDownload, "ig.jpg", `*「 INSTAGRAM 」*\n\n➤ *Username* : ${username}\n➤ *Tipe* : Image/Jpg`, id);
                        limitAdd(serial)
                    } else if (res.post[i].type == "video") {
                        await yui.sendFileFromUrl(from, res.post[i].urlDownload, "ig.mp4", `*「 INSTAGRAM 」*\n\n➤ *Username* : ${username}\n➤ *Tipe* : Video/MP4`);
                        limitAdd(serial)
                    }
                }
            }).catch((err) => {
                console.log(err);
                yui.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case '!fb':
            //if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            if (!isGroupMsg) return yui.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)

            if (args.length === 1) return yui.reply(from, `Kirim perintah *!fb [ Link Fb ]*\nContoh : *!fb https://www.facebook.com/24609282673/posts/10158628585367674/*`, id)

            yui.reply(from, mess.wait, id)
            facebook(args[1]).then(async(res) => {
                let { VideoUrl } = await res
                const epbe2 = `*「 FACEBOOK DOWNLOADER 」*\n➤ *Aplikasi*: Facebook\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                yui.sendFileFromUrl(from, VideoUrl, `Facebook.mp4`, epbe2, id)
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                yui.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case '!tiktok':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!tiktok [linkTiktok]*\nContoh : *!tiktok https://vt.tiktok.com/yqyjPX/*', id)
            yui.reply(from, mess.wait, id)
            tiktok(args[1]).then(async(res) => {
                let { video, title, image, desk, dibuat, duration } = await res
                let ttiktok = `*「 TIKTOK DOWNLOADER 」*\n\n➤ *Judul* : ${title}\n➤ Deskripsi : ${desk}\n➤ Durasi : ${duration}\n➤ Dibuat : ${dibuat}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                yui.sendFileFromUrl(from, image, 'thumb.jpg', ttiktok, id)
                await yui.sendFileFromUrl(from, video, `${title}.mp4`, '', id).catch(() => yui.reply(from, mess.error.Yt4, id))
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                yui.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case '!smule':
            //if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!smule [linkSmule]*\nContoh : *!smule https://www.smule.com/p/767512225_3062360163*', id)
            yui.reply(from, mess.wait, id)
            smule(args[1]).then(async(res) => {
                let { Type, title, url, image } = await res
                let tsmule = `*「 SMULE DOWNLOADER 」*\n\n➤ *Judul* : ${title}\n➤ *Type:* ${Type}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                yui.sendFileFromUrl(from, image, 'thumb.jpg', tsmule, id)
                await yui.sendFileFromUrl(from, url, `${title}.mp3`, '', id).catch(() => yui.reply(from, mess.error.Yt4, id))
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                yui.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case '!starmaker':
            //if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!starmaker [linkStarmaker]* untuk contoh silahkan kirim perintah *!readme*')
            yui.reply(from, mess.wait, id)
            starmaker(args[1]).then(async(res) => {
                let { image, desc, url, title } = await res
                let tstarmaker = `*「 STARMAKER DOWNLOADER 」*\n\n➤ *Judul* : ${title}\n➤ *Deskripsi:* ${desc}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                yui.sendFileFromUrl(from, image, 'thumb.jpg', tstarmaker, id)
                await yui.sendFileFromUrl(from, url, `${title}.mp3`, '', id).catch(() => yui.reply(from, mess.error.Yt4, id))
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                yui.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case '!twitter':
            //if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            if (!isGroupMsg) return yui.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)

            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return yui.reply(from, `Kirim perintah *!twitter [ Link Twitter ]* untuk contoh silahkan kirim perintah *!readme*`)
            yui.reply(from, mess.wait, id)
            twitter(args[1]).then(async(res) => {
                let { desk, urlVideo } = await res
                let ttwitter = `*「 TWITTER DOWNLOADER 」*\n\n➤ *Aplikasi:* Twitter\n➤ *Deskripsi:* ${desk}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                await yui.sendFileFromUrl(from, urlVideo, `twit.mp3`, ttwitter, id).catch(() => yui.reply(from, mess.error.Yt4, id))
                await limitAdd(serial)
            }).catch((err) => {
                console.log(err);
                yui.reply(from, `Maaf, Terjadi Kesalahan`, id)
            })
            break
        case '!maps':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!maps [optional]*, Contoh : *!maps Jakarta*')
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const mapz = await slicedArgs.join(' ')
            console.log(mapz)
            try {
            const mapz2 = await axios.get('https://mnazria.herokuapp.com/api/maps?search=' + mapz)
            const { gambar } = mapz2.data
            const pictk = await bent("buffer")(gambar)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            yui.sendImage(from, base64, 'maps.jpg', `*Hasil Maps : ${mapz}*`)
            } catch (err) {
             console.error(err.message)
             await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
             yui.sendText(ownerNumber, 'Error Maps : '+ err)
           }
          break
        case '!joox':
            //if (!isPrem) return yui.reply(from, 'Perintah ini bersifat PREMIUM')
            if (!isGroupMsg) return yui.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)

            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return yui.reply(from, `Kirim perintah *!joox [ Optional ]*\nContoh : *!joox Alan Walker*`, id)
            try {
                const musiq = body.slice(6)
                const nyeh = await axios.get(`https://api.vhtear.com/music?query=${musiq}&apikey=${vhtearkey}`)
                const nhyehnyeh = nyeh.data.result
                const nheynyeh = nhyehnyeh[Math.floor(0)]
                let tjoox = `*「 JOOX DOWNLOADER 」*\n\n➸ *Penyanyi:* ${nheynyeh.penyanyi}\n➸ *Judul:* ${nheynyeh.judul}\n➸ *Album:* ${nheynyeh.album}\n➸ *Ext:* ${nheynyeh.ext}\n➸ *Size:* ${nheynyeh.filesize}\n➸ *Durasi:* ${nheynyeh.duration}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                yui.sendFileFromUrl(from, nheynyeh.linkImg, '', tjoox)
                yui.sendFileFromUrl(from, nheynyeh.linkMp3, `${nheynyeh.judul}.${nheynyeh.ext}`, '', id).catch(() => yui.reply(from, mess.error.Yt4, id))
                await limitAdd(serial)
            } catch (err) {
                console.error(err.message)
                await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
                yui.sendText(ownerNumber, 'Error Joox : '+ err)
            }
            break
        case '!checkip':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!checkip [ipaddress]*\nContoh : *!checkip 182.0.144.145*', id)
            yui.reply(from, mess.wait, id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const cekip = await slicedArgs.join(' ')
            console.log(cekip)
            try {
            const cekip2 = await axios.get('https://mnazria.herokuapp.com/api/check?ip=' + cekip)
            const { city, continent_name, country_name, ip, latitude, location, longitude, region_name } = cekip2.data
            const cekip3 = `*IP Ditemukan!*

➤ *Kota:* ${city}
➤ *Benua:* ${continent_name}
➤ *Negara:* ${country_name}
➤ *Ip Address:* ${ip}
➤ *Garis Lintang:* ${latitude}
➤ *Kode Telepon:* +${location.calling_code}
➤ *Ibu Kota:* +${location.capital}
➤ *Bahasa:* +${location.languages[0].name}
➤ *Garis Bujur:* ${longitude}
➤ *Wilayah:* +${region_name}`

            const pictk = await bent("buffer")(location.country_flag)
            const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
            yui.sendImage(from, base64, city, cekip3)
            } catch (err) {
             console.error(err.message)
             await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, IP tidak ditemukan')
             yui.sendText(ownerNumber, 'Error Check IP : '+ err)
           }
          break
        case '!nhentai':
            yui.reply(from, 'Fitur ini sedang di perbaiki')
            /*if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            if (args.length === 1) return yui.reply(from, `Kirim perintah *!joox [ Optional ]*\nContoh : *!joox Alan Walker*`, id)
            try {
                const code+ = body.slice(8)
                const nyeh = await axios.get(`https://nhder.herokuapp.com/download/nhentai/'+${code+}+'/zip`)
                const nhyehnyeh = nyeh.data.result
                const nheynyeh = nhyehnyeh[Math.floor(0)]
                //let tjoox = `*「 JOOX DOWNLOADER 」*\n\n➸ *Penyanyi:* ${nheynyeh.penyanyi}\n➸ *Judul:* ${nheynyeh.judul}\n➸ *Album:* ${nheynyeh.album}\n➸ *Ext:* ${nheynyeh.ext}\n➸ *Size:* ${nheynyeh.filesize}\n➸ *Durasi:* ${nheynyeh.duration}\n\n_Silahkan tunggu sebentar proses pengiriman file membutuhkan waktu beberapa menit._`
                yui.sendFileFromUrl(from, nheynyeh.linkImg, '', tjoox)
                //yui.sendFileFromUrl(from, nheynyeh.linkMp3, `${nheynyeh.judul}.${nheynyeh.ext}`, '', id).catch(() => yui.reply(from, mess.error.Yt4, id))
                await limitAdd(serial)
            } catch (err) {
                console.error(err.message)
                await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
                yui.sendText(ownerNumber, 'Error nhentai : '+ err)
            }*/
            break
        /*case '!nhentai':
        case '!nh':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return yui.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            if (args.length === 2) {
                const nuklir = body.split(' ')[1]
                yui.reply(from, mess.wait, id)
                const cek = await nhentai.exists(nuklir)
                if (cek === true)  {
                    try {
                        const api = new API()
                        const pic = await api.getBook(nuklir).then(book => {
                            return api.getImageURL(book.cover)
                        })
                        const dojin = await nhentai.getDoujin(nuklir)
                        const { title, details, link } = dojin
                        const { parodies, tags, artists, groups, languages, categories } = await details
                        var teks = `*Title* : ${title}\n\n*Parodies* : ${parodies}\n\n*Tags* : ${tags.join(', ')}\n\n*Artists* : ${artists.join(', ')}\n\n*Groups* : ${groups.join(', ')}\n\n*Languages* : ${languages.join(', ')}\n\n*Categories* : ${categories}\n\n*Link* : ${link}`
                        exec('nhentai --id=' + nuklir + ` -P mantap.pdf -o ./hentong/${nuklir}.pdf --format `+ `${nuklir}.pdf`, (error, stdout, stderr) => {
                            yui.sendFileFromUrl(from, pic, 'hentod.jpg', teks, id).then(() => 
                            yui.sendFile(from, `./hentong/${nuklir}.pdf/${nuklir}.pdf.pdf`, `${title}.pdf`, '', id)).catch(() => 
                            yui.sendFile(from, `./hentong/${nuklir}.pdf/${nuklir}.pdf.pdf`, `${title}.pdf`, '', id))
                            if (error) {
                                console.log('error : '+ error.message)
                                return
                            }
                            if (stderr) {
                                console.log('stderr : '+ stderr)
                                return
                            }
                            console.log('stdout : '+ stdout)
                            })
                    } catch (err) {
                        yui.reply(from, '[❗] Terjadi kesalahan, mungkin kode nuklir salah', id)
                    }
                } else {
                    yui.reply(from, '[❗] Kode nuklir Salah!')
                }
            } else {
                yui.reply(from, '[ WRONG ] Kirim perintah *!nhentai [kode]* untuk contoh kirim perintah *!readme*')
            }
            break*/
        case '!brainly':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1)  return yui.reply(from, 'Kirim perintah *!brainly [optional]*\nContoh *!brainly biologi*', id)
            arg = body.trim().split(' ')
            console.log(...arg[1])
            var slicedArgs = Array.prototype.slice.call(arg, 1);
            console.log(slicedArgs)
            const brp = await slicedArgs.join(' ')
            console.log(brp)
            try {
            const resp = await axios.get('https://api.vhtear.com/branly?query=' + brp + '&apikey=' + vhtearkey)
            const { data } = resp.data.result
            const brpap = `*Pertanyaan Ditemukan!*
➤ *Jawaban:* ${data}`

            yui.sendFileFromUrl(from, brpap)
            } catch (err) {
             console.error(err.message)
             await yui.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, Resep tidak ditemukan')
             yui.sendText(ownerNumber, 'Brainly Error : ' + err)
           }
        case '!math':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (args.length === 1) return yui.reply(from, '[❗] Kirim perintah *!math [ Angka ]*\nContoh : !math 12*12\n*NOTE* :\n- Untuk Perkalian Menggunakan *\n- Untuk Pertambahan Menggunakan +\n- Untuk Pengurangan Mennggunakan -\n- Untuk Pembagian Menggunakan /')
            const mtk = body.slice(6)
            if (typeof Math_js.evaluate(mtk) !== "number") {
            yui.reply(from, `"${mtk}", bukan angka!\n[❗] Kirim perintah *!math [ Angka ]*\nContoh : !math 12*12\n*NOTE* :\n- Untuk Perkalian Menggunakan *\n- Untuk Pertambahan Menggunakan +\n- Untuk Pengurangan Mennggunakan -\n- Untuk Pembagian Menggunakan /`, id)
        } else {
            yui.reply(from, `*「 MATH 」*\n\n*Kalkulator*\n${mtk} = ${Math_js.evaluate(mtk)}`, id)
        }
        break
        case '!sauce':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (isMedia && type === 'image' || quotedMsg && quotedMsg.type === 'image') {
                if (isMedia) {
                    var mediaData = await decryptMedia(message, uaOverride)
                } else {
                    var mediaData = await decryptMedia(quotedMsg, uaOverride)
                }
                const fetch = require('node-fetch')
                const imgBS4 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                yui.reply(from, 'Searching....', id)
                fetch('https://trace.moe/api/search', {
                    method: 'POST',
                    body: JSON.stringify({ image: imgBS4 }),
                    headers: { "Content-Type": "application/json" }
                })
                .then(respon => respon.json())
                .then(resolt => {
                    if (resolt.docs && resolt.docs.length <= 0) {
                        yui.reply(from, 'Maaf, saya tidak tau ini anime apa', id)
                    }
                    const { is_adult, title, title_chinese, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = resolt.docs[0]
                    teks = ''
                    if (similarity < 0.92) {
                        teks = '*Saya memiliki keyakinan rendah dalam hal ini* :\n\n'
                    }
                    teks += '╭───────────•◈•───────────╮\n\n'
                    teks += `⠀⠀⠀⠀ 🏮 *Japanese:* ${title}\n            🐉 *Romaji:* ${title_romaji}\n            🎬 *English:* ${title_english}\n`
                    teks += `⠀⠀⠀⠀🔥 *Ecchi:* ${is_adult}\n`
                    teks += `⠀⠀⠀⠀🍃 *Episodes:* ${episode.toString()}\n`
                    teks += `⠀⠀      🌿 *Kesamaan:* ${(similarity * 100).toFixed(1)}%\n`
                    teks += '\n╰───────────•◈•───────────╯'
                    var video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`;
                    yui.sendFileFromUrl(from, video, 'nimek.mp4', teks, id).catch(() => {
                        yui.reply(from, teks, id)
                    })
                })
                .catch(() => {
                    yui.reply(from, 'Error !', id)
                })
            } else {
                yui.sendImage(from, './media/img/contoh.jpeg', 'Tutor.jpeg', 'nih contoh!', id)
            }
            break
        case '!textmaker':
                if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
                await limitAdd(serial)
                arg = body.trim().split('|')
                yui.reply(from, '[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!', id)
                if ((isMedia || isQuotedImage) && arg.length >= 2) {
                const top = arg[1]
                const bott = arg[2]
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const getUrl = await uploadImages(mediaData, false)
                const ImageBase64 = await custom(getUrl, top, bott)
                await yui.sendFile(from, ImageBase64, 'image.png','Kore, Matte Gomennasai...')
                } else {
                await yui.reply(from, 'Wrong Format!', id)
                }
                break
        case '!quotemaker':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            arg = body.trim().split('|')
            if (arg.length >= 4) {
                yui.reply(from, mess.wait, id)
                const quotes = arg[1]
                const author = arg[2]
                const theme = arg[3]
                await quotemaker(quotes, author, theme).then(amsu => {
                    yui.sendFile(from, amsu, 'quotesmaker.jpg','neh...').catch(() => {
                       yui.reply(from, mess.error.Qm, id)
                    })
                })
            } else {
                yui.reply(from, 'Usage: \n!quotemaker |teks|watermark|theme\n\nEx :\n!quotemaker |ini contoh|bicit|random', id)
            }
            break
        case '!listchannel':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            yui.reply(from, listChannel, id)
            break
       /* case '!jadwaltv':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!jadwalTv [channel]*', id)
            const query = body.slice(10).toLowerCase()
            const jadwal = await jadwalTv(query)
            yui.reply(from, jadwal, id)
            break
        case '!jadwaltvnow': // API MATI
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const jadwalNow = await axios.get('https://api.haipbis.xyz/jadwaltvnow')
            yui.reply(from, `Jam : ${jadwalNow.data.jam}\n\nJadwalTV : ${jadwalNow.data.jadwalTV}`, id)
            break*/
        case '!nulis':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!nulis [teks]*, contoh *!nulis Yui Papa Mama*', id)
            const ngettik = body.slice(7)
            const ngetikk = ('https://api.vhtear.com/write?text='+ ngettik+'&apiKey='+ vhtearkey)
            yui.sendFileFromUrl(from, ngetikk, 'nulis.jpg', '', id)
            break
        case '!inu':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const list = ["https://cdn.shibe.online/shibes/247d0ac978c9de9d9b66d72dbdc65f2dac64781d.jpg","https://cdn.shibe.online/shibes/1cf322acb7d74308995b04ea5eae7b520e0eae76.jpg","https://cdn.shibe.online/shibes/1ce955c3e49ae437dab68c09cf45297d68773adf.jpg","https://cdn.shibe.online/shibes/ec02bee661a797518d37098ab9ad0c02da0b05c3.jpg","https://cdn.shibe.online/shibes/1e6102253b51fbc116b887e3d3cde7b5c5083542.jpg","https://cdn.shibe.online/shibes/f0c07a7205d95577861eee382b4c8899ac620351.jpg","https://cdn.shibe.online/shibes/3eaf3b7427e2d375f09fc883f94fa8a6d4178a0a.jpg","https://cdn.shibe.online/shibes/c8b9fcfde23aee8d179c4c6f34d34fa41dfaffbf.jpg","https://cdn.shibe.online/shibes/55f298bc16017ed0aeae952031f0972b31c959cb.jpg","https://cdn.shibe.online/shibes/2d5dfe2b0170d5de6c8bc8a24b8ad72449fbf6f6.jpg","https://cdn.shibe.online/shibes/e9437de45e7cddd7d6c13299255e06f0f1d40918.jpg","https://cdn.shibe.online/shibes/6c32141a0d5d089971d99e51fd74207ff10751e7.jpg","https://cdn.shibe.online/shibes/028056c9f23ff40bc749a95cc7da7a4bb734e908.jpg","https://cdn.shibe.online/shibes/4fb0c8b74dbc7653e75ec1da597f0e7ac95fe788.jpg","https://cdn.shibe.online/shibes/125563d2ab4e520aaf27214483e765db9147dcb3.jpg","https://cdn.shibe.online/shibes/ea5258fad62cebe1fedcd8ec95776d6a9447698c.jpg","https://cdn.shibe.online/shibes/5ef2c83c2917e2f944910cb4a9a9b441d135f875.jpg","https://cdn.shibe.online/shibes/6d124364f02944300ae4f927b181733390edf64e.jpg","https://cdn.shibe.online/shibes/92213f0c406787acd4be252edb5e27c7e4f7a430.jpg","https://cdn.shibe.online/shibes/40fda0fd3d329be0d92dd7e436faa80db13c5017.jpg","https://cdn.shibe.online/shibes/e5c085fc427528fee7d4c3935ff4cd79af834a82.jpg","https://cdn.shibe.online/shibes/f83fa32c0da893163321b5cccab024172ddbade1.jpg","https://cdn.shibe.online/shibes/4aa2459b7f411919bf8df1991fa114e47b802957.jpg","https://cdn.shibe.online/shibes/2ef54e174f13e6aa21bb8be3c7aec2fdac6a442f.jpg","https://cdn.shibe.online/shibes/fa97547e670f23440608f333f8ec382a75ba5d94.jpg","https://cdn.shibe.online/shibes/fb1b7150ed8eb4ffa3b0e61ba47546dd6ee7d0dc.jpg","https://cdn.shibe.online/shibes/abf9fb41d914140a75d8bf8e05e4049e0a966c68.jpg","https://cdn.shibe.online/shibes/f63e3abe54c71cc0d0c567ebe8bce198589ae145.jpg","https://cdn.shibe.online/shibes/4c27b7b2395a5d051b00691cc4195ef286abf9e1.jpg","https://cdn.shibe.online/shibes/00df02e302eac0676bb03f41f4adf2b32418bac8.jpg","https://cdn.shibe.online/shibes/4deaac9baec39e8a93889a84257338ebb89eca50.jpg","https://cdn.shibe.online/shibes/199f8513d34901b0b20a33758e6ee2d768634ebb.jpg","https://cdn.shibe.online/shibes/f3efbf7a77e5797a72997869e8e2eaa9efcdceb5.jpg","https://cdn.shibe.online/shibes/39a20ccc9cdc17ea27f08643b019734453016e68.jpg","https://cdn.shibe.online/shibes/e67dea458b62cf3daa4b1e2b53a25405760af478.jpg","https://cdn.shibe.online/shibes/0a892f6554c18c8bcdab4ef7adec1387c76c6812.jpg","https://cdn.shibe.online/shibes/1b479987674c9b503f32e96e3a6aeca350a07ade.jpg","https://cdn.shibe.online/shibes/0c80fc00d82e09d593669d7cce9e273024ba7db9.jpg","https://cdn.shibe.online/shibes/bbc066183e87457b3143f71121fc9eebc40bf054.jpg","https://cdn.shibe.online/shibes/0932bf77f115057c7308ef70c3de1de7f8e7c646.jpg","https://cdn.shibe.online/shibes/9c87e6bb0f3dc938ce4c453eee176f24636440e0.jpg","https://cdn.shibe.online/shibes/0af1bcb0b13edf5e9b773e34e54dfceec8fa5849.jpg","https://cdn.shibe.online/shibes/32cf3f6eac4673d2e00f7360753c3f48ed53c650.jpg","https://cdn.shibe.online/shibes/af94d8eeb0f06a0fa06f090f404e3bbe86967949.jpg","https://cdn.shibe.online/shibes/4b55e826553b173c04c6f17aca8b0d2042d309fb.jpg","https://cdn.shibe.online/shibes/a0e53593393b6c724956f9abe0abb112f7506b7b.jpg","https://cdn.shibe.online/shibes/7eba25846f69b01ec04de1cae9fed4b45c203e87.jpg","https://cdn.shibe.online/shibes/fec6620d74bcb17b210e2cedca72547a332030d0.jpg","https://cdn.shibe.online/shibes/26cf6be03456a2609963d8fcf52cc3746fcb222c.jpg","https://cdn.shibe.online/shibes/c41b5da03ad74b08b7919afc6caf2dd345b3e591.jpg","https://cdn.shibe.online/shibes/7a9997f817ccdabac11d1f51fac563242658d654.jpg","https://cdn.shibe.online/shibes/7221241bad7da783c3c4d84cfedbeb21b9e4deea.jpg","https://cdn.shibe.online/shibes/283829584e6425421059c57d001c91b9dc86f33b.jpg","https://cdn.shibe.online/shibes/5145c9d3c3603c9e626585cce8cffdfcac081b31.jpg","https://cdn.shibe.online/shibes/b359c891e39994af83cf45738b28e499cb8ffe74.jpg","https://cdn.shibe.online/shibes/0b77f74a5d9afaa4b5094b28a6f3ee60efcb3874.jpg","https://cdn.shibe.online/shibes/adccfdf7d4d3332186c62ed8eb254a49b889c6f9.jpg","https://cdn.shibe.online/shibes/3aac69180f777512d5dabd33b09f531b7a845331.jpg","https://cdn.shibe.online/shibes/1d25e4f592db83039585fa480676687861498db8.jpg","https://cdn.shibe.online/shibes/d8349a2436420cf5a89a0010e91bf8dfbdd9d1cc.jpg","https://cdn.shibe.online/shibes/eb465ef1906dccd215e7a243b146c19e1af66c67.jpg","https://cdn.shibe.online/shibes/3d14e3c32863195869e7a8ba22229f457780008b.jpg","https://cdn.shibe.online/shibes/79cedc1a08302056f9819f39dcdf8eb4209551a3.jpg","https://cdn.shibe.online/shibes/4440aa827f88c04baa9c946f72fc688a34173581.jpg","https://cdn.shibe.online/shibes/94ea4a2d4b9cb852e9c1ff599f6a4acfa41a0c55.jpg","https://cdn.shibe.online/shibes/f4478196e441aef0ada61bbebe96ac9a573b2e5d.jpg","https://cdn.shibe.online/shibes/96d4db7c073526a35c626fc7518800586fd4ce67.jpg","https://cdn.shibe.online/shibes/196f3ed10ee98557328c7b5db98ac4a539224927.jpg","https://cdn.shibe.online/shibes/d12b07349029ca015d555849bcbd564d8b69fdbf.jpg","https://cdn.shibe.online/shibes/80fba84353000476400a9849da045611a590c79f.jpg","https://cdn.shibe.online/shibes/94cb90933e179375608c5c58b3d8658ef136ad3c.jpg","https://cdn.shibe.online/shibes/8447e67b5d622ef0593485316b0c87940a0ef435.jpg","https://cdn.shibe.online/shibes/c39a1d83ad44d2427fc8090298c1062d1d849f7e.jpg","https://cdn.shibe.online/shibes/6f38b9b5b8dbf187f6e3313d6e7583ec3b942472.jpg","https://cdn.shibe.online/shibes/81a2cbb9a91c6b1d55dcc702cd3f9cfd9a111cae.jpg","https://cdn.shibe.online/shibes/f1f6ed56c814bd939645138b8e195ff392dfd799.jpg","https://cdn.shibe.online/shibes/204a4c43cfad1cdc1b76cccb4b9a6dcb4a5246d8.jpg","https://cdn.shibe.online/shibes/9f34919b6154a88afc7d001c9d5f79b2e465806f.jpg","https://cdn.shibe.online/shibes/6f556a64a4885186331747c432c4ef4820620d14.jpg","https://cdn.shibe.online/shibes/bbd18ae7aaf976f745bc3dff46b49641313c26a9.jpg","https://cdn.shibe.online/shibes/6a2b286a28183267fca2200d7c677eba73b1217d.jpg","https://cdn.shibe.online/shibes/06767701966ed64fa7eff2d8d9e018e9f10487ee.jpg","https://cdn.shibe.online/shibes/7aafa4880b15b8f75d916b31485458b4a8d96815.jpg","https://cdn.shibe.online/shibes/b501169755bcf5c1eca874ab116a2802b6e51a2e.jpg","https://cdn.shibe.online/shibes/a8989bad101f35cf94213f17968c33c3031c16fc.jpg","https://cdn.shibe.online/shibes/f5d78feb3baa0835056f15ff9ced8e3c32bb07e8.jpg","https://cdn.shibe.online/shibes/75db0c76e86fbcf81d3946104c619a7950e62783.jpg","https://cdn.shibe.online/shibes/8ac387d1b252595bbd0723a1995f17405386b794.jpg","https://cdn.shibe.online/shibes/4379491ef4662faa178f791cc592b52653fb24b3.jpg","https://cdn.shibe.online/shibes/4caeee5f80add8c3db9990663a356e4eec12fc0a.jpg","https://cdn.shibe.online/shibes/99ef30ea8bb6064129da36e5673649e957cc76c0.jpg","https://cdn.shibe.online/shibes/aeac6a5b0a07a00fba0ba953af27734d2361fc10.jpg","https://cdn.shibe.online/shibes/9a217cfa377cc50dd8465d251731be05559b2142.jpg","https://cdn.shibe.online/shibes/65f6047d8e1d247af353532db018b08a928fd62a.jpg","https://cdn.shibe.online/shibes/fcead395cbf330b02978f9463ac125074ac87ab4.jpg","https://cdn.shibe.online/shibes/79451dc808a3a73f99c339f485c2bde833380af0.jpg","https://cdn.shibe.online/shibes/bedf90869797983017f764165a5d97a630b7054b.jpg","https://cdn.shibe.online/shibes/dd20e5801badd797513729a3645c502ae4629247.jpg","https://cdn.shibe.online/shibes/88361ee50b544cb1623cb259bcf07b9850183e65.jpg","https://cdn.shibe.online/shibes/0ebcfd98e8aa61c048968cb37f66a2b5d9d54d4b.jpg"]
            let kya = list[Math.floor(Math.random() * list.length)]
            yui.sendFileFromUrl(from, kya, 'Dog.jpeg', 'Inu')
            break
        case '!qrcode':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if(!args.lenght >= 2) return
            let qrcodes = body.slice(8)
            await yui.sendFileFromUrl(from, `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${qrcodes}`, 'gambar.png', 'Process sukses!')
            break
        case '!ptl':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const pptl = ["https://i.pinimg.com/564x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg","https://i.pinimg.com/236x/98/08/1c/98081c4dffde1c89c444db4dc1912d2d.jpg","https://i.pinimg.com/236x/a7/e2/fe/a7e2fee8b0abef9d9ecc8885557a4e91.jpg","https://i.pinimg.com/236x/ee/ae/76/eeae769648dfaa18cac66f1d0be8c160.jpg","https://i.pinimg.com/236x/b2/84/55/b2845599d303a4f8fc4f7d2a576799fa.jpg","https://i.pinimg.com/564x/78/7c/49/787c4924083a9424a900e8f1f4fdf05f.jpg","https://i.pinimg.com/236x/eb/05/dc/eb05dc1c306f69dd43b7cae7cbe03d27.jpg","https://i.pinimg.com/236x/d0/1b/40/d01b40691c68b84489f938b939a13871.jpg","https://i.pinimg.com/236x/31/f3/06/31f3065fa218856d7650e84b000d98ab.jpg","https://i.pinimg.com/236x/4a/e5/06/4ae5061a5c594d3fdf193544697ba081.jpg","https://i.pinimg.com/236x/56/45/dc/5645dc4a4a60ac5b2320ce63c8233d6a.jpg","https://i.pinimg.com/236x/7f/ad/82/7fad82eec0fa64a41728c9868a608e73.jpg","https://i.pinimg.com/236x/ce/f8/aa/cef8aa0c963170540a96406b6e54991c.jpg","https://i.pinimg.com/236x/77/02/34/77023447b040aef001b971e0defc73e3.jpg","https://i.pinimg.com/236x/4a/5c/38/4a5c38d39687f76004a097011ae44c7d.jpg","https://i.pinimg.com/236x/41/72/af/4172af2053e54ec6de5e221e884ab91b.jpg","https://i.pinimg.com/236x/26/63/ef/2663ef4d4ecfc935a6a2b51364f80c2b.jpg","https://i.pinimg.com/236x/2b/cb/48/2bcb487b6d398e8030814c7a6c5a641d.jpg","https://i.pinimg.com/236x/62/da/23/62da234d941080696428e6d4deec6d73.jpg","https://i.pinimg.com/236x/d4/f3/40/d4f340e614cc4f69bf9a31036e3d03c5.jpg","https://i.pinimg.com/236x/d4/97/dd/d497dd29ca202be46111f1d9e62ffa65.jpg","https://i.pinimg.com/564x/52/35/66/523566d43058e26bf23150ac064cfdaa.jpg","https://i.pinimg.com/236x/36/e5/27/36e52782f8d10e4f97ec4dbbc97b7e67.jpg","https://i.pinimg.com/236x/02/a0/33/02a033625cb51e0c878e6df2d8d00643.jpg","https://i.pinimg.com/236x/30/9b/04/309b04d4a498addc6e4dd9d9cdfa57a9.jpg","https://i.pinimg.com/236x/9e/1d/ef/9e1def3b7ce4084b7c64693f15b8bea9.jpg","https://i.pinimg.com/236x/e1/8f/a2/e18fa21af74c28e439f1eb4c60e5858a.jpg","https://i.pinimg.com/236x/22/d9/22/22d9220de8619001fe1b27a2211d477e.jpg","https://i.pinimg.com/236x/af/ac/4d/afac4d11679184f557d9294c2270552d.jpg","https://i.pinimg.com/564x/52/be/c9/52bec924b5bdc0d761cfb1160865b5a1.jpg","https://i.pinimg.com/236x/1a/5a/3c/1a5a3cffd0d936cd4969028668530a15.jpg"]
            let pep = pptl[Math.floor(Math.random() * pptl.length)]
            yui.sendFileFromUrl(from, pep, 'pptl.jpg', '', message.id)
            break
        case '!neko':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            q2 = Math.floor(Math.random() * 900) + 300;
            q3 = Math.floor(Math.random() * 900) + 300;
            yui.sendFileFromUrl(from, 'http://placekitten.com/'+q3+'/'+q2, 'neko.png','Neko ')
            break
        case '!pokemon':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            q7 = Math.floor(Math.random() * 890) + 1;
            yui.sendFileFromUrl(from, 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+q7+'.png','Pokemon.png',)
            break
        case '!quote':
        case '!quotes':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            const quotez2 = await axios.get('https://tobz-api.herokuapp.com/api/randomquotes')
            yui.reply(from, `➤ *Quotes* : ${quotez2.data.quotes}\n➤ *Author* : ${quotez2.data.author}`, id)
            break
        case '!lirik':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length == 1) return yui.reply(from, 'Kirim perintah *!lirik [optional]*, contoh *!lirik in the rain*', id)
            const lagu = body.slice(7)
            const lirik = await liriklagu(lagu)
            yui.reply(from, lirik, id)
            break
        case '!chord':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (isLimit(serial)) return yui.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik !limit Untuk Mengecek Kuota Limit Kamu`, id)
            
            await limitAdd(serial)
            if (args.length === 1) return yui.reply(from, 'Kirim perintah *!chord [query]*, contoh *!chord aku bukan boneka*', id)
            const query__ = body.slice(7)
            const chord = await axios.get(`https://api.vhtear.com/chordguitar?query=${query__}&apikey=${vhtearkey}`)
            yui.reply(from, chord.data.result, id)
            break
        case '!listdaerah':
            if (!isGroupMsg) return yui.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
            const listDaerah = await axios.get('https://tobz-api.herokuapp.com/api/daerah')
            yui.reply(from, listDaerah.data.result, id)
            break
        // ADMIN & OWNER
        case '!bc': // KASIH CREDIT DONG KALO COPAS
            if (!isOwner) return yui.reply(from, `Perintah ini hanya untuk Papa Yui`, id)
                bctxt = body.slice(4)
                txtbc = `*「 YUI BROADCAST 」*\n\n${bctxt}`
                const semuagrup = await yui.getAllChatIds();
                if(quotedMsg && quotedMsg.type == 'image'){
                    const mediaData = await decryptMedia(quotedMsg)
                    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                    for(let grupnya of semuagrup){
                        var cekgrup = await yui.getChatById(grupnya)
                        if(!cekgrup.isReadOnly) yui.sendImage(grupnya, imageBase64, 'gambar.jpeg', txtbc)
                    }
                    yui.reply('Broadcast sukses!')
                }else{
                    for(let grupnya of semuagrup){
                        var cekgrup = await yui.getChatById(grupnya)
                        if(!cekgrup.isReadOnly && isMuted(grupnya)) yui.sendText(grupnya, txtbc)
                    }
                            yui.reply('Broadcast Success!')
                }
                break
        case '!adminlist':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            let mimin = ''
            for (let admon of groupAdmins) {
                mimin += `➤ @${admon.replace(/@c.us/g, '')}\n` 
            }
            await sleep(2000)
            await yui.sendTextWithMentions(from, mimin)
            break
        case '!ownergroup':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const Owner_ = chat.groupMetadata.owner
            await yui.sendTextWithMentions(from, `Owner Group : @${Owner_}`)
            break
        case '!otagall': // FOR OWNER & ADMIN Yui
        case '!omentionall':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isOwner, !isAdmin) return yui.reply(from, 'Perintah ini hanya untuk Papa Yui', id)
            const groupMek = await yui.getGroupMembers(groupId)
            let heho = '╭┈─「 Mention All 」\n'
            for (let i = 0; i < groupMek.length; i++) {
                heho += '╰─➤'
                heho += ` @${groupMek[i].id.replace(/@c.us/g, '')}\n`
            }
            heho += '╰┈────────────'
            await sleep(2000)
            await yui.sendTextWithMentions(from, heho)
            break
        case '!tagall': // FOR GROUP ADMINS
        case '!mentionall':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isGroupAdmins) return yui.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            const groupMem = await yui.getGroupMembers(groupId)
            let hehe = '╭┈─「 Mention All 」\n'
            for (let i = 0; i < groupMem.length; i++) {
                hehe += '╰─➤'
                hehe += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            hehe += '╰┈────────────'
            await sleep(2000)
            await yui.sendTextWithMentions(from, hehe)
            break
        case '!okickall':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isOwner) return yui.reply(from, 'Perintah ini hanya untuk Papa Yui', id)
            if (!isBotGroupAdmins) return yui.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const allMeq = await yui.getGroupMembers(groupId)
            for (let i = 0; i < allMeq.length; i++) {
                if ((adminNumber, ownerNumber).includes(allMeq[i].id)) {
                    console.log('Upss this is Admin group')
                } else {
                    await yui.removeParticipant(groupId, allMeq[i].id)
                }
            }
            yui.reply(from, 'Succes kick all member', id)
            break
        case '!kickall':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            const isGroupOwner = sender.id === chat.groupMetadata.owner
            if (!isGroupOwner) return yui.reply(from, 'Perintah ini hanya bisa di gunakan oleh Owner group', id)
            if (!isBotGroupAdmins) return yui.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            const allMek = await yui.getGroupMembers(groupId)
            for (let i = 0; i < allMek.length; i++) {
                if ((adminNumber, ownerNumber).includes(allMek[i].id)) {
                    console.log('Upss this is Admin group')
                } else {
                    await yui.removeParticipant(groupId, allMek[i].id)
                }
            }
            yui.reply(from, 'Success kick all member', id)
            break
        case '!leaveall':
            if (!isOwner) return yui.reply(from, 'Perintah ini hanya untuk Papa Yui', id)
            const allChats = await yui.getAllChatIds()
            const allGroups = await yui.getAllGroups()
            for (let gclist of allGroups) {
                await yui.sendText(gclist.contact.id, `Maaf bot sedang pembersihan, total chat aktif : ${allChats.length}`)
                await yui.leaveGroup(gclist.contact.id)
            }
            yui.reply(from, 'Succes leave all group!', id)
            break
        case '!clearall':
            if (!isOwner) return yui.reply(from, 'Perintah ini hanya untuk Papa Yui', id)
            const allChatz = await yui.getAllChats()
            for (let dchat of allChatz) {
                await yui.deleteChat(dchat.id)
            }
            yui.reply(from, 'Succes clear all chat!', id)
            break
        case '!oadd':
            const orang = args[1]
            if (!isGroupMsg) return yui.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (args.length === 1) return yui.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!oadd* 628xxxxx', id)
            if (!isOwner, !isAdmin) return yui.reply(from, 'Perintah ini hanya untuk Admin Bot', id)
            if (!isBotGroupAdmins) return yui.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            try {
                await yui.addParticipant(from,`${orang}@c.us`)
            } catch {
                yui.reply(from, mess.error.Ad, id)
            }
            break
        case '!add':
            const orgh = body.slice(5)
            if (!isGroupMsg) return yui.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (args.length === 1) return yui.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!add* 628xxxxx', id)
            if (!isGroupAdmins) return yui.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return yui.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            try {
                await yui.addParticipant(from,`${orgh}@c.us`)
            } catch {
                yui.reply(from, mess.error.Ad, id)
            }
            break
        case '!okick':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner) return yui.reply(from, 'Perintah ini hanya untuk Papa Yui', id)
            if (!isBotGroupAdmins) return yui.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return yui.reply(from, 'Untuk menggunakan Perintah ini, kirim perintah *!okick* @tagmember', id)
            await yui.sendText(from, `Perintah Papa diterima, mengeluarkan:\n${mentionedJidList.join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if ((adminNumber, ownerNumber).includes(mentionedJidList[i])) return yui.reply(from, mess.error.Sp, id)
                await yui.removeParticipant(groupId, mentionedJidList[i])
            }
            break
        case '!kick':
            if (!isGroupMsg) return yui.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return yui.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return yui.reply(from, 'Perintah ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return yui.reply(from, 'Untuk menggunakan Perintah ini, kirim perintah *!kick* @tagmember', id)
            await yui.sendText(from, `Perintah diterima, mengeluarkan:\n${mentionedJidList.join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if ((adminNumber, groupAdmins).includes(mentionedJidList[i])) return yui.reply(from, mess.error.Sp, id)
                await yui.removeParticipant(groupId, mentionedJidList[i])
            }
            break
        case '!oleave':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner) return yui.reply(from, 'Perintah ini hanya untuk Papa', id)
            await yui.sendText(from,'Wakatta papa').then(() => yui.leaveGroup(groupId))
            break
        case '!leave':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return yui.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin group', id)
            await yui.sendText(from,'Sayonara').then(() => yui.leaveGroup(groupId))
            break
        case '!opromote':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner, !isAdmin) return yui.reply(from, 'Perintah ini hanya untuk Admin Bot', id)
            if (!isBotGroupAdmins) return yui.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return yui.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!promote* @tagmember', id)
            if (mentionedJidList.length >= 2) return yui.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 user.', id)
            if (groupAdmins.includes(mentionedJidList[0])) return yui.reply(from, 'Maaf, user tersebut sudah menjadi admin.', id)
            await yui.promoteParticipant(groupId, mentionedJidList[0])
            await yui.sendTextWithMentions(from, `Perintah Papa diterima, menambahkan @${mentionedJidList[0]} sebagai admin.`)
            break
        case '!promote':
            if (!isGroupMsg) return yui.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return yui.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return yui.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return yui.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!promote* @tagmember', id)
            if (mentionedJidList.length >= 2) return yui.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 user.', id)
            if (groupAdmins.includes(mentionedJidList[0])) return yui.reply(from, 'Maaf, user tersebut sudah menjadi admin.', id)
            await yui.promoteParticipant(groupId, mentionedJidList[0])
            await yui.sendTextWithMentions(from, `Perintah diterima, menambahkan @${mentionedJidList[0]} sebagai admin.`)
            break
        case '!odemote':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner, !isAdmin) return yui.reply(from, 'Perintah ini hanya untuk Admin Bot', id)
            if (!isBotGroupAdmins) return yui.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return yui.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!demote* @tagadmin', id)
            if (mentionedJidList.length >= 2) return yui.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 orang.', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return yui.reply(from, 'Maaf, user tersebut tidak menjadi admin.', id)
            await yui.demoteParticipant(groupId, mentionedJidList[0])
            await yui.sendTextWithMentions(from, `Perintah Papa diterima, menghapus jabatan @${mentionedJidList[0]}.`)
            break
        case '!demote':
            if (!isGroupMsg) return yui.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return yui.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!isBotGroupAdmins) return yui.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
            if (mentionedJidList.length === 0) return yui.reply(from, 'Untuk menggunakan fitur ini, kirim perintah *!demote* @tagadmin', id)
            if (mentionedJidList.length >= 2) return yui.reply(from, 'Maaf, perintah ini hanya dapat digunakan kepada 1 orang.', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return yui.reply(from, 'Maaf, user tersebut tidak menjadi admin.', id)
            await yui.demoteParticipant(groupId, mentionedJidList[0])
            await yui.sendTextWithMentions(from, `Perintah diterima, menghapus jabatan @${mentionedJidList[0]}.`)
            break
        case '!join':
            if (args.length === 1) return yui.reply(from, 'Hanya Papa yang bisa memasukan Bot ke dalam Grup!', id)
            if (!isOwner) return yui.reply(from, 'Perintah ini hanya untuk Papa Yui\n\nJika ingin mengundang bot chat !owner', id)
            const link = body.slice(6)
            const tGr = await yui.getAllGroups()
            const minMem = 5
            const isLink = link.match(/(https:\/\/chat.whatsapp.com)/gi)
            const check = await yui.inviteInfo(link)
            if (!isLink) return yui.reply(from, 'Ini link? 👊🤬', id)
            if (tGr.length > 256) return yui.reply(from, 'Maaf jumlah group sudah maksimal!', id)
            if (check.size < minMem) return yui.reply(from, 'Member group tidak melebihi 5, bot tidak bisa masuk', id)
            if (check.status === 200) {
                await yui.joinGroupViaLink(link).then(() => yui.reply(from, 'Bot akan segera masuk!'))
            } else {
                yui.reply(from, 'Link group tidak valid!', id)
            }
            break
        case '!odelete':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group', id)
            if (!isOwner, !isAdmin) return yui.reply(from, 'Perintah ini hanya untuk Admin Bot', id)
            if (!quotedMsg) return yui.reply(from, 'Salah!!, kirim perintah *!delete [tagpesanbot]*', id)
            if (!quotedMsgObj.fromMe) return yui.reply(from, 'Salah!!, Bot tidak bisa mengahpus chat user lain!', id)
            yui.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
        case '!delete':
            if (!isGroupMsg) return yui.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
            if (!isGroupAdmins) return yui.reply(from, 'Fitur ini hanya bisa di gunakan oleh admin group', id)
            if (!quotedMsg) return yui.reply(from, 'Salah!!, kirim perintah *!delete [tagpesanbot]*', id)
            if (!quotedMsgObj.fromMe) return yui.reply(from, 'Salah!!, Bot tidak bisa mengahpus chat user lain!', id)
            yui.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
        case '!read':
            if (!isGroupMsg) return yui.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)                
            if (!quotedMsg) return yui.reply(from, `Tolong Reply Pesan Yui`, id)
            if (!quotedMsgObj.fromMe) return yui.reply(from, `Tolong Reply Pesan Yui`, id)
            try {
                const reader = await yui.getMessageReaders(quotedMsgObj.id)
                let list = ''
                for (let pembaca of reader) {
                list += `- @${pembaca.id.replace(/@c.us/g, '')}\n` 
            }
                yui.sendTextWithMentions(from, `Hayolo, yang ngeread doank...\n${list}`)
            } catch(err) {
                console.log(err)
                yui.reply(from, `Maaf, Belum Ada Yang Membaca Pesan Yui`, id)    
            }
            break
        case '!linkgroup':
            if (!isGroupMsg) return yui.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
            if (!isGroupAdmins) return yui.reply(from, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
            if (!isBotGroupAdmins) return yui.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            const namagcnye = chat.formattedTitle
            var gclink = await yui.getGroupInviteLink(groupId)
            var linkgc  = `Link group : *${namagcnye}*\n\n ${gclink}`
            yui.reply(from, linkgc, id)
            break
        case '!resetlinkgroup':
            if (!isGroupMsg) return yui.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
            if (!isGroupAdmins) return yui.reply(from, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
            if (!isBotGroupAdmins) return yui.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            if (isGroupMsg) {
                await yui.revokeGroupInviteLink(groupId);
                yui.sendTextWithMentions(from, `Link group telah direset oleh admin @${sender.id.replace('@c.us', '')}`)
            }
            break
        case '!getses':
            //if (!isOwner) return yui.reply(from, 'Perintah ini hanya untuk Papa Yui', id)            
            const sesPic = await yui.getSnapshot()
            yui.sendFile(from, sesPic, 'session.png', `Nih`, id)
            break
        case '!yuiadmin':
            let admn = `This is list of Yui Admin\nTotal : ${adminNumber.length}\n`
            for (let i of adminNumber) {
                admn += `➤ ${i.replace(/@c.us/g,'')}\n`
            }
            await yui.reply(from, admn, id)
            break
        case '!listprem':
            let usprem = `This is list of Premium User\nTotal : ${premium.length}\n`
            for (let i of premium) {
                usprem += `➤ ${i.replace(/@c.us/g,'')}\n`
            }
            await yui.reply(from, usprem, id)
            break
        case '!limit':
            var found = false
            const limidat = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
            for(let lmt of limidat){
                if(lmt.id === serial){
                    let limitCounts = limitCount-lmt.limit
                    if(limitCounts <= 0) return yui.reply(from, `Limit request anda sudah habis\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                    yui.reply(from, `Sisa limit request anda tersisa : *${limitCounts}*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                    found = true
                }
            }
            console.log(limit)
            console.log(limidat)
            if (found === false){
                let obj = {id: `${serial}`, limit:1};
                limit.push(obj);
                fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit, 1));
                yui.reply(from, `Sisa limit request anda tersisa : *${limitCount}*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
            }
            break
        case '!eval':
            const q = args.join(' ')
            if (!isOwner) return yui.reply(from, 'Perintah ini hanya bisa di gunakan oleh Papa Yui!', id)
            if (!q) return yui.reply(from, 'Harap masukkan code JavaScript!', id)
            try {
                let evaled = await eval(q)
                if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                yui.sendText(from, evaled)
            } catch (err) {
                yui.reply(from, err, id)
            }
        break
        case '!restart': // WORK IF YOU RUN USING PM2
            if(isOwner){
                yui.sendText(from, '*[WARN]* Restarting ...')
                setting.restartState = true
                setting.restartId = chatId
                var obj = []
                //fs.writeFileSync('./lib/setting.json', JSON.stringify(obj, null,2));
                fs.writeFileSync('./lib/database/limit.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/muted.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/msgLimit.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/banned.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/left.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/Simsimi.json', JSON.stringify(obj));
                fs.writeFileSync('./lib/database/nsfwz.json', JSON.stringify(obj));
                const spawn = require('child_process').exec;
                function os_func() {
                    this.execCommand = function (command) {
                        return new Promise((resolve, reject)=> {
                        spawn(command, (error, stdout, stderr) => {
                            if (error) {
                                reject(error);
                                return;
                            }
                            resolve(stdout)
                        });
                    })
                }}
                var oz = new os_func();
                oz.execCommand('pm2 restart index').then(res=> {
                }).catch(err=> {
                    console.log("os >>>", err);
                })
            }
            break
        case '!addadmin':
            if (!isOwner) return yui.reply(from, 'Perintah ini hanya bisa di gunakan oleh Papa Yui!', id)
                for (let i = 0; i < mentionedJidList.length; i++) {
                adminNumber.push(mentionedJidList[i])
                fs.writeFileSync('./lib/database/admin.json', JSON.stringify(adminNumber))
                yui.reply(from, 'Success Menambahkan Admin Yui!', id)
                }
            break
        case '!addprem':
            if (!isOwner) return yui.reply(from, 'Perintah ini hanya bisa di gunakan oleh Papa Yui!', id)
                for (let i = 0; i < mentionedJidList.length; i++) {
                premium.push(mentionedJidList[i])
                fs.writeFileSync('./lib/database/premium.json', JSON.stringify(premium))
                yui.reply(from, 'Success Menambahkan User Premium!', id)
                }
            break
        case '!deladmin':
            if (!isOwner) return yui.reply(from, 'Perintah ini hanya bisa di gunakan oleh Papa Yui!', id)
                let inq = adminNumber.indexOf(mentionedJidList[0])
                adminNumber.splice(inq, 1)
                fs.writeFileSync('./lib/database/admin.json', JSON.stringify(adminNumber))
                yui.reply(from, 'Success Menghapus Admin Yui!', id)
            break
        case '!delprem':
            if (!isOwner) return yui.reply(from, 'Perintah ini hanya bisa di gunakan oleh Papa Yui!', id)
                let upre = premium.indexOf(mentionedJidList[0])
                premium.splice(upre, 1)
                fs.writeFileSync('./lib/database/premium.json', JSON.stringify(premium))
                yui.reply(from, 'Success Menghapus User Premium!', id)
            break
        case '!block':
            if (!isOwner) return yui.reply(from, 'Perintah ini hanya bisa di gunakan oleh Papa Yui!', id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                let unblock = `${mentionedJidList[i]}`
                await yui.contactBlock(unblock).then((a)=>{
                    console.log(a)
                    yui.reply(from, `Success block ${args[1]}!`, id)
                })
            }
            break
        case '!unblock':
            if (!isOwner) return yui.reply(from, 'Perintah ini hanya bisa di gunakan oleh Papa Yui!', id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                let unblock = `${mentionedJidList[i]}`
                await yui.contactUnblock(unblock).then((a)=>{
                    console.log(a)
                    yui.reply(from, `Success unblok ${args[1]}!`, id)
                })
            } 
            break
        case '!setname':
            if (!isOwner) return yui.reply(from, `Perintah ini hanya bisa di gunakan oleh Papa Yui!`, id)
                const setnem = body.slice(9)
                await yui.setMyName(setnem)
                yui.sendTextWithMentions(from, `Makasih Nama Barunya @${sender.id.replace('@c.us','')}`)
            break
        case '!setstatus':
            if (!isOwner) return yui.reply(from, `Perintah ini hanya bisa di gunakan oleh Papa Yui!`, id)
                const setstat = body.slice(11)
                await yui.setMyStatus(setstat)
                yui.sendTextWithMentions(from, `Makasih Status Barunya @${sender.id.replace('@c.us','')}`)
            break
        case '!setprofilepic':
            if (!isOwner) return yui.reply(from, `Perintah ini hanya bisa di gunakan oleh Papa Yui!`, id)
            if (isMedia) {
                const mediaData = await decryptMedia(message)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await yui.setProfilePic(imageBase64)
                yui.sendTextWithMentions(`Makasih @${sender.id.replace('@c.us','')} Foto Profilenya`)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await yui.setProfilePic(imageBase64)
                yui.sendTextWithMentions(from, `Makasih @${sender.id.replace('@c.us','')} Foto Profilenya`)
            } else {
                yui.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan !setprofilepic`, id)
            }
            break
        case '!getpic':
            if (!isGroupMsg) return yui.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
            const texnugm = body.slice(8)
            const getnomber =  await yui.checkNumberStatus(texnugm)
            const useriq = getnomber.id.replace('@','') + '@c.us'
                try {
                    var jnck = await yui.getProfilePicFromServer(useriq)

                    yui.sendFileFromUrl(from, jnck, `awok.jpg`)
                } catch {
                    yui.reply(from, `Tidak Ada Foto Profile!`, id)
                }
            break
        case '!ban':
            if (!isOwner) return yui.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin Bot!', id)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if ((adminNumber).includes(mentionedJidList[i])) return yui.reply(from,`Maaf ${pushname}, Kamu tidak bisa banned Admin Yui!`, id)
                banned.push(mentionedJidList[i])
                fs.writeFileSync('./lib/banned.json', JSON.stringify(banned))
                yui.reply(from, `Succes ban target!`,id)
            }
            break
        case '!unban':
            if (!isOwner) return yui.reply(from, 'Perintah ini hanya bisa di gunakan oleh admin Bot!', id)
                let inz = banned.indexOf(mentionedJidList[0])
                banned.splice(inz, 1)
                fs.writeFileSync('./lib/database/banned.json', JSON.stringify(banned))
                yui.reply(from, 'Unbanned User!', id)
            break
        case '!listgroup':
                yui.getAllGroups().then((res) => {
                let berhitung1 = 1
                let gc = `*Ini daftar group* :\n`
                for (let i = 0; i < res.length; i++) {
                    gc += `\n━━━━━━━━━━━━━━━━━\n\n*No : ${i+1}*\n*Nama* : ${res[i].name}\n*Pesan Belum Dibaca* : ${res[i].unreadCount} chat\n*Tidak Spam* : ${res[i].notSpam}\n`
                }
                yui.reply(from, gc, id)
            })
            break
        case '!listbanned':
            let bened = `Ini orang yang kena banned\nTotal : ${banned.length}\n`
            for (let i of banned) {
                bened += `➤ ${i.replace(/@c.us/g,'')}\n`
            }
            await yui.reply(from, bened, id)
            break
        case '!listblock':
            let hih = `Ini orang yang kena block\nTotal : ${blockNumber.length}\n`
            for (let i of blockNumber) {
                hih += `➤ ${i.replace(/@c.us/g,'')}\n`
            }
            await yui.reply(from, hih, id)
            break
        case '!ping':
            await yui.sendText(from, `Pong!!!!\nSpeed: ${processTime(t, moment())} _Second_\nLebih lengkapnya di ${prefix}botstat`)
            break
        case '!botstat':
            const { sizeFormatter } = require('human-readable')
            const format = sizeFormatter({
                std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
                decimalPlaces: 2,
                keepTrailingZeroes: false,
                render: (literal, symbol) => `${literal} ${symbol}B`,
            })
            const os = require('os')
            const loadedMsg = await yui.getAmountOfLoadedMessages()
            const chatIds = await yui.getAllChatIds()
            const groups = await yui.getAllGroups()
            const groupsIn = groups.filter(x => x.groupMetadata.participants.map(x => [botNumber, '6281515860089@c.us'].includes(x.id._serialized)).includes(true))
            const me = await yui.getMe()
            const battery = await yui.getBatteryLevel()
            const isCharging = await yui.getIsPlugged()
            const used = process.memoryUsage()
            const cpus = os.cpus().map(cpu => {
                cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
                return cpu
            })
            const cpu = cpus.reduce((last, cpu, _, { length }) => {
                last.total += cpu.total
                last.speed += cpu.speed / length
                last.times.user += cpu.times.user
                last.times.nice += cpu.times.nice
                last.times.sys += cpu.times.sys
                last.times.idle += cpu.times.idle
                last.times.irq += cpu.times.irq
                return last
            }, {
                speed: 0,
                total: 0,
                times: {
                    user: 0,
                    nice: 0,
                    sys: 0,
                    idle: 0,
                    irq: 0
                }
            })
            const speed = moment() / 1000 - t
            yui.sendText(from, `
Merespon dalam ${speed} detik

💬 Status :
- *${loadedMsg}* Loaded Messages
- *${groups.length}* Group Chats
- *${groupsIn.length}* Groups Joined
- *${groups.length - groupsIn.length}* Groups Left
- *${chatIds.length - groups.length}* Personal Chats
- *${chatIds.length - groups.length - groupsIn.length}* Personal Chats Active
- *${chatIds.length}* Total Chats
- *${chatIds.length - groupsIn.length}* Total Chats Active

📱 *Phone Info* :
${monospace(`
🔋 Battery : ${battery}% ${isCharging ? '🔌 Charging...' : '⚡ Discharging'}
${Object.keys(me.phone).map(key => `${key} : ${me.phone[key]}`).join('\n')}
`.trim())}

💻 *Server Info* :
RAM: ${format(os.totalmem() - os.freemem())} / ${format(os.totalmem())}

_NodeJS Memory Usage_
${monospace(Object.keys(used).map(key => `${key} : ${format(used[key])}`).join('\n'))}

_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}

_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}
`.trim())
            break
        case '!setgroupname':
            if (!isGroupMsg) return yui.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
            if (!isGroupAdmins) return yui.reply(from, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
            if (!isBotGroupAdmins) return yui.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            const namagrup = body.slice(14)
            let sebelum = chat.groupMetadata.formattedName
            let halaman = global.page ? global.page : await yui.getPage()
            await halaman.evaluate((chatId, subject) =>
            Store.WapQuery.changeSubject(chatId, subject),groupId, `${namagrup}`)
            yui.sendTextWithMentions(from, `Nama group telah diubah oleh admin @${sender.id.replace('@c.us','')}\n\n• Before: ${sebelum}\n• After: ${namagrup}`)
            break
        case '!setgroupicon':
            if (!isGroupMsg) return yui.reply(from, `Fitur ini hanya bisa di gunakan dalam group`, id)
            if (!isGroupAdmins) return yui.reply(from, `Fitur ini hanya bisa di gunakan oleh admin group`, id)
            if (!isBotGroupAdmins) return yui.reply(from, `Fitur ini hanya bisa di gunakan ketika bot menjadi admin`, id)
            if (isMedia) {
                const mediaData = await decryptMedia(message)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await yui.setGroupIcon(from, imageBase64)
                yui.sendTextWithMentions(from, `Profile group telah diubah oleh admin @${sender.id.replace('@c.us','')}`)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await yui.setGroupIcon(from, imageBase64)
                yui.sendTextWithMentions(from, `Profile group telah diubah oleh admin @${sender.id.replace('@c.us','')}`)
            } else {
                yui.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan !setgroupicon`, id)
            }
            break
        case '!bugreport':
            if (args.length === 1) return yui.reply(from, '[❗] Kirim perintah *!bugreport [teks]*\ncontoh : *!bugreport Permisi Owner, Ada bug pada command !otakudesu, Tolong diperbaiki*')
            const bug = body.slice(11)
            if(!bug) return
            if(isGroupMsg){
                yui.sendText(ownerNumber, `*[BUG REPORT]*\n*WAKTU* : ${time}\nNO PENGIRIM : wa.me/${sender.id.match(/\d+/g)}\nGroup : ${formattedTitle}\n\n${bug}`)
                yui.reply(from, 'Masalah telah di laporkan ke Papa, laporan palsu/main2 tidak akan ditanggapi.' ,id)
            }else{
                yui.sendText(ownerNumber, `*[BUG REPORT]*\n*WAKTU* : ${time}\nNO PENGIRIM : wa.me/${sender.id.match(/\d+/g)}\n\n${bug}`)
                yui.reply(from, 'Masalah telah di laporkan ke Papa, laporan palsu/main2 tidak akan ditanggapi.', id)
            }
            break
         case '!profile':
            if (isBanned, isBlocked) return false
            if (isGroupMsg) {
                if (!quotedMsg) {
                var block = blockNumber.includes(author)
                var bend = banned.includes(author)
                var pic = await yui.getProfilePicFromServer(author)
                var namae = pushname
                var sts = await yui.getStatus(author)
                var adm = isGroupAdmins
                var adbot = isAdmin
                var prem = isPrem
                const { status } = sts
                if (pic == undefined) {
                    var pfp = errorurl 
                } else {
                    var pfp = pic
                } 
                await yui.sendFileFromUrl(from, pfp, 'pfp.jpg', `*User Profile* ✨️ \n\n➤ *Username: ${namae}*\n\n➤ *User Info: ${status}*\n\n*➤ Block : ${block}*\n\n*➤ Banned : ${bend}*\n\n*➤ Premium : ${prem}*\n\n➤ *Admin Group: ${adm}*\n\n➤ *Admin Bot: ${adbot}*`)
             } else if (quotedMsg) {
             var qmid = quotedMsgObj.sender.id
             var block = blockNumber.includes(qmid)
             var bend = banned.includes(author)
             var pic = await yui.getProfilePicFromServer(qmid)
             var namae = quotedMsgObj.sender.name
             var sts = await yui.getStatus(qmid)
             var adm = isGroupAdmins
             var adbot = isAdmin
             var prem = isPrem
             const { status } = sts
              if (pic == undefined) {
              var pfp = errorurl 
              } else {
              var pfp = pic
              } 
              await yui.sendFileFromUrl(from, pfp, 'pfp.jpg', `*User Profile* ✨️ \n\n➤ *Username: ${namae}*\n\n➤ *User Info: ${status}*\n\n*➤ Block : ${block}*\n\n*➤ Banned : ${bend}*\n\n*➤ Premium : ${prem}*\n\n➤ *Admin Group: ${adm}*\n\n➤ *Admin Bot: ${adbot}*`)
             }
            }
            break
        // LIST MENU
        case '!yui':
            await yui.sendImage(from, './media/img/yui.png')
            yui.sendPtt(from, './media/audio/yui.mp3')
            break
        case '!menu':
        case '!help':
            yui.sendText(from, help(pushname, roleid))
            break
        case '!command':
        case '!comand':
            yui.sendText(from, commandd)
            break
        case '!roleplay':
            yui.sendText(from, roleplay)
            break
        case '!premium':
            if(!isPrem) return yui.sendText(from, nopremu)
            yui.sendText(from, premu)
            break
        case '!premiumenu':
        case '!premiummenu':
            yui.sendText(from, premcmd)
            break
        case '!yuigroup':
            yui.reply(from, `*--->Official Group<---*\n*Forum:* https://chat.whatsapp.com/GUD7EWXl7FRAusftuwjzRM\n\n*Anime:* https://chat.whatsapp.com/LWNlGJlwQPZIkY0kwV9oK9\nOwner nya baik ko, tenang join aja`, id)
            break
        case '!groupmenu':
            yui.sendText(from, groupcmd)
            break
        case '!mediamenu':
            yui.sendText(from, mediacmd)
            break
        case '!animemenu':
            yui.sendText(from, animecmd)
            break
        case '!kerangmenu':
            yui.sendText(from, kerangcmd)
            break
        case '!downloadmenu':
            yui.sendText(from, downloadcmd)
            break
        case '!othermenu':
            yui.sendText(from, othercmd)
            break
        /*case '!iklan':
            yui.sendText(from, sewa)
            break*/
        case '!adminmenu':
            if (!isAdmin) return yui.reply(from, 'Perintah ini hanya untuk Admin Bot', id)
            yui.sendText(from, admincmd)
            break
        case '!ownermenu':
            if (!isOwner) return
            yui.sendText(from, ownercmd)
            break
        case '!praymenu':
            yui.reply(from, praycmd, id)
            break
        case '!nsfwmenu':
            if (!isGroupMsg) return yui.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            if (!isNsfw) return yui.reply(from, 'command/Perintah NSFW belum di aktifkan di group ini!', id)
            yui.sendText(from, nsfwcmd)
            break
        // INFORMATION
        case '!donate':
            yui.sendText(from, sumbang)
            break
        case '!readme':
            yui.reply(from, readme, id)
            break
        case '!info':
            yui.sendText(from, info)
            break
        case '!bahasa':
            yui.sendText(from, bahasalist)
            break
// By Gimenz
        case '!wa.me':
        case '!wame':
            await yui.reply(from, `*Nih ${pushname}*\n\n*wa.me/${sender.id.replace(/[@c.us]/g, '')}*\n\n*Atau*\n\n*api.whatsapp.com/send?phone=${sender.id.replace(/[@c.us]/g, '')}*`)
            break
// By Gimenz
        case '!snk':
            yui.reply(from, snk, id)
            break
        case '!msg':
            console.log(message)
            break
        default:
            if (!isGroupMsg) return yui.reply(from, 'Jika Ingin Menggunakan Bot Harap Masuk Ke Dalam Grup Yui, Link Ada Di Bio atau Bisa Mengetik !Yuigroup!\nAtau Invite Yui Di Group Kamu\nDengan Cara *!join*', id)
            if (command.startsWith('!')) {
                yui.reply(from, `Maaf ${pushname}, Command *${args[0]}* Tidak Terdaftar Di Dalam *!help*!`, id)
            }
            await yui.sendSeen(from) 
            }
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
        //yui.kill().then(a => console.log(a))
    }
}

