import { Link } from 'react-router-dom'
import './users-list-item.css';

const UsersListItem = (props) => {
    const { firstName, lastName, patronymic, onDelete, id } = props;
    return (
        <li className="list-group-item d-flex justify-content-between">
            <Link className='link' to={`/student/${id}`}>
                <span className="list-group-item-label">
                    {firstName + ' ' + lastName + ' ' + patronymic}
                </span>
            </Link>
            <div className='d-flex justify-content-center align-items-center'>
                <button type="button"
                    className="btn-trash btn-sm "
                    onClick={onDelete}
                >
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </li>
    )
}

export default UsersListItem;