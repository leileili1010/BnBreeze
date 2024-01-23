import { useParams} from 'react-router-dom';
import SpotForm from './SpotForm';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { thunkGetSpot} from '../../store/spots';

const EditSpot = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const spot = useSelector(state => state.spots[spotId]);
    console.log("🚀 ~ EditSpot ~ spot:", spot)

    useEffect(() => {
        dispatch(thunkGetSpot(spotId))
      }, [dispatch, spotId]) 

      if(!spot || !spot.SpotImages) return null;
    
    return (
        <>
            <h1>Update your Spot</h1>
            <SpotForm spot={spot} />
        </>
        
    )
}

export default EditSpot;
