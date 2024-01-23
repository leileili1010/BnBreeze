import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkUpdateSpot} from '../../store/spots';
import './CreateSpot.css';

const SpotForm = ({spot}) => {
    const [country, setCountry] = useState(spot?.country);
    const [address, setAddress] = useState(spot?.address);
    const [city, setCity] = useState(spot?.city);
    const [state, setState] = useState(spot?.state);
    const [description, setDescription] = useState(spot?.description);
    const [name, setName] = useState(spot?.name);
    const [price, setPrice] = useState(spot?.price);
    const [previewImage, setPreviewImage] = useState(spot?.SpotImages[0]?.url);
    const [image1, setImage1] = useState(spot?.SpotImages[1]?.url);
    const [image2, setImage2] = useState(spot?.SpotImages[2]?.url);
    const [image3, setImage3] = useState(spot?.SpotImages[3]?.url);
    const [image4, setImage4] = useState(spot?.SpotImages[4]?.url);
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
            errors.image = "Image URL needs to in a format of .png or .jpg (or .jpeg)"
        }
        if (image2 && image2.includes(".png") && !image2.includes(".jpg") && !image2.includes(".jpeg")) {
            errors.image = "Image URL needs to in a format of .png or .jpg (or .jpeg)"
        }
        if (image3 && !image3.includes(".png") && !image3.includes(".jpg") && !image3.includes(".jpeg")) {
            errors.image = "Image URL needs to in a format of .png or .jpg (or .jpeg)"
        }
        if (image4 && !image4.includes(".png") && !image4.includes(".jpg") && !image4.includes(".jpeg")) {
            errors.image = "Image URL needs to in a format of .png or .jpg (or .jpeg)"
        }
        setValidationErrors(errors);

        const newSpot = {address, city, state, country, name, description, price};

        // const newImages = [
        //     {
        //         url: previewImage,
        //         preview: true
        //     }, 
        //     image1?
        //     {
        //         url: image1,
        //         preview: false
        //     } : null,
        //     image2?
        //     {
        //         url: image2,
        //         preview: false
        //     } : null,
        //     image3?
        //     {
        //         url: image3,
        //         preview: false
        //     } : null,
        //     image4?
        //     {
        //         url: image4,
        //         preview: false
        //     } : null
        // ]
       
        const updatedSpot = await dispatch(thunkUpdateSpot(newSpot, spot.id));
        
        if(updatedSpot.errors) {
            errors = {...errors, ...updatedSpot.errors};
            setValidationErrors(errors);
        } else {
            // for (let image of newImages) {
            //     if(image) dispatch(thunkCreateImage(spot.id, image));
            // }
            navigate(`/spots/${updatedSpot.id}`)
        }
    }

    if(!spot || !spot.SpotImages) return null;

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
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
                        <label>
                            City
                            <input value={city} onChange={editCity} placeholder="City" type="text" />
                        </label>
                        {validationErrors.city && <p className='validationErrors'>{validationErrors.city}</p>}
                        <label>
                            State
                            <input value={state} onChange={editState} placeholder="STATE" type="text" />
                        </label>
                        {validationErrors.state && <p className='validationErrors'>{validationErrors.state}</p>}
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
                    {validationErrors.image && <p className='validationErrors'>{validationErrors.image}</p>}
                    <input value={image2} onChange={editImage2} placeholder="Image URL" type="URL" />
                    {validationErrors.image && <p className='validationErrors'>{validationErrors.image}</p>}
                    <input value={image3} onChange={editImage3} placeholder="Image URL" type="URL" />
                    {validationErrors.image && <p className='validationErrors'>{validationErrors.image}</p>}
                    <input value={image4} onChange={editImage4} placeholder="Image URL" type="URL" />
                    {validationErrors.image && <p className='validationErrors'>{validationErrors.image}</p>}
                </div>
                <button type="submit">Update your Spot</button>
            </form>
        </div>
    )
}

export default SpotForm;