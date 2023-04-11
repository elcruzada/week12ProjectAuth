import { useState } from 'react'
import './CreateSpot.css'

const CreateSpot = () => {
    const [hasSubmitted, setSubmitted] = useState(false)
    const [error, setError] = useState({})
    const [createSpotInputs, setCreateSpotInputs] = useState({
        country: '',
        streetAddress: '',
        city: '',
        state: '',
        description: '',
        title: '',
        price: '',
        previewImage: '',
        image1: '',
        image2: '',
        image3: '',
        image4: ''
    })

    const submitHandler = (e) => {
        e.preventDefault()

        console.log(createSpotInputs)
        // dispatch(createNewSpotAction(createSpotInputs))
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
    }

    const changeHandler = (e) => {
        setCreateSpotInputs({
            ...createSpotInputs,
            [e.target.id]: e.target.value
        })
    }

    return (
        <>
            <h1>Create a New Spot</h1>
            <h2>Where's your place located?</h2>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <form onSubmit={submitHandler}>
                <div className='form-row'>
                    <label htmlFor='country'>Country</label>
                    <input
                        id='country'
                        type='text'
                        value={createSpotInputs.country}
                        onChange={changeHandler}
                        placeholder='Country'
                    />
                </div>
                <div className='form-row'>
                    <label htmlFor='streetAddress'>Street Address</label>
                    <input
                        id='streetAddress'
                        type='text'
                        value={createSpotInputs.streetAddress}
                        onChange={changeHandler}
                        placeholder='Address'
                    />
                </div>
                <div className='form-row'>
                    <label htmlFor='city'>City</label>
                    <input
                        id='city'
                        type='text'
                        value={createSpotInputs.city}
                        onChange={changeHandler}
                        placeholder='City'
                    />
                </div>
                <div className='form-row'>
                    <label htmlFor='state'>State</label>
                    <input
                        id='state'
                        type='text'
                        value={createSpotInputs.state}
                        onChange={changeHandler}
                        placeholder='STATE'
                    />
                </div>
                <div className='form-row'>
                    <label htmlFor='description'>Describe your place to guests</label>
                    <textarea
                        id='description'
                        name='description'
                        value={createSpotInputs.description}
                        onChange={changeHandler}
                        placeholder='Please write at least 30 characters'
                    />
                    <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood</p>
                </div>
                <div className='form-row'>
                    <label htmlFor='title'>Create a title for your spot</label>
                    <input
                        id='title'
                        type='text'
                        value={createSpotInputs.title}
                        onChange={changeHandler}
                        placeholder='Name of your spot'
                    />
                </div>
                <div className='form-row'>
                    <label htmlFor='price'>Set a base price for your spot</label>
                    <input
                        id='price'
                        type='text'
                        value={createSpotInputs.price}
                        onChange={changeHandler}
                        placeholder='Price per night(USD)'
                    />
                </div>
                <div className='form-row'>
                    <label htmlFor='previewImage'>Liven up your spot with photos</label>
                    <input
                        id='previewImage'
                        type='text'
                        value={createSpotInputs.previewImage}
                        onChange={changeHandler}
                        placeholder='Preview Image URL'
                    />
                </div>
                <div className='form-row'>
                    <label htmlFor='image1'></label>
                    <input
                        id='image1'
                        type='text'
                        value={createSpotInputs.image1}
                        onChange={changeHandler}
                        placeholder='Image URL'

                    />
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
                </div>
                <button type='submit'>Submit</button>

            </form >
        </>

    );

}

export default CreateSpot
