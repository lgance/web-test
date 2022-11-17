import type { NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useRef } from 'react';
import BrowserComponent from '../components/browser'
import TestPerformanceComponent from '../components/TestPerformance'

let vendor=['AWS','NCP'];
let NCPTestData = [
  {"type":"GET","TC":"GET NCP Object Storage","url":"https://sg.object.ncloudstorage.com/sg-ncp-obs-for-ngc/test_image.JPG"},
  {"type":"SQL","TC":"NCP Cloud DB For Mysql ","url":"SELECT * FROM \`ncp-performance-db\` "},
];

let AWSTestData =[
  {"type":"GET","TC":"Get AWS S3","url":"https://sg-aws-s3.s3.ap-southeast-1.amazonaws.com/test_image.JPG"},
  {"type":"SQL","TC":"AWS RDS for Mysql","url":"SELECT * FROM awsrdsdb "},
]

let UserTestCase:any =[];
const Home: NextPage = () => {

  const ncp_aws_buffon_ref:any = useRef<[]>([]);

  const AllTestStart = useCallback(()=>{

      for(let i=0;i<vendor.length;i++){
            ncp_aws_buffon_ref.current[vendor[i]].click();
      }
    },[ncp_aws_buffon_ref])
  return (
    <>
      <Head>
        <title>Performance Test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BrowserComponent/>
      <button>
            <span onClick={()=> AllTestStart()} className="btn-text">AWS_NCP 전체 테스트 시작</span>
      </button>

      <TestPerformanceComponent vendor={"AWS"} ref={ncp_aws_buffon_ref} testRow={AWSTestData} />
      <TestPerformanceComponent vendor={"NCP"} ref={ncp_aws_buffon_ref} testRow={NCPTestData} />

      <TestPerformanceComponent vendor={"USER"} ref={ncp_aws_buffon_ref} testRow={UserTestCase} />
      
      <div style={{
        "height":"500px"
      }}>
      </div>

    </>
  )
}

export default Home
