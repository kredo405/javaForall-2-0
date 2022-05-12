import './employees-list-item.css';

const EmployeesListItem = (props) => {
    const {firstName, lastName, patronymic, onDelete, onToggleProp} = props;

    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="list-group-item-label"
             onClick={onToggleProp} 
             data-toggle="rise">
                {firstName + ' ' + lastName + ' ' + patronymic}
                </span>
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

export default EmployeesListItem;