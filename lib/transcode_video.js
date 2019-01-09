const knex = require('knex');
const Redis = require('ioredis');
const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;
const parent = process.argv[2];
//const uploader = require('./upload_aws');

//Database Setup
const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
});
// Redis Setup
const redis = new Redis(process.env.REDIS_URI);


var transcode = {}
var baseDir = path.join(__dirname,'/../media/');

// add video to convert to MP4 list 

transcode.addVideoToMp4List = (video)=>{
   redis.lpush('mp4ConvertList',video)
}



// convert to MP4 
transcode.convertToMp4 = (video)=>{

    return new Promise((resolve, reject) => {
        var output = baseDir + video+'.mp4' 
        const ffmpeg = spawn('ffmpeg', ['-i', `${video.video_full}`, '-codec:v', 'libx264', `${ output }`]);
        ffmpeg.stderr.on('data', (data) => {
            console.log(`${data}`);
        });
        ffmpeg.on('close', (code) => {
            resolve();
        });
    });
    
}

// add to adaptive video convert list 

transcode.addToAdaptiveList = (video)=>{
   redis.lpush('adaptiveList',video)
}

// convert to HLS and Dash

// upload videos 

// save HLS and Dash database video object

// create worker 


module.exports = transcode

