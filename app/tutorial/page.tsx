import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import darsimage from '@/public/darsimage.png'
import screenshot from '@/public/screenshot.png'
import Divider from '@/components/Divider'

const Tutorial = () => {
    return (
        <div className="xl:w-1/2 w-10/12 mx-auto">
            <p className='text-center text-xl font-bold mb-3'>Downloading a DARS report</p>
            <p className='font-semibold'>Images and text from: <Link className='text-red-500 hover:underline' href='https://kb.wisc.edu/registrar/94056' target='_blank'>kb.wisc.edu</Link>.</p>
            <div className='border' />
            <div className='space-y-2 mt-6'>
                <p className='font-medium'>1. Log into <Link href='https://enroll.wisc.edu/dars' target='_blank' className="text-red-500 hover:underline">enroll.wisc.edu/dars</Link> to get started.</p>
                <Image
                    src={'https://kb.wisc.edu/images/group208/94056/NETidlogin.png'}
                    alt='NetID Login'
                    width={600}
                    height={1}
                />
                <p className='font-medium'>2. Proceed to view previously requested audits or to request a new audit.</p>
                <Image
                    src={'https://kb.wisc.edu/images/group208/94056/Runadarsinplanner.png'}
                    alt='Request DARS audit'
                    width={600}
                    height={1}
                />
                <p className='font-medium'>3. Click the download button on the audit you wish to upload to DARS Visualizer.</p>
                <Image
                    src={darsimage}
                    alt='Download DARS audit'
                    width={600}
                    height={1}
                />
                <p className='font-medium'>4. Upload your PDF into DARS Visualizer.</p>
                <Image
                    src={screenshot}
                    alt='Upload DARS audit'
                    width={600}
                    height={1}
                />
            </div>
            <Divider/>
        </div>
    )
}

export default Tutorial