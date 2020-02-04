const moment = require('moment');

const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')  

const createPodcast = (req,res,db)=>{
   let { user_id , name , description ,moderator , cover , episodes , genres } = req.body
   
   db.transaction(function(trx) {
     
     trx.insert({
     	user_id: user_id,
     	name: name ,
     	description: description,
     	moderator: moderator,
     	cover: cover,
     	genres: '{"' + genres.join('","') + '"}',
     	created_at: dateTime
     })
     .into('podcasts')
     .then(podcast=>{
         episodes.forEach((episode)=>{ episode.podcast_id = podcast[0].id ,created_at =  dateTime})
         return trx('episodes').insert(episodes).transacting(trx)
     })
     .then(trx.commit)
     .catch(trx.rollback)

   })
   .then(podcast=>{
   	 res.json(podcast)
   })
   .catch( error=>{
     res.status(400).json(error)
   })



}

const removePodcast = (req,res,db)=>{

}

const updatePodcast = (req,res,db)=>{

}

const newEpisode = (req,res,db)=>{

}

const updateEpisode = (req,res,db)=>{

}

const getPodcast = (req,res,db)=>{

}

const getPodcastEpisodes = (req,res,db)=>{

}

const getEpisode = (req,res,db)=>{

}


module.exports = {
   createPodcast ,removePodcast ,updatePodcast ,
   newEpisode ,updateEpisode ,getPodcast ,getPodcastEpisodes ,getEpisode
}