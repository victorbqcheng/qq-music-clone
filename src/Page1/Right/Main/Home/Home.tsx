import React from 'react'
import TodayRecommendation from './TodayRecommendation'
import ExclusiveRecomendation from './ExclusiveRecomendation'
import EveryoneListening from './EveryoneListening'

const Home = () => {
    return (
        <div>
            <ul >
                <li className='mb-4'>
                    <TodayRecommendation />
                </li>
                <li className='mb-4'>
                    <ExclusiveRecomendation />
                </li>
                <li>
                    <EveryoneListening />
                </li>
            </ul>
        </div>
    )
}

export default Home



// {
//     Array(10).fill(0).map((_, index) => (
//         <li key={index} className='h-10 bg-gray-200 my-1'>
//             Content {index + 1}
//         </li>
//     ))
// }