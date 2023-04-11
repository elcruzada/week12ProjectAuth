import { useEffect, useState } from 'react'
import './CreateSpot.css'

const CreateSpot = () => {
    const [hasSubmitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState({})
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

        const errorObj = {}
        if (!createSpotInputs.country) errorObj.country = "Country is required"
        if (!createSpotInputs.streetAddress) errorObj.streetAddress = "Address is required"
        if (!createSpotInputs.city) errorObj.city = "City is required"
        if (!createSpotInputs.state) errorObj.state = "State is required"
        if (createSpotInputs.description.length < 30) errorObj.description = "Description needs a minimum of 30 characters"
        if (!createSpotInputs.title) errorObj.title = "Name is required"
        if (!createSpotInputs.price) errorObj.price = "Price is required"
        if (!createSpotInputs.previewImage) errorObj.previewImage = "Preview image is required"
        if (!createSpotInputs.image1.endsWith('.png')
            && !createSpotInputs.image1.endsWith('.jpg')
            && !createSpotInputs.image1.endsWith('.jpeg')) errorObj.image1 = 'Image URL must end in .png, .jpg, or .jpeg'
        if (!createSpotInputs.image2.endsWith('.png')
            && !createSpotInputs.image2.endsWith('.jpg')
            && !createSpotInputs.image2.endsWith('.jpeg')) errorObj.image2 = 'Image URL must end in .png, .jpg, or .jpeg'
        if (!createSpotInputs.image3.endsWith('.png')
            && !createSpotInputs.image3.endsWith('.jpg')
            && !createSpotInputs.image3.endsWith('.jpeg')) errorObj.image3 = 'Image URL must end in .png, .jpg, or .jpeg'
        if (!createSpotInputs.image4.endsWith('.png')
            && !createSpotInputs.image4.endsWith('.jpg')
            && !createSpotInputs.image4.endsWith('.jpeg')) errorObj.image4 = 'Image URL must end in .png, .jpg, or .jpeg'

        setErrors(errorObj)

        console.log(createSpotInputs)
        console.log(errorObj)
        // dispatch(createNewSpotAction(createSpotInputs))
        setCreateSpotInputs({
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
    }

    const changeHandler = (e) => {
        setCreateSpotInputs({
            ...createSpotInputs,
            [e.target.id]: e.target.value
        })
    }

    useEffect(() => {
        console.log(errors)
    },[errors])
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
                {errors.country && <p className='error'>{`${errors.country}`}</p>}
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
                {errors.streetAddress && <p className='error'>{`${errors.streetAddress}`}</p>}
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
                {errors.city && <p className='error'>{`${errors.city}`}</p>}
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
                {errors.state && <p className='error'>{`${errors.state}`}</p>}
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
                {errors.description && <p className='error'>{`${errors.description}`}</p>}
                <div className='form-row'>
                    <label htmlFor='title'>Create a title for your spot</label>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special</p>
                    <input
                        id='title'
                        type='text'
                        value={createSpotInputs.title}
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
                        value={createSpotInputs.price}
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
                        value={createSpotInputs.previewImage}
                        onChange={changeHandler}
                        placeholder='Preview Image URL'
                    />
                    {errors.previewImage && <p className='error'>{`${errors.previewImage}`}</p>}
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
                </div>
                <button type='submit'>Create Spot</button>
            </form >
        </>

    );

}

export default CreateSpot
