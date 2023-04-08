import { Link } from 'react-router-dom'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllSpotsThunk } from '../store/reports'

const SpotsHomePage = () => {
    const dispatch = useDispatch()

    const spotsObjectFromReducer = useSelector(state => state.spots)

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch])

    return (
        <h1>Boop</h1>
    )

}

export default SpotsHomePage
