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
                                spot.avgRating?
                                (<span><i class="fa-solid fa-star"></i>{(spot.avgRating).toFixed(2)}</span>):
                                (<span><i class="fa-solid fa-star"></i>New</span>)
                            }
                        </div>
                        <div className='price'>{`$${(spot.price.toFixed(2))} night`}</div>
                    </Link>
                </div>
            ))}
        </div>
    )
}


export default ListOfSpots;