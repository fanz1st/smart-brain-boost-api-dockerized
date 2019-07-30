
const user = require('./user');

const getTagPosts = (req,res , db) =>{
  const tag = req.params
  db.transaction(trx => {
    trx('tags')
    .where({name: tag })
    .returning('*')
    .then(tag => {
      return trx('post_tags')
        .where({tag_id: tag[0].id})
        .returning('*')
        .then(tag_posts => {
           var post_ids = []
           tag_posts.forEach((tag_post)=>{
              post_ids.push(tag_post.post_id)
           })
           if (post_ids.length > 0){
           	 trx('posts')
           	 .where('id',post_ids)
           	 .returning('*')
           	 .then(posts=>{
                return posts
           	 })

           }
        })
        .then(posts =>{
        	var user_ids = []
        	posts.forEach((post)=>{
        		user_ids.push(post.user_id)
        	})
        	var users = user.getUserByIds(user_ids)
        	Promise.all(users)
        	.then(results=>{
        	    
        	})
        	.catch(err =>{
        	   res.status(400).json(err)
        	})
        })

    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json(err))
}





module.exports = {
	getTagPosts
}