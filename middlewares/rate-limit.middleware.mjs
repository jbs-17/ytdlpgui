import rateLimit from "express-rate-limit";
import { logger } from "../utils/logger.util.mjs";

export const rateLimiter = rateLimit( {
  windowMs: 1000 * 60 * 5,
  limit: 1000,
  message: 'Too many requests, please try again later.',
  // @ts-ignore
  'handler': ( req, res, ) =>
  {
    const headers = res.getHeaders();
    logger.warn( `Rate limit exceeded. Redirecting...`, { ip: req.ip, path: req.path, url: req.originalUrl, cookies: req.cookies } );
    // res.render()
    res.end(JSON.stringify(headers));
  }
} );
/*
'x-powered-by': 'Express',
  'x-ratelimit-limit': '10',
  'x-ratelimit-remaining': '0',
  date: 'Mon, 15 Sep 2025 10:10:06 GMT',
  'x-ratelimit-reset': '1757931297',
  'retry-after': '290'
*/