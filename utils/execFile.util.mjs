// @ts-nocheck
import child_process from 'node:child_process';

/**
 * Description placeholder
 *
 * @export
 * @async
 * @param {*} file 
 * @param {...{}} args 
 * @returns {Promise<{stdout: string , stderr: string }>} 
 */
export async function execFile ( file, ...args )
{
  return new Promise( ( resolve, reject ) =>
  {
    // @ts-ignore
    child_process.execFile( file, [ ...args ], ( error, stdout, stderr ) =>
    {
      if ( error )
      {
        reject( error );
      };

      return resolve( { stdout, stderr } );
    } );
  } );
};



