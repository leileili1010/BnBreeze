import { useParams} from 'react-router-dom';
import SpotForm from './SpotForm';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { thunkGetSpot} from '../../store/spots';
import { Navigate } from 'react-router-dom';

const EditSpot = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const spot = useSelector(state => state.spots[spotId]);
    const userId = useSelector(state => state.session.user.id);
    const ownerId = spot?.ownerId;

    useEffect(() => {
        dispatch(thunkGetSpot(spotId))
      }, [dispatch, spotId]) 

      if(!spot || !spot.SpotImages) return null;

      if (userId !== ownerId) {
        window.alert("Authorization is required to update this spot")
        return <Navigate to='/' replace={true} />
      }
    
    return (
        <>
            <SpotForm spot={spot} />
        </>
        
    )
}

export default EditSpot;
