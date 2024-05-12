import type { RedisClientType } from 'redis'
import * as redis from 'redis';

let redisClient: RedisClientType;

export const connectRedis = async () => {
    try {
        // @ts-ignore
    redisClient = await  redis.createClient({
    password: 'hVjIIGmtHkt3EbYRodtLYGFIJlT4ummZ',
    socket: {
        host: 'redis-11537.c322.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 11537
    }
})
.on('error', err => console.log('Redis Client Error', err))
.connect();
console.log("redis connected")
return redisClient;
} catch (error) {
console.log(error);
}
}

export const getRedisClient = () => {
    if (!redisClient) {
        console.log('No connection found with redis.')
    }

    return redisClient;
}