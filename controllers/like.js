const moment = require('moment');


const createLike = (req,res,db)=>{
   const { user_id ,post_id , track_id , video_id ,
           comment_id , image_id , book_id ,playlist_id} = req.body
   const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')

   db('likes').returing('*').insert({
   	 user_id: user_id ,
   	 post_id: post_id , 
   	 track_id: track_id , 
   	 video_id: video_id , 
   	 comment_id: comment_id , 
   	 image_id: image_id , 
   	 book_id: book_id ,
   	 playlist_id: playlist_id,
   	 created_at: dateTime
   })
   .then(like=>{
   	 res.json(like[0])
   })
   .catch(err=>{ res.status(400).json('could not create like')})
}

const createDislike = (req,res,db)=>{
   const { user_id ,post_id , track_id , video_id , 
   	       comment_id , image_id , book_id ,playlist_id} = req.body
   const dateTime = moment().format('YYYY-MM-DDTHH:mm:ss')

   db('dislikes').returing('*').insert({
   	 user_id: user_id ,
   	 post_id: post_id , 
   	 track_id: track_id , 
   	 video_id: video_id , 
   	 comment_id: comment_id , 
   	 image_id: image_id , 
   	 book_id: book_id ,
   	 playlist_id: playlist_id,
   	 created_at: dateTime
   })
   .then(dislike=>{
   	 res.json(dislike[0])
   })
   .catch(err=>{ res.status(400).json('could not create dislike')})
}


const removeLike = (req,res,db)=>{
   const { id } = req.params 

   db('like').returning('*').where({id}).del()
   .then(like=>{
   	res.json(like[0])
   })
   .catch(err=>{ res.status(400).json('could not remove like')})

}

const removeDislike = (req,res,db)=>{
  const { id } = req.params

   db('dislike').returning('*').where({id}).del()
   .then(dislike=>{
   	res.json(dislike[0])
   })
   .catch(err=>{ res.status(400).json('could not remove dislike')})
}










module.exports = {
   createLike , createDislike ,removeLike ,removeDislike
}