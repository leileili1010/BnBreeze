import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

const SpotDetails = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const spots = useSelector(state => state.spots)
    const spot = spots[spotId];
    console.log("🚀 ~ SpotDetails ~ spot :", spot );

    return (
        <div>
            <h1>{spot.name}</h1>
            <h3>{spot.city}, {spot.state}, {spot.country}</h3>
            <h1>{spot.Owner}</h1>
        </div>
    )
    
}


export default SpotDetails;