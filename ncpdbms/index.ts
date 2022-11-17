
import 'dotenv';
import "dotenv/config";
import * as mysql from 'mysql2/promise';

type poolConnection = mysql.PoolConnection;

const db_config : any= {
  "host":process.env.DB_HOST,
  "user":process.env.DB_USERNAME,
  "password":process.env.DB_PASSWORD,
  "database":process.env.DB_NAME,
  "dateStrings":'date'
}


const pool:mysql.Pool = mysql.createPool(Object.assign(
{
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
},db_config));

export namespace DB{
  let conn:poolConnection | null = null;

  export async function getPoolConnection(sql?:string):Promise<poolConnection>{
    return new Promise(async(resolve,reject)=>{
      try {
        conn = await pool.getConnection();
        resolve(conn);
      } catch (error : any) {
        if( error instanceof Error ){
          console.log(error.message);
        }
        else{
          console.log(error);
        }
        reject(conn);
      }
    })
  }

}
