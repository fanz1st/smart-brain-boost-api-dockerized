const AWS = require('aws-sdk');
const config = require('./config');

AWS.config.update(
	{region: 'us-east-1'},
	{credentials: config.aws });

const s3 = new AWS.S3({
				  apiVersion: '2006-03-01',
				  params: {Bucket: albumBucketName}
				});

var uploader = {}

uploader.uploadFile = (dir , file , bucket )=>{
 return new Promise( (reject , resolve)=>{
 	 s3.upload({ Key: dir + file.name, 
  	          Body: file, 
  	          ACL: 'public-read', 
  	          ContentType: file.type, 
  	          Bucket: bucket }, function(err , data){
                if(!err){
                   resolve(data)
                }else {
                	reject(err)
                }
  	          })
 }) 


}


module.exports = uploader
