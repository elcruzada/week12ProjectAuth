import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getSpotsDetailsThunk, editSingleSpotThunk, sessionSpotThunk } from '../../store/spots'

import './CreateSpot.css'
//create useEffect where only dependency is dispatch, dispatch whatever thunk is for get currentUser spots

const UpdateSpot = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { spotId } = useParams()
    // const spotIdCopy = { ...spotId}
    // const paramsSpot = useSelector(state => state.spots.allSpots[spotId])
    // console.log(paramsSpot)
    const paramsSpot = useSelector(state => state.spots.singleSpot)
    // const selectorState = useSelector(state => console.log(state))
    const [errors, setErrors] = useState({})
    const [updateSpotInputs, setUpdateSpotInputs] = useState({
        country: '',
        streetAddress: '',
        city: '',
        state: '',
        description: '',
        title: '',
        price: '',
        previewImage: ''
    })



    useEffect(() => {
        if (paramsSpot) {
            setUpdateSpotInputs({
                country: paramsSpot.country,
                streetAddress: paramsSpot.address,
                city: paramsSpot.city,
                state: paramsSpot.state,
                description: paramsSpot.description,
                title: paramsSpot.name,
                price: paramsSpot.price,
            })
        }
    },[paramsSpot])

    useEffect(() => {
        dispatch(getSpotsDetailsThunk(spotId))
    },[dispatch, spotId])

    // console.log(spotId)


    // console.log(secondStateFetch)
    // const stateCopy = {...secondStateFetch}


    const submitHandler = async (e) => {
        e.preventDefault()

        const errorObj = {}
        if (!updateSpotInputs.country) errorObj.country = "Country is required"
        if (!updateSpotInputs.streetAddress) errorObj.streetAddress = "Address is required"
        if (!updateSpotInputs.city) errorObj.city = "City is required"
        if (!updateSpotInputs.state) errorObj.state = "State is required"
        if (updateSpotInputs.description.length < 30) errorObj.description = "Description needs a minimum of 30 characters"
        if (!updateSpotInputs.title) errorObj.title = "Name is required"
        if (!updateSpotInputs.price) errorObj.price = "Price is required"
        // if (!updateSpotInputs.previewImage) errorObj.previewImage = "Preview image is required"

        setErrors(errorObj)


        if (Object.keys(errorObj).length === 0) {
            const updatedSpotObj = {
                country: updateSpotInputs.country,
                address: updateSpotInputs.streetAddress,
                city: updateSpotInputs.city,
                state: updateSpotInputs.state,
                description: updateSpotInputs.description,
                name: updateSpotInputs.title,
                price: updateSpotInputs.price,
                lat: 38,
                lng: -77
            }

            const dispatchedUpdatedSpot = await dispatch(editSingleSpotThunk(updatedSpotObj, spotId))
            if (dispatchedUpdatedSpot) {
                history.push(`/spots/${spotId}`)
            }
        }
    }


        // setCreateSpotInputs({
        //     country: '',
        //     streetAddress: '',
        //     city: '',
        //     state: '',
        //     description: '',
        //     title: '',
        //     price: '',
        //     previewImage: '',
        //     image1: '',
        //     image2: '',
        //     image3: '',
        //     image4: ''
        // })
    // }

    const changeHandler = (e) => {
        setUpdateSpotInputs({
            ...updateSpotInputs,
            [e.target.id]: e.target.value
        })
    }

    // useEffect(() => {
    //     console.log(errors)
    // },[errors])
    return (
        <>
            <h1>Update Your Spot</h1>
            <h2>Where's your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <form onSubmit={submitHandler}>
                <div className='form-row'>
                    <label htmlFor='country'>Country</label>
                    <input
                        id='country'
                        type='text'
                        value={updateSpotInputs.country}
                        onChange={changeHandler}
                        placeholder='Country'
                    />
                </div>
                {errors.country && <p className='error'>{`${errors.country}`}</p>}
                <div className='form-row'>
                    <label htmlFor='streetAddress'>Street Address</label>
                    <input
                        id='streetAddress'
                        type='text'
                        value={updateSpotInputs.streetAddress}
                        onChange={changeHandler}
                        placeholder='Address'
                    />
                </div>
                {errors.streetAddress && <p className='error'>{`${errors.streetAddress}`}</p>}
                <div className='form-row'>
                    <label htmlFor='city'>City</label>
                    <input
                        id='city'
                        type='text'
                        value={updateSpotInputs.city}
                        onChange={changeHandler}
                        placeholder='City'
                    />
                </div>
                {errors.city && <p className='error'>{`${errors.city}`}</p>}
                <div className='form-row'>
                    <label htmlFor='state'>State</label>
                    <input
                        id='state'
                        type='text'
                        value={updateSpotInputs.state}
                        onChange={changeHandler}
                        placeholder='STATE'
                    />
                </div>
                {errors.state && <p className='error'>{`${errors.state}`}</p>}
                <div className='form-row'>
                    <label htmlFor='description'>Describe your place to guests</label>
                    <textarea
                        id='description'
                        name='description'
                        value={updateSpotInputs.description}
                        onChange={changeHandler}
                        placeholder='Please write at least 30 characters'
                    />
                    <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood</p>
                </div>
                {errors.description && <p className='error'>{`${errors.description}`}</p>}
                <div className='form-row'>
                    <label htmlFor='title'>Create a title for your spot</label>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special</p>
                    <input
                        id='title'
                        type='text'
                        value={updateSpotInputs.title}
                        onChange={changeHandler}
                        placeholder='Name of your spot'
                    />
                </div>
                {errors.title && <p className='error'>{`${errors.title}`}</p>}
                <div className='form-row'>
                    <label htmlFor='price'>Set a base price for your spot</label>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results</p>
                    <input
                        id='price'
                        type='text'
                        value={updateSpotInputs.price}
                        onChange={changeHandler}
                        placeholder='Price per night(USD)'
                    />
                </div>
                {errors.price && <p className='error'>{`${errors.price}`}</p>}
                <div className='form-row'>
                    <label htmlFor='previewImage'>Liven up your spot with photos</label>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <input
                        id='previewImage'
                        type='text'
                        value={updateSpotInputs.previewImage}
                        onChange={changeHandler}
                        placeholder='Preview Image URL'
                    />
                    {errors.previewImage && <p className='error'>{`${errors.previewImage}`}</p>}
                </div>
                {/* <div className='form-row'>
                    <label htmlFor='image1'></label>
                    <input
                        id='image1'
                        type='text'
                        value={createSpotInputs.image1}
                        onChange={changeHandler}
                        placeholder='Image URL'
                    />
                    {errors.image1 && <p className='error'>{`${errors.image1}`}</p>}
                </div>
                <div className='form-row'>
                    <label htmlFor='image2'></label>
                    <input
                        id='image2'
                        type='text'
                        value={createSpotInputs.image2}
                        onChange={changeHandler}
                        placeholder='Image URL'
                    />
                    {errors.image2 && <p className='error'>{`${errors.image2}`}</p>}
                </div>
                <div className='form-row'>
                    <label htmlFor='image3'></label>
                    <input
                        id='image3'
                        type='text'
                        value={createSpotInputs.image3}
                        onChange={changeHandler}
                        placeholder='Image URL'
                    />
                    {errors.image3 && <p className='error'>{`${errors.image3}`}</p>}
                </div>
                <div className='form-row'>
                    <label htmlFor='image4'></label>
                    <input
                        id='image4'
                        type='text'
                        value={createSpotInputs.image4}
                        onChange={changeHandler}
                        placeholder='Image URL'
                    />
                    {errors.image4 && <p className='error'>{`${errors.image4}`}</p>}
                </div> */}
                <button type='submit'>Update your Spot</button>
            </form >
        </>

    );
}

export default UpdateSpot
