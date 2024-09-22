const Redis = require("ioredis");

const redis = new Redis({
  port: 19746,
  host: "redis-19746.c334.asia-southeast2-1.gce.redns.redis-cloud.com",
  username: "default",
  password: "eUw2YXE1MHHovaYmlUMKf5lE1cEf2H3B",
});

module.exports = redis;
