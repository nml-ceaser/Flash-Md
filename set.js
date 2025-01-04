const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid1BxQTBUYmFzS2czYURXemtUMFRvTFcyMGVnajJvZjJpQUpCcGpOYS9Haz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTFdRa1Q2Wjl0TnhZSnpXUjF0RHhCUTRHa24rb3lTeW9iU0x5dlFGOTFUdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFREY1UXJBZXNRTWVER2JIcFF3Vml6cVY1c1hDaFFxVDZNclp3WUxuRzFjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJENlZYdzhsa1BuODM3cVY0RkFzYlRKNHB2VGgwS3lhblc1dC9xTld1WkRzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldBWXVOcnB5TU1GWm9RRWdDTXM1bElEQWtnQ05yVllKRFIrNCtoOC8zWEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlnaGlLVTJQYTNpdU4yK1RVSGhiNHV6RDlSN1RybzFHR0NwUkIvbCtOVUU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0ZXVllxU3NWakNMc3lyaFlWV3lya0FZMUhvTWFCWGZUcVN5N1QybnlHVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0NEMlRxSDRZVmE5TTBXcVlzaE42WFIwMGcwYk8xVm5sM2pyVU9INEFGTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkgxYVRYendEVHhFckgrUEQyUWZVVDdPRndMOFZaU29hQkxTTWR4T2owS04xWDNseFFlNVB5L29ibGxrSXdNL3NhMFhPUllUVXAvck9DeWRtdkRCRkF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDgsImFkdlNlY3JldEtleSI6IkEwcEsweFlGekRzWWUrczA5YzZTcUhleHFpcitjZERpN0lFb3pCRVhmOFk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODE0NzAxMTY2MUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBODlEODQ3QzRDNkRDOTExQ0FFQTY0MjhCNTdBRkU2QiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzM1OTk0ODI4fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ4MTQ3MDExNjYxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjVBMDIwMTYwMDZBRjE1OTBFRkMwODg0OTI4RDc3MzYxIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzU5OTQ4Mjl9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ik1Eb1pZMnEzUlZhdHlxcWlHVWJRd0EiLCJwaG9uZUlkIjoiY2ZkODM1MzItOTEzMi00ZjM2LTkwNTAtN2VkYTQxNGQyM2M3IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklyQzM1VTRUbmlNd3RZWE5WUUEyN0tValdjdz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFTmh6ZU5Pekc0am1TWUNnZUpDK3NGeVdIVlE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUlRaUEgyU1IiLCJtZSI6eyJpZCI6IjIzNDgxNDcwMTE2NjE6MTdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiTWxzIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPMzJ3S3NIRUxYYjVMc0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJiTXJGdW9TdnRmcEgrSUlrK3NCVWNrd1lNZk92Wkkxcy9hQnBDSXduaWhVPSIsImFjY291bnRTaWduYXR1cmUiOiIzVzZ4bTNOdWpGMmZoMFUrWmFxYnJjMm1yYWpDSWpnaGFoNnNxWU0vTEMrVWZiOFpkenEvejFHTG80Ri9MbHh6R1R4NkJDb0ZqTzJYak56RjBha3ZCUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQTRuK3AwWE1wUEQwS0k1M2NIMGo2eTVpVXh3VWxONDFGanpvWDVyNUxLd1I0L3VISzd1eVpueTZtc0k1M1FPR1pVdUJ0N1AwSXZXeUk1eHRtN1FsQWc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTQ3MDExNjYxOjE3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQld6S3hicUVyN1g2Ui9pQ0pQckFWSEpNR0RIenIyU05iUDJnYVFpTUo0b1YifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzU5OTQ4MjAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTGV5In0=',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254105915061",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
