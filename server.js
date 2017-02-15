const TelegramBot = require('node-telegram-bot-api');
const token_token = 'your_telegram_token';
var request = require('request');

// Create a bot that uses 'polling' to fetch new updates
var bot = new TelegramBot(token_token, {
    polling: true
});

var CLIENTID = "genius_CLIENTID";
var CLIENTSECRET = "genius_SECRET";
var accessToken = "?access_token=" + "genius_TOKEN";
var API = "https://api.genius.com/search";
var APISong = "https://api.genius.com/songs/";
var songID = "2471960";
var maxSong = 2471960;


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

bot.on('message', function(msg) {
    if (msg.text) {
        var str = removeDiacritics(msg.text).toLowerCase();
        var regexp_music = (/music/)
        var music = str.match(regexp_music)
        var chatId = msg.chat.id;
    }

    if (music != null) {
        console.log(APISong + songID + accessToken);
        request(APISong + getRandomInt(1, maxSong) + accessToken, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var musicInfo = JSON.parse(body)
                console.log(body)
                bot.sendMessage(chatId, musicInfo.response.song.full_title + "\n" + (musicInfo.response.song && musicInfo.response.song.fact_track && musicInfo.response.song.fact_track.external_url ? musicInfo.response.song.fact_track.external_url : musicInfo.response.song.header_image_thumbnail_url));
            }
        })
    }
})
