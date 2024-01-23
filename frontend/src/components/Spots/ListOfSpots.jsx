import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {thunkGetSpots} from '../../store/spots';
import { Link } from 'react-router-dom';

const ListOfSpots = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spots);
    const spotsArr = Object.values(spots);

    useEffect(() => {
        dispatch(thunkGetSpots());
    }, [dispatch])

    if (!spotsArr) return null;

    return (
        <div className='spots-container' >
            {spotsArr.map(spot => (
                <div className='spot' key={spot.id} title={spot.name}>
                    <Link key={spot.id} to={`/spots/${spot.id}`}>
                        <div className="preview">
                            <img className="spotImg" src={spot.previewImage} alt="preview of spot" />
                        </div>
                        <div className='address'>{`${spot.city}, ${spot.state}`}</div>
                        <div className='rating'>
                            {
                                spot.avgRating !== "No ratings yet"?
                                (<span><i className="fa-solid fa-star"></i>{parseFloat(spot.avgRating).toFixed(1)}</span>):
                                (<span><i className="fa-solid fa-star"></i>New</span>)
                            }
                        </div>
                        <div className='price'>{`$${parseFloat(spot.price).toFixed(2)} night`}</div>
                    </Link>
                </div>
            ))}
        </div>
    )
}


export default ListOfSpots;