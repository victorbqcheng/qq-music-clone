import React from 'react'
import { useLocation, useParams } from 'react-router'

const CustomPlayListPage = () => {
    // const location = useLocation();
    // console.log('Current location:', location);
    const params = useParams();
    const id = params.id;
    return (
        <div>CustomPlayListPage: {id}</div>
    )
}

export default CustomPlayListPage