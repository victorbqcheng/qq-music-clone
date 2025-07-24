import React from 'react'

const VipAd = () => {
  return (
    <div className='bg-gray-100 p-2 flex flex-row items-center justify-between rounded-xl'>
        <div className='text-gray-700 text-xs font-normal mb-1'>会员畅听VIP曲库</div>
        <button className='text-xs px-2 py-1 rounded-2xl bg-green-500 text-black font-normal cursor-pointer'>
            ￥9.9开通
        </button>
    </div>
  )
}

export default VipAd