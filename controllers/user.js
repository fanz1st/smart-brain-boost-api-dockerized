const config = require('../lib/config');

const dbMain = knex({
  client: 'pg',
  version: '10.4',
  connection: config.pgMain ,
  pool: { min: 0, max: 7 },
  
});


const getUserByUid = (uid) => {
  
  return new Promise( (resolve , error )=>{
 	const { uid } = uid

	db.select('*').from('users').where({uid})
	    .then(user => {
	      resolve(user)
	    })
	    .catch(err => { error(err)})
  }) 

}

const getUserById = (id) => {
 return new Promise( (resolve , error )=>{
 	const { id } = id

	db.select('*').from('users').where({id})
	    .then(user => {
	      resolve(user)
	    })
	    .catch(err => { error(err)})
  }) 
 
}

const getUserByIds = (ids) => {
 return new Promise( (resolve , error )=>{
 	const ids  = ids

	db.select('*').from('users').where('id',ids)
	    .then(users => {
	      resolve(users)
	    })
	    .catch(err => { error(err)})
  }) 
 
}

module.exports = {
	getUserByUid , getUserById ,getUserByIds
}