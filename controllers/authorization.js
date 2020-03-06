const config = require('../lib/config');
const redis = require('redis')

const redisClient = redis.createClient(process.env.REDIS_URL || config.REDIS_URL);

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send('Unauthorized');
  }
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(401).send('Unauthorized');
    }
    return next();
  });
};

module.exports = {
  requireAuth
}