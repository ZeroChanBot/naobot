exports.help = (pushname, roleid, levelny, prefix, countdownS5_day, countdownS5_hours, countdownS5_minutes, countdownS5_seconds) => {
    return `
๐ท๐๐๐ ๐๐๐ข๐ ๐ฑ๐๐ 

โญโโ ใ แดsแดส ใ
 |
 |โฅ ๐ Nama: ${pushname}
 |โฅ ๐ Tag: ${roleid}
 |โฅ ๐ Level: ${levelny}
 |
โฐโโโโโโโโโโโโโ
    
โญโโ ใ แดแดแดแดแดษดแด ใ
 |   Untuk Menampilkan Commmand List
 |  โฅ${prefix}command
 |
 |   Nametag
 |  โฅ${prefix}nametag
 |
 |   Panggil Nao
 |  โฅ${prefix}nao
 |
โฐโโโโโโโโโโโโโ
`
}
exports.shopmenu = (xpnya, money, prefix) => {
    return `
Selamat datang di Nomart
*Selamat berbelanja*
โโโโโโโโโโโโโโโโโ
Xp: ${xpnya}
โโโโโโโโโโโโโโโโโ
LIMIT:
1. 5 limit = 50k XP
2. 10 limit = 100k XP
3. 15 limit = 150k XP
4. 20 limit = 200k XP
5. 25 limit = 250k XP
6. 30 limit = 300k XP
7. 35 limit = 350k XP
8. 40 limit = 400k XP
9. 45 limit = 450k XP
10. 50 limit = 500k XP
โโโโโโโโโโโโโโโโโ
BuyAll: ${prefix}buyall

Untuk membeli limit, Ketik
*_${prefix}buy <nomer urut>_*

Contoh: *_${prefix}buy 2_*

โโโโโโโโโโโโโโโโโ
Money: $${money}
โโโโโโโโโโโโโโโโโ
ITEM:
1. XP X2 1 Hari = $70k
2. XP X3 1 Hari = $95k
3. XP X4 1 Hari = $120k
4. XP X5 1 Hari = $145K
โโโโโโโโโโโโโโโโโ
NOTE: JIKA MEMBELI DOUBLE, YANG LAMA TIDAK HANGUS, Waktu mengikuti item XP yang pertama

Buyall : *_${prefix}buyallxp_*
Untuk membeli, ketik
*_${prefix}buyxp <nomer urut>_*

Contoh: *_${prefix}buyxp 3_*
`
}
exports.premu = (prefix) => {
    return `
โญโโ ใ ๐ฟ๐๐๐๐๐๐ ใ
 |
 | ๐ ๐๐๐๐๐๐: ๐๐ณ๐ฆ๐ฎ๐ช๐ถ๐ฎ ๐๐ด๐ฆ๐ณ
 | โ๏ธ ๐ด๐ก๐๐๐๐๐: PERMANEN
 |
โฐโโโโโโโโโโโโโ
๐๐ฆ๐ณ๐ช๐ฎ๐ข๐ฌ๐ข๐ด๐ช๐ฉ ๐ด๐ถ๐ฅ๐ข๐ฉ ๐ฎ๐ฆ๐ฏ๐ซ๐ข๐ฅ๐ช ๐๐ฌ๐ฆ๐ณ ๐๐ซ๐๐ฆ๐ข๐ฎ๐ฆ
๐๐ฏ๐ต๐ถ๐ฌ ๐ฎ๐ฆ๐ญ๐ช๐ฉ๐ข๐ต ๐ค๐ฎ๐ฅ ~${prefix}๐ฑ๐ณ๐ฆ๐ฎ๐ช๐ถ๐ฎ๐ฎ๐ฆ๐ฏ๐ถ~
`
}
exports.nopremu = (prefix) => {
    return `
โญโโ ใ Free ใ
 |
 | ๐ฐ Status: Free User
 |
 | Untuk menjadi user Premium
 |   - Tidak ada premium
โฐโโโโโโโโโโโโโ

Jika ingin membantu Owner sewa server, Silahkan
Gopay/OVO/Dana: _081358181668_

*Terimakasih*
`
}
exports.commandd = (prefix, nama, level, xp, rank, sender, speed, ram, hitstoday, hitstotal) => {
    return `
๐ท๐๐๐ ๐๐๐ข๐ Nao ๐ฑ๐๐ 

โญโโโโโโโโโโโโโโโโโโโโโโ
โโโฝ Username   : ${nama}
โโโฝ Rank           : ${rank}
โฐโโโโโโโโโโโโโโโโโโโโโโ

 Hits Today : _${hitstoday}_
 Hits Total : _${hitstotal}_

โญโโโโโโโโโโโโโโโโโโโโโโ
โโฝ _${prefix}creatormenu_
โโฝ _${prefix}adminmenu_
โโฝ _${prefix}groupmenu_
โโฝ _${prefix}praymenu_
โโฝ _${prefix}animemenu_
โโฝ _${prefix}mediamenu_
โโฝ _${prefix}nsfwmenu_
โโฝ _${prefix}levelmenu_
โฐโโโโโโโโโโโโโโโโโโโโโโอออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออออ 
โญโโโโโโโโโโโโโโโโโโโโโโ
โโฝ _${prefix}bugreport [teks]_
โโฝ _${prefix}listgroup_
โโฝ _${prefix}limit_
โโฝ _${prefix}donate_
โโฝ _${prefix}ping_
โโฝ _${prefix}naogroup_
โโฝ _${prefix}pruser_
โโฝ _${prefix}owner_
โฐโโโโโโโโโโโโโโโโโโโโโโ`
}
exports.creatormenu = (prefix) => {
    return `
โโโโโใ CREATOR MENU ใโโโโโ
โโญโโโโโโโโโโโโโโโโโโโโโโโ
โโโโฝ ${prefix}stiker
โโโโฝ ${prefix}stikergif
โโโโฝ ${prefix}slight
โโโโฝ ${prefix}sfire
โโโโฝ ${prefix}toimg
โโโโฝ ${prefix}ttp <kata2>
โโโโฝ ${prefix}ttg <kata2>
โโโโฝ ${prefix}tts <bahasa> <kata2>
โโโโฝ ${prefix}sand <kata2>
โโโโฝ ${prefix}tahta <nama>
โโโโฝ ${prefix}textmaker <Nama1|Nama2>
โโโโฝ ${prefix}quotemaker <teks|watermark|theme>
โโโโฝ ${prefix}nulis <kata2>
โโโโฝ ${prefix}qrcode <optional>
โโโโฝ ${prefix}shorturl <link>
โโฐโโโโโโโโโโโโโโโโโโโโโโโ
โโโโโโโโโโโโโโโโโโโโโโโโโ`
}
exports.admingroupmenu = (prefix) => {
    return `
โโโโโใ ADMIN MENU ใโโโโโ
โโญโโโโโโโโโโโโโโโโโโโโโโโ
โโโโฝ ${prefix}antibadword <enable/disable>
โโโโฝ ${prefix}antilink <enable/disable>
โโโโฝ ${prefix}welcome <enable/disable>
โโโโฝ ${prefix}leave <enable/disable>
โโโโฝ ${prefix}nsfw <enable/disable>
โโโโฝ ${prefix}group <open/close>
โโโโฝ ${prefix}setrules <optional>
โโโโฝ ${prefix}setprefix <optional>
โโโโฝ ${prefix}resetsider
โโโโฝ ${prefix}sider
โโโโฝ ${prefix}add 628xxxxx
โโโโฝ ${prefix}kick @tagmember
โโโโฝ ${prefix}promote @tagmember
โโโโฝ ${prefix}demote @tagmember
โโโโฝ ${prefix}setgroupname <nama>
โโโโฝ ${prefix}setgroupicon
โโโโฝ ${prefix}tagall
โโโโฝ ${prefix}linkgroup
โโโโฝ ${prefix}resetlinkgroup
โโโโฝ ${prefix}out
โโโโฝ ${prefix}delete
โโฐโโโโโโโโโโโโโโโโโโโโโโโ
โโโโโโโโโโโโโโโโโโโโโโโโโ`
}
exports.premcmd = (prefix) => {
    return `
โโโโโใ PREMIUM MENU ใโโโโโ
โโญโโโโโโโโโโโโโโโโโโโโโโโ
โโโโฝ ${prefix}premium
โโฐโโโโโโโโโโโโโโโโโโโโโโโ
โโโโโโโโโโโโโโโโโโโโโโโโโ
`
}
exports.ownercmd = (prefix) => {
    return `
โญโโ ใ OWNER ใ
 |
 |โฅ *${prefix}block 62858xxxxx*
 |โฅ *${prefix}unblock 62858xxxxx*
 |โฅ *${prefix}addadmin @tagmember*
 |โฅ *${prefix}deladmin @tagmember*
 |โฅ *${prefix}restart*
 |โฅ *${prefix}ekickall*
 |โฅ *${prefix}banchat*
 |โฅ *${prefix}unbanchat*
 |โฅ *${prefix}eval [kode JavaScript]*
 |
โฐโโโโโโโโโโโโโ`
}
exports.admincmd = (prefix) => {
    return `
โญโโ ใ ADMIN ใ
 |
 |โฅ *${prefix}ban @tagmember*
 |โฅ *${prefix}unban @tagmember*
 |โฅ *${prefix}set_user unlisted @tagmember*
 |โฅ *${prefix}block @tagmember*
 |โฅ *${prefix}unblock @tagmember*
 |โฅ *${prefix}oout*
 |โฅ *${prefix}opromote*
 |โฅ *${prefix}odemote*
 |โฅ *${prefix}odelete*
 |โฅ *${prefix}oadd 62813xxxxx*
 |โฅ *${prefix}otagall*
 |
โฐโโโโโโโโโโโโโ`
}
exports.nsfwcmd = (prefix) => {
    return `
โโโโโใ NSFW MENU ใโโโโโ
โโญโโโโโโโโโโโโโโโโโโโโโโโ
โโโโฝ ${prefix}bkp
โโโโฝ ${prefix}blowjob
โโโโฝ ${prefix}cersex
โโโโฝ ${prefix}lewd
โโโโฝ ${prefix}fetish
โโโโฝ ${prefix}nekopoi
โโโโฝ ${prefix}randomtrapnime
โโโโฝ ${prefix}randomhentai
โโโโฝ ${prefix}randomnsfwneko
โโโโฝ ${prefix}xsearch <judul>
โโโโฝ ${prefix}xdown <link>
โโโโฝ ${prefix}nhcari <judul>
โโโโฝ ${prefix}nhder <kode>
โโโโฝ ${prefix}nhentai <kode>
โโฐโโโโโโโโโโโโโโโโโโโโโโโ
โโโโโโโโโโโโโโโโโโโโโโโโโ`
}
exports.praycmd = (prefix) => {
    return `
โโโโโใ PRAY MENU ใโโโโโ
โโญโโโโโโโโโโโโโโโโโโโโโโโ
โโโโฝ ${prefix}quran <urutan surah>
โโโโฝ ${prefix}infosurah <nama surah>
โโโโฝ ${prefix}tafsir <nama surah> <ayat>
โโโโฝ ${prefix}jadwalsholat <daerah>
โโโโฝ ${prefix}listsurah
โโโโฝ ${prefix}listdaerah
โโฐโโโโโโโโโโโโโโโโโโโโโโโ
โโโโโโโโโโโโโโโโโโโโโโโโโ`
}
exports.mediacmd = (prefix) => {
    return `
โโโโโใ MEDIA MENU ใโโโโโ
โโญโโโโโโโโโโโโโโโโโโโโโโโ
โโโโฝ ${prefix}images <optional>
โโโโฝ ${prefix}sr <optional>
โโโโฝ ${prefix}wallpaper <optional>
โโโโฝ ${prefix}ss <link>
โโโโฝ ${prefix}ytcari <judul>
โโโโฝ ${prefix}ytmp4 <link>
โโโโฝ ${prefix}ytmp3 <link>
โโโโฝ ${prefix}play <judul>
โโโโฝ ${prefix}joox <judul>
โโโโฝ ${prefix}tiktok <link>
โโโโฝ ${prefix}smule <link>
โโโโฝ ${prefix}starmaker <link>
โโโโฝ ${prefix}fb <link>
โโโโฝ ${prefix}twitter <link>
โโโโฝ ${prefix}ig <link>
โโโโฝ ${prefix}igstory <username>
โโโโฝ ${prefix}googleimage <nama>
โโโโฝ ${prefix}film <judul>
โโโโฝ ${prefix}inu
โโโโฝ ${prefix}meme
โโโโฝ ${prefix}ptl
โโโโฝ ${prefix}neko
โโโโฝ ${prefix}pokemon
โโฐโโโโโโโโโโโโโโโโโโโโโโโ
โโโโโโโโโโโโโโโโโโโโโโโโโ`
}
exports.animecmd = (prefix) => {
    return `
โโโโโใ ANIME MENU ใโโโโโ
โโญโโโโโโโโโโโโโโโโโโโโโโโ
โโโโฝ ${prefix}loli
โโโโฝ ${prefix}shota
โโโโฝ ${prefix}waifu
โโโโฝ ${prefix}husbu
โโโโฝ ${prefix}randomnekonime
โโโโฝ ${prefix}quotesnime
โโโโฝ ${prefix}quoteanime
โโโโฝ ${prefix}ongoing
โโโโฝ ${prefix}sauce
โโโโฝ ${prefix}anime <judul>
โโโโฝ ${prefix}character <nama>
โโโโฝ ${prefix}osu <nickname>
โโโโฝ ${prefix}otaku <judul>
โโโโฝ ${prefix}otakulatest
โโฐโโโโโโโโโโโโโโโโโโโโโโโ
โโโโโโโโโโโโโโโโโโโโโโโโโ
`
}
exports.groupcmd = (prefix) => {
    return `
โโโโโใ GROUP MENU ใโโโโโ
โโญโโโโโโโโโโโโโโโโโโโโโโโ
โโโโฝ ${prefix}groupinfo
โโโโฝ ${prefix}quote
โโโโฝ ${prefix}quotes2
โโโโฝ ${prefix}koin
โโโโฝ ${prefix}dadu
โโโโฝ ${prefix}kapankah
โโโโฝ ${prefix}apakah
โโโโฝ ${prefix}bisakah
โโโโฝ ${prefix}nilai
โโโโฝ ${prefix}getpic @tagmember
โโโโฝ ${prefix}hug @tagmember
โโโโฝ ${prefix}cry @tagmember
โโโโฝ ${prefix}kiss @tagmember
โโโโฝ ${prefix}ramalpasangan <Nama1|Nama2>
โโโโฝ ${prefix}artimenu <nama>
โโโโฝ ${prefix}zodiak <zodiak>
โโโโฝ ${prefix}nomorhoki <nomor>
โโโโฝ ${prefix}artimimpi <mimpi>
โโโโฝ ${prefix}wiki <kata2>
โโโโฝ ${prefix}kbbi <kata2>
โโโโฝ ${prefix}igstalk <username>
โโโโฝ ${prefix}tiktokstalk <username>
โโโโฝ ${prefix}smulestalk <username>
โโโโฝ ${prefix}simi <enable/disable>
โโโโฝ ${prefix}checkip <ip>
โโโโฝ ${prefix}brainly <pertanyaan>
โโโโฝ ${prefix}math <angka>
โโโโฝ ${prefix}lirik <lagu>
โโโโฝ ${prefix}chord <lagu>
โโโโฝ ${prefix}playstore <nama>
โโโโฝ ${prefix}moddroid <judul>
โโโโฝ ${prefix}happymod <judul>
โโโโฝ ${prefix}heroml <hero>
โโโโฝ ${prefix}listdaerah
โโโโฝ ${prefix}listchannel
โโโโฝ ${prefix}family100
โโโโฝ ${prefix}caklontong
โโโโฝ ${prefix}tebakgambar
โโโโฝ ${prefix}infogempa
โโโโฝ ${prefix}covid <negara>
โโโโฝ ${prefix}google
โโโโฝ ${prefix}translate <bahasa> <kata2>
โโโโฝ ${prefix}spamcall 8xxxxx
โโโโฝ ${prefix}resep <masakan>
โโโโฝ ${prefix}shopee <nama>
โโฐโโโโโโโโโโโโโโโโโโโโโโโ
โโโโโโโโโโโโโโโโโโโโโโโโโ`
}
exports.levelmenu = (prefix, nama, level, xp, rank) => {
    return `
โโโโโใ LEVEL MENU ใโโโโโ
โโญโโโโโโโโโโโโโโโโโโโโโโโ
โโโโฝ Username   : ${nama}
โโโโฝ Level           : ${level}
โโโโฝ Xp               : ${xp}
โโโโฝ Rank           : ${rank}
โโฐโโโโโโโโโโโโโโโโโโโโโโโ
โโญโโโโโโโโโโโโโโโโโโโโโโโ
โโโโฝ ${prefix}level
โโโโฝ ${prefix}tourl <image>
โโโโฝ ${prefix}setbg <link>
โโโโฝ ${prefix}leaderboard
โโโโฝ ${prefix}allvl
โโโโฝ ${prefix}hoki
โโโโฝ ${prefix}mg
โโโโฝ ${prefix}job
โโโโฝ ${prefix}work
โโโโฝ ${prefix}shop
โโโโฝ ${prefix}limit
โโโโฝ ${prefix}inv
โโฐโโโโโโโโโโโโโโโโโโโโโโโ
โโโโโโโโโโโโโโโโโโโโโโโโโ`
}
exports.setuser = (prefix) => {
    return `ใ SET PROFILE COMMAND ใ
โฅ *${prefix}set_user nama [nama kalian]*
โฅ *${prefix}set_user hidepp [enable|disable]*
โฅ *${prefix}set_user gender [Kelamin]*
โฅ *${prefix}set_user ig [ig kalian]*
โฅ *${prefix}set_user fb [fb kalian] (coming soon)*
โฅ *${prefix}set_user tiktok [tiktok kalian] (coming soon)*
โฅ *${prefix}set_user notice [terserah isi apa]*

Perubahan akan terlihat di ${prefix}profile

_Note_
Gender tuh jenis kelamin ๐
Kalo ngisi gender yang bener, Biar gak dikira Trap ๐
    `
}
exports.readme = (prefix) => {
    return `
            *ใ STALK ใ*

*[@username]* Diisi dengan Username yang valid tanpa tanda โ[โ dan โ]โ
Contoh : *${prefix}tiktokstalk @dwirizqi.h*

*[@username]* Diisi dengan Username yang valid tanpa tanda โ[โ dan โ]โ
Contoh : *${prefix}igstalk @dwirizqi.h*

*[@username]* Diisi dengan Username yang valid tanpa tanda โ[โ dan โ]โ
Contoh : *${prefix}smulestalk @dwirizqi.h*

            *ใ DOWNLOADER ใ*

*[linkStarmaker]* Diisi dengan link Starmaker yang valid tanpa tanda โ[โ dan โ]โ
Contoh : *${prefix}starmaker https://m.starmakerstudios.com/d/playrecording?app=sm&from_user_id=3096224747920316&is_convert=true&recordingId=10696049124506354&share_type=copyLink*

*[linkTwitter]* Diisi dengan link YouTube yang valid tanpa tanda โ[โ dan โ]โ
Contoh : *${prefix}twitter https://twitter.com/PassengersMovie/status/821025484150423557*

*[linkXnxx]* Diisi dengan link Xnxx yang valid tanpa tanda โ[โ dan โ]โ
Contoh : *${prefix}xdown https://www.xtube.com/video-watch/can-we-vote-to-make-fingering-one-s-ass-an-olympic-event-45496231*

*[linkNekopoi]* Diisi dengan link Nekopoi yang valid tanpa tanda โ[โ dan โ]โ
Contoh : *${prefix}nekopoi https://nekopoi.care/tsunpuri-episode-1-subtitle-indonesia/*

*[linkYt]* Diisi dengan link YouTube yang valid tanpa tanda โ[โ dan โ]โ
Contoh : *${prefix}ytmp3 https://youtu.be/Bskehapzke8*

*[linkYt]* Diisi dengan link YouTube yang valid tanpa tanda โ[โ dan โ]โ
Contoh : *${prefix}ytmp4 https://youtu.be/Bskehapzke8*

*[linkTiktok]* Diisi dengan link Tiktok yang valid tanpa tanda โ[โ dan โ]โ
Contoh : *${prefix}tiktok https://vt.tiktok.com/yqyjPX/*

*[linkSmule]* Diisi dengan link Smule yang valid tanpa tanda โ[โ dan โ]โ
Contoh : *${prefix}smule https://www.smule.com/p/767512225_3062360163*

*[linkIg]* Diisi dengan link Instagram yang valid tanpa tanda โ[โ dan โ]โ
Contoh : *${prefix}ig https://www.instagram.com/p/CFqRZTlluAi/?igshid=1gtxkbdqhnbbe*

*[linkFb]* Diisi dengan link Facebook yang valid tanpa tanda โ[โ dan โ]โ
Contoh : *${prefix}fb https://www.facebook.com/EpochTimesTrending/videos/310155606660409*

*[linkTiktok]* Diisi dengan link facebookt Tiktok yang valid tanpa tanda โ[โ dan โ]โ
Contoh : *${prefix}tiktok https://vt.tiktok.com/yqyjPX/*

            *ใ OTHER ใ*

*[daerah]* Diisi dengan daerah yang valid, tanpa tanda โ[โ dan โ]โ
Contoh : *${prefix}jadwalShalat Jombang*

*[channel]* Diisi dengan channel televisi yang valid, tanpa tanda โ[โ dan โ]โ
Contoh : *${prefix}jadwalTv Indosiar*

*[query]* Diisi dengan query/pencarian yang valid, tanpa tanda โ[โ dan โ]โ
Contoh : *${prefix}googlesearch system cardinal*

*[kode bhs]* Diisi dengan kode bahasa, contoh *id*, *en*, dll. Dan *[teks]* Diisi dengan teks yang ingin di jadikan voice, Masih sama seperti di atas tanpa tanda โ[โ dan โ]โ
Contoh : *${prefix}tts id Test*
Note : Max 250 huruf

*[ |teks |author |theme]* Diisi dengan teks, author, dan theme, tanpa tanda โ[โ dan โ]โ
Contoh : *${prefix}quotemaker  |Odading |Mang Oleh |Shark*

*[optional]* Diisi dengan teks |title lirik lagu, tanpa tanda โ[โ dan โ]โ.
Contoh : *${prefix}lirik aku bukan boneka*

*[ipaddress]* Diisi dengan Ip Address yang valid, tanpa tanda โ[โ dan โ]โ.
Contoh : *${prefix}checkip 182.0.144.145*`
}
exports.info = (ram, speed) => {
    return `
โโโโโใ BOT INFO ใโโโโโ
โโญโโโโโโโโโโโโโโโโโโโโโโโ
โโโโฝ BOT          : Nao Tomori
โโโโฝ CPU          : 2 CORE
โโโโฝ RAM          : ${ram}
โโโโฝ SPEED        : ${speed}
โโโโฝ Creator      : TOBZ
โโโโฝ Owner/Recode : Dwi Rizqi
โโฐโโโโโโโโโโโโโโโโโโโโโโโ
โโโโโโโโโโโโโโโโโโโโโโโโโโ
`
}
function snk() {
    return `Syarat dan Ketentuan Bot

1. *Dilarang menelpon bot*
2. *Dilarang spam command bot*
    
*_TTD_*
Dwi Rizqi`

}
exports.snk = snk()
function sumbang() {
    return `
โญโโ ใ DONATE ใ
 |
 |โฅ *DONASI BISA MELALUI :*
 |โฅ *GOPAY/OVO/DANA : 081358181668*
 |โฅ *PULSA : 081358181668*
 |โฅ *SAWERIA : saweria.co/Lyfla*
 |โฅ *TERIMA KASIH BANYAK YANG SUDAH MAU DONASI*
 |
โฐโโโโโโโโโโโโโ
`
}
exports.sumbang = sumbang()
function listChannel() {
    return `Daftar channel: 
1. ANTV
2. GTV
3. Indosiar
4. iNewsTV
5. KompasTV
6. MNCTV
7. METROTV
8. NETTV
9. RCTI
10. SCTV
11. RTV
12. Trans7
13. TransTV`
}
exports.listChannel = listChannel()
function bahasalist() {
    return `*List kode Bahasa*\n
  *Code       Bahasa*
    sq        Albanian
    ar        Arabic
    hy        Armenian
    ca        Catalan
    zh        Chinese
    zh-cn     Chinese (China)
    zh-tw     Chinese (Taiwan)
    zh-yue    Chinese (Cantonese)
    hr        Croatian
    cs        Czech
    da        Danish
    nl        Dutch
    en        English
    en-au     English (Australia)
    en-uk     English (United Kingdom)
    en-us     English (United States)
    eo        Esperanto
    fi        Finnish
    fr        French
    de        German
    el        Greek
    ht        Haitian Creole
    hi        Hindi
    hu        Hungarian
    is        Icelandic
    id        Indonesian
    it        Italian
    ja        Japanese
    ko        Korean
    la        Latin
    lv        Latvian
    mk        Macedonian
    no        Norwegian
    pl        Polish
    pt        Portuguese
    pt-br     Portuguese (Brazil)
    ro        Romanian
    ru        Russian
    sr        Serbian
    sk        Slovak
    es        Spanish
    es-es     Spanish (Spain)
    es-us     Spanish (United States)
    sw        Swahili
    sv        Swedish
    ta        Tamil
    th        Thai
    tr        Turkish
    vi        Vietnamese
    cy        Welsh
      `
}
exports.bahasalist = bahasalist()
