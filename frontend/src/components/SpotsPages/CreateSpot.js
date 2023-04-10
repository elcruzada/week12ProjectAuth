import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { createNewSpotAction } from '../../store/spots'
import CreateSpotCards from '../UI/Card/CreateSpotCards'
import './CreateSpot.css'

const CreateSpot = () => {
    const dispatch = useDispatch()
    const [hasSubmitted, setSubmitted] = useState(false)
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

    const {
        country, streetAddress, city,
        state, description, title, price, previewImage,
        image1, image2, image3, image4 } = createSpotInputs

    const submitHandler = (e) => {
        e.preventDefault()

        const formInputs = {
        country, streetAddress, city,
        state, description, title, price, previewImage,
        image1, image2, image3, image4
        }

        setCreateSpotInputs(formInputs)
    }

    return (
        <>
        <div className='spot-container'>
        <h1>Create a New Spot</h1>
        <form onSubmit={submitHandler}>
            <div className='form-row'>
                <label htmlFor='name'>Name (required): </label>
                <input
                    id='name'
                    type='text'
                    // onChange={(e) => setName(e.target.value)}
                    // value={name}
                />
                {/* {validationErrors.Name && (<div className='error-msg'>* {validationErrors.Name}</div>)} */}
            </div>
            <div className='form-row'>
                <label htmlFor='email'>Email (required):</label>
                <input
                    id='email'
                    type='text'
                    // onChange={(e) => setEmail(e.target.value)}
                    // value={email}
                />
                {/* {validationErrors.Email && (<div className='error-msg'> * {validationErrors.Email}</div>)} */}
            </div>
            <div className='form-row'>
                <label htmlFor='phone'>Phone:</label>
                <input
                    id='phone'
                    type='text'
                    // onChange={(e) => setPhone(e.target.value)}
                    // value={phone}
                />
                <br />
                <select
                    name='phoneType'
                    // onChange={e => setPhoneType(e.target.value)}
                    // value={phoneType}
                >
                    <option value='' disabled>Select a phone type...</option>
                    {/* {props.phoneTypes.map(phoneType =>
                        <option key={phoneType}>{phoneType}</option>
                    )} */}
                </select>
                {/* {validationErrors.Phone && (<div className='error-msg'>* {validationErrors.Phone}</div>)}
                {validationErrors.PhoneType && (<div className='error-msg'>* {validationErrors.PhoneType}</div>)} */}
            </div>
            <div className='form-row'>
                <label htmlFor='bio'>Short Bio (280 chars):</label>
                <textarea
                    id='bio'
                    name='bio'
                    // onChange={(e) => setBio(e.target.value)}
                    // value={bio}
                />
                {/* {validationErrors.Bio && (<div className='error-msg'>* {validationErrors.Bio}</div>)} */}

            </div>
            <div className='form-row'>
                <input type="radio" value="Instructor"
                    name="staff" id='staff-instructor'
                    // checked={staff === "Instructor" ? "checked" : ""}
                    // onChange={(e) => setStaff(e.target.value)}
                /> Instructor
                <input type="radio" value="Student"
                    name="staff" id='staff-Student'
                    // checked={staff === "Student" ? "checked" : ""}
                    // onChange={(e) => setStaff(e.target.value)}
                /> Student
                <br />
                <input type="checkbox" value="yes" id='checked'
                    onChange={({ target: { value, checked } }) => {
                        // setChecked((checked ? value : ""))
                    }
                    }
                    // checked={checked === '' ? '' : "checked"}
                /> Sign up for our email list?
            </div>
            <button>Submit</button>
        </form>
    </div>

       <CreateSpotCards />
       </>
    );

}

export default CreateSpot
