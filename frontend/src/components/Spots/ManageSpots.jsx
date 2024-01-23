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
    console.log("🚀 ~ ManageSpots ~ currentUserSpots:", currentUserSpots)

    useEffect(() => {
        dispatch(thunkGetSpots())
    }, [dispatch])

    if (!currentUserSpots.length) {
        return (
            <div>
                <h1>Manage Your Spots</h1>
                <button onClick={() => navigate('/spots/new')} >Create a new Spot</button>
            </div>
        )
    } else return (
        <div>
            <h1>Manage Your Spots</h1>
            <div className='spots-container' >
            {currentUserSpots.map(spot => (
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
                    <div className='update-delete'>
                            <button onClick={() => {navigate(`/spots/${spot.id}/edit`)}}>Update</button>
                            <OpenModalButton buttonText="Delete" modalComponent={<DeleteSpot spot={spot}/>}/>
                    </div>
                </div> 
            ))}
        </div>
                
        </div>
    )
    
}

export default ManageSpots;