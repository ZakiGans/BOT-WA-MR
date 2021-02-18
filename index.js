const {
    WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   GroupSettingChange,
   waChatKey,
   mentionedJid,
   processTime,
} = require('@adiwajshing/baileys');
const qrcode = require("qrcode-terminal") 
const moment = require("moment-timezone") 
const fs = require("fs") 
const crypto = require('crypto')
const imageToBase64 = require('image-to-base64')
const axios = require('axios')
const { color, bgcolor } = require('./lib/color')
const { donasi } = require('./lib/donasi')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const { exec } = require("child_process")
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const tiktod = require('tiktok-scraper')
const brainly = require('brainly-scraper')
const ffmpeg = require('fluent-ffmpeg')
const path = require('path')
const cd = 4.32e+7
const { ind } = require('./language')

/********** MENU SETTING **********/
const vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + 'FN: 𝐎𝐖𝐍𝐄𝐑 𝐁𝐎𝐓\n' 
            + 'ORG: 𝐎𝐖𝐍𝐄𝐑 𝐁𝐎𝐓;\n' 
            + 'TEL;type=CELL;type=VOICE;waid=6283144780782:+6283144780782\n' 
            + 'END:VCARD' 
blocked = []   
prefix = '#'
limitawal = 100
memberlimit = 5
cr = '𝐌𝐑 𝐊𝐈𝐍𝐆 𝐁𝐎𝐓'
/*************************************/
mess = {
				wait: '「 𝐖𝐀𝐈𝐓 」𝐒𝐞𝐝𝐚𝐧𝐠 𝐃𝐚𝐥𝐚𝐦 𝐩𝐫𝐨𝐬𝐞𝐬'
}
/******** OWNER NUMBER**********/
const ownerNumber = ["6283144780782@s.whatsapp.net"] 
/************************************/

       
/*********** LOAD FILE ***********/
const _leveling = JSON.parse(fs.readFileSync('./database/group/leveling.json'))
const _level = JSON.parse(fs.readFileSync('./database/user/level.json'))
const _registered = JSON.parse(fs.readFileSync('./database/bot/registered.json'))
const welkom = JSON.parse(fs.readFileSync('./database/bot/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./database/bot/nsfw.json'))
const antilink = JSON.parse(fs.readFileSync('./src/antilink.json'))
const samih = JSON.parse(fs.readFileSync('./database/bot/simi.json'))
const event = JSON.parse(fs.readFileSync('./database/bot/event.json'))
const _limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
const uang = JSON.parse(fs.readFileSync('./database/user/uang.json'))
/*********** END LOAD ***********/

/********** FUNCTION ***************/
const getLevelingXp = (sender) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].xp
            }
        }

        const getLevelingLevel = (sender) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].level
            }
        }

        const getLevelingId = (sender) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].id
            }
        }

        const addLevelingXp = (sender, amount) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _level[position].xp += amount
                fs.writeFileSync('./database/user/level.json', JSON.stringify(_level))
            }
        }

        const addLevelingLevel = (sender, amount) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _level[position].level += amount
                fs.writeFileSync('./database/user/level.json', JSON.stringify(_level))
            }
        }

        const addLevelingId = (sender) => {
            const obj = {id: sender, xp: 1, level: 1}
            _level.push(obj)
            fs.writeFileSync('./database/user/level.json', JSON.stringify(_level))
        }
             
         const getRegisteredRandomId = () => {
            return _registered[Math.floor(Math.random() * _registered.length)].id
        }

        const addRegisteredUser = (userid, sender, age, time, serials) => {
            const obj = { id: userid, name: sender, age: age, time: time, serial: serials }
            _registered.push(obj)
            fs.writeFileSync('./database/bot/registered.json', JSON.stringify(_registered))
        }

        const createSerial = (size) => {
            return crypto.randomBytes(size).toString('hex').slice(0, size)
        }

        const checkRegisteredUser = (sender) => {
            let status = false
            Object.keys(_registered).forEach((i) => {
                if (_registered[i].id === sender) {
                    status = true
                }
            })
            return status
        }
        
        const addATM = (sender) => {
        	const obj = {id: sender, uang : 0}
            uang.push(obj)
            fs.writeFileSync('./database/user/uang.json', JSON.stringify(uang))
        }
        
        const addKoinUser = (sender, amount) => {
            let position = false
            Object.keys(uang).forEach((i) => {
                if (uang[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                uang[position].uang += amount
                fs.writeFileSync('./database/user/uang.json', JSON.stringify(uang))
            }
        }
        
        const checkATMuser = (sender) => {
        	let position = false
            Object.keys(uang).forEach((i) => {
                if (uang[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                return uang[position].uang
            }
        }
        
        const bayarLimit = (sender, amount) => {
        	let position = false
            Object.keys(_limit).forEach((i) => {
                if (_limit[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                _limit[position].limit -= amount
                fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
            }
        }
        	
        const confirmATM = (sender, amount) => {
        	let position = false
            Object.keys(uang).forEach((i) => {
                if (uang[i].id === sender) {
                    position = i
                }
            })
            if (position !== false) {
                uang[position].uang -= amount
                fs.writeFileSync('./database/user/uang.json', JSON.stringify(uang))
            }
        }
        
         const limitAdd = (sender) => {
             let position = false
            Object.keys(_limit).forEach((i) => {
                if (_limit[i].id == sender) {
                    position = i
                }
            })
            if (position !== false) {
                _limit[position].limit += 1
                fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
            }
        }
        
        
         
function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}
/********** FUNCTION ***************/

const client = new WAConnection()
   client.on('qr', qr => {
   qrcode.generate(qr, { small: true })
   console.log(color('[','white'),color('∆','red'),color(']','white'),color('qr already scan.subscribe','white'),color('YOU','red'),color('TUBE','white'),color('ampibi gaming','yellow'))
})

client.on('credentials-updated', () => {
	const authInfo = client.base64EncodedAuthInfo()
   console.log(`credentials updated!`)
   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t'))
})
fs.existsSync('./session.json') && client.loadAuthInfo('./session.json')
client.connect();


client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Hallo @${num.split('@')[0]}\Selamat datang di group *${mdata.subject}* 
❍█╭━━━━━━━━━━━━━
❍█│【♡ۣۜۜ፝͜͜͡͡✿➣ *NAME:*
❍█│【♡ۣۜۜ፝͜͜͡͡✿➣ *GENDER:*
❍█│【♡ۣۜۜ፝͜͜͡͡✿➣ *ASKOT:*
❍█│【♡ۣۜۜ፝͜͜͡͡✿➣ *NAMA IG:*
❍█│【♡ۣۜۜ፝͜͜͡͡✿➣ *NAMA DOI:*
❍█│【♡ۣۜۜ፝͜͜͡͡✿➣ *FAVORIT:*
❍█│【♡ۣۜۜ፝͜͜͡͡✿➣ *HOBBY:*
❍█╰━━━━━━━━━━━━━`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `akhirnya beban group berkurang 𝟭,bye bye🥳 @${num.split('@')[0]} jasamu akan di kubur dalam²`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
	client.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('message-new', async (mek) => {
		try {
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
            global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			const timi = moment.tz('Asia/Jakarta').add(30, 'days').calendar();
			const timu = moment.tz('Asia/Jakarta').add(20, 'days').calendar();
            body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
			const tescuk = ["0@s.whatsapp.net"]
			const isGroup = from.endsWith('@g.us')
			const q = args.join(' ')
			const botNumber = client.user.jid
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			pushname = client.contacts[sender] != undefined ? client.contacts[sender].vname || client.contacts[sender].notify : undefined
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
            const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
            
            /************** SCURITY FEATURE ************/
            const isEventon = isGroup ? event.includes(from) : false
            const isRegistered = checkRegisteredUser(sender)
            const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
            const isLevelingOn = isGroup ? _leveling.includes(from) : false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isImage = type === 'imageMessage'
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
			const sendImage = (teks) => {
		    client.sendMessage(from, teks, image, {quoted:mek})
		    }
		    const costum = (pesan, tipe, target, target2) => {
			client.sendMessage(from, pesan, tipe, {quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` }}})
			}
	        /*****************END SCURITY FEATURE ********/
			
	        //function leveling
            if (isGroup && isRegistered && isLevelingOn) {
            const currentLevel = getLevelingLevel(sender)
            const checkId = getLevelingId(sender)
            try {
                if (currentLevel === undefined && checkId === undefined) addLevelingId(sender)
                const amountXp = Math.floor(Math.random() * 10) + 500
                const requiredXp = 5000 * (Math.pow(2, currentLevel) - 1)
                const getLevel = getLevelingLevel(sender)
                addLevelingXp(sender, amountXp)
                if (requiredXp <= getLevelingXp(sender)) {
                    addLevelingLevel(sender, 1)
                    bayarLimit(sender, 3)
                    await reply(ind.levelup(pushname, sender, getLevelingXp,  getLevel, getLevelingLevel))
                }
            } catch (err) {
                console.error(err)
            }
        }
          //function check limit
          const checkLimit = (sender) => {
          	let found = false
                    for (let lmt of _limit) {
                        if (lmt.id === sender) {
                            let limitCounts = limitawal - lmt.limit
                            if (limitCounts <= 0) return client.sendMessage(from,`Limit request anda sudah habis\n\n_Note : limit bisa di dapatkan dengan cara ${prefix}buylimit dan dengan naik level_`, text,{ quoted: mek})
                            client.sendMessage(from, ind.limitcount(limitCounts), text, { quoted : mek})
                            found = true
                        }
                    }
                    if (found === false) {
                        let obj = { id: sender, limit: 0 }
                        _limit.push(obj)
                        fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
                        client.sendMessage(from, ind.limitcount(limitCounts), text, { quoted : mek})
                    }
				}
				
			//funtion limited
           const isLimit = (sender) =>{ 
		      let position = false
              for (let i of _limit) {
              if (i.id === sender) {
              	let limits = i.limit
              if (limits >= limitawal ) {
              	  position = true
                    client.sendMessage(from, ind.limitend(pushname), text, {quoted: mek})
                    return true
              } else {
              	_limit
                  position = true
                  return false
               }
             }
           }
           if (position === false) {
           	const obj = { id: sender, limit: 0 }
                _limit.push(obj)
                fs.writeFileSync('./database/user/limit.json',JSON.stringify(_limit))
           return false
       }
     }
        
            if (isGroup) {
				try {
					const getmemex = groupMembers.length
					    if (getmemex <= memberlimit) {
                            client.groupLeave(from)
					    }
		       } catch (err) { console.error(err)  }
        }
      
            //function balance
            if (isRegistered ) {
            const checkATM = checkATMuser(sender)
            try {
                if (checkATM === undefined) addATM(sender)
                const uangsaku = Math.floor(Math.random() * 10) + 90
                addKoinUser(sender, uangsaku)
            } catch (err) {
                console.error(err)
            }
        }
           
             //kolor
			colors = ['red','white','black','blue','yellow','green']
			
			//detector media
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			
			//private chat message
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			
			//group message
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			
			switch(command) {
				//itsmei 
				case 'slow':
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.7,asetrate=44100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				break
				case 'gemuk':
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=1.6,asetrate=22100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				break
              case 'tupai':
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.5,asetrate=65100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				break
               case 'instaimg':
				if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isUrl(args[0]) && !args[0].includes('www.instagram.com')) return reply(mess.error.lv)
				    anu = await fetchJson(`https://alfians-api.herokuapp.com/api/ig?url=${args[0]}`, {method: 'get'})
				    insta = getBuffer(anu.result)
				    reply(mess.wait)
				    client.sendMessage(from, insta, image, {quoted: mek})
				    await limitAdd(sender) 
				    break  
				case 'instavid':
				if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isUrl(args[0]) && !args[0].includes('www.instagram.com')) return reply(mess.error.lv)
				    anu = await fetchJson(`https://alfians-api.herokuapp.com/api/ig?url=${args[0]}`, {method: 'get'})
				    insta = getBuffer(anu.result)
				    reply(mess.wait)
				    client.sendMessage(from, insta, video, {mimtype: 'video/mp4', filename: 'instagram'.mp3, quoted: mek})
				    await limitAdd(sender) 
				    break  
				case 'hekerbucin':
				if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
				anu = await fetchJson(`http://itsmeikygans.my.id/bacotanhacker?apikey=${apikey}`, {method: 'get'})
				reply (anu.result)
				await limitAdd(sender) 
				break 
			    case 'katailham':
				if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
				anu = await fetchJson(`http://itsmeikygans.my.id/bacotanilham?apikey=${apikey}`, {method: 'get'})
				kata = anu.result
				client.sendMessage(from, kata, text, {quoted: mek})
				await limitAdd(sender)
				break
       case 'play':
                if (!isGroup) return reply(ind.groupo())
                if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
                data = await fetchJson(`https://api.itsmeikyxsec404.xyz/playmp3?apikey=${apikey}&query=${body.slice(6)}`, {method: 'get'})
               if (data.error) return reply(data.error)
                 infomp3 = `「 *PLAY* 」\n*Judul* : ${data.result.title}\n*Duration* : ${data.result.duration}\n*Filesize* : ${data.result.size}\n\n*Tunggu Kami Sedang mengirim audio nya jangan spam*`
                bufferddd = await getBuffer(data.result.image)
                lagu = await getBuffer(data.result.mp3)
                client.sendMessage(from, bufferddd, image, {quoted: mek, caption: infomp3})
                client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${data.result.title}.mp3`, quoted: mek})
                break             
			    case 'bass':                 
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -af equalizer=f=94:width_type=o:width=2:g=30 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				break
				case 'fakta':
                    if (!isRegistered) return reply(ind.noregis())
				    if (isLimit(sender)) return reply(ind.limitend(pusname))
					gatauda = body.slice(8)
					anu = await fetchJson(`http://api.itsmeikyxsec404.xyz/fakta?apikey=${apikey}`, {method: 'get'})
					reply(anu.result)
					break
					case 'asupan':
					if (!isGroup) return reply(ind.groupo())
                if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
                reply(mess.wait)
                anu = await fetchJson(`http://itsmeikygans.my.id/asupan?apikey=${apikey}`)
                asup = await getBuffer(anu.result)
                client.sendMessage(from, asup, video, {mimetype: 'video/mp4', filename: `asupan_bangsa.mp4`, quoted: mek, caption: 'Asupannya Tuan:v'})
                await limitAdd(sender) 
                break
                case 'masougakuenhxh':
			       case 'valxlove':
                    case 'assalamualaikum':
                    if (isBanned) return reply(mess.only.benned)    
                    if (!isUser) return reply(mess.only.userB)
					client.sendMessage(from, 'waalaikumussalam' , text, { quoted: mek })
					break
                case 'bucin':
                     if (!isRegistered) return reply(ind.noregis())
				     if (isLimit(sender)) return reply(ind.limitend(pusname))
                     reply(ind.wait())
					gatauda = body.slice(7)
					anu = await fetchJson(`https://arugaz.herokuapp.com/api/howbucins`, {method: 'get'})
					reply(anu.desc)
					break
           case 'infocuaca':
	 if (!isRegistered) return reply(ind.noregis())
   if (isLimit(sender)) return reply(ind.limitend(pusname)) 
     if (args.length < 1) return reply(from, 'Kirim perintah *!cuaca [tempat]*\nContoh : *!cuaca Banyuwangi', text)
     reply(mess.wait)
            tempat = `${body.slice(11)}`
            weather = await fetchJson('https://videfikri.com/api/cuaca/?daerah='+ tempat, {method: 'get'})
            if (weather.error) {
             reply(from, weather.error, text)
            } else {
             client.sendMessage(from, `➸ Tempat : ${weather.result.tempat}\n\n➸ Angin : ${weather.result.angin}\n➸ Cuaca : ${weather.result.cuaca}\n➸ Deskripsi : ${weather.result.desc}\n➸ Kelembapan : ${weather.result.kelembapan}\n➸ Suhu : ${weather.result.suhu}\n➸ Udara : ${weather.result.udara}`, text, {quoted: mek})
            }
            await limitAdd(sender)
            break 
             case 'wait':
				if (!isRegistered) return reply(ind.noregis())
				     if (isLimit(sender)) return reply(ind.limitend(pusname))
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							client.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply('Foto aja mas')
					}
					break 
               case 'quran':
			 if (!isRegistered) return reply(ind.noregis())
				     if (isLimit(sender)) return reply(ind.limitend(pusname))
					anu = await fetchJson(`https://api.banghasan.com/quran/format/json/acak`, {method: 'get'})
					quran = `${anu.acak.ar.teks}\n\n${anu.acak.id.teks}\nQ.S ${anu.surat.nama} ayat ${anu.acak.id.ayat}`
					client.sendMessage(from, quran, text, {quoted: mek})
					await limitAdd(sender) 
					break 
                case 'randomquran':
			data = await fetchJson(`https://api.zeks.xyz/api/randomquran`)
			teks = `Nama: ${data.result.nama}\nArti: ${data.result.arti}\nayat: ${data.result.ayat}\nAsma: ${data.result.asma}\nRukuk: ${data.result.rukuk}\nNomor: ${data.result.nomor}\nType: ${data.result.type}\nKeterangan: ${data.result.keterangan}`
			buffs = await getBuffer(data.result.audio)
		    client.sendMessage(from, `${teks}`, MessageType.text, {quoted: mek})
			client.sendMessage(from, buffs, audio, {mimetype: 'audio/mp4', filename: `quran.mp3`, quoted: mek})
			break
				case 'toptt':
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Gagal mengkonversi audio ke ptt')
						topt = fs.readFileSync(ran)
						client.sendMessage(from, topt, audio, {mimetype: 'audio/mp4', quoted: mek, ptt:true})
						})
						break
				case 'qrcode':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
					const tex = encodeURIComponent(body.slice(8))
					if (!tex) return client.sendMessage(from, 'MASUKAN URL/TEKS UNTUK DI JADIKAN QR', text, {quoted: mek})
					const buff = await getBuffer(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${tex}`)
					client.sendMessage(from, buff, image, {quoted: mek})
					await limitAdd(sender)
					break
				//tobz 
				case 'lirik':
				anu = await fetchJson(`https://tobz-api.herokuapp.com/api/lirik?q=akad&apikey=${apikey}`)
				thum = await getBuffer(anu.result.thumb)
				teks = `*「 LAGU DI TEMUKAN 」*\n\n*Judul* : ${anu.result.judul}\n*Album* : ${anu.result.album}\n*public in* : ${anu.result.dipublikasi}\n*Lyrics* : ${anu.result.lirik}`
				client.sendMessage(from, thum, image, { quoted : mek, caption: teks })
				break
				case 'ttp':
				anu = await fetchJson(`https://tobz-api.herokuapp.com/api/ttp?text=${body.slice(5)}&apikey=${apikey}`)
				res = await getBase64(anu.base64)
				client.sendMessage(from, res, sticker, {quoted:mek})
				break
                case 'chord':
                anu = await fetchJson(`https://tobz-api.herokuapp.com/api/chord?q=${body.slice(7)}&apikey=${apikey}`)
                client.sendMessage(from, anu.result, text, {quoted:mek})
                break
				case 'moddroid':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
			data = await fetchJson(`https://tobz-api.herokuapp.com/api/moddroid?q=${body.slice(10)}&apikey=${apikey}`)
			hepi = data.result[0] 
			teks = `*Nama*: ${data.result[0].title}\n*publisher*: ${hepi.publisher}\n*mod info:* ${hepi.mod_info}\n*size*: ${hepi.size}\n*latest version*: ${hepi.latest_version}\n*genre*: ${hepi.genre}\n*link:* ${hepi.link}\n*download*: ${hepi.download}`
			buffer = await getBuffer(hepi.image)
			client.sendMessage(from, buffer, image, {quoted: mek, caption: `${teks}`})
			await limitAdd(sender)
			break
			case 'happymod':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
			data = await fetchJson(`https://tobz-api.herokuapp.com/api/happymod?q=${body.slice(10)}&apikey=${apikey}`)
			hupo = data.result[0] 
			teks = `*Nama*: ${data.result[0].title}\n*version*: ${hupo.version}\n*size:* ${hupo.size}\n*root*: ${hupo.root}\n*purchase*: ${hupo.price}\n*link*: ${hupo.link}\n*download*: ${hupo.download}`
			buffer = await getBuffer(hupo.image)
			client.sendMessage(from, buffer, image, {quoted: mek, caption: `${teks}`})
			await limitAdd(sender)
			break
            case 'bitly':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
               client.updatePresence(from, Presence.composing) 
                data = await fetchJson(`https://tobz-api.herokuapp.com/api/bitly?url=${args[0]}&apikey=${apikey}`)
                hasil = `link : ${args[0]}\n\nOutput : ${data.result}`
                reply(hasil)
                await limitAdd(sender)
                break
                case 'nangis':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://tobz-api.herokuapp.com/api/cry?apikey=${apikey}', {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender)
					break
                case 'blowjob':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isNsfw) return reply(ind.nsfwoff())
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://tobz-api.herokuapp.com/api/nsfwblowjob?apikey=${apikey}', {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender)
					break
					case 'cium':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isNsfw) return reply(ind.nsfwoff())
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://tobz-api.herokuapp.com/api/kiss?apikey=${apikey}', {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender)
					break
					case 'peluk':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isNsfw) return reply(ind.nsfwoff())
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://tobz-api.herokuapp.com/api/hug?apikey=${apikey}', {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender)
					break
				case 'husbu':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				    try {
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/husbu?apikey=${apikey}`)
						buffer = await getBuffer(res.image)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Ingat! Cintai husbumu'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('❌ *ERROR* ❌')
					}
					await limitAdd(sender)
					break
                case 'ranime':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (!isNsfw) return reply(ind.nsfwoff())
					gatauda = body.slice(8)
					reply(ind.wait())
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomanime?apikey=${apikey}`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
					await limitAdd(sender)
					break
               case 'caklontong':
            if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
					anu = await fetchJson(`https://api.vhtear.com/funkuis&apikey=${apikey}`, {method: 'get'})
					caklontong = `*${anu.result.soal}*`
					setTimeout( () => {
					client.sendMessage(from, '*➸ Jawaban :* '+anu.result.jawaban+ '\n\n• Penjelasan: *'+ anu.result.desk+'*', text, {quoted: mek}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, caklontong, text, {quoted: mek}) // ur cods
					}, 0) // 1000 = 1s,
					await limitAdd(sender) 
					break 
				case 'tebakgambar':
                if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
					anu = await fetchJson(`https://videfikri.com/api/tebakgambar`, {method: 'get'})
					bufferkkk = await getBuffer(anu.result.soal_gbr)
					setTimeout( () => {
					client.sendMessage(from, '*➸ Jawaban :* '+anu.result.jawaban, text, {quoted: mek}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, bufferkkk, image, { caption: '_Jelaskan Apa Maksud Gambar Ini_', quoted: mek }) // ur cods
					}, 0) // 1000 = 1s,
					await limitAdd(sender) 
					break  
				case 'family100':
           if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
					anu = await fetchJson(`https://api.vhtear.com/family100&apikey=${apikey}`, {method: 'get'})
					family = `*${anu.result.soal}*`
					setTimeout( () => {
					client.sendMessage(from, '*➸ Jawaban :* '+anu.result.jawaban, text, {quoted: mek}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, family, text, {quoted: mek }) // ur cods
					}, 0) // 1000 = 1s,
					await limitAdd(sender) 
					break 
					case 'indohot':
                if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
                if (!isPublik) return reply(mess.only.publikG)
                   anu = await fetchJson(`https://arugaz.herokuapp.com/api/indohot`, {method: 'get'})
                   if (anu.error) return reply(anu.error)
                   hasil = `*judul* \n${anu.result.judul} *genre* \n${anu.result.genre} *durasi* \n${anu.result.durasi} *url* \n${anu.result.url}`
                   client.sendMessage(from, hasil, text, {quoted: mek,})
                   break
				case 'randombokep':
				client.updatePresence(from, Presence.composing) 
				 if (!isRegistered) return reply(ind.noregis())
				if (!isGroup) return reply(ind.groupo())
				if (!isNsfw) return reply(ind.nsfwoff())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				 data = fs.readFileSync('./Fxc7/18.js');
                 jsonData = JSON.parse(data);
                 randIndex = jsonData[Math.floor(Math.random() * (jsonData.length))];
                 randKey = jsonData[randIndex];
                 randBokep = await getBuffer(randKey.image)
                 reply(mess.wait)
                 randTeks = await fetchJson(randKey.teks)
                 client.sendMessage(from, image, randBokep, {quoted: mek, caption: randTeks})
				await limitAdd(sender) 
				break   
				case 'slide':
				if (!isRegistered) return reply(ind.noregis())
			if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (args.length < 1) return reply('*Textnya mana gan?*')
					teks = `${body.slice(7)}`
					atytyd = await getBuffer(`https://api.vhtear.com/slidingtext?text=${teks}&apikey=${apikey}`, {method: 'get'})
					reply(mess.wait)
					client.sendMessage(from, atytyd, video, {quoted: mek})
					await limitAdd(sender) 
					break  
				case 'paper':
				if (!isRegistered) return reply(ind.noregis())
			if (isLimit(sender)) return reply(ind.limitend(pusname))
				cpaper = `${body.slice(8)}`
				reply(mess.wait)
				buffer = await getBuffer(`https://api.arugaz.my.id/api/photooxy/text-on-burn-paper?text=${cpaper}`, {method: 'get'})
				client.sendMessage(from, buffer, image, {quoted: mek})
				break
				case 'party':
					if (!isRegistered) return reply(ind.noregis())
			if (isLimit(sender)) return reply(ind.limitend(pusname))
					part = `${body.slice(7)}`
					reply(mess.wait)
					bufferu = await getBuffer(`https://api.vhtear.com/partytext?text=${part}&apikey=${apikey}`, {method: 'get'})
					client.sendMessage(from, bufferu, image, {caption: 'Nih kak', quoted: mek})
					await limitAdd(sender) 
					break 
				case 'glitch':
				if (!isRegistered) return reply(ind.noregis())
			if (isLimit(sender)) return reply(ind.limitend(pusname))
              	    if (args.length < 1) return reply('teksnya mana gan?')
                    hm = `${body.slice(8)}`
                    text1 = hm.split("|")[0];
                    text2 = hm.split("|")[1];                    
                    glitch = await getBuffer(`https://api.vhtear.com/glitchtext?text1=${text1}&text2=${text2}&apikey=${apikey}`, {method: 'get'})
                    client.sendMessage(from, glitch, image, {quoted: mek, caption: 'nih gan'})
			     	await limitAdd(sender) 
			     	break 
					case 'roman':
                    if (!isRegistered) return reply(ind.noregis())
			        if (isLimit(sender)) return reply(ind.limitend(pusname))
                    roman = `${body.slice(7)}`
                     reply(mess.wait)
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buffer = await getBuffer(`https://api.vhtear.com/romancetext?text=${roman}&apikey=${apikey}`, {method: 'get'})
                     client.sendMessage(from, buffer, image, {quoted: mek})
                  await limitAdd(sender) 
                  break 
					case 'love':
					  if (!isRegistered) return reply(ind.noregis())
			          if (isLimit(sender)) return reply(ind.limitend(pusname))
					  if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
					 love = `${body.slice(6)}`
					 buffer = await getBuffer(`https://api.vhtear.com/lovemessagetext?text=${love}&apikey=${apikey}`, {method: 'get'})
					 client.sendMessage(from, buffer, image, {quoted: mek})
					 await limitAdd(sender)
					 break 
					case 'jokerlogo':
                 if (!isRegistered) return reply(ind.noregis())
			      if (isLimit(sender)) return reply(ind.limitend(pusname))
                   tahta = `${body.slice(11)}`
                    reply(mess.wait)
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome/jokerlogo/${tahta}`, {method: 'get'})
                     client.sendMessage(from, buffer, image, {quoted: mek})
                  await limitAdd(sender) 
                  break 
                  case 'wall':
                  if (!isGroup) return reply(ind.groupo())
                 if (!isRegistered) return reply(ind.noregis())
			      if (isLimit(sender)) return reply(ind.limitend(pusname))
                   tahta = `${body.slice(6)}`
                    reply(mess.wait)
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome/breakwall//${tahta}`, {method: 'get'})
                     client.sendMessage(from, buffer, image, {quoted: mek})
                  await limitAdd(sender) 
                  break  
                  case '2021':
                  if (!isGroup) return reply(ind.groupo())
                 if (!isRegistered) return reply(ind.noregis())
			      if (isLimit(sender)) return reply(ind.limitend(pusname))
                   tahta = `${body.slice(6)}`
                    reply(mess.wait)
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome/newyearcard/${tahta}`, {method: 'get'})
                     client.sendMessage(from, buffer, image, {quoted: mek})
                  await limitAdd(sender) 
                  break  
                  case 'holographic':
                  if (!isGroup) return reply(ind.groupo())
                 if (!isRegistered) return reply(ind.noregis())
			      if (isLimit(sender)) return reply(ind.limitend(pusname))
                   tahta = `${body.slice(12)}`
                    reply(mess.wait)
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome/holographic/${tahta}`, {method: 'get'})
                     client.sendMessage(from, buffer, image, {quoted: mek})
                  await limitAdd(sender) 
                  break  
					case 'serem':
					if (!isGroup) return reply(ind.groupo())
                 if (!isRegistered) return reply(ind.noregis())
			      if (isLimit(sender)) return reply(ind.limitend(pusname))
                   tahta = `${body.slice(7)}`
                    reply(mess.wait)
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome/halloween/${tahta}`, {method: 'get'})
                     client.sendMessage(from, buffer, image, {quoted: mek})
                  await limitAdd(sender) 
                  break  
                  case 'metaldark':
                  if (!isGroup) return reply(ind.groupo())
                 if (!isRegistered) return reply(ind.noregis())
			      if (isLimit(sender)) return reply(ind.limitend(pusname))
                   tahta = `${body.slice(11)}`
                    reply(mess.wait)
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome/metaldark/${tahta}`, {method: 'get'})
                     client.sendMessage(from, buffer, image, {quoted: mek})
                  await limitAdd(sender) 
                  break  
                  case 'strawberry':
                  if (!isGroup) return reply(ind.groupo())
                 if (!isRegistered) return reply(ind.noregis())
			      if (isLimit(sender)) return reply(ind.limitend(pusname))
                   tahta = `${body.slice(11)}`
                    reply(mess.wait)
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome/strawberry/${tahta}`, {method: 'get'})
                     client.sendMessage(from, buffer, image, {quoted: mek})
                  await limitAdd(sender) 
                  break  
                  case 'ice':
                  if (!isGroup) return reply(ind.groupo())
                 if (!isRegistered) return reply(ind.noregis())
			      if (isLimit(sender)) return reply(ind.limitend(pusname))
                   tahta = `${body.slice(5)}`
                    reply(mess.wait)
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome/icecold/${tahta}`, {method: 'get'})
                     client.sendMessage(from, buffer, image, {quoted: mek})
                  await limitAdd(sender) 
                  break  
                  case 'bokeh':
                  if (!isGroup) return reply(ind.groupo())
                 if (!isRegistered) return reply(ind.noregis())
			      if (isLimit(sender)) return reply(ind.limitend(pusname))
                   tahta = `${body.slice(7)}`
                    reply(mess.wait)
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome/bokeh/${tahta}`, {method: 'get'})
                     client.sendMessage(from, buffer, image, {quoted: mek})
                  await limitAdd(sender) 
                  break  
                  case 'bunga':
                  if (!isGroup) return reply(ind.groupo())
                 if (!isRegistered) return reply(ind.noregis())
			      if (isLimit(sender)) return reply(ind.limitend(pusname))
                   tahta = `${body.slice(7)}`
                    reply(mess.wait)
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome/natureleaves/${tahta}`, {method: 'get'})
                     client.sendMessage(from, buffer, image, {quoted: mek})
                  await limitAdd(sender) 
                  break  
                  case 'racun':
                  if (!isGroup) return reply(ind.groupo())
                 if (!isRegistered) return reply(ind.noregis())
			      if (isLimit(sender)) return reply(ind.limitend(pusname))
                   tahta = `${body.slice(7)}`
                    reply(mess.wait)
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome/toxic/${tahta}`, {method: 'get'})
                     client.sendMessage(from, buffer, image, {quoted: mek})
                  await limitAdd(sender) 
                  break  
                  case 'holiday':
                  if (!isGroup) return reply(ind.groupo())
                 if (!isRegistered) return reply(ind.noregis())
			      if (isLimit(sender)) return reply(ind.limitend(pusname))
                   tahta = `${body.slice(8)}`
                    reply(mess.wait)
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome/christmas/${tahta}`, {method: 'get'})
                     client.sendMessage(from, buffer, image, {quoted: mek})
                  await limitAdd(sender) 
                  break  
                 case 'blood2':
                 if (!isRegistered) return reply(ind.noregis())
			      if (isLimit(sender)) return reply(ind.limitend(pusname))
                   tahta = `${body.slice(7)}`
                    reply(mess.wait)
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome/horrorblood/${tahta}`, {method: 'get'})
                     client.sendMessage(from, buffer, image, {quoted: mek})
                  await limitAdd(sender) 
                  break  
				case 'blood':
				if (!isGroup) return reply(ind.groupo())
                 if (!isRegistered) return reply(ind.noregis())
			      if (isLimit(sender)) return reply(ind.limitend(pusname))
                   tahta = `${body.slice(7)}`
                    reply(mess.wait)
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome/bloodfrosted/${tahta}`, {method: 'get'})
                     client.sendMessage(from, buffer, image, {quoted: mek})
                  await limitAdd(sender) 
                  break  
				case 'lawas':
				if (!isGroup) return reply(ind.groupo())
                 if (!isRegistered) return reply(ind.noregis())
			      if (isLimit(sender)) return reply(ind.limitend(pusname))
                   tahta = `${body.slice(7)}`
                    reply(mess.wait)
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome/text1917/${tahta}`, {method: 'get'})
                     client.sendMessage(from, buffer, image, {quoted: mek})
                  await limitAdd(sender) 
                  break  
				case 'tahta':
                 if (!isRegistered) return reply(ind.noregis())
			      if (isLimit(sender)) return reply(ind.limitend(pusname))
                   tahta = `${body.slice(7)}`
                    reply(mess.wait)
                     if (args.length < 1) return reply('Teksnya mana gan??')
                     if (args.length > 10) return reply('karakter minimal 10')
                     buffer = await getBuffer(`https://api.vhtear.com/hartatahta?text=${tahta}&apikey=${apikey}`, {method: 'get'})
                     client.sendMessage(from, buffer, image, {quoted: mek})
                  await limitAdd(sender) 
                  break  
                  case 'steel3d':
                if (!isRegistered) return reply(ind.noregis())
			if (isLimit(sender)) return reply(ind.limitend(pusname))
					gh = `${body.slice(9)}`
					reply(mess.wait)
					gbl1 = gh.split("|")[0];
					gbl2 = gh.split("|")[1];
					if (args.length < 1) return reply('Teksnya mana gan?')
					buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome/steel3d/${gbl1}/${gbl2}`, {method: 'get'})
					client.sendMessage(from, buffer, image, {quoted: mek})
					await limitAdd(sender) 
					break 
                  case 'prome':
                if (!isRegistered) return reply(ind.noregis())
			if (isLimit(sender)) return reply(ind.limitend(pusname))
					gh = `${body.slice(7)}`
					reply(mess.wait)
					gbl1 = gh.split("|")[0];
					gbl2 = gh.split("|")[1];
					if (args.length < 1) return reply('Teksnya mana gan?')
					buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome/space/${gbl1}/${gbl2}`, {method: 'get'})
					client.sendMessage(from, buffer, image, {quoted: mek})
					await limitAdd(sender) 
					break 
                case 'pronlogo':
                if (!isRegistered) return reply(ind.noregis())
			if (isLimit(sender)) return reply(ind.limitend(pusname))
					gh = `${body.slice(9)}`
					gbl1 = gh.split("|")[0];
					gbl2 = gh.split("|")[1];
					if (args.length < 1) return reply('Teksnya mana gan?')
					buffer = await getBuffer(`https://api.vhtear.com/pornlogo?text1=${gbl1}&text2=${gbl2}&apikey=${apikey}`, {method: 'get'})
					client.sendMessage(from, buffer, image, {quoted: mek})
					await limitAdd(sender) 
					break 
			  case 'apiteks':
				      if (!isRegistered) return reply(ind.noregis())
				    if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (args.length < 1) return reply('Teksnya mana um')
					love = body.slice(9)
					if (love.length > 12) return reply('Teksnya kepanjangan, maksimal 9 karakter')
                    reply(mess.wait)
					bufferxcz = await getBuffer(`https://api.vhtear.com/fire_maker?text=${love}&apikey=${apikey}`, {method: 'get'})
					client.sendMessage(from, bufferxcz, image, {quoted: mek, caption: ' '+love})
					await limitAdd(sender)
					break
         case 'yt':
    				if (!isRegistered) return reply(ind.noregis())
			if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (args.length < 1) return reply('Urlnya mana gan?')
					if (!isUrl(args[0]) && !args[0].includes('youtu.be')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://st4rz.herokuapp.com/api/ytv?url=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					ytt = `「 *YOUTUBE MP4 DOWNLOADER* 」\n\n• Title : *${anu.title}*\n• *Size:* ${anu.size}\n• *Durasi:* ${anu.duration}\n• *Deskripsi:* ${anu.desc}\n\n Tunggu Sebentar 1 menit Mungkin Agak Lama Karna Mendownload Video`
					buffer = await getBuffer(anu.thumbnail)
					reply(mess.wait)
					buffer = await getBuffer(anu.url_video)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: ytt})
					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek, caption: 'Nih Gan'})
					await limitAdd(sender) 
					break 
					case 'katailham':

				if (isBanned) return reply(mess.only.benned)

                if (!isUser) return reply(mess.only.userB)

                if (!isPublic) return reply(mess.only.publikG)



                reply(mess.wait)

				quotes = body.slice(1)

				const kta =['Lebih baik mengerti sedikit daripada salah mengerti.','Hampir semua pria memang mampu bertahan menghadapi kesulitan. Namun, jika Anda ingin menguji karakter sejati pria, beri dia kekuasaan.','Bila tekad seseorang kuat dan teguh, Tuhan akan bergabung dalam usahanya.','Penderitaan adalah pelajaran.','Ilmu pengetahuan tanpa agama adalah pincang.','Hidup itu seperti sebuah sepeda, agar tetap seimbang kita harus tetap bergerak.','Perbedaan masa lalu, sekarang, dan masa depan tak lebih dari ilusi yang keras kepala.','Sebuah meja, sebuah kursi, semangkuk buah, dan sebuah biola; apa lagi yang dibutuhkan agar seseorang bisa merasa bahagia?','Belas kasihanlah terhadap sesama, bersikap keraslah terhadap diri sendiri.','Cara paling baik untuk menggerakkan diri Anda ialah memberi tugas kepada diri sendiri.','Kita tidak boleh kehilangan semangat. Semangat adalah stimulan terkuat untuk mencintai, berkreasi dan berkeinginan untuk hidup lebih lama.','Manusia akan bahagia selama ia memilih untuk bahagia.','Saya tidak berharap menjadi segalanya bagi setiap orang. Saya hanya ingin menjadi sesuatu untuk seseorang.','Apabila sempurna akal seseorang, maka sedikit perkataannya.','Bahagialah orang yang dapat menjadi tuan untuk dirinya, menjadi kusir untuk nafsunya dan menjadi kapten untuk bahtera hidupnya.','Sahabat yang jujur lebih besar harganya daripada harta benda yang diwarisi dari nenek moyang.','Yang paling melelahkan dalam hidup adalah menjadi orang yang tidak tulus.','Terbuka untuk Anda, begitulah Tuhan memberi kita jalan untuk berusaha. Jangan pernah berfikir jalan sudah tertutup.','Penundaan adalah kuburan dimana peluang dikuburkan.','Cinta bukan saling menatap mata, namun melihat ke arah yang sama bersama-sama.','Kita adalah apa yang kita kerjakan berulang kali. Dengan demikian, kecemerlangan bukan tindakan, tetapi kebiasaan.','Jangan pernah mencoba menjadikan putra atau putri Anda menjadi seperti Anda. Diri Anda hanya cukup satu saja.','Jika Anda bisa membuat orang lain tertawa, maka Anda akan mendapatkan semua cinta yang Anda inginkan.','Masalah akan datang cepat atau lambat. Jika masalah datang, sambut dengan sebaik mungkin. Semakin ramah Anda menyapanya, semakin cepat ia pergi.','Kita tak bisa melakukan apapun untuk mengubah masa lalu. Tapi apapun yang kita lakukan bisa mengubah masa depan.','Kesabaran adalah teman dari kebijaksanaan.','Orang-orang kreatif termotivasi oleh keinginan untuk maju, bukan oleh keinginan untuk mengalahkan orang lain.','Dimanapun engkau berada selalulah menjadi yang terbaik dan berikan yang terbaik dari yang bisa kita berikan.','Kebencian seperti halnya cinta, berkobar karena hal-hal kecil.','Anda tidak perlu harus berhasil pada kali pertama.','Satu jam yang intensif, jauh lebih baik dan menguntungkan daripada bertahun-tahun bermimpi dan merenung-renung.','Hal terbaik yang bisa Anda lakukan untuk orang lain bukanlah membagikan kekayaan Anda, tetapi membantu dia untuk memiliki kekayaannya sendiri.','Tidak ada jaminan keberhasilan, tetapi tidak berusaha adalah jaminan kegagalan.','Aku tidak tahu kunci sukses itu apa, tapi kunci menuju kegagalan adalah mencoba membuat semua orang senang.']

				const su = kta[Math.floor(Math.random() * kta.length)]

				client.sendMessage(from, ''+su+'\n\n_-Ilham._', text, { quoted: mek })

				break
		    case 'cersex':
           if (!isRegistered) return reply(ind.noregis())
			if (isLimit(sender)) return reply(ind.limitend(pusname))
                   anu = await fetchJson(`https://api.vhtear.com/cerita_sex&apikey=${apikey}`, {method: 'get'})
                   if (anu.error) return reply(anu.error)
                   sex = await getBuffer(anu.result.image)
                   reply (mess.wait)
                   cerita = `• *Judul:* ${anu.result.judul}\n\n${anu.result.cerita}`
                   client.sendMessage(from, sex, image, {quoted: mek, caption: cerita})
                   await limitAdd(sender) 
                   break 
              case 'cerpen':
                   if (!isRegistered) return reply(ind.noregis())
			if (isLimit(sender)) return reply(ind.limitend(pusname))
                   anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/cerpen`, {method: 'get'})
                   cerpen = `• *Title:* ${anu.result.title}\n• *Pengarang:* ${anu.result.pengarang}\n• *Kategori:* ${anu.result.kategori}\n\n${anu.result.cerpen}`
                   client.sendMessage(from, cerpen, text, {quoted: mek})
                   break 
                  case 'playstore':
                  if (!isRegistered) return reply(ind.noregis())
			if (isLimit(sender)) return reply(ind.limitend(pusname))
                ps = `${body.slice(11)}`
                  anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/playstore?q=${ps}`, {method: 'get'})
                  store = '======================\n'
                  for (let ply of anu.result){
                  store += `• *Nama Apk:* ${ply.app.name}\n• *ID:* ${ply.app.id}\n• *Link Apk:* ${ply.app.url}\n===================°]\n`
                  }
                  reply(store.trim())
                  break
                case 'katabijak':
				if (!isRegistered) return reply(ind.noregis())
			      if (isLimit(sender)) return reply(ind.limitend(pusname))
					anu = await fetchJson(`https://api.arugaz.my.id/api/random/text/katabijak`, {method: 'get'})
					katabijak = `Kata Bijak: *${anu.result}*`
					client.sendMessage(from, katabijak, text, {quoted: mek})
					await limitAdd(sender) 
					break 
					case 'xvideos':
			   if (isBanned) return reply(mess.only.benned)    
			   if (!isUser) return reply(mess.only.userB)
			   if (!isPublic) return reply(mess.only.publikG)
			   if (isLimit(sender)) return reply(limitend(pushname2))
			   reply(mess.wait)
              	    if (args.length < 1) return reply('teksnya mana gan?')
                    anu = await fetchJson(`https://api.arugaz.my.id/api/media/xvideo/search?query=${body.slice(9)}`, {method: 'get'})
                    teks = `===============\n`
                    for (let b of anu.result) {
                    teks += `• Title: ${b.title}\n• Info: ${b.info}\n• Link: ${b.link}\n===============\n`
                    }
                    reply(teks.trim())
			     	await limitAdd(sender) 
			     	break 
                    case 'mimpi':
			    if (!isRegistered) return reply(ind.noregis())
			if (isLimit(sender)) return reply(ind.limitend(pusname))
			    reply(mess.wait)
			        anu = await fetchJson(`https://api.arugaz.my.id/api/primbon/tafsirmimpi?mimpi=${body.slice(7)}`, {method: 'get'})
			        mimpi = `Arti Mimpi *${body.slice(7)}* Adalah:\n${anu.result.hasil}`
			        client.sendMessage(from, mimpi, text, {quoted: mek})
			        await limitAdd(sender) 
			       	break 
				case 'yt3':
					if (!isRegistered) return reply(ind.noregis())
			if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (args.length < 1) return reply('Urlnya mana gan?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://alfians-api.herokuapp.com/api/yta?url=${args[0]}`)
					if (anu.error) return reply(anu.error)
					yta = `「 *YOUTUBE MP3 DOWNLOADER* 」\n\n• Title : *${anu.title}*\n• *Size:* ${anu.filesize}\n• *Resolusi:* ${anu.resolution}\n\n Tunggu Sebentar 1 menit Mungkin Agak Lama Karna Mendownload Video`
					buffer = await getBuffer(anu.thumb)
					reply(mess.wait)
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: yta})
					client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek, caption: 'Nih Gan'})
					await limitAdd(sender) 
					break 
					case 'nulis':
				case 'tulis':
				  client.updatePresence(from, Presence.composing)
				  if (!isRegistered) return reply(ind.noregis())
			    if (isLimit(sender)) return reply(ind.limitend(pusname))
			     if (args.length < 1) return reply(`${name} Harus Nulis Apa Kak??`)
			    reply(mess.wait)
					tulis = body.slice(7)
				  nama = tulis.split("|")[0];
					kelas = tulis.split("|")[1];
					isi = tulis.split("|")[2];
					nulis = await getBuffer(`https://api.zeks.xyz/api/magernulis?nama=${nama}&kelas=${kelas}&text=${isi}&tinta=4`, {method: 'get'})
					client.sendMessage(from, nulis, image, {quoted: mek})
					await limitAdd(sender) 
					break  
			case 'instastory':
				if (!isRegistered) return reply(ind.noregis())
			if (isLimit(sender)) return reply(ind.limitend(pusname))
				instor = `${body.slice(12)}`
				anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/igstory?username=${instor}`, {method: 'get'})
				insta = '=========================\n'
				for (let story of anu.result) {
				insta += `• *Upload:* ${story.uploaded}\n• *Berakhir:* ${story.expired}\n• *Size: ${story.filesize}\n• *Type:* ${story.type}\n• Link: ${story.url}\n=========================\n`
				}
				reply(insta.trim())
				await limitAdd(sender)
				break
            case 'spamsms':
            if (!isGroup) return reply(ind.groupo())
		    if (!isGroupAdmins) return reply(ind.admin())
			if (!isRegistered) return reply(ind.noregis())
			if (isLimit(sender)) return reply(ind.limitend(pusname))
			sms = `${body.slice(9)}`
			nomer = sms.split("|")[0];
			jumlah = sms.split("|")[1];
			anu = await fetchJson(`http://itsmeikygans.my.id/spamsms?apikey=itsmeiky633&no=${body.slice(10)}&jum=${jumlah}`, {method: 'get'})
			client.sendMessage(from, `${anu.logs}`, text, {quoted: mek})
			await limitAdd(sender) 
			break  
			case 'bokep':
			if (!isNsfw) return reply(ind.nsfwoff())
			if (!isRegistered) return reply(ind.noregis())
			if (isLimit(sender)) return reply(ind.limitend(pusname))
           if (!isGroup) return reply(ind.groupo())
			   reply(mess.wait)
              	    if (args.length < 1) return reply('teksnya mana gan?')
                    teks = body.slice(9)
                    anu = await fetchJson(`https://api.arugaz.my.id/api/media/pornhub/search?query=${teks}`, {method: 'get'})
                    teks = `===============\n`
                    for (let bokep of anu.result) {
                    teks += `Title: ${bokep.title}\nAktor: ${bokep.author}\nViewers: *${bokep.views}*\nDurasi: ${bokep.duration}\nLink: ${bokep.link}\n===============\n`
                    }
                    reply(teks.trim())
			     	await limitAdd(sender) 
			     	break  
		case 'spamcall':
		    if (!isGroup) return reply(ind.groupo())
            if (!isGroupAdmins) return reply(ind.admin())
			if (!isRegistered) return reply(ind.noregis())
	        if (isLimit(sender)) return reply(ind.limitend(pusname))
			call = `${body.slice(11)}`
			anu = await fetchJson(`https://videfikri.com/api/call/?nohp=${call}`, {method: 'get'})
			client.sendMessage(from, `${anu.result.logs}`, text, {quoted: mek})
			await limitAdd(sender) 
			break  
		case 'ytsearch':
				if (!isRegistered) return reply(ind.noregis())
			if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (args.length < 1) return reply('Yang mau di cari apa?')
					reply(mess.wait)
					anu = await fetchJson(`https://api.arugaz.my.id/api/media/ytsearch?query=${body.slice(10)}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = '=================\n'
					for (let i of anu.result) {
						teks += `\`\`\`Title\`\`\` : *${i.title}*\n\`\`\`Link\`\`\` : *https://youtu.be/${i.id}*\n\`\`\`Published\`\`\` : *${i.uploadDate}*\n\`\`\`Duration\`\`\` : *${i.duration}*\n\`\`\`Viewers: \`\`\`*${h2k(i.viewCount)}*\n\`\`\`Channel:\`\`\` *${i.channel.name}*\n=================\n`
					}
					reply(teks.trim())
					await limitAdd(sender) 
					break 
		case 'spamgmail':
		    if (!isGroup) return reply(ind.groupo())
		    if (!isGroupAdmins) return reply(ind.admin())
		    if (!isRegistered) return reply(ind.noregis())
			if (isLimit(sender)) return reply(ind.limitend(pusname))
			spam = `${body.slice(10)}`
			anu = await fetchJson(`https://videfikri.com/api/spamemail/?email=${spam}&subjek=PT.PLN&pesan=Silahkan%20bayar%20tagihan%20listrik%20Anda`, {method: 'get'})
			client.sendMessage(from, `${anu.result.log_lengkap}`, text, {quoted: mek})
			await limitAdd(sender) 
			break  
            case 'smule':
	       if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (args.length < 1) return reply('Urlnya mana gan?')
					if (!isUrl(args[0]) && !args[0].includes('c-ash.smule')) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/smule?link=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}\n\n Tunggu Sebentar 1 menit Mungkun Agak Lama Karna Mendownload Video`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek, caption: 'Nih Gan'})
					await limitAdd(sender) 	
					break  
              case 'snack':
			if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (args.length < 1) return reply('Urlnya mana gan?')
					if (!isUrl(args[0]) && !args[0].includes('sck')) return reply(mess.error.Iv)
                anu = await fetchJson(`https://api-anoncybfakeplayer.herokuapp.com/sckdown?url=${args[0]}`, {method: 'get'})
               if (anu.error) return reply(anu.error)
                 sck = `「 *SNACK VIDEO DOWNLOADER* 」\n\n*• Format:* ${anu.format}\n*• Size:* ${anu.size}\n\n*TUNGGU SEBENTAR LAGI DIKIRIM MOHON JANGAN SPAM*`
                bufferddd = await getBuffer('https://raw.githubusercontent.com/FarhanXCode7/termux-bot-wa/main/src/glitchtext.png')
                 reply(mess.wait)
                buffer = await getBuffer(anu.result)
                client.sendMessage(from, bufferddd, image, {quoted: mek, caption: sck})
                client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.format}.mp4`, quoted: mek})
                await limitAdd(sender) 
                break  
            case 'joox':
			
			if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
                if (!isPublic) return reply(mess.only.publikG)
                reply(mess.wait)
                data = await fetchJson(`https://tobz-api.herokuapp.com/api/joox?q=${body.slice(6)}&apikey=BotWeA`, {method: 'get'})
               if (data.error) return reply(data.error)
                 infomp3 = `*Lagu Ditemukan!!!*\nJudul : ${data.result.judul}\nAlbum : ${data.result.album}\nDipublikasi : ${data.result.dipublikasi}\n*Filesize* : ${data.filesize}\n*TUNGGU SEBENTAR LAGI DIKIRIM MOHON JANGAN SPAM*`
                bufferddd = await getBuffer(data.result.thumb)
                lagu = await getBuffer(data.result.mp3)
                client.sendMessage(from, bufferddd, image, {quoted: mek, caption: infomp3})
                client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${data.result.title}.mp3`, quoted: mek})
                break
                case 'snack':
			if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (!isPublic) return reply(mess.only.userpublikG)
				if (args.length < 1) return reply('Urlnya mana gan?')
					if (!isUrl(args[0]) && !args[0].includes('sck')) return reply(mess.error.Iv)
                anu = await fetchJson(`https://api-anoncybfakeplayer.herokuapp.com/sckdown?url=${args[0]}`, {method: 'get'})
               if (anu.error) return reply(anu.error)
                 sck = `「 *SNACK VIDEO DOWNLOADER* 」\n\n*• Format:* ${anu.format}\n*• Size:* ${anu.size}\n\n*TUNGGU SEBENTAR LAGI DIKIRIM MOHON JANGAN SPAM*`
                bufferddd = await getBuffer('https://raw.githubusercontent.com/FarhanXCode7/termux-bot-wa/main/src/glitchtext.png')
                 reply(mess.wait)
                buff = await getBuffer(anu.result)
                frhan.sendMessage(from, bufferddd, image, {quoted: mek, caption: sck})
                frhan.sendMessage(from, buff, video, {mimetype: 'video/mp4', filename: `${anu.format}.mp4`, quoted: mek})
                await limitAdd(sender) 
                break  
                case 'ytmp4':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (!isPublic) return reply(mess.only.publikG)
				if (!isUser) return reply(mess.only.userB)
					if (args.length < 1) return reply('Urlnya mana um?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://st4rz.herokuapp.com/api/ytv?url=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}\n*Filesize* : ${anu.filesize}`
					thumb = await getBuffer(anu.thumb)
		;			client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer2 = await getBuffer(anu.result)
					client.sendMessage(from, buffer2, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek})
					break
                case 'pinterest':
                if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
                if (!isPublic) return reply(mess.only.publikG)
					if (args.length < 1) return reply(mess.search)
					pinte = body.slice(11)
					anu = await fetchJson(`https://api.vhtear.com/pinterest?query=${pin}&apikey=RamlanID`, {method: 'get'})
					reply(mess.wait)
					var pin = JSON.parse(JSON.stringify(anu.result));
					var trest =  pin[Math.floor(Math.random() * pin.length)];
					pine = await getBuffer(trest)
					client.sendMessage(from, pine, image, { caption: '*Pinterest*\n\n*Hasil Pencarian : '+pinte+'*', quoted: mek })
					break
               case 'goku':
                if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
                     reply(ind.wait())
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=Goku SuperSaiyan`, {method: 'get'})
					naru = JSON.parse(JSON.stringify(anu));
					to =  naru[Math.floor(Math.random() * naru.length)];
					nye = await getBuffer(to)
					client.sendMessage(from, nye, image, { caption:'Goku!!', quoted: mek })
					await limitAdd(sender)
					break 
         case 'meme':
                   if (!isRegistered) return reply(ind.noregis())
				   if (isLimit(sender)) return reply(ind.limitend(pusname))
                  reply(ind.wait())
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=MEME INDONESIA`, {method: 'get'})
					naru = JSON.parse(JSON.stringify(anu));
					to =  naru[Math.floor(Math.random() * naru.length)];
					nye = await getBuffer(to)
					client.sendMessage(from, nye, image, { caption:'Ga ketawa autid', quoted: mek })
					await limitAdd(sender)
					break
                  case 'tomp3':
                 if (!isRegistered) return reply(ind.noregis())
				   if (isLimit(sender)) return reply(ind.limitend(pusname))
                	client.updatePresence(from, Presence.composing) 
					if (!isQuotedVideo) return reply('❌ reply videonya um ❌')
                   reply(ind.wait())
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp4')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❌ Gagal, pada saat mengkonversi video ke mp3 ❌')
						bufferlkj = fs.readFileSync(ran)
						client.sendMessage(from, bufferlkj, audio, {mimetype: 'audio/mp4', quoted: mek})
						fs.unlinkSync(ran)

					})

					break
              case 'circlesticker':
    const pack = arg.split('|')[0]
    const author = arg.split('|')[1]
    if (isMedia && mimetype == 'image/jpeg') {
      await createExif(pack,author)
      await sleep(5000)
      decryptMedia(message).then(mediaData => {
        sharp(mediaData).resize({
          width: 512,
          height: 512,
          fit: sharp.fit.contain,
          background: {
            r: 0,
            g: 0,
            b: 0,
            alpha: 0
          }
        }).webp().toBuffer().then(buffer => {
          modifExif(buffer, id, (res) => {
            mediaData = res.toString('base64')
            sqlter.sendRawWebpAsSticker(from, mediaData)
          })
        })
      })
    } else if (quotedMsg && quotedMsgObj.mimetype == 'image/jpeg') {
      await createExif(pack, author)
      await sleep(5000)
      decryptMedia(quotedMsg).then(mediaData => {
        sharp(mediaData).resize({
          width: 512,
          height: 512,
          fit: sharp.fit.contain,
          background: {
            r: 0,
            g: 0,
            b: 0,
            alpha: 0
          }
        }).webp().toBuffer().then(buffer => {
          modifExif(buffer, id, (res) => {
            mediaData = res.toString('base64')
            client.sendRawWebpAsSticker(from, mediaData)
          })
        })
      })
    } else if (isMedia && mimetype == 'image/gif') {
      const shape = "circle"
      const type = "gif"
      const mediaData = await decryptMedia(message);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => client.sendRawWebpAsSticker(from, res.toString("base64")))
    } else if (quotedMsg && quotedMsgObj.mimetype == 'image/gif') {
      const shape = "circle"
      const type = "gif"
      const mediaData = await decryptMedia(quotedMsg);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => client.sendRawWebpAsSticker(from, res.toString("base64")))
    } else if (isMedia && mimetype == 'video/mp4') {
      const shape = "circle"
      const type = "mp4"
      const mediaData = await decryptMedia(message);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => client.sendRawWebpAsSticker(from, res.toString("base64")))
    } else if (quotedMsg && quotedMsgObj.mimetype == 'video/mp4') {
      const shape = "circle"
      const type = "mp4"
      const mediaData = await decryptMedia(quotedMsg);
      await convertSticker(shape, author, pack, mediaData, type, from).then((res) => client.sendRawWebpAsSticker(from, res.toString("base64")))
    }
    break
				//freerestapi 
				case 'igstalk':
                   if (!isRegistered) return reply(ind.noregis())
                   if (isLimit(sender)) return reply(ind.limitend(pusname))
                     hmm = await fetchJson(`https://freerestapi.herokuapp.com/api/v1/igs?u=${body.slice(9)}`)
                     buffer = await getBuffer(hmm.data.profilehd)
                     hasil = `Fullname : ${hmm.data.fullname}\npengikut : ${hmm.data.follower}\nMengikuti : ${hmm.data.following}\nPrivate : ${hmm.data.private}\nVerified : ${hmm.data.verified}\nbio : ${hmm.data.bio}`
                    client.sendMessage(from, buffer, image, {quoted: mek, caption: hasil})
                    await limitAdd(sender)
					break 
				//daftar 
				case 'daftar':
                if (isRegistered) return  reply(ind.rediregis())
                if (!q.includes('|')) return  reply(ind.wrongf())
                const namaUser = q.substring(0, q.indexOf('|') - 0)
                const umurUser = q.substring(q.lastIndexOf('|') + 1)
                const serialUser = createSerial(20)
                if(isNaN(umurUser)) return await reply('Umur harus berupa angka!!')
                if (namaUser.length >= 30) return reply(`why is your name so long it's a name or a train`)
                if (umurUser > 40) return reply(`your age is too  old maximum 40 years`)
                if (umurUser < 12) return reply(`your age is too young minimum 12 years`)
                veri = sender
                if (isGroup) {
                    addRegisteredUser(sender, namaUser, umurUser, time, serialUser)
                    await reply(ind.registered(namaUser, umurUser, serialUser, time, sender))
                    addATM(sender)
                    addLevelingId(sender)
                    console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(namaUser, 'cyan'), 'Age:', color(umurUser, 'cyan'), 'Serial:', color(serialUser, 'cyan'), 'in', color(sender || groupName))
                } else {
                    addRegisteredUser(sender, namaUser, umurUser, time, serialUser)
                    await reply(ind.registered(namaUser, umurUser, serialUser, time, sender))
                    addATM(sender)
                    addLevelingId(sender)
                    console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(namaUser, 'cyan'), 'Age:', color(umurUser, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
                }
				break
				//terhambar 
				case 'quotemaker':
                if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
                var gh = body.slice(12)
					var quote = gh.split("|")[0];
					var wm = gh.split("|")[1];
					const pref = `Usage: \n${prefix}quotemaker teks|watermark\n\nEx :\n${prefix}quotemaker ini contoh|bicit`
					if (args.length < 1) return reply(pref)
					reply(ind.wait())
					anu = await fetchJson(`https://terhambar.com/aw/qts/?kata=${quote}&author=${wm}&tipe=random`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {caption: 'Nih anjim', quoted: mek})
					await limitAdd(sender)
					break
				//fadli 
				case 'pinterest':
					if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${body.slice(11)}`, {method: 'get'})
					reply(ind.wait())
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: `*𝐏𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓*`})
					await limitAdd(sender)
					break 
					case 'iri':
const irimp3 = fs.readFileSync('./src/assets/iri.mp3');
client.sendMessage(from, irimp3, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})

break
case 'pale':
const pa = fs.readFileSync('./src/assets/pale.mp3')
client.sendMessage(from, pa, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'dj1':
const dj1mp3 = fs.readFileSync('./src/assets/dj1.m4a')
client.sendMessage(from, dj1mp3, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'dj2':
const dj2mp3 = fs.readFileSync('./src/assets/dj2.m4a')
client.sendMessage(from, dj2mp3, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'baka':
case 'bodoh':
case 'onichan':
const bakamp3 = fs.readFileSync('./src/assets/baka.mp3');
client.sendMessage(from, bakamp3, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})

break
case 'sound':
const soun = fs.readFileSync('./src/assets/sound.mp3')
client.sendMessage(from, soun, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break 
case 'sound1':
satu = fs.readFileSync('./src/assets/sound1.mp3');
client.sendMessage(from, satu, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})

break
case 'sound2':
dua = fs.readFileSync('./src/assets/sound2.mp3');
client.sendMessage(from, dua, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})

break
case 'sound3':
tiga = fs.readFileSync('./src/assets/sound3.mp3');
client.sendMessage(from, tiga, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})

break
case 'sound4':
empat = fs.readFileSync('./src/assets/sound4.mp3');
client.sendMessage(from, empat, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})

break
case 'sound5':
lima = fs.readFileSync('./src/assets/sound5.mp3');
client.sendMessage(from, lima, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})

break
case 'sound6':
enam = fs.readFileSync('./src/assets/sound6.mp3');
client.sendMessage(from, enam, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})

break
case 'sound7':
tujuh = fs.readFileSync('./src/assets/sound7.mp3');
client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})

break					
				case 'pokemon':
                if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
                   if (!isGroup) return reply(ind.groupo())
                   if (!isNsfw) return reply(ind.nsfwoff())
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=pokemon`, {method: 'get'})
					reply(ind.wait())
					var n = JSON.parse(JSON.stringify(anu));
					var nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek })
					await limitAdd(sender)
					break
                case 'anjing':
                if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
                   if (!isGroup) return reply(ind.groupo())
                   if (!isNsfw) return reply(ind.nsfwoff())
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anjing`, {method: 'get'})
					reply(ind.wait())
					var n = JSON.parse(JSON.stringify(anu));
					var nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek })
					await limitAdd(sender)
					break
				//jojo 
				case 'stickerhide':
				    ranp = getRandom('.gif')
					rano = getRandom('.webp')
				anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/screed?text=${args[0]}`,{method: 'get'})
				exec(`wget ${anu} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					break
				case 'emoji':
				anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/emoji2png?emoji=%F0%9F%98%82&type=aple`, {method: 'get'})
				jes = await getBuffer(anu)
				client.sendMessage(from, jes, image,{quoted : mek, caption : 'DONE'})
				break
				case 'nsfwloli':
				    try {
				    if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
						if (!isNsfw) return reply(' *FALSE* ')
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/randomloli?apikey=${apikey}`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Jangan jadiin bahan buat comli om'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					await limitAdd(sender)
					break 
			    case 'nsfwblowjob':
				    try {
				if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
						if (!isNsfw) return reply(' *FALSE* ')
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwblowjob?apikey=${apikey}`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Jangan jadiin bahan buat comli om'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					await limitAdd(sender)
					break 
			    case 'nsfwneko':
				    try {
				    if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
						if (!isNsfw) return reply(' *FALSE* ')
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwneko?apikey=${apikey}`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'ni anjim'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					await limitAdd(sender) 
					break 
				case 'nsfwtrap':
				    try {
				    if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
						if (!isNsfw) return reply(' *FALSE* ')
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwtrap?apikey=${apikey}`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'ni anjim'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					await limitAdd(sender) 
					break 
					case 'animebooty':
				    try {
				    if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
						if (!isNsfw) return reply(' *FALSE* ')
						res = await fetchJson(`http://lolhuman.herokuapp.com/api/random/nsfw/animebooty`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'ni anjim'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					await limitAdd(sender) 
					break 
					case 'ahegao':
				    try {
				    if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
						if (!isNsfw) return reply(' *FALSE* ')
						res = await fetchJson(`http://lolhuman.herokuapp.com/api/random/nsfw/ahegao`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'ni anjim'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					await limitAdd(sender) 
					break 
					case 'nsfwwaifu':
				    try {
				    if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
						if (!isNsfw) return reply(' *FALSE* ')
						res = await fetchJson(`http://lolhuman.herokuapp.com/api/random/nsfw/waifu`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'ni anjim'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					await limitAdd(sender) 
					break 
					case 'ecchi':
				    try {
				    if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
						if (!isNsfw) return reply(' *FALSE* ')
						res = await fetchJson(`http://lolhuman.herokuapp.com/api/random/nsfw/ecchi`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'ni anjim'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					await limitAdd(sender) 
					break 
					case 'hentaiparadise':
				    try {
				    if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
						if (!isNsfw) return reply(' *FALSE* ')
						res = await fetchJson(`http://lolhuman.herokuapp.com/api/random/nsfw/hentaiparadise`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'ni anjim'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					await limitAdd(sender) 
					break 
					case 'animethighss':
				    try {
				    if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
						if (!isNsfw) return reply(' *FALSE* ')
						res = await fetchJson(`http://lolhuman.herokuapp.com/api/random/nsfw/animethighss`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'ni anjim'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					await limitAdd(sender) 
					break 
					case 'hololewd':
				    try {
				    if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
						if (!isNsfw) return reply(' *FALSE* ')
						res = await fetchJson(`http://lolhuman.herokuapp.com/api/random/nsfw/hololewd`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'ni anjim'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					await limitAdd(sender) 
					break 
					case 'animefeets':
				    try {
				    if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
						if (!isNsfw) return reply(' *FALSE* ')
						res = await fetchJson(`http://lolhuman.herokuapp.com/api/random/nsfw/animefeets`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'ni anjim'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					await limitAdd(sender) 
					break 
					case 'sideoppai':
				    try {
				    if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
						if (!isNsfw) return reply(' *FALSE* ')
						res = await fetchJson(`http://lolhuman.herokuapp.com/api/random/nsfw/sideoppai`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'ni anjim'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					await limitAdd(sender) 
					break 
				case 'hentai':
				    try {
				    if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
						if (!isNsfw) return reply(' *FALSE* ')
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/hentai?apikey=${apikey}`, {method: 'get'})
						buffer = await getBuffer(res.result)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'ni anjim'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply(' *ERROR* ')
					}
					await limitAdd(sender) 
					break 
					case 'nekonime':
					case 'neko':
					if (!isGroup) return reply(ind.groupo())
                    if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
					gatauda = body.slice(6)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/nekonime?apikey=${apikey}`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
                    await limitAdd(sender)
					break
				case 'gantengcek':
				case 'cekganteng':
				if (!isGroup) return reply(ind.groupo())
				if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					ganteng = body.slice(12)
					const gan =['10%','30%','20%','40%','50%','60%','70%','62%','74%','83%','97%','100%','29%','94%','75%','82%','41%','39%']
					const teng = gan[Math.floor(Math.random() * gan.length)]
					client.sendMessage(from, 'Pertanyaan : Cek Ganteng Bang *'+ganteng+'*\n\nJawaban : '+ teng +'', text, { quoted: mek })
					break
				//case 'rate':
				if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					rate = body.slice(1)
					ratee = ["100%","95%","90%","85%","80%","75%","70%","65%","60%","55%","50%","45%","40%","35%","30%","25%","20%","15%","10%","5%"]
					const te = ratee[Math.floor(Math.random() * ratee.length)]
					client.sendMessage(from, 'Pertanyaan : *'+rate+'*\n\nJawaban : '+ te+'', text, { quoted: mek })
					break 
				case 'watak':
				if (!isGroup) return reply(ind.groupo())
				if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					watak = body.slice(1)
					wa =["penyayang","pemurah","Pemarah","Pemaaf","Penurut","Baik","baperan","Baik Hati","penyabar","Uwu","top deh, pokoknya","Suka Membantu"]
					const tak = wa[Math.floor(Math.random() * wa.length)]
					client.sendMessage(from, 'Pertanyaan : *'+watak+'*\n\nJawaban : '+ tak, text, { quoted: mek })
					break 
				case 'hobby':
				if (!isGroup) return reply(ind.groupo())
				if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					hobby = body.slice(1)
					hob =["Memasak","Membantu Atok","Mabar","Nobar","Sosmed an","Membantu Orang lain","Nonton Anime","Nonton Drakor","Naik Motor","Nyanyi","Menari","Bertumbuk","Menggambar","Foto fotoan Ga jelas","Maen Game","Berbicara Sendiri"]
					const by = hob[Math.floor(Math.random() * hob.length)]
					client.sendMessage(from, 'Pertanyaan : *'+hobby+'*\n\nJawaban : '+ by, text, { quoted: mek })
					break 
					case 'naruto':
					if (!isGroup) return reply(ind.groupo())
				if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=Naruto`, {method: 'get'})
					naru = JSON.parse(JSON.stringify(anu));
					to =  naru[Math.floor(Math.random() * naru.length)];
					nye = await getBuffer(to)
					client.sendMessage(from, nye, image, { caption: 'naruto!!', quoted: mek })
					await limitAdd(sender)
					break 
				case 'minato':
				if (!isGroup) return reply(ind.groupo())
				if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=Minato`, {method: 'get'})
					min = JSON.parse(JSON.stringify(anu));
					ato =  min[Math.floor(Math.random() * min.length)];
					nye = await getBuffer(ato)
					client.sendMessage(from, nye, image, { caption: 'minato!!', quoted: mek })
					await limitAdd(sender)
					break 
				case 'boruto':
				if (!isGroup) return reply(ind.groupo())
				if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=Boruto`, {method: 'get'})
					bor = JSON.parse(JSON.stringify(anu));
					uto =  bor[Math.floor(Math.random() * bor.length)];
					nye = await getBuffer(uto)
					client.sendMessage(from, nye, image, { caption: 'boruto!!', quoted: mek })
					await limitAdd(sender)
					break 
				case 'hinata':
				if (!isGroup) return reply(ind.groupo())
				if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=Hinata`, {method: 'get'})
					hina = JSON.parse(JSON.stringify(anu));
					ta =  hina[Math.floor(Math.random() * hina.length)];
					nye = await getBuffer(ta)
					client.sendMessage(from, nye, image, { caption: 'hinata!!', quoted: mek })
					await limitAdd(sender)
					break 
				case 'sasuke':
				if (!isGroup) return reply(ind.groupo())
				if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=sasuke`, {method: 'get'})
					sasu = JSON.parse(JSON.stringify(anu));
					ke =  sasu[Math.floor(Math.random() * sasu.length)];
					nye = await getBuffer(ke)
					client.sendMessage(from, nye, image, { caption: 'sasuke!!', quoted: mek })
					await limitAdd(sender) 
					break 
				case 'sakura':
				if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=sakura`, {method: 'get'})
					sak = JSON.parse(JSON.stringify(anu));
					kura =  sak[Math.floor(Math.random() * sak.length)];
					nye = await getBuffer(kura)
					client.sendMessage(from, nye, image, { caption: 'sakura!!', quoted: mek })
					await limitAdd(sender) 
					break 
				case 'kaneki':
				if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					reply(mess.wait)
					anu = await fetchJson(`https://api.vhtear.com/pinterest?query=kaneki&apikey=${apikey}`, {method: 'get'})
					var ka = JSON.parse(JSON.stringify(anu.result));
					var ne =  ka[Math.floor(Math.random() * ka.length)];
					ki = await getBuffer(ne)
					client.sendMessage(from, ki, image, { caption: 'kaneki!!', quoted: mek })
					await limitAdd(sender) 
					break 
				case 'toukachan':
				if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anime+touka`, {method: 'get'})
					tou = JSON.parse(JSON.stringify(anu));
					ka =  tou[Math.floor(Math.random() * tou.length)];
					nye = await getBuffer(ka)
					client.sendMessage(from, nye, image, { caption: 'toukachan!!', quoted: mek })
					await limitAdd(sender) 
					break 
				case 'rize':
				if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anime+rize`, {method: 'get'})
					ri = JSON.parse(JSON.stringify(anu));
					ze =  ri[Math.floor(Math.random() * ri.length)];
					nye = await getBuffer(ze)
					client.sendMessage(from, nye, image, { caption: 'rize chan!!', quoted: mek })
					await limitAdd(sender) 	
					break 
				case 'akira':
				if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anime+akira`, {method: 'get'})
					ak = JSON.parse(JSON.stringify(anu));
					ara =  ak[Math.floor(Math.random() * ak.length)];
					nye = await getBuffer(ara)
					client.sendMessage(from, nye, image, { caption: 'akira chan!!', quoted: mek })
					await limitAdd(sender) 
					break 
				case 'itori':
				if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anime+itori`, {method: 'get'})
					it = JSON.parse(JSON.stringify(anu));
					ori =  it[Math.floor(Math.random() * it.length)];
					nye = await getBuffer(ori)
					client.sendMessage(from, nye, image, { caption: 'itori chan!!', quoted: mek })
					await limitAdd(sender) 
					break 
				case 'kurumi':
				if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anime+karumi`, {method: 'get'})
					kur = JSON.parse(JSON.stringify(anu));
					imi =  kur[Math.floor(Math.random() * kur.length)];
					nye = await getBuffer(imi)
					client.sendMessage(from, nye, image, { caption: 'kurumi chan!!', quoted: mek })
					await limitAdd(sender) 
					break 
					case 'loli':

                    if (!isRegistered) return reply(ind.noregis())

				    if (isLimit(sender)) return reply(ind.limitend(pusname))

                    reply(ind.wait())

					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=LOLI`, {method: 'get'})

					naru = JSON.parse(JSON.stringify(anu));

					to =  naru[Math.floor(Math.random() * naru.length)];

					nye = await getBuffer(to)

					client.sendMessage(from, nye, image, { caption: '*LOLI* !!', quoted: mek })

					await limitAdd(sender)

					break
				case 'miku':
				if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anime+miku`, {method: 'get'})
					mi = JSON.parse(JSON.stringify(anu));
					ku =  mi[Math.floor(Math.random() * mi.length)];
					nye = await getBuffer(ku)
					client.sendMessage(from, nye, image, { caption: 'miku chan!!', quoted: mek })
					await limitAdd(sender) 
					break 
					case 'tagme':
                if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					var no = mek.participant
					const tag = {
					text: `@${no.split("@s.whatsapp.net")[0]} tag!`,
					contextInfo: { mentionedJid: [no] }
					}
					client.sendMessage(from, tag, text, {quoted: mek})
					break
				case 'cantikcek':
				case 'cekcantik':
				if (!isGroup) return reply(ind.groupo())
				if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					cantik = body.slice(11)
					if (args.length < 1) return reply('Yg Mau dicek Siapa Kak??')
					const can =['10% banyak" perawatan ya kak:v\nCanda Perawatan:v','30% Semangat Kaka Merawat Dirinya><','20% Semangat Ya Kaka👍','40% Wahh Kaka><','50% kaka cantik deh><','60% Hai Cantik🐊','70% Hai Ukhty🐊','62% Kakak Cantik><','74% Kakak ni cantik deh><','83% Love You Kakak><','97% Assalamualaikum Ukhty🐊','100% Kakak Pake Susuk ya??:v','29% Semangat Kakak:)','94% Hai Cantik><','75% Hai Kakak Cantik','82% wihh Kakak Pasti Sering Perawatan kan??','41% Semangat:)','39% Lebih Semangat🐊']
					const tik = can[Math.floor(Math.random() * can.length)]
					client.sendMessage(from, 'Pertanyaan : Cantik Cek Kakak *'+cantik+'*\n\nPersen Kecantikan : '+ tik +'', text, { quoted: mek })
					break
				case 'tiktok':
				if (!isGroup) return reply(ind.groupo())
				    if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (args.length < 1) return reply('Urlnya mana gan?')
					if (!isUrl(args[0]) && !args[0].includes('vt')) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://api.vhtear.com/tiktokdl?link=${args[0]}&apikey=${apikey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result.video)
					client.sendMessage(from, buffer, video, {quoted: mek})
					await limitAdd(sender)
					break
				case 'quotes':
					if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/quotesnime/random`, {method: 'get'})
					reply(anu.data.quote)
					await limitAdd(sender)
					break		
					case 'infonomor':
					if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
                    if (args.length < 1) return reply(`Masukan Nomor\nContoh : ${prefix}infonomor 0812345678`)
                data = await fetchJson(`https://docs-jojo.herokuapp.com/api/infonomor?no=${body.slice(11)}`)
                if (data.error) return reply(data.error)
                if (data.result) return reply(data.result)
                hasil = `╠➥ internasional : ${data.international}\n╠➥ nomor : ${data.nomor}\n╠➥ operator : ${data.op}`
                reply(hasil)
                await limitAdd(sender)
				break 
				case 'beritahoax':
                     if (!isRegistered) return reply(ind.noregis())
                     if (isLimit(sender)) return reply(ind.limitend(pusname))
                    client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://docs-jojo.herokuapp.com/api/infohoax`, {method: 'get'})
					teks = '=================\n'
					for (let i of data.result) {
						teks += `*Gambar* : ${i.image}\n*Title* : ${i.title}\n*link* : ${i.link}\n*tag* : ${i.tag}\n=================\n`
					}
					reply(teks.trim())
					await limitAdd(sender)
					break 
				case 'ytmp4':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (args.length < 1) return reply('Urlnya mana um?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(ind.stikga())
					anu = await fetchJson(`http://lolhuman.herokuapp.com/api/ytvideo/=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}\n*Size* : ${anu.filesize}`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek})
					await limitAdd(sender)
				break 
				case 'ytmp3':
                    if (!isRegistered) return reply(ind.noregis())
                    if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (args.length < 1) return reply('Urlnya mana um?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(ind.linkga())
					anu = await fetchJson(`http://lolhuman.herokuapp.com/api/ytaudio/${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}\n*Size* : ${anu.filesize}`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
					await limitAdd(sender)
					break
                case 'text3d':
                if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
              	    if (args.length < 1) return reply('teksnya mana kak?')
                    teks = `${body.slice(8)}`
                    if (teks.length > 10) return client.sendMessage(from, 'Teksnya kepanjangan, Maksimal 10 kalimat', text, {quoted: mek})
                    buff = await getBuffer(`https://docs-jojo.herokuapp.com/api/text3d?text=${teks}`, {method: 'get'})
                    client.sendMessage(from, buff, image, {quoted: mek, caption: `${teks}`})
			     	await limitAdd(sender)
				break
			    case 'fototiktok':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
                    gatauda = body.slice(12)
                    anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/tiktokpp?user=${gatauda}` , {method: 'get'})
			        buff = await getBuffer(anu.result)
                    reply(buff)
			        await limitAdd(sender)
				break
				//mhazria 
				case 'resepmasakan':
					if (!isRegistered) return reply(ind.noregis())
                   anu = await fetchJson(`https://mnazria.herokuapp.com/api/resep?key=${body.slice(14)}`, {method: 'get'})
                   if (anu.error) return reply(anu.error)
                   buff = await getBuffer(anu.thumb_item)
                   hasil = `*title* \n ${anu.title} *item_name* \n ${anu.item_name} *ingredient* \n${anu.ingredient} *step* \n${anu.step}`
                   client.sendMessage(from, buff, image, {quoted: mek, caption: hasil})
                   await limitAdd(sender)
					break 
					case 'bacotanhacker':
				if (isBanned) return reply(mess.only.benned)
				if (!isUser) return reply(mess.only.userB)
				reply(mess.wait)
				anu = await fetchJson(`http://itsmeikygans.my.id/bacotanhacker?apikey=itsmeiky633`, {method: 'get'})
				reply (anu.result)
                break
				case 'ssweb':
                if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (args.length < 1) return reply('Urlnya mana om')
					teks = body.slice(7)
					reply(ind.wait())
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/screenshotweb?url=${teks}`)
					buff = await getBuffer(anu.gambar)
					client.sendMessage(from, buff, image, {quoted: mek})
					await limitAdd(sender)
					break
					case 'walpaperhd':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (!isPublic) return reply(mess.only.publikG)
					if (args.length < 1) return reply('teks nya mana om')
					teksj = body.slice(7)
					reply(mess.wait)
					anwu = await fetchJson(`https://api.vhtear.com/walpaper?query=${teksj}&apikey=RamlanID`, {method: 'get'})
					bufferx = await getBuffer(anwu.result.LinkImg)
					client.sendMessage(from, bufferx, image, {quoted: mek})
					break
				case 'map':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
               	 anu = await fetchJson(`https://mnazria.herokuapp.com/api/maps?search=${body.slice(5)}`, {method: 'get'})
               	 buffer = await getBuffer(anu.gambar)
              	  client.sendMessage(from, buffer, image, {quoted: mek, caption: `${body.slice(5)}`})
				await limitAdd(sender)
				break
				case 'jarak':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
			    if (!isPublic) return reply(mess.only.publikG)
			    if (isLimit(sender)) return reply(limitend(pushname2))
			    jarak = `${body.slice(7)}`
			    ja = jarak.split("/")[0];
			    rak = jarak.split("/")[1];
			    anu = await fetchJson(`https://api.vhtear.com/distance?from=${ja}&to=${rak}&apikey=${VthearApi}`, {method: 'get'})
			    frhan.sendMessage(from, `${anu.result.data}`, text, {quoted: mek})
			    await limitAdd(sender) 
			    break  
			    case 'infoalamat':
			    if (isBanned) return reply(mess.only.benned)    
			    if (!isUser) return reply(mess.only.userB)
			    if (!isPublic) return reply(mess.only.publikG)
			    if (isLimit(sender)) return reply(limitend(pushname2))
			    reply(mess.wait)
                    anu = await fetchJson(`https://api.vhtear.com/infoalamat?query=${body.slice(12)}&apikey=${VthearApi}`, {method: 'get'})
			        frhan.sendMessage(from, `${anu.result.data}`, text, {quoted: mek})
			        await limitAdd(sender) 
			        break 
				case 'halo':
				if (!isGroup) return reply(ind.groupo())
				data = await fetchJson(`https://api.i-tech.id/tagihan/halo?key=${techkey}&no=${body.slice(6)}`)
				teks = `Nomor: ${data.nomor}\nNama: ${data.nama}\nTotal: ${data.total}\nStatus: ${data.status}\ntagihan: ${data.lembar_tagihan}`
				client.sendMessage(from, `${teks}`, MessageType.text, {quoted: mek})
				break
			case 'gas':
			if (!isGroup) return reply(ind.groupo())
				data = await fetchJson(`https://api.i-tech.id/tagihan/gas?key=${techkey}&no=${body.slice(5)}`)
				teks = `Nomor: ${data.nomor}\nNama: ${data.nama}\nTotal: ${data.total}\nStatus: ${data.status}\ntagihan: ${data.lembar_tagihan}`
				client.sendMessage(from, `${teks}`, MessageType.text, {quoted: mek})
				break
			case 'readall':
					if (!isOwner)return reply(mess.only.ownerB)
					var chats = await client.chats.all()
                    chats.map( async ({ jid }) => {
                          await client.chatRead(jid)
                    })
					teks = `\`\`\`Berhasil membaca ${chats.length} Chat !\`\`\``
					await client.sendMessage(from, teks, MessageType.text, {quoted: mek})
					console.log(chats.length)
					break
                case 'kbbi':
                if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (args.length < 1) return reply('Apa yang mau dicari um?')
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/kbbi?search=${body.slice(6)}`, {method: 'get'})
					reply('Menurut Kbbi:\n\n'+anu.result)
					await limitAdd(sender)
				break
				case 'nobg':
                                         
                                        if (!isUser) return reply(mess.only.userB)
                                        var imgbb = require('imgbb-uploader')
                                         if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                                         ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
                                         owgi = await client.downloadAndSaveMediaMessage(ger)
                                         anu = await imgbb("727e7e43f6cda1dfb85d888522fd4ce1", owgi)
                                        teks = `${anu.display_url}`
                                        ranpp = getRandom('.png')
                                        ranop = getRandom('.webp')
                                        anu1 = await fetchJson(`https://api.vhtear.com/removebgwithurl?link=${teks}&apikey=RamlanID`, {method: 'get'})
                                         exec(`wget ${anu1.result.image} -O ${ranpp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranop}`, (err) => {
                                                fs.unlinkSync(ranp)
                                                if (err) return reply(mess.error.stick)
                                                nobg = fs.readFileSync(ranop)
                                                client.sendMessage(from, nobg, sticker, {quoted: mek})
                                                fs.unlinkSync(ranop)
})
                                          } else {
                                                 reply('Gunakan foto!')
                                          }
                                        break
                case 'artinama':
                if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (args.length < 1) return reply('Apa yang mau dicari um?')
					anu = await fetchJson(`https://mnazria.herokuapp.com/api/arti?nama=${body.slice(10)}`, {method: 'get'})
					reply('Menurut nama:\n\n'+anu.result)
					await limitAdd(sender)
				break
				         case 'Assalamualaikum':
               client.reply(from, `Waalaikumsalam wr.wb${pushname}:)`)
                break
				//auto respond 
				case 'ping':
          		if (!isRegistered) return reply(ind.noregis())
           		 await client.sendMessage(from, `Pong!!!!\nSpeed: ${processTime(time, moment())} _Second_`)
					break
               case 'help': 
				case 'menu':
				if (!isRegistered) return reply(ind.noregis())
				    const reqXp  = 5000 * (Math.pow(2, getLevelingLevel(sender)) - 1)
				    const uangku = checkATMuser(sender)
					await costum(ind.menu(pushname, prefix, getLevelingLevel, getLevelingXp, sender, reqXp, _registered, uangku), text, tescuk, cr)
		costum(`
⚡Kamex I am zakigans⚡

┏━━━❖〘 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 〙❖━━⊱
┣➲ *Bot Type* : 𝐉𝐚𝐯𝐚𝐒𝐜𝐫𝐢𝐩𝐭
┣➲ *Nama* : ${pushname}
┣➲ *Nomer* : wa.me/${sender.split("@")[0]}
┣➲ *XP* : ${getLevelingXp(sender)}/${reqXp}
┣➲ *Level* : ${getLevelingLevel(sender)}
┣➲ *User register : ${_registered.length}
┗━━━━━━━━━━━━━━━━━━━━━━┛

●▬▬▬๑۩۩๑▬▬▬●
ᵗᵉʳⁱᵐᵃ ᵏᵃˢⁱʰ ˢᵘᵈᵃʰ 
ᵐᵉⁿᵍᵍᵘⁿᵃᵏᵃⁿ ᵇᵒᵗ
ʲᵃⁿᵍᵃⁿ ˡᵘᵖᵃ ᵈᵒⁿᵃˢⁱ
●▬▬▬๑۩۩๑▬▬▬●
-ᵇᵘᵍ ᶠⁱˣᵉᵈ
-ⁿᵉʷ ᶠᵘᵗᵘʳᵉ
-ᵗᵃᵐᵖⁱˡᵃⁿ ᵇᵃʳ
-ᵗʰᵉᵐᵉ ᵉʳᵉⁿ ʸᵉᵃᵍᵉʳ
●▬▬▬๑۩۩๑▬▬▬●

 ❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#info*
 ❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#donasi*
 ❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#owner*

❍━━━━━━ *TEXTMAKER* ━━━━━━━❍
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#sticker* 
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#stickergif*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#trigger* [PERBAIKAN]
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#quotemaker* <text|author>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#qrcode* <text>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#ttp*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#stickerhide* <text>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#emoji*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#tahta* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#blood* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#blood2* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#ice* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#2021* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#holographic* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#racun* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#metaldark* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#serem* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#strawberry* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#bunga* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#jokerlogo* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#bokeh* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#lawas* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#holiday* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#steel3d* <teks> | <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#prome* <teks> | <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#pronlogo* <teks> | <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#love* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#paper* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#slide* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#party* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#roman* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#glitch* <teks> | <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#apiteks* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#walpaperhd* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#nobg
❍━━━━━━━━━━━━━━━━━━❍
❍【♡ۣۜۜ፝͜͜͡͡✿➣  *FUN & GABUT*
❍━━━━━━━━━━━━━━━━━━❍
【♡ۣۜۜ፝͜͜͡͡✿➣ *#lirik* <text>
【♡ۣۜۜ፝͜͜͡͡✿➣ *#chord* <text>
【♡ۣۜۜ፝͜͜͡͡✿➣ *#bisakah* <teks>
【♡ۣۜۜ፝͜͜͡͡✿➣ *#kapankah* <teks>
【♡ۣۜۜ፝͜͜͡͡✿➣ *#apakah* <teks>
【♡ۣۜۜ፝͜͜͡͡✿➣ *#gantengcek* <tag member>
【♡ۣۜۜ፝͜͜͡͡✿➣ *#cantikcek* <tag member>
【♡ۣۜۜ፝͜͜͡͡✿➣ *#watak* <tag member>
【♡ۣۜۜ፝͜͜͡͡✿➣ *#hobby*
【♡ۣۜۜ፝͜͜͡͡✿➣ *#persengay* <tag member>
【♡ۣۜۜ፝͜͜͡͡✿➣ *#persenbucin* <tag member>
【♡ۣۜۜ፝͜͜͡͡✿➣ *#rate* <teks>
【♡ۣۜۜ፝͜͜͡͡✿➣ *#slap*
【♡ۣۜۜ፝͜͜͡͡✿➣ *#tampar*
【♡ۣۜۜ፝͜͜͡͡✿➣ *#moddroid* <teks>
【♡ۣۜۜ፝͜͜͡͡✿➣ *#happymod* <teks>
【♡ۣۜۜ፝͜͜͡͡✿➣ *#translate* [PERBAIKAN]
【♡ۣۜۜ፝͜͜͡͡✿➣ *#beritahoax*
【♡ۣۜۜ፝͜͜͡͡✿➣ *#jarak*
【♡ۣۜۜ፝͜͜͡͡✿➣ *#infoalamat* [jalan jombang]
【♡ۣۜۜ፝͜͜͡͡✿➣ *#indohot*
❍━━━━━━━━━━━━━━━━━━━━❍
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *PRIBADI BOT*
❍━━━━━━━━━━━━━━━━━━━━❍
【♡ۣۜۜ፝͜͜͡͡✿➣ *#mutual*
【♡ۣۜۜ፝͜͜͡͡✿➣ *#next*
❍━━━━━━━━━━━━━━━━━━━━❍
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *MEDIA & ISLAM*
❍━━━━━━━━━━━━━━━━━━━━❍
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#brainly* [Pertanyaan]
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#pinterest*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#resepmasakan* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#gstalk* <username>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#bitly* <link>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#tiktokstalk* <username>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#ssweb* <link>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#pinterest* <apa yang ingin cari>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#kbbi* <text>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#asupan*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#mimpi* <mimpi mu>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#artinama* <namamu>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#nulis* <nama|kls|teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#randomquran* [EROR]
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#fakta*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#meme*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#hekerbucin*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#bucin*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#katailham* [EROR]
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#wiki*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#film*
❍━━━━━━━━━━━━━━━━━━━❍
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *AUDIO* 
❍━━━━━━━━━━━━━━━━━━━❍
┣⊱ *#slow* <replay mp4/mp3>
┣⊱ *#bass* <replay mp4/mp3>
┣⊱ *#gemuk* <replay mp4/mp3>
┣⊱ *#toptt* <replay mp4/mp3>
┣⊱ *#tupai* <replay mp4/mp3>
┣⊱ *#tomp3* 
┣⊱ *#iri*
┣⊱ *#dj1*
┣⊱ *#dj2*
┣⊱ *#sound*
┣⊱ *#sound1*
┣⊱ *#sound2*
┣⊱ *#sound3*
┣⊱ *#sound4*
┣⊱ *#sound5*
┣⊱ *#sound6*
┣⊱ *#sound7*
❍━━━━━━━━━━━━━━━━━━━❍
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *YT & SONG*
❍━━━━━━━━━━━━━━━━━━━❍
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#yt* <link yt>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#yt3* <link yt>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#joox* <judul>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#ytmp4* <link>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#smule* <link>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#instavid* <link>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#instaimg* <link>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#instastory*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#snack* [LINK]
❍━━━━━━━━━━━━━━━━━━━❍
❍【♡ۣۜۜ፝͜͜͡͡✿➣  *MENU NSFW*
❍━━━━━━━━━━━━━━━━━━━❍
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#anjing*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#blowjob*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#nekonime*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#pokemon*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#nangis*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#cium*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#hentai*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#sideoppai*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#animebooty*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#animefeets*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#ecchi*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#bokep* <judul>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#randombokep* 
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#ahegao*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#nsfwwaifu*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#animethighss*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#hololewd*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#hentaiparadise*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#nsfwneko*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#nsfwloli*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#nsfwtrap*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#nsfwblowjob*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#peluk*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#ranime*
❍━━━━━━━━━━━━━━━━━━━❍
 ❍【♡ۣۜۜ፝͜͜͡͡✿➣ *UANG & LIMIT*
❍━━━━━━━━━━━━━━━━━━━❍
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#limit* 
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#buylimit* <jumblah>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#transfer* <tag |jumblah>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#dompet*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#leaderboard*
❍━━━━━━━━━━━━━━━━━━━❍
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *GROUP MENU* 
❍━━━━━━━━━━━━━━━━━━━❍
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#hidetag*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#blocklist*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#grouplist*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#level*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#linkgc*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#tagall*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#setpp*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#kicktime*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#del* <hapus chat>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#add* <tag>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#kick* <tag>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#setname* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#setdesc* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#demote* <tag>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#promote* <tag>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#listadmin*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#group* [buka/tutup]
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#leveling* [enable/disable]
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#nsfw* [1/0]
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#simih* [1/0]
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#welcome* [1/0]
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#antilinkgroup* [EROR]
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#hidetag50* [COBA AJA KALO EROR HUBUNGI ADMIN]
❍━━━━━━━━━━━━━━━━━━❍
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *OWNER MENU*
❍━━━━━━━━━━━━━━━━━━❍
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#bc* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#bcgc* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#kickall* <rawan ban>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#setreply* <teks>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#setprefixt* <EROR>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *[❗]JANGAN GANTI PREFIX #*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#clearall*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#block* <tag>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#unblock* <tag>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#leave*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#event* [1/0]
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#clone* <tag>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#setppbot*
❍━━━━━━━━━━━━━━━━━━❍
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *NEW FITUR*
❍━━━━━━━━━━━━━━━━━━❍
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#randombokep* 
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#caklontong*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#tebakgambar*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#family100*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#spamgmail*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#spamsms* <no> | <jumalh>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#spamcall* <0897xxxx>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#bokep* <judul>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#mimpi* <mimpi mu>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#artinama* <namamu>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#xvideos*
❍╰━━━━━━━━━━━━━
❍ ╭━━━━━━━━━━━━━
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#playstore* <search>
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#cerpen*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#cersex*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#ytsearch*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#quran*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#randomquran* [EROR]
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#infocuaca* <kota>
❍━━━━━━━━━━━━━━━━━━❍
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *ANIME & WIBU*
❍━━━━━━━━━━━━━━━━━━❍
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#loli*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#neko*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#naruto*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#minato*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#boruto*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#hinata*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#sasuke*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#sakura*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#kaneki*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#toukachan*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#rize*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#akira*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#itori*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#goku*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#kurumi*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#miku*
❍【♡ۣۜۜ፝͜͜͡͡✿➣ *#wait* <send image>
❍ ╰━━━━━━━━━━━━━
❍━━━━━━━━━━━━━━━━━━❍

╭──━─── ❀۝❀ ───━──╮
           *Z  K  I  G  A  N  S  B  O  T*
╰──━─── ❀۝❀ ───━──╯
┣━━⊱ *THANGKS TO* ⊰━━┫
┃
┣⊱ *Ariiq* <dev>
┣⊱ *Benni* <partner>
┣⊱ *Resta Fvnky* <sc ori>
┣⊱ *MrKing* <partner>
┣⊱ *Farhan* <partner>
┣⊱ *Resta Fvnky* <percodingan>
┣⊱ *Zaki* <percodingan>
┣⊱ *Surya* <percodingan>
┃
┃https://github.com/ZakiGans
┗━━⊱  ⸨ ZAKI 𝐁𝐎𝐓 ⸩  ⊰━━━━┛

					◩ 𝐌𝐑 𝐊𝐈𝐍𝐆 𝐁𝐎𝐓`, text, tescuk, cr)
					break
					
				case 'info':
					me = frhan.user
					user.push(sender)
					uptime = process.uptime()
					teks = `➽ *Nama Bot* : ${me.name}\n➽ *Owner Bot* : @${ownerNumber}\n➽ *prefix* : | ${prefix} |\n➽ *Total Block* : ${blocked.length}\n➽ *Aktif Sejak* : ${kyun(uptime)}\n\n➽ *Total Pengguna* : ${user.length} User\n➽ *Instagram* : https://www.instagram.com\n➽ *Special Thanks To* :\n\n➽ Allah SWT \n➽ MhankBarBar\n➽ Nurutomo\n➽ Monurios`
					buffer = await getBuffer(me.imgUrl)
					frhan.sendMessage(from, buffer, image, {quoted: mek, caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break 
				case 'blocklist': 
					teks = '𝗕𝗟𝗢𝗖𝗞 𝗟𝗜𝗦𝗧 :\n'
					for (let block of blocked) {
						teks += `┣➢ @${block.split('@')[0]}\n`
					}
					teks += `𝗧𝗼𝘁𝗮𝗹 : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break 
				case 'donasi':
				case 'donate':
				if (!isRegistered) return reply(ind.noregis())
					client.sendMessage(from, donasi(), text)
					break
				case 'admin':
         	   case 'owner':
         	   case 'creator':
                  client.sendMessage(from, {displayname: "Jeff", vcard: vcard}, MessageType.contact, { quoted: mek})
                  client.sendMessage(from, 'Tuh nomer owner ku >_<, jangan spam atau ku block kamu',MessageType.text, { quoted: mek} )
					break    
				case 'leaderboard':
				case 'lb':
				_level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
				uang.sort((a, b) => (a.uang < b.uang) ? 1 : -1)
                let leaderboardlvl = '-----[ *LEADERBOARD LEVEL* ]----\n\n'
                let leaderboarduang = '-----[ *LEADERBOARD UANG* ]----\n\n'
                let nom = 0
                try {
                    for (let i = 0; i < 10; i++) {
                        nom++
                        leaderboardlvl += `*[${nom}]* wa.me/${_level[i].id.replace('@s.whatsapp.net', '')}\n┗⊱ *XP*: ${_level[i].xp} *Level*: ${_level[i].level}\n`
                        leaderboarduang += `*[${nom}]* wa.me/${uang[i].id.replace('@s.whatsapp.net', '')}\n┣⊱ *Uang*: _Rp${uang[i].uang}_\n┗⊱ *Limit*: ${limitawal - _limit[i].limit}\n`
                    }
                    await reply(leaderboardlvl)
                    await reply(leaderboarduang)
                } catch (err) {
                    console.error(err)
                    await reply(`minimal 10 user untuk bisa mengakses database`)
                }
				break
				case 'limit':
				   if (!isRegistered) return reply(ind.noregis())
				   checkLimit(sender)
					break 
				case 'mutual':
                if (!isRegistered) return reply( ind.noregis())
                if (isGroup) return  reply( 'Command ini tidak bisa digunakan di dalam grup!')
                anug = getRegisteredRandomId(_registered).replace('@s.whatsapp.net','')
                await reply('Looking for a partner...')
                await reply(`wa.me/${anug}`)
                await reply( `Partner found: 🙉\n*${prefix}next* — find a new partner`)
            break
            case 'next':
                if (!isRegistered) return reply( ind.noregis())
                if (isGroup) return  reply( 'Command ini tidak bisa digunakan di dalam grup!')
                anug = getRegisteredRandomId(_registered).replace('@s.whatsapp.net','')
                await reply('Looking for a partner...')
                await reply(`wa.me/${anug}`)
                await reply( `Partner found: 🙉\n*${prefix}next* — find a new partner`)
            break
				case 'transfer':
				if (!isRegistered) return reply(ind.noregis())
				if (!q.includes('|')) return  reply(ind.wrongf())
                const tujuan = q.substring(0, q.indexOf('|') - 1)
                const jumblah = q.substring(q.lastIndexOf('|') + 1)
                if(isNaN(jumblah)) return await reply('jumlah harus berupa angka!!')
                if (jumblah < 100 ) return reply(`minimal transfer 100`)
                if (checkATMuser(sender) < jumblah) return reply(`uang mu tidak mencukupi untuk melakukan transfer`)
                const tujuantf = `${tujuan.replace("@", '')}@s.whatsapp.net`
                fee = 0.005 *  jumblah
                hasiltf = jumblah - fee
                addKoinUser(tujuantf, hasiltf)
                confirmATM(sender, jumblah)
                addKoinUser('6283144780782@s.whatsapp.net', fee)
                reply(`*「 SUKSES 」*\n\npengiriman uang telah sukses\ndari : +${sender.split("@")[0]}\nke : +${tujuan}\njumblah transfer : ${jumblah}\npajak : ${fee}`)
                break
				case 'dompet':
				if (!isRegistered) return reply(ind.noregis())
				const kantong = checkATMuser(sender)
				reply(ind.uangkau(pushname, sender, kantong))
				break
				case 'buylimit':
				if (!isRegistered) return reply(ind.noregis())
				payout = body.slice(10)
				if(isNaN(payout)) return await reply('limit harus berupa angka!!')
				const koinPerlimit = 300
				const total = koinPerlimit * payout
				if ( checkATMuser(sender) <= total) return reply(`maaf uang kamu belum mencukupi. silahkan kumpulkan dan beli nanti`)
				if ( checkATMuser(sender) >= total ) {
					confirmATM(sender, total)
					bayarLimit(sender, payout)
					await reply(`*「 PEMBAYARAN BERHASIL 」*\n\n*pengirim* : Admin\n*penerima* : ${pushname}\n*nominal pembelian* : ${payout} \n*harga limit* : ${koinPerlimit}/limit\n*sisa uang mu* : ${checkATMuser(sender)}\n\nproses berhasil dengan nomer pembayaran\n${createSerial(15)}`)
				} 
				break
				//no rest api 
				case 'slap':
                    kapankah = body.slice(1)
                    if (isLimit(sender)) return reply(ind.limitend(pusname))
					const slap =['anjing','babi lu','anak anjing','udah tolol nub Lagi','muka lo kek monyet','udah jomblo sendirian lagi dirumah tolol','so so an mau punya pacar muka aja kek monyet lepass dari kandang','ganteng doang di toxic aja dibilang baperan','pantek kau','bangsat kau','ku entod kalian nangis kau','memek lu semua','lihat anak anjing lagi baca','ganteng doang jemput cewe dipanggang','kamu cantik beb bullshit anjing cowo buaya','anak dajjal','puki lu','anjing ngajak gelud','sama hantu takut cupu ngentod','cupu cupu aja gausah bacot','kontol lu semua','bocah lu semua kontol','3 Hari Lagi']
					const ple = slap[Math.floor(Math.random() * slap.length)]
					pod = await getBuffer(`https://media.giphy.com/media/S8507sBJm1598XnsgD/source.gif`)
					client.sendMessage(from, pod, image, { quoted: mek, caption: '*Toxic*\n\n'+ ple })
					await limitAdd(sender)
					break
					case 'beritahoax':
                if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
                if (!isPublic) return reply(mess.only.publikG)
					client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://docs-jojo.herokuapp.com/api/infohoax`, {method: 'get'})
					teks = '=================\n'
					for (let i of data.result) {
						teks += `*Gambar* : ${i.image}\n*Title* : ${i.title}\n*link* : ${i.link}\n*tag* : ${i.tag}\n=================\n`
					}
					reply(teks.trim())
					break
					case 'wiki':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (!isPublic) return reply(mess.only.publikG)
                    if (args.length < 1) return reply('teks nya mana om?')
                    teks = body.slice(5)
                    reply(mess.wait)
                    anu = await fetchJson(`https://arugaz.herokuapp.com/api/wiki?q=${query}`, {method: 'get'})
                    if (anu.error) return reply(anu.error)
                    bufferfff = await getBuffer(anu.wiki)
                    hasil = `${anu.result}`
                    client.sendMessage(from, bufferfff, image, {quoted: mek, caption: hasil})
                   break
					case 'tampar':
					if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					buffer = await getBuffer('https://media.giphy.com/media/S8507sBJm1598XnsgD/source.gif', {method: 'get'})
					exec(`wget ${buffer.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender)
					break
				case 'brainly':
					if (!isRegistered) return reply(ind.noregis())
					if (isLimit(sender)) return reply(ind.limitend(pusname))
                    brien = body.slice(9)
					brainly(`${brien}`).then(res => {
					teks = '❉───────────❉\n'
					for (let Y of res.data) {
						teks += `\n*「 _BRAINLY_ 」*\n\n*➸ Pertanyaan:* ${Y.pertanyaan}\n\n*➸ Jawaban:* ${Y.jawaban[0].text}\n❉───────────❉\n`
					}
					client.sendMessage(from, teks, text, {quoted: mek, detectLinks: false})
                        console.log(res)
                    })
					await limitAdd(sender)
					break 
				case 'bisakah':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
					bisakah = body.slice(1)
					const bisa =['Bisa','Tidak Bisa','Coba Ulangi']
					const keh = bisa[Math.floor(Math.random() * bisa.length)]
					client.sendMessage(from, 'Pertanyaan : *'+bisakah+'*\n\nJawaban : '+ keh, text, { quoted: mek })
					await limitAdd(sender)
					break
				case 'kapankah':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
					kapankah = body.slice(1)
					const kapan =['Besok','Lusa','Tadi','4 Hari Lagi','5 Hari Lagi','6 Hari Lagi','1 Minggu Lagi','2 Minggu Lagi','3 Minggu Lagi','1 Bulan Lagi','2 Bulan Lagi','3 Bulan Lagi','4 Bulan Lagi','5 Bulan Lagi','6 Bulan Lagi','1 Tahun Lagi','2 Tahun Lagi','3 Tahun Lagi','4 Tahun Lagi','5 Tahun Lagi','6 Tahun Lagi','1 Abad lagi','3 Hari Lagi']
					const koh = kapan[Math.floor(Math.random() * kapan.length)]
					client.sendMessage(from, 'Pertanyaan : *'+kapankah+'*\n\nJawaban : '+ koh, text, { quoted: mek })
					await limitAdd(sender)
					break
           case 'apakah':
           if (!isRegistered) return reply(ind.noregis())
           if (isLimit(sender)) return reply(ind.limitend(pusname))
					apakah = body.slice(1)
					const apa =['Iya','Tidak','Bisa Jadi','Coba Ulangi']
					const kah = apa[Math.floor(Math.random() * apa.length)]
					client.sendMessage(from, 'Pertanyaan : *'+apakah+'*\n\nJawaban : '+ kah, text, { quoted: mek })
					await limitAdd(sender)
					break
				case 'rate':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
					rame = body.slice(1)
					const ra =['4','9','17','28','34','48','59','62','74','83','97','100','29','94','75','82','41','39']
					const me = ra[Math.floor(Math.random() * ra.length)]
					client.sendMessage(from, 'Pertanyaan : *'+rame+'*\n\nJawaban : '+ me+'%', text, { quoted: mek })
					await limitAdd(sender)
					break
				case 'truth':
                if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
                const trut =['Pernah suka sama siapa aja? berapa lama?','Kalau boleh atau kalau mau, di gc/luar gc siapa yang akan kamu jadikan sahabat?(boleh beda/sma jenis)','apa ketakutan terbesar kamu?','pernah suka sama orang dan merasa orang itu suka sama kamu juga?','Siapa nama mantan pacar teman mu yang pernah kamu sukai diam diam?','pernah gak nyuri uang nyokap atau bokap? Alesanya?','hal yang bikin seneng pas lu lagi sedih apa','pernah cinta bertepuk sebelah tangan? kalo pernah sama siapa? rasanya gimana brou?','pernah jadi selingkuhan orang?','hal yang paling ditakutin','siapa orang yang paling berpengaruh kepada kehidupanmu','hal membanggakan apa yang kamu dapatkan di tahun ini','siapa orang yang bisa membuatmu sange','siapa orang yang pernah buatmu sange','(bgi yg muslim) pernah ga solat seharian?','Siapa yang paling mendekati tipe pasangan idealmu di sini','suka mabar(main bareng)sama siapa?','pernah nolak orang? alasannya kenapa?','Sebutkan kejadian yang bikin kamu sakit hati yang masih di inget','pencapaian yang udah didapet apa aja ditahun ini?','kebiasaan terburuk lo pas di sekolah apa?']
					const ttrth = trut[Math.floor(Math.random() * trut.length)]
					truteh = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					client.sendMessage(from, truteh, image, { caption: '*Truth*\n\n'+ ttrth, quoted: mek })
					await limitAdd(sender)
					break
				case 'dare':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				const dare =['Kirim pesan ke mantan kamu dan bilang "aku masih suka sama kamu','telfon crush/pacar sekarang dan ss ke pemain','pap ke salah satu anggota grup','Bilang "KAMU CANTIK BANGET NGGAK BOHONG" ke cowo','ss recent call whatsapp','drop emot "🦄💨" setiap ngetik di gc/pc selama 1 hari','kirim voice note bilang can i call u baby?','drop kutipan lagu/quote, terus tag member yang cocok buat kutipan itu','pake foto sule sampe 3 hari','ketik pake bahasa daerah 24 jam','ganti nama menjadi "gue anak lucinta luna" selama 5 jam','chat ke kontak wa urutan sesuai %batre kamu, terus bilang ke dia "i lucky to hv you','prank chat mantan dan bilang " i love u, pgn balikan','record voice baca surah al-kautsar','bilang "i hv crush on you, mau jadi pacarku gak?" ke lawan jenis yang terakhir bgt kamu chat (serah di wa/tele), tunggu dia bales, kalo udah ss drop ke sini','sebutkan tipe pacar mu!','snap/post foto pacar/crush','teriak gajelas lalu kirim pake vn kesini','pap mukamu lalu kirim ke salah satu temanmu','kirim fotomu dengan caption, aku anak pungut','teriak pake kata kasar sambil vn trus kirim kesini','teriak " anjimm gabutt anjimmm " di depan rumah mu','ganti nama jadi " BOWO " selama 24 jam','Pura pura kerasukan, contoh : kerasukan maung, kerasukan belalang, kerasukan kulkas, dll']
					const der = dare[Math.floor(Math.random() * dare.length)]
					tod = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					client.sendMessage(from, tod, image, { quoted: mek, caption: '*Dare*\n\n'+ der })
					await limitAdd(sender)
					break				
				case 'ocr': 
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						reply(ind.wait())
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply('𝗸𝗶𝗿𝗶𝗺 𝗳𝗼𝘁𝗼 𝗱𝗲𝗻𝗴𝗮𝗻 𝗰𝗲𝗽𝘁𝗶𝗼𝗻 ${prefix}𝗼𝗰𝗿')
					}
					await limitAdd(sender)
				break             
              case 'persengay':
			case 'gaypersen':
			  if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (args.length < 1) return reply('tag temanmu!')
				rate = body.slice(11)
				persengayy = ["*4%*\n\n*Tobat Ngegay Gan:v*","*9%*\n\n*OTW Tobat Gan:v*","*17%*\n\n*Kang Coli*","*28%*\n\n*Buset Dah Gay🤦*","*34%*\n\n *Korban Tusbol*","*48%*\n\n*Kang Hunter Bool:v*","*59%*\n\n *Bahaya Ni Orang Gan*","*62%*\n\n*Hati² Sama Ni Orang Beneran Dah*","*74%*\n\n*Astagfirullah Kabur Gan🏃🌬️*","83%\n\n Yaallah Nak🤦","97%\n\nAstagfirullah🤦","100%\n\nKabur ae Gan Daripada Ditusbol Bool lu🏃","29%\n\n amann:v","94%\n\n Yaallah🏃","75%\n\nHadehh Gay🤦","82%\n\nMending Lu Tobat Dah🏃","41%\n\nSering Cari Bool Diperempatan","39%\n\nSering Tusbol Bool Topan🏃"]
				const kl = persengayy[Math.floor(Math.random() * persengayy.length)]
				client.sendMessage(from, 'Persen Gay: *'+rate+'*\n\nJawaban : '+kl+'', text, { quoted: mek })
				await limitAdd(sender) 
				break  
			case 'pbucin':
			case 'persenbucin':
			case 'bucinpersen':
			  if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (args.length < 1) return reply('Mana Nama?')
				rate = body.slice(8)
				persenbucin = ["4%\n\nHadehh🤦","9%\n\nMasih Kecil Dah Bucin Ae","17%\n\nNakk Masih Kecil","28%\n\nYoalahh hmm","34%\n\nMayan Lah","48%\n\nGatau","59%\n\nBiasa Kang Bucin","62%\n\n Hadehhh🏃","74%\n\n bucen Teroosss","83%\n\n Sekali² kek Ga bucin Gitu","97%\n\nHadehh Pakboi²","100%\n\nHadehhh Ini Bukan Bucin Tapi Pakboi","29%\n\nKasian Mana Masih Muda","94%\n\n Dasar Pakboi","75%\n\n Ya Ampun"]
				const pbucin = persenbucin[Math.floor(Math.random() * persenbucin.length)]
				client.sendMessage(from, 'Persen Bucin Kak: *'+rate+'*\n\nJawaban : '+ pbucin +'', text, { quoted: mek })
				await limitAdd(sender) 
				break 
                case 'stickergif':
                case 'sgif':
				case 'stiker': 
				case 'sticker':
				case 's':
				    if (isLimit(sender)) return reply(ind.limitend(pusname))
                    await limitAdd(sender)
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(ind.stikga())
							})
							.on('end', function () {
								console.log('Finish')
								buffer = fs.readFileSync(ran)
								client.sendMessage(from, buffer, sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(ind.wait())
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(ind.stikga())
							})
							.on('end', function () {
								console.log('Finish')
								buffer = fs.readFileSync(ran)
								client.sendMessage(from, buffer, sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
							} else {
						reply(`Kirim gambar dengan caption ${prefix}sticker atau reply/tag gambar`)
					}
				break
				case 'trigger':
					if (!isUser) return reply(mess.only.userB)
					if (!isPublic) return reply(mess.only.publikG)
					if (isBanned) return reply (mess.only.benned)
					if (isLimit(sender)) return reply(limits.limitend(pushname2))
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
					ger = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek 
					reply(mess.wait)
					owgi = await  frhan.downloadAndSaveMediaMessage(ger)
					anu = await imgbb("727e7e43f6cda1dfb85d888522fd4ce1", owgi)
					teks = `${anu.display_url}`
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu1 = `https://some-random-api.ml/canvas/triggered?avatar=${teks}`
					exec(`wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
					fs.unlinkSync(ranp)
					if (err) return reply(mess.error.stick)
					nobg = fs.readFileSync(rano)
					frhan.sendMessage(from, nobg, sticker, {quoted: mek})
					fs.unlinkSync(rano)
					})
					} else {
					reply('Gunakan foto!')
					}
					await limitAdd(sender) 
					break

				case 'tts':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				if (args.length < 1) return client.sendMessage(from, 'Diperlukan kode bahasa!!', text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, 'Textnya mana om', text, {quoted: mek})
					dtt = body.slice(8)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 600
					? reply('Textnya kebanyakan om')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buffer = fs.readFileSync(rano)
							if (err) return reply('Gagal om:(')
							client.sendMessage(from, buffer, audio, {quoted: mek, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					await limitAdd(sender)
				break
				case 'translate':
				case 'translete':
				if (isBanned) return reply(mess.only.benned)
				if (!isUser) return reply(mess.only.userB)
				if (!isPublic) return reply(mess.only.publikG)
				if (isLimit(sender)) return reply(limitend(pushname2))
				    if (args.length < 1) return frhan.sendMessage(from, 'Kode Bahasanya???', text, {quoted: mek})
				    if (args.length < 2) return frhan.sendMessage(from, 'Text Yg Mau Di translate??', text, {quoted: mek})
				    ts = body.slice(11)
				    kode = ts.split("/")[0]
				    teks = ts.split("/")[1]
				    anu = await fetchJson(`https://api.arugaz.my.id/api/edu/translate?lang=${kode}&text=${teks}`)
				    reply(mess.wait)
				    translate = `Text Asli: *${body.slice(11)}*\n\nHasil: *${anu.text}*`
				    frhan.sendMessage(from, translate, text, {quoted: mek})
				   await limitAdd(sender)
				   break 
				case 'simi':
					if (args.length < 1) return reply('Textnya mana um?')
					teks = body.slice(5)
					anu = await simih(teks) 
					reply(anu)
				break 
				case 'toimg':
				if (!isRegistered) return reply(ind.noregis())
				if (!isQuotedSticker) return reply('𝗥𝗲𝗽𝗹𝘆/𝘁𝗮𝗴 𝘀𝘁𝗶𝗰𝗸𝗲𝗿 !')
					reply(ind.wait())
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: '𝗱𝗮?? 𝗷𝗮𝗱𝗶 '})
						fs.unlinkSync(ran)
					})
					await limitAdd(sender)
				break 
				case 'film':
				if (isBanned) return reply(mess.only.benned)
				if (!isUser) return reply(mess.only.userB)
				if (!isPublic) return reply(mess.only.publikG)
				if (isLimit(sender)) return reply(limitend(pushname2))
				if (args.length < 1) return reply('Mau Cari Film Apa?')
				reply(mess.wait)
				anu = await fetchJson(`http://www.omdbapi.com/?s=${body.slice(6)}&plot=full&apikey=56b1b6f0&r=json`, {method: 'get'})
				hasil = '=========================\n'
				for(let film of anu.Search) {
				hasil += `• *Title:* ${film.Title}\n• *Rilis Tahun:* ${film.Year}\n• *Type:* ${film.Type}\n• *Link:* https://m.imdb.com/title/${film.imdbID}\n=========================\n`
				}
				reply(hasil.trim())
				await limitAdd(sender) 
					break 
				case 'tiktokstalk':
				if (!isRegistered) return reply(ind.noregis())
				if (isLimit(sender)) return reply(ind.limitend(pusname))
				try {
						if (args.length < 1) return client.sendMessage(from, '𝘂𝘀𝗲??𝗻𝗮𝗺𝗲 𝗺𝗮𝗻𝗮 ?', text, {quoted: mek})
						let { user, stats } = await tiktod.getUserProfileInfo(args[0])
						reply(ind.wait())
						teks = `*ID* : ${user.id}\n*Username* : ${user.uniqueId}\n*Nickname* : ${user.nickname}\n*Followers* : ${stats.followerCount}\n*Followings* : ${stats.followingCount}\n*Posts* : ${stats.videoCount}\n*Luv* : ${stats.heart}\n`
						buffer = await getBuffer(user.avatarLarger)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: teks})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('[𝗘𝗥𝗥𝗢𝗥] 𝗸𝗲𝗺𝘂𝗻𝗴𝗸𝗶𝗻𝗮𝗻 𝘂𝘀𝗲𝗿𝗻𝗮𝗺𝗲 𝘁𝗶𝗱𝗮𝗸 𝘃𝗮𝗹𝗶𝗱')
					}
					await limitAdd(sender)
				break
				//group feature 
				case 'hidetag':
                if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					var value = body.slice(9)
					var group = await client.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: mek
					}
					client.sendMessage(from, options, text)
					await limitAdd(sender)
					break
					case 'hidetag50':
					if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
					if (!isPublic) return reply(mess.only.publikG)
					if (!isGroup) return reply(mess.only.group)
					if (!isPremium) return reply(mess.only.premium)
					var value = body.slice(10)
					var group = await client.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: mek
					}
					client.sendMessage(from, options, text)
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                 .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                 .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                 .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                 .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                 .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                 .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                 .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                 .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	.then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                 .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
	                .then(() => {client.sendMessage(from, options, text)})
					break
				case 'add':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
					if (args.length < 1) return reply('Yang mau di add jin ya?')
					if (args[0].startsWith('08')) return reply('Gunakan kode negara mas')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('Gagal menambahkan target, mungkin karena di private')
					}
				break 
				case 'level':
                if (!isRegistered) return reply(ind.noregis())
                if (!isLevelingOn) return reply(ind.lvlnoon())
                if (!isGroup) return reply(ind.groupo())
                const userLevel = getLevelingLevel(sender)
                const userXp = getLevelingXp(sender)
                if (userLevel === undefined && userXp === undefined) return reply(ind.lvlnul())
                const requiredXp = 5000 * (Math.pow(2, userLevel) - 1)
                resul = `┏━━❉ *LEVEL* ❉━━\n┣⊱ *Nama* : ${pushname}\n┣⊱ Nomor : wa.me/${sender.split("@")[0]}\n┣⊱ User XP :  ${userXp}/${requiredXp}\n┣⊱ User Level : ${userLevel}\n┗━━━━━━━━━━━━`
               client.sendMessage(from, resul, text, { quoted: mek})
                .catch(async (err) => {
                        console.error(err)
                        await reply(`Error!\n${err}`)
                    })
				break 
				case 'antilinkgroup':
                    if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('ketik 1 untuk mengaktifkan')
					if (Number(args[0]) === 1) {
						if (isAntiLink) return reply('anti link group sudah aktif')
						antilink.push(from)
						fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink))
						reply('Sukses mengaktifkan anti link group di group ini ✔️')
						client.sendMessage(from,`Perhatian kepada seluruh member anti link group aktif apabila anda mengirim link group anda akan di kick dari group`, text)
					} else if (Number(args[0]) === 0) {
						if (isAntiLink) return reply('Mode anti link group sudah disable')
						var ini = anti.indexOf(from)
						antilink.splice(ini, 1)
						fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink))
						reply('Sukes menonaktifkan anti link group di group ini ✔️')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
					}
					break
					
				case 'mining':
                      if (!isRegistered) return reply(ind.noregis())
                      if (isLimit(sender)) return reply(ind.limitend(pushname))
                      if (!isEventon) return reply(`maaf ${pushname} event mining tidak di aktifkan oleh owner`)
                      if (isOwner) {
                      const one = 999999999
                      addLevelingXp(sender, one)
                      addLevelingLevel(sender, 99)
                      reply(`karena anda owner kami dari team bot mengirim ${one}Xp untuk anda`)
                      }else{
                      const mining = Math.ceil(Math.random() * 10000)
                      addLevelingXp(sender, mining)
                      await reply(`*selamat* ${pushname} kamu mendapatkan *${mining}Xp*`)
                      }
                    await limitAdd(sender)
					break
				case 'grup':
				case 'group':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
					if (args[0] === 'buka') {
					    reply(`*BERHASIL MEMBUKA GROUP*`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'tutup') {
						reply(`*BERHASIL MENUTUP GROUP`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
				break      
				case 'setname':
                if (!isGroup) return reply(ind.groupo())
			    if (!isGroupAdmins) return reply(ind.admin())
				if (!isBotGroupAdmins) return reply(ind.badmin())
                client.groupUpdateSubject(from, `${body.slice(9)}`)
                client.sendMessage(from, 'Succes, Ganti Nama Grup', text, {quoted: mek})
					break
                case 'setdesc':
                if (!isGroup) return reply(ind.groupo())
			    if (!isGroupAdmins) return reply(ind.admin())
				if (!isBotGroupAdmins) return reply(ind.badmin())
                client.groupUpdateDescription(from, `${body.slice(9)}`)
                client.sendMessage(from, 'Succes, Ganti Deskripsi Grup', text, {quoted: mek})
					break
           case 'demote':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('𝗧𝗮𝗴 𝘁𝗮𝗿𝗴𝗲𝘁 𝘆𝗮𝗻𝗴 𝗶𝗻𝗴𝗶𝗻 𝗱𝗶 𝘁𝗲𝗻𝗱𝗮𝗻𝗴!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `*jabatan kamu di copot*🏃 :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`𝘆𝗮𝗵𝗵 @${mentioned[0].split('@')[0]} 𝗷𝗮??𝗮??𝗮𝗻 𝗮𝗱𝗺𝗶𝗻 𝗸𝗮𝗺𝘂 𝘀??𝗱𝗮𝗵 𝗱𝗶 𝗰𝗼𝗽𝗼𝘁🏃`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'promote':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('𝗧𝗮𝗴 ??𝗮??𝗴𝗲𝘁 𝘆𝗮𝗻𝗴 𝗶𝗻𝗴𝗶𝗻 𝗱𝗶 𝘁𝗲𝗻𝗱𝗮𝗻𝗴!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `𝗦𝗲𝗹𝗮𝗺𝗮𝘁🥳 𝗮𝗻𝗱𝗮 𝗻𝗮𝗶𝗸 𝗺𝗲𝗻𝗷𝗮𝗱𝗶 𝗮𝗱𝗺𝗶𝗻 𝗴𝗿𝗼𝘂𝗽 (+_+) :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`𝗦𝗲𝗹𝗮𝗺𝗮𝘁🥳 @${mentioned[0].split('@')[0]} *anda naik menjadi admin group* (+_+)`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					break	
			     	case 'kick':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (!isBotGroupAdmins) return reply(ind.badmin())
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('𝗧𝗮𝗴 𝘁𝗮𝗿𝗴𝗲𝘁 ??𝗮𝗻𝗴 𝗶𝗻𝗴𝗶𝗻 𝗱?? 𝘁𝗲𝗻𝗱𝗮𝗻𝗴!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `𝗔𝘀𝗲𝗸 𝗱𝗮𝗽𝗮𝘁 𝗺𝗮𝗸𝗮𝗻𝗮𝗻,𝗼𝘁𝘄 𝗸𝗶𝗰𝗸 🏃 :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`𝗔𝘀𝗲𝗸 𝗱𝗮𝗽𝗮𝘁 𝗺𝗮𝗸𝗮𝗻𝗮𝗻,𝗼𝘁𝘄 𝗸𝗶𝗰𝗸 @${mentioned[0].split('@')[0]} 🏃`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break
				case 'listadmin':
					if (!isGroup) return reply(ind.groupo())
					teks = `𝗟𝗶𝘀𝘁 𝗮𝗱𝗺𝗶𝗻 𝗼𝗳 𝗴𝗿𝗼𝘂𝗽 *${groupMetadata.subject}*\n𝗧𝗼𝘁𝗮𝗹 : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
				case 'welcome':
				if (isBanned) return reply(mess.only.benned)    
				if (!isUser) return reply(mess.only.userB)
				if (!isPublic) return reply(mess.only.publikG)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('Udah aktif um')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('Sukses mengaktifkan fitur welcome di group ini ✔️')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('Sukses menonaktifkan fitur welcome di group ini ✔️')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
					}
					case 'simih':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (args.length < 1) return reply('Boo :𝘃')
					if (Number(args[0]) === 1) {
						if (isSimi) return reply('𝘀𝘂𝗱𝗮𝗵 𝗮𝗸𝘁𝗶𝗳 !!!')
						samih.push(from)
						fs.writeFileSync('./database/bot/simi.json', JSON.stringify(samih))
						reply('❬ 𝗦𝗨𝗞𝗦𝗘𝗦 ❭ 𝗠𝗲𝗻𝗴𝗮??𝘁𝗶𝗳𝗸𝗮𝗻 𝗳𝗶𝘁𝘂𝗿 𝘀𝗶𝗺𝗶 𝗱𝗶 𝗴𝗿𝗼𝘂𝗽 𝗶𝗻𝗶️')
					} else if (Number(args[0]) === 0) {
						samih.splice(from, 1)
						fs.writeFileSync('./database/bot/simi.json', JSON.stringify(samih))
						reply('❬ 𝗦𝗨𝗞𝗦𝗘𝗦 ❭ 𝗠𝗲𝗻𝗼𝗻𝗮𝗸𝘁𝗶𝗳𝗸𝗮𝗻 𝗳𝗶𝘁𝘂𝗿 𝘀𝗶𝗺𝗶 𝗱𝗶 𝗴𝗿𝗼𝘂𝗽 𝗶𝗻𝗶️️')
					} else {
						reply(ind.satukos())
					}
					break
                  case 'delete':
					case 'del':
					case 'd':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					client.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
					break
               case 'kicktime':
                   if (!isBotGroupAdmins) return reply(ind.badmin())
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					setTimeout( () => {
					client.sendMessage(from, 'Yok Sama" Al-fatihah', text)
					}, 8000)
					setTimeout( () => {
					reply('sukses min:D')
					}, 7000)
					setTimeout( () => {
					client.groupRemove(from, mentioned)
					}, 6000)
					setTimeout( () => {
					client.sendMessage(from, `Bismilah Kick @${mentioned[0].split('@')[0]}`, text) // ur cods
					}, 5000)
					setTimeout( () => {
					client.sendMessage(from, 'Asikkk Dapet Makanan nihh:D', text)
					}, 2500)
					setTimeout( () => {
					reply('Perintah Diterima min:D')
					}, 0)
					break
				case 'nsfw':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (args.length < 1) return reply('Boo :𝘃')
					if (Number(args[0]) === 1) {
						if (isNsfw) return reply(' *sudah aktif*  !!')
						nsfw.push(from)
						fs.writeFileSync('./database/bot/nsfw.json', JSON.stringify(nsfw))
						reply('❬ 𝗦𝗨𝗞𝗦𝗘𝗦 ❭ 𝗠𝗲𝗻𝗴𝗮𝗸𝘁𝗶𝗳𝗸𝗮𝗻 𝗳𝗶𝘁𝘂𝗿 𝗻𝘀𝗳𝘄 𝗱𝗶 𝗴𝗿𝗼𝘂𝗽 𝗶𝗻𝗶')
					} else if (Number(args[0]) === 0) {
						nsfw.splice(from, 1)
						fs.writeFileSync('./database/bot/nsfw.json', JSON.stringify(nsfw))
						reply('❬ 𝗦𝗨𝗞𝗦𝗘𝗦 ❭ 𝗠𝗲𝗻𝗼𝗻𝗮𝗸𝘁𝗶𝗳𝗸𝗮𝗻 𝗳𝗶𝘁𝘂𝗿 𝗻𝘀𝗳𝘄 𝗱𝗶 𝗴𝗿𝗼𝘂𝗽 𝗶𝗻𝗶️')
					} else {
						reply(ind.satukos())
					}
				break
                case 'leveling':
                if (!isGroup) return reply(ind.groupo())
                if (!isGroupAdmins) return reply(ind.admin())
                if (args.length < 1) return reply('Boo :??')
                if (args[0] === 'enable') {
                if (isLevelingOn) return reply('*fitur level sudah aktif sebelum nya*')
                 	   _leveling.push(from)
                 	   fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                  	   reply(ind.lvlon())
              	  } else if (args[0] === 'disable') {
                  	  _leveling.splice(from, 1)
                 	   fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                 	    reply(ind.lvloff())
             	   } else {
                 	   reply(ind.satukos())
                	}
				break
				case 'linkgc':
				    if (!isGroup) return reply(ind.groupo())
				    if (isLimit(sender)) return reply(ind.limitend(pusname))
				    if (!isBotGroupAdmins) return reply(ind.badmin())
				    linkgc = await client.groupInviteCode (from)
				    yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`
				    client.sendMessage(from, yeh, text, {quoted: mek})
			        await limitAdd(sender)
					break
				case 'tagall':
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `┣➥ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break
					
					
				//admin feature 
				case 'kickall':
                    if (!isOwner) return reply(ind.ownerb())
			        members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `*😘* ${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					client.groupRemove(from, members_id)
					break 
					case 'setreply':
					if (!isOwner) return reply(ind.ownerb())
                    client.updatePresence(from, Presence.composing) 
					if (args.length < 1) return
					cr = body.slice(10)
					reply(`reply berhasil di ubah menjadi : ${cr}`)
					await limitAdd(sender)
					break 
				case 'clone':
					if (!isGroup) return reply(ind.groupo())
					if (!isOwner) return reply(ind.ownerg()) 
					if (args.length < 1) return reply(' *TAG YANG MAU DI CLONE!!!* ')
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag cvk')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await client.getProfilePicture(id)
						buffer = await getBuffer(pp)
						client.updateProfilePicture(botNumber, buffer)
						mentions(`Foto profile Berhasil di perbarui menggunakan foto profile @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply(ind.stikga())
					}
					break
			  	case 'event':
					if (!isGroup) return reply(ind.groupo())
					if (!isOwner) return reply(ind.ownerb())
					if (args.length < 1) return reply('Boo :𝘃')
					if (Number(args[0]) === 1) {
						if (isEventon) return reply('*SUDAH AKTIF* !!!')
						event.push(from)
						fs.writeFileSync('./database/bot/event.json', JSON.stringify(event))
						reply('*❬ 𝗦𝗨𝗞𝗦𝗘𝗦 ❭ 𝗠𝗲𝗻𝗴𝗮𝗸𝘁𝗶𝗳𝗸𝗮𝗻 EVENT 𝗱𝗶 𝗴𝗿𝗼𝘂𝗽 𝗶𝗻𝗶️*')
					} else if (Number(args[0]) === 0) {
						event.splice(from, 1)
						fs.writeFileSync('./database/bot/event.json', JSON.stringify(event))
						reply('*❬ 𝗦𝗨𝗞𝗦𝗘𝗦 ❭ 𝗠𝗲𝗻𝗼𝗻𝗮𝗸𝘁𝗶𝗳𝗸??𝗻 EVENT 𝗱𝗶 𝗴𝗿𝗼𝘂𝗽 𝗶𝗻𝗶️*')
					} else {
						reply(ind.satukos())
					}
					break
				case 'block':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(ind.groupo())
					if (!isOwner) return reply(ind.ownerb())
					client.blockUser (`${body.slice(8)}@c.us`, "add")
					client.sendMessage(from, `perintah Diterima, memblokir wa.me${body.slice(8)}@c.us`, text)
				break
				case 'unblock':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(ind.group())
					if (!isOwner) return reply(ind.ownerb())
					client.blockUser (`${body.slice(10)}@c.us`, "remove")
					client.sendMessage(from, `perintah Diterima, membuka blokir wa.me/${body.slice(10)}`, text)
				break 
				case 'setppbot':
					if (!isOwner) return reply(ind.ownerb())
				    client.updatePresence(from, Presence.composing) 
					if (!isQuotedImage) return reply(`Kirim gambar dengan caption ${prefix}setbotpp atau tag gambar yang sudah dikirim`)
					enmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(enmedia)
					await client.updateProfilePicture(botNumber, media)
					reply('Makasih profil barunya😗')
					break 
				case 'setpp': 
                        if (!isGroup) return reply(ind.groupo())
                       if (!isGroupAdmins) return reply(ind.admin())
                        if (!isBotGroupAdmins) return reply(ind.badmin())
                       media = await client.downloadAndSaveMediaMessage(mek)
                         await client.updateProfilePicture (from, media)
                        reply('SUCCESS CHANGE PROFILE GROUP')
					break				
				case 'leave': 
				if (!isGroup) return reply(ind.groupo())
				if (!isOwner) return reply(ind.ownerb())
				await reply(from, 'bye').then(() => client.groupLeave(groupId))
					break
				case 'bc': 
					if (!isOwner) return reply(ind.ownerb()) 
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `❮ 𝙋𝙀𝙎𝘼?? 𝘽??𝙊𝘼𝘿𝘾𝘼𝙎𝙏 ❯\n\n${body.slice(4)}`})
						}
						reply('𝙨𝙪𝙘𝙘𝙚𝙨𝙨 𝙗𝙧𝙤𝙖𝙙𝙘𝙖𝙨𝙩 ')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `*「 BROADCAST BOT 」*\n\n${body.slice(4)}`)
						}
						reply('𝙨𝙪𝙘𝙘𝙚𝙨𝙨 𝙗𝙧𝙤𝙖𝙙𝙘𝙖𝙨𝙩 ')
					}
					break
					case 'clearall':
					if (!isOwner) return reply(ind.ownerb())
					anu = await client.chats.all()
					client.setMaxListeners(25)
					for (let _ of anu) {
						client.deleteChat(_.jid)
					}
					reply(ind.clears())
				break
				case 'setprefix':
					if (args.length < 1) return
					if (!isOwner) return reply(ind.ownerb())
                    prefix = args[0]
                    reply(`Change Prefix To ${prefix} SUCCESS!`)
					break 
				case 'setmemlimit':
					if (args.length < 1) return
					if (!isOwner) return reply(ind.ownerb())
					if (isNaN(args[0])) return reply('limit harus angka')
                    memberlimit = args[0]
                    reply(`Change Member limit To ${memberlimit} SUCCESS!`)
				break 
				case 'bcgc':
				     if (!isOwner) return reply(ind.ownerb())
					if (args.length < 1) return reply('.......')
					anu = await groupMembers
					nom = mek.participant
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `*「 BC GROUP 」*\n\nDari Grup : ${groupName}\nPengirim : wa.me/${(sender.split('@')[0])}\nPesan : ${body.slice(6)}`})
						}
						reply('')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `*「 BC GROUP 」*\n\nDari Grup : ${groupName}\nPengirim : wa.me/${(sender.split('@')[0])}\nPesan : ${body.slice(6)}`)
						}
						reply('Sukses broadcast group')
					}
					break 
					
					
				default:
			if (body.startsWith(`${prefix}${command}`)) {
                  reply(`Maaf *${pushname}*, Command *${prefix}${command}* Tidak Terdaftar Di Dalam *${prefix}menu*`)
                  }
			if (isGroup && !isCmd && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						reply(ind.cmdnf(prefix, command))
					} else {
						console.log(color('[ERROR]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
					}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
