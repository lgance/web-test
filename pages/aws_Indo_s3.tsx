import type { NextPage } from 'next'
import Image from 'next/image'

import { useEffect, useState } from 'react';

// AWS Insonesia
const AWSS3: NextPage = (props:any) => {

  let { type,arrayBuffer,totalTime } = props;
  const [src ,setSrc ]= useState('');

  // page Initialize 
  useEffect(()=>{
    const rendering =async()=>{
      // Image BLOB Create 
      const blob = await new Blob([Uint8Array.from(arrayBuffer)], { type });

      // Create URL Object 
      const downloadUrl = window.URL.createObjectURL(blob);
      
      // Set Img TAG URL 
      setSrc(downloadUrl);

    }
    rendering();
    console.warn(totalTime);

  },[type,arrayBuffer,totalTime])
  return (
    <>
        <div >
                <Image 
                 src={src}
                  alt="Test Image"
                  width={1920}
                  height={1080}
                 />
        </div>
    </>
  )
}
export async function getServerSideProps() {


  // GET Test URL 
  let testURL = process.env.AWS_JKT_S3;

  // Test Start 
  let startTime = performance.now();

  // fetch BLOB
  const rawData = await fetch(testURL as string);
  // create BLOB  
  const blob = await rawData.blob();

  // Test End
  let endTime = performance.now();

  // Check Total Test Time
  let totalTime = Math.round(endTime-startTime)+'ms';

  // Test Log String
  let awsS3TimeString = `AWS Jakarta S3  ${totalTime} URL : ${testURL} `

  // SSR Rendering  
 return { props: {
  type:blob.type,
  arrayBuffer:Object.values(new Uint8Array(await blob.arrayBuffer())),
  totalTime:awsS3TimeString
} }
}


export default AWSS3;
