
import React, { useEffect } from 'react'
import changeTheme, { themes } from '../../../../themes/themes'

const Theme = () => {
    return (
        <div className='flex gap-2'>
            {
                themes.map(theme => {
                    return (
                        <button key={theme.name} className='border-1'
                                onClick={()=>{changeTheme(theme.name)}}>
                            {theme.name}
                        </button>
                    );
                })
            }
        </div>
    )
}



export default Theme