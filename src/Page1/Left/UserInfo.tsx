import React from 'react'

const UserInfo = () => {
  return (
    <div className='flex flex-row items-end'>
        <div className='w-8 h-8 rounded-full overflow-hidden mr-2'>
            <img src='https://picsum.photos/id/28/200/300' alt='User Avatar'  />
        </div>
        <div className='text-gray-200 bg-gray-500 text-[8px] font-bold px-1 rounded-md mr-2'>
            VIP1
        </div>
    </div>
  )
}

export default UserInfo