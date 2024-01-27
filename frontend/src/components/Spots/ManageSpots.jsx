import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {thunkGetSpots} from '../../store/spots';
import { Link, useNavigate } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import DeleteSpot from './DeleteSpot';

const ManageSpots = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userId = useSelector(state => state.session.user.id);
    const spots = useSelector(state => state.spots);
    const currentUserSpots = [];
    Object.values(spots).forEach(spot => {if(spot.ownerId === userId) currentUserSpots.push(spot)});

    useEffect(() => {
        dispatch(thunkGetSpots())
    }, [dispatch])

    if (!currentUserSpots.length) {
        return (
            <div className='manage-spot'>
                <h2>Manage Your Spots</h2>
                <button id='manage-spot-create-button' onClick={() => navigate('/spots/new')} >Create a new Spot</button>
            </div>
        )
    } else return (
        <div >
            <h2 id="manage-spot-h1">Manage Your Spots</h2>
            <div id='spots-container' >
                {currentUserSpots.map(spot => (
                    <div className='spot' key={spot.id} title={spot.name}>
                        <Link key={spot.id} to={`/spots/${spot.id}`}>

                            <div className="preview">
                                <img className="spotImg" src={spot.previewImage} alt="preview of spot" />
                            </div>

                            <div className='address-rating flex'>
                                <div className='address'>{`${spot.city}, ${spot.state}`}</div>
                                <div className='rating'>
                                    {
                                        spot.avgRating !== "No ratings yet" ?
                                            (<span><i className="fa-solid fa-star"></i>{parseFloat(spot.avgRating).toFixed(1)}</span>) :
                                            (<span><i className="fa-solid fa-star"></i>New</span>)
                                    }
                                </div>
                            </div>

                            <div className='price-night'>
                                <span className='price'>{`$${parseFloat(spot.price).toFixed(2)}`}</span>
                                <span className='night'>night</span>
                            </div>
                        </Link>
                        <div id='update-delete'>
                            <button id='review-delete-button' onClick={() => { navigate(`/spots/${spot.id}/edit`) }}>Update</button>
                            <div id='review-delete-button'>
                            <OpenModalButton  buttonText="Delete" modalComponent={<DeleteSpot spot={spot} />} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
    
}

export default ManageSpots;