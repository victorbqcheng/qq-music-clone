import React from 'react'

const Main = () => {
    return (
        <div className='flex-1 w-full overflow-y-auto flex flex-row'>
            <div className='flex-1 overflow-y-auto'>
                <div className='flex flex-col h-4/5 overflow-y-auto'>
                    {
                        Array.from({ length: 20 }, (_, i) => (
                            <div key={i} className='p-4 border-b border-gray-200'>
                                Item {i + 1}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex-1 bg-amber-200'>right</div>
        </div>
    )
}

export default Main