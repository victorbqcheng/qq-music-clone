import React from 'react'
import album1 from '../../../../assets/album1.jpg'
import album2 from '../../../../assets/album2.jpg'
import album3 from '../../../../assets/album3.png'
import album4 from '../../../../assets/album4.png'
import album5 from '../../../../assets/album5.jpg'


const TodayRecommendation = () => {
    return (
        <div className='overflow-hidden'>
            <h2 className='font-semibold mb-4'>Hi 今日为你推荐</h2>
            <div className='flex flex-row items-center justify-between overflow-hidden'>
                <div>&lt;</div>
                <div className='flex flex-row gap-6 overflow-hidden'>
                    <div className='shrink-0'>
                        <img src={album1} className='w-[30vw] h-[15vw]' alt="" />
                        <span className='text-gray-700 text-sm font-light'>寂寞寂寞不好-曹格</span>
                    </div>
                    <div className='shrink-0'>
                        <img src={album2} className='w-[15vw] h-[15vw]' alt="" />
                        <span className='text-gray-700 text-sm font-light'>何去何从之阿飞</span>

                    </div>
                    <div className='shrink-0'>
                        <img src={album3} className='w-[15vw] h-[15vw]' alt="" />
                        <span className='text-gray-700 text-sm font-light'>和你-余佳运</span>
                    </div>
                    <div className='shrink-0'>
                        <img src={album4} className='w-[15vw] h-[15vw]' alt="" />
                        <span className='text-gray-700 text-sm font-light'>杜比专区</span>
                    </div>
                    <div className='shrink-0'>
                        <img src={album4} className='w-[15vw] h-[15vw]' alt="" />
                        <span className='text-gray-700 text-sm font-light'>杜比专区</span>
                    </div>
                </div>
                <div>&gt;</div>
            </div>
        </div>
    )
}

export default TodayRecommendation