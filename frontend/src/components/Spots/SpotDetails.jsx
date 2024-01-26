import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { thunkGetSpot } from '../../store/spots';
import SpotReviews from '../Reviews/SpotReviews';
import { thunkGetReviews } from '../../store/reviews';
import './SpotDetails.css';

const SpotDetails = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const spot = useSelector(state => state.spots[spotId]);
    const reviewsArr = Object.values(useSelector(state => state.reviews));

    useEffect(() => {
        dispatch(thunkGetSpot(spotId));
    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(thunkGetReviews(spotId));
    }, [dispatch, spotId, reviewsArr.length])

    
    const handleReserve = () => {
        alert("Feature coming soon");
    }
    
    if (!spot || !spot.SpotImages) return null;
    
    return (
        <div className='spot-details-contailer'>
            <h2>{spot.name}</h2>
            <h3>{spot.city}, {spot.state}, {spot.country}</h3>

            <div className='images-container'>
                <div className='large-img-container'>
                    <img src={`${spot.SpotImages[0]?.url}`} className="large-img" alt="large image of spot" />
                </div>
                <div className='small-img-container'>
                    {spot.SpotImages.slice(1,5).map(spotImage => (
                        spotImage?
                       (<img src={`${spotImage.url}`} key={spotImage.id} className="small-img" alt="small image of spot" />):
                       (<div key=""></div>)
                    ))}  
                </div>
            </div>

            <h2>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h2>
            <p>{spot.description}</p>

            <div className="reserve-container">
                <div className='price'>{`$${parseFloat(spot.price).toFixed(2)} night`}</div>
                <div className='rating-review'>
                    {
                        spot.avgStarRating !== "No ratings yet."?
                        (<span><i className="fa-solid fa-star"></i>{parseFloat(spot.avgStarRating).toFixed(1)}</span>):
                        (<span><i className="fa-solid fa-star"></i>New</span>)  
                    }
                    <span>{spot.numReviews !== "No reviews yet."? (spot.numReviews>1? ` · ${spot.numReviews} Reviews`: ` · ${spot.numReviews} Review`): null}</span>
                </div>
                <button onClick={handleReserve}>Reserve</button>
            </div>
            
            <SpotReviews spot={spot} reviewsArr={reviewsArr}/>
        </div>
    )
    
}

export default SpotDetails;