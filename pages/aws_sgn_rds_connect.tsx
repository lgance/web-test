import type { NextPage } from 'next'
import * as mysql from 'mysql2/promise';

type poolConnection = mysql.PoolConnection;

const AWS_RDS: NextPage = (props:any) => {

  let { dbConnectTime } = props;

  return (
    <>
        <>
            {dbConnectTime}
        </>
    </>
  )
}


export async function getServerSideProps() {
  // 테스트 시작 

  // DBMS Connector를 통한 GET DATA
  const sql = `
  select * from awsrdsdb
 `;

 const connection = await mysql.createConnection({
  "host":process.env.DB_HOST,
  "user":process.env.DB_USERNAME,
  "password":process.env.DB_PASSWORD,
  "database":process.env.DB_NAME,
});


 // 테스트 시작 
 let startTime = performance.now();
 
 const [rows, fields] = await connection.execute(sql);
 
 // 테스트 종료 
 let endTime = performance.now();

 // 후처리 
 let result = JSON.parse(JSON.stringify(rows));

 // 확인 
 let totalTime = Math.round(endTime-startTime)+'ms';

 // 길이 
 console.warn('AWS SGN RDS GET DATA  ' +  result.length);

 // SSR 렌더링 ( 데이터 다 받은 후 렌더링 )
 return { props: { dbConnectTime:totalTime } }
}
export default AWS_RDS;
