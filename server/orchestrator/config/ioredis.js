const Redis = require("ioredis");
const redis = new Redis(`redis://default:${process.env.REDISLABS_PASSWORD}@redis-17533.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:17533`);

module.exports = redis;