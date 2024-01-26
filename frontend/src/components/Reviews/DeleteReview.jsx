import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkDeleteReview } from '../../store/reviews';
import { thunkGetSpot } from '../../store/spots';
import './DeleteReview.css'

const DeleteReview = ({review}) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        e.preventDefault();
        
        const data = await dispatch(thunkDeleteReview(review.id));
        if (!data.errors) {
            dispatch(thunkGetSpot(review.spotId));
            closeModal();
        }
    }

    return (
        <div className='delete-review-container'>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this review?</p>
            <button onClick={handleDelete}>Yes (Delete Review)</button>
            <button onClick={closeModal}>No (Keep Review)</button>
        </div>
        
    )
}

export default DeleteReview;