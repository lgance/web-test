import type { NextPage } from 'next'
import Head from 'next/head'
import BrowserComponent from '../components/browser'
import TestPerformanceComponent from '../components/TestPerformance'


let NCPTestData = [
  {"type":"GET","url":"https://sg.object.ncloudstorage.com/sg-ncp-obs-for-ngc/test_image.JPG"},
  {"type":"SQL","url":"DB SQL Query 확인"},
  {"type":"GET","url":""},
  {"type":"GET","url":""},
];


let AWSTestData =[
  {"type":"GET","url":"aws"},
  {"type":"GET","url":""},
  {"type":"GET","url":""},
  {"type":"GET","url":""},
]

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Performance Test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BrowserComponent/>

      <TestPerformanceComponent vendor={"AWS"} testRow={NCPTestData} />

      <TestPerformanceComponent vendor={"NCP"} testRow={AWSTestData} />

    </>
  )
}

export default Home
