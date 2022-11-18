import redis from '../../lib/redis'
import { NextApiRequest, NextApiResponse } from "next";

export default async function release(req: NextApiRequest, res: NextApiResponse){
    const { id } = req.body;
    console.log('=====> ID:', id);
    const entry = JSON.parse((await redis.hget('features', id)) || 'null')
    const updated = {
      ...entry,
      released: true,
    }
    await redis.hset('features', id, JSON.stringify(updated))
    return res.status(201).json(updated)
}