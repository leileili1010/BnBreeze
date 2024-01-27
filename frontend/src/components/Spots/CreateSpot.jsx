import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkCreateSpot } from '../../store/spots';
import './CreateSpot.css';
import { thunkCreateImage } from '../../store/spots';

const CreateSpot = () => {
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const editCountry = (e) => setCountry(e.target.value);
    const editAddress = (e) => setAddress(e.target.value);
    const editCity = (e) => setCity(e.target.value);
    const editState = (e) => setState(e.target.value);
    const editDescription = (e) => setDescription(e.target.value);
    const editName = (e) => setName(e.target.value);
    const editPrice = (e) => setPrice(e.target.value);
    const editPreviewImage = (e) => setPreviewImage(e.target.value);
    const editImage1 = (e) => setImage1(e.target.value);
    const editImage2 = (e) => setImage2(e.target.value);
    const editImage3 = (e) => setImage3(e.target.value);
    const editImage4 = (e) => setImage4(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = {};
        if (!previewImage.length) errors.previewImage = "Preview image is required";

        if (previewImage && !previewImage.includes(".png") && !previewImage.includes(".jpg") && !previewImage.includes(".jpeg")) {
            errors.previewImage = "Image URL needs to in a format of .png or .jpg (or .jpeg)"
        }
        if (image1 && !image1.includes(".png") && !image1.includes(".jpg") && !image1.includes(".jpeg")) {
            errors.image1 = "Image URL needs to in a format of .png or .jpg (or .jpeg)"
        }
        if (image2 && image2.includes(".png") && !image2.includes(".jpg") && !image2.includes(".jpeg")) {
            errors.image2 = "Image URL needs to in a format of .png or .jpg (or .jpeg)"
        }
        if (image3 && !image3.includes(".png") && !image3.includes(".jpg") && !image3.includes(".jpeg")) {
            errors.image3 = "Image URL needs to in a format of .png or .jpg (or .jpeg)"
        }
        if (image4 && !image4.includes(".png") && !image4.includes(".jpg") && !image4.includes(".jpeg")) {
            errors.image4 = "Image URL needs to in a format of .png or .jpg (or .jpeg)"
        }
        setValidationErrors(errors);

        const newSpot = {
            address,
            city,
            state,
            country,
            name,
            description,
            price
        }

        const newImages = [
            {
                url: previewImage,
                preview: true
            }, 
            image1?
            {
                url: image1,
                preview: false
            } : null,
            image2?
            {
                url: image2,
                preview: false
            } : null,
            image3?
            {
                url: image3,
                preview: false
            } : null,
            image4?
            {
                url: image4,
                preview: false
            } : null
        ]
      
        const data = await dispatch(thunkCreateSpot(newSpot));        
        if (data?.errors ) {
            errors = {...errors, ...data.errors}
            setValidationErrors(errors);
        } 
        
        if (!Object.keys(errors).length) {
             for (let image of newImages) {
                if(image) dispatch(thunkCreateImage(data.id, image));
            }
            navigate(`/spots/${data.id}`)
        }
    }

    return (
        <div id="addspot-form-container">
            <h1>Create a New Spot</h1>
            <form  action="" onSubmit={handleSubmit}>
                <div className="location">
                    <h3>Where&apos;s your place located?</h3>
                    <h4>Guests will only get your exact address once they booked a reservation.</h4>
                    <label>
                        Country
                        <input value={country} onChange={editCountry} placeholder="Country" type="text" />
                    </label>
                    {validationErrors.country && <p className='validationErrors'>{validationErrors.country}</p>}

                    <label>
                        Street Address
                        <input value={address} onChange={editAddress} placeholder="Address" type="text" />
                    </label>
                    {validationErrors.address && <p className='validationErrors'>{validationErrors.address}</p>}

                    <div className="city-state">
                        <div>
                            <label>
                                City
                                <input id='city' value={city} onChange={editCity} placeholder="City" type="text" />
                            </label>
                            {validationErrors.city && <p className='validationErrors'>{validationErrors.city}</p>}
                        </div>
                        
                        <div>
                            <label>
                                State
                                <input id="state" value={state} onChange={editState} placeholder="STATE" type="text" />
                             </label>
                            {validationErrors.state && <p className='validationErrors'>{validationErrors.state}</p>}
                        </div>
                    </div>
                </div>

                <div className="description">
                    <h3>Describe your place To guests</h3>
                    <h4>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</h4>
                    <textarea value={description} onChange={editDescription} placeholder="Please write at least 30 characters"></textarea>
                    {validationErrors.description && <p className='validationErrors'>{validationErrors.description}</p>}
                </div>

                <div className="title">
                    <h3>Create a title for your spot</h3>
                    <h4>Catch guests&apos; attention with a spot title that highlights what makes your place special.</h4>
                    <input value={name} onChange={editName} placeholder="Name of your spot" type="text" />
                    {validationErrors.name && <p className='validationErrors'>{validationErrors.name}</p>}
                </div>

                <div className="base-price">
                    <h3>Set a base price for your spot</h3>
                    <h4>Competitive pricing can help your listing stand out and rank higher in search results.</h4>
                    $ <input value={price} onChange={editPrice} placeholder="Price per night (USD)" type="number" />
                    {validationErrors.price && <p className='validationErrors'>{validationErrors.price}</p>}
                </div>

                <div className="spot-photos">
                    <h3>Liven up your spot with photos</h3>
                    <h4>Submit a link to at least one photo to publish your spot.</h4>
                    <input value={previewImage} onChange={editPreviewImage} placeholder="Preview Image URL" type="URL" />
                    {validationErrors.previewImage && <p className='validationErrors'>{validationErrors.previewImage}</p>}
                    <input value={image1} onChange={editImage1} placeholder="Image URL" type="URL" />
                    {validationErrors.image1 && <p className='validationErrors'>{validationErrors.image1}</p>}
                    <input value={image2} onChange={editImage2} placeholder="Image URL" type="URL" />
                    {validationErrors.image2 && <p className='validationErrors'>{validationErrors.image2}</p>}
                    <input value={image3} onChange={editImage3} placeholder="Image URL" type="URL" />
                    {validationErrors.image3 && <p className='validationErrors'>{validationErrors.image3}</p>}
                    <input value={image4} onChange={editImage4} placeholder="Image URL" type="URL" />
                    {validationErrors.image4 && <p className='validationErrors'>{validationErrors.image4}</p>}
                </div>
                <button id="spot-submit" type="submit">Create Spot</button>
            </form>
        </div>
    )
}

export default CreateSpot;