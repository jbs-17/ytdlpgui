import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { configs } from "../configs.mjs";



// //format
//console
const consoleFormat = format.combine(
  format.metadata(),
  format.prettyPrint(),
  format.timestamp( { 'format': 'YYYY-MM-DD HH:MM:SS' } ),
  format.colorize( {
    'colors': {
      'error': 'red',
      'warning': 'yellow',
      'info': 'blue',
      'http': 'green'
    }
  } ),
  format.printf( ( { timestamp, level, message, metadata = {} } ) =>
  {
    const metadatatext = JSON.stringify( metadata );
    return `[${ timestamp }][${ level }] : ${ message }\n${ metadatatext }\n`;
  } )
);
//file
const fileFormat = format.combine(
  format.timestamp(),
  format.json(),
  format.metadata(),
  format.prettyPrint(),
);


// // transports
// comsole
const consoleTranport = new transports.Console( {
  level: 'debug',
  format: consoleFormat,
  handleExceptions: true,
  handleRejections: true
} );
// rotate file
const dailyRotateFile = new DailyRotateFile( {
  format: fileFormat,
  filename: 'ytdlpgui-app.log.%DATE%',
  dirname: configs.LOGSDIR,
  extension: '.log',
  level: 'http',   
  maxSize: '20m',
  maxFiles: '14d',
  zippedArchive: true,
  handleExceptions: true,
  handleRejections: true
} );





// logger uyama
const logger = createLogger( {
  handleExceptions: true,
  handleRejections: true,
  transports: [
    consoleTranport,
    // dailyRotateFile
  ]
} );

// Tangani error global
process.on( "unhandledRejection", ( reason ) =>
{
  logger.error( "Unhandled Rejection", { reason } );
} );

process.on( "uncaughtException", ( err ) =>
{
  logger.error( "Uncaught Exception", { error: err.stack || err.message } );

} );


// logger.error( 'ada eror', {name: 'yt-dlp',error: new Error('ini error yt-dlp') } );
// logger.warn('peringantan', {'name': 'yt-dlp'})
// logger.info( 'ini info', { name: 'info aja' } );
// logger.http( 'res end ok', { 'path': '/', 'ip': '127.0.0.1', 'userid': '8929diE8C72UXIUX' } );
// logger.debug( 'ini debug', { name: 'debug namanya', 'debug': 'ytodlp' } );
// logger.silly( 'apalh');
// const promiseReject = () => Promise.reject('rejected');
// await promiseReject()


export { logger }
