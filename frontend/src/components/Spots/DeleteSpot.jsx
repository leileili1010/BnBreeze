import { useDispatch } from 'react-redux';
import { thunkDeleteSpot } from '../../store/spots';
import { useModal } from '../../context/Modal';

const DeleteSpot = ({spot}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault();
        const data = await dispatch(thunkDeleteSpot(spot.id));
        if (!data.errors) {
            closeModal();
        }
    }

    return (
        <div className='delete-spot-modal'>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button onClick={handleDelete}>Yes (Delete Spot)</button>
            <button onClick={closeModal}>No (Keep Spot)</button>
        </div>
        
    )
}

export default DeleteSpot;