// special thhanks to Skyzo for this

require("./all/global")
const func = require("./all/place")
const readline = require("readline")
const yargs = require('yargs/yargs')
const _ = require('lodash')
const text2png = require ('wa-sticker-formatter')
const reseller = JSON.parse(fs.readFileSync("./all/database/setsudo.json"))
const usePairingCode = true
const question = (text) => {
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
})
return new Promise((resolve) => {
rl.question(text, resolve)
})}


var low
try {
low = require('lowdb')
} catch (e) {
low = require('./all/lowdb')
}

const { Low, JSONFile } = low
const mongoDB = require('./all/mongoDB')
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
      new mongoDB(opts['db']) :
      new JSONFile(`./all/database/database.json`)
)
global.DATABASE = global.db
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
  if (global.db.data !== null) return
global.db.READ = true
await global.db.read()
global.db.READ = false
global.db.data = {
    users: {},
    chats: {},
    others: {},
    ...(global.db.data || {})
  }
global.db.chain = _.chain(global.db.data)
}
loadDatabase()

if (global.db) setInterval(async () => {
if (global.db.data) await global.db.write()
}, 30 * 1000)


async function startSesi() {
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const { state, saveCreds } = await useMultiFileAuthState(`./session`)
let _welcome = JSON.parse(fs.readFileSync('./all/database/welcome.json'))
let _left = JSON.parse(fs.readFileSync('./all/database/left.json'))
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, sleep, reSize } = require('./all/myfunc')
const { version, isLatest } = await fetchLatestBaileysVersion()
const getMessage = async (key) => {
if (store) {
const msg = await store.loadMessage(key.remoteJid, key.id, undefined)
return msg?.message || undefined
}
return {
conversation: 'hallo'
}
}

const auth = {
creds: state.creds,
keys: makeCacheableSignalKeyStore(state.keys, pino().child({ level: 'fatal', stream: 'store' })),
}

const connectionOptions = {
version,
keepAliveIntervalMs: 30000,
getMessage,
printQRInTerminal: !usePairingCode,
logger: pino({ level: "fatal" }),
auth,
browser: ["Ubuntu", "Chrome", "20.0.04"]
}
const Skyzo = func.makeWASocket(connectionOptions)
if (usePairingCode && !Skyzo.authState.creds.registered) {
const phoneNumber = await question(color('Enter Whatsapp Number Starting with your country code 234:\n', 'red'));
const code = await Skyzo.requestPairingCode(phoneNumber.trim())
console.log(`${chalk.redBright('Your Pairing Code')} : ${code}`)
}
store.bind(Skyzo.ev)

Skyzo.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
const reason = new Boom(lastDisconnect?.error)?.output.statusCode
console.log(color(lastDisconnect.error, 'deeppink'))
if (lastDisconnect.error == 'Error: Stream Error (unknown)') {
process.exit()
} else if (reason === DisconnectReason.badSession) {
console.log(color(`Bad Session File, Please Delete Session and Scan Again`))
process.exit()
} else if (reason === DisconnectReason.connectionClosed) {
console.log(color('[SYSTEM]', 'white'), color('Connection closed, reconnecting...', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionLost) {
console.log(color('[SYSTEM]', 'white'), color('Connection lost, trying to reconnect', 'deeppink'))
process.exit()
} else if (reason === DisconnectReason.connectionReplaced) {
console.log(color('Connection Replaced, Another New Session Opened, Please Close Current Session First'))
Skyzo.logout()
} else if (reason === DisconnectReason.loggedOut) {
console.log(color(`Device Logged Out, Please Scan Again And Run.`))
Skyzo.logout()
} else if (reason === DisconnectReason.restartRequired) {
console.log(color('Restart Required, Restarting...'))
await startSesi()
} else if (reason === DisconnectReason.timedOut) {
console.log(color('Connection TimedOut, Reconnecting...'))
startSesi()
}
} else if (connection === "connecting") {
console.log(color('Connecting...'))
} else if (connection === "open") {
Skyzo.sendMessage(owner+"@s.whatsapp.net", {text: "𝐀𝐧𝐲 𝐬𝐮𝐟𝐟𝐢𝐜𝐞𝐧𝐭𝐥𝐲 𝐀𝐝𝐯𝐚𝐧𝐜𝐞𝐝 𝐭𝐞𝐜𝐡𝐧𝐨𝐥𝐨𝐠𝐲 𝐢𝐬 𝐞𝐪𝐮𝐢𝐯𝐚𝐥𝐞𝐧𝐭 𝐭𝐨 𝐦𝐚𝐠𝐢𝐜 🙊💕 \n 𝐭𝐡𝐚𝐧𝐤𝐬 𝐟𝐨𝐫 𝐮𝐬𝐢𝐧𝐠 𝐩𝐫𝐨𝐣𝐞𝐜𝐭 𝐀𝐫𝐜𝐡 ☘ 𝐝𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐝 𝐛𝐲 𝐞𝐝𝐧𝐮𝐭 🤯 \n> Channel:- https://whatsapp.com/channel/0029VamspnPB4hdUnvLaIX17 \n> Group:- https://chat.whatsapp.com/HO2JGN8YHr9IOf4XOSRhGe \n> Owner: Wa.me/2347036214381 \n> 2nd owner:- wa.me/2348102487241 \n 𝒔𝒑𝒆𝒄𝒊𝒂𝒍 𝒕𝒉𝒂𝒏𝒌𝒔 𝒕𝒐 𝒕𝒆𝒂𝒎 𝒆𝒅𝒏𝒖𝒕 𝒂𝒏𝒅 𝒎𝒐𝒔𝒕𝒍𝒚 𝒈𝒓𝒆𝒚 𝒄𝒍𝒂𝒏 🦋"})
console.log(color('Succesfully Connected into Arch server'))
}
})

Skyzo.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)}
await Skyzo.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer}

Skyzo.sendList = async (jid, title, footer, btn, options = {}) => {
let msg = generateWAMessageFromContent(jid, {
viewOnceMessage: {
message: {
"messageContextInfo": {
"deviceListMetadata": {},
"deviceListMetadataVersion": 2
},
interactiveMessage: proto.Message.InteractiveMessage.create({
...options,
body: proto.Message.InteractiveMessage.Body.create({ text: title }),
footer: proto.Message.InteractiveMessage.Footer.create({ text: footer || "Powered By KayyTwelve" }),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: [
{
"name": "single_select",
"buttonParamsJson": JSON.stringify(btn)
},
]
})
})
}
}
}, {})
return await Skyzo.relayMessage(msg.key.remoteJid, msg.message, {
messageId: msg.key.id
})
}

Skyzo.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)}
await Skyzo.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer}

let parseMention = text => [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')

Skyzo.sendImageAsStickerAV = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImgAV(buff, options)
} else {
buffer = await imageToWebp2(buff)}
await Skyzo.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer}

Skyzo.sendImageAsStickerAvatar = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp3(buff)}
await Skyzo.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer}

Skyzo.ev.on('call', async (user) => {
if (!global.anticall) return
let botNumber = await Skyzo.decodeJid(Skyzo.user.id)
for (let ff of user) {
if (ff.isGroup == false) {
if (ff.status == "offer") {
let sendcall = await Skyzo.sendMessage(ff.from, {text: `@${ff.from.split("@")[0]} Sorry, I Will Block You Because the Bot Owner Turned on the *Anti Call* Feature\nIf You Accidentally Contact the Owner Immediately to Unblock This`, contextInfo: {mentionedJid: [ff.from], externalAdReply: {thumbnailUrl: "https://telegra.ph/file/d29baa62079de1f3e9ba7.jpg", title: "CALL DETECTED", previewType: "PHOTO"}}}, {quoted: null})
Skyzo.sendContact(ff.from, [owner], "Call or Vc = Block", sendcall)
await sleep(8000)
await Skyzo.updateBlockStatus(ff.from, "block")
}}
}})


Skyzo.ev.on('messages.upsert', async (chatUpdate) => {
try {
m = chatUpdate.messages[0]
if (!m.message) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
if (!Skyzo.public && m.key.remoteJid !== global.owner+"@s.whatsapp.net" && !m.key.fromMe && chatUpdate.type === 'notify') return
if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
if (global.autoread) Skyzo.readMessages([m.key])
m = func.smsg(Skyzo, m, store)
require("./ednut.js")(Skyzo, m, store)
} catch (err) {
console.log(err)
}
})

Skyzo.ev.on('group-participants.update', async (anu) => {
const { welcome } = require ('./all/welcome')
const iswel = _welcome.includes(anu.id)
const isLeft = _left.includes(anu.id)
welcome(iswel, isLeft, Skyzo, anu)
})

Skyzo.sendTextWithMentions = async (jid, text, quoted, options = {}) => Skyzo.sendMessage(jid, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })   
    
Skyzo.ev.on('contacts.update', (update) => {
for (let contact of update) {
let id = Skyzo.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

Skyzo.public = true

Skyzo.ev.on('creds.update', saveCreds)
return Skyzo
}

startSesi()

process.on('uncaughtException', function (err) {
let e = String(err)
if (e.includes("conflict")) return
if (e.includes("Socket connection timeout")) return
if (e.includes("not-authorized")) return
if (e.includes("already-exists")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', err)
})
