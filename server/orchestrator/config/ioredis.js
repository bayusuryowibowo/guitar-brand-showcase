const Redis = require("ioredis");
const redis = new Redis(`redis://default:8UY4hUq5RCcQRGU7WNgaHVYW4amIhlEW@redis-17533.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:17533`);

module.exports = redis;