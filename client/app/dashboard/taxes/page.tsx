'use client'

export default function page() {
  return (
    <div className='w-full flex flex-col px-20 py-10 gap-16'>
      {/* <!-- Header --> */}
      <div className='flex flex-col gap-1'>
        <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>Tax Value Configuration</h1>
        <p className='text-sm text-gray-500 dark:text-gray-400'>Enter you credentials to connect to your account.</p>
      </div>
      {/* <!-- End Header --> */}
    </div>
  )
}
