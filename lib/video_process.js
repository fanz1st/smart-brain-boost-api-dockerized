const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;
const parent = process.argv[2];

let videos = [];


var baseDir = path.join(__dirname,'/../media');









function resizeVideo(video, quality) {
    return new Promise((resolve, reject) => {

        var output = baseDir +'/'+ video.id +'/'+ video.name+'_'+quality+'.mp4' 
        const ffmpeg = spawn('ffmpeg', ['-i', `${video.video_full}`, '-codec:v', 'libx264', '-profile:v', 'main', '-preset', 'slow', '-b:v', '400k', '-maxrate', '400k', '-bufsize', '800k', '-vf', `scale=-2:${quality}`, '-threads', '0', '-b:a', '128k', `${ output }`]);
        ffmpeg.stderr.on('data', (data) => {
            console.log(`${data}`);
        });
        ffmpeg.on('close', (code) => {
            resolve();
        });
    });
    
}


function processVideo(video){
    fs.mkdir(baseDir+'/'+video.id ,()=>{
        resizeVideo(video,quality).then()
    })
}




function processVideos() {
    let video = videos.pop();
    if (video) {
        resizeVideo(video, 720).then(() => {
            // 720p video all done
            resizeVideo(video, 480).then(() => {
                // 480p video all done
                resizeVideo(video, 360).then(() => {
                    // 360p video all done
                    console.log(`Completed Video Number - ${video}`);
                    processVideos();
                });
            });
        });
    }
}