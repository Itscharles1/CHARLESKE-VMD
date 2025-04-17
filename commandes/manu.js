const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");
    var coms = {};
    var mode = (s.MODE.toLowerCase() === "yes") ? "public" : "private";

    cm.map((com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault("Africa/Nairobi");
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `⚙️📡 *Hello ${nomAuteurMessage}!* 📡⚙️
━━━━━━━━━━━━━━━━━━━━
🚀 *BOT NAME:* 𝐂𝐇𝐀𝐑𝐋𝐄𝐒𝐊𝐄-VMD  
━━━━━━━━━━━━━━━━━━━━
🌍 *SYSTEM INFO:*
💻 ᴘʟᴀᴛғᴏʀᴍ: *${os.platform()}*
━━━━━━━━━━━━━━━━━━━━
⚙️ *BOT STATUS:*
⭕ ᴍᴏᴅᴇ: *${mode}*
💫 ᴘʀᴇғɪx: *[ ${prefixe} ]*
⏳ ᴛɪᴍᴇ: ${temps}
📆 ᴅᴀᴛᴇ: ${date}
━━━━━━━━━━━━━━━━━━━━
📢 *𝐂𝐇𝐀𝐍𝐍𝐄𝐋𝐒 & 𝐂𝐎𝐍𝐍𝐄𝐂𝐓𝐈𝐎𝐍𝐒:*  
📺 𝐘𝐎𝐔𝐓𝐔𝐁𝐄:  
🔗 https://youtube.com/@charles_odhiambo_official?si=kw62odfMmuam1JOo  
📘 𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊:  
🔗 https://www.facebook.com/profile.php?id=100083389717604  
📢 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 𝐆𝐑𝐎𝐔𝐏:  
🔗 https://chat.whatsapp.com/EFh0BWKa0Uf92A7RgBwpuu  
📸 𝐈𝐍𝐒𝐓𝐀𝐆𝐑𝐀𝐌:  
🔗 https://www.instagram.com/charles_a_ke  
━━━━━━━━━━━━━━━━━━━━
${readMore}
📜 *COMMANDS MENU* 📜
━━━━━━━━━━━━━━━━━━━━\n`;

    let menuMsg = ``;

    for (const cat in coms) {
        menuMsg += `🔹 *${cat.toUpperCase()}* 🔹\n`;
        for (const cmd of coms[cat]) {
            menuMsg += `   🔸 ${cmd}\n`;
        }
        menuMsg += `━━━━━━━━━━━━━━━━━━━━\n`;
    }

    menuMsg += `✨ *𝐂𝐇𝐀𝐑𝐋𝐄𝐒𝐊𝐄-VMD - 𝑫𝒆𝒗𝒆𝒍𝒐𝒑𝒆𝒅 𝒃𝒚 ©Charles ke* ✨`;

    let imageUrl = "https://files.catbox.moe/n6dmx3.jpeg";

    try {
        zk.sendMessage(dest, { 
            image: { url: imageUrl }, 
            caption: infoMsg + menuMsg, 
            footer: "© Charles KE" 
        }, { quoted: ms });
    } catch (e) {
        console.log("🥵 Menu error: " + e);
        repondre("🥵 Menu error: " + e);
    }
});
