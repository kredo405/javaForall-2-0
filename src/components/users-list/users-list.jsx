import UsersListItem from "../users-list-item/users-list-item";
import './user-list.css';

const UsersList = ({ data, onDelete, onToggleProp, isAuth }) => {
    const elements = data.map(item => {
        const { id, ...itemProps } = item;
        return (
            <UsersListItem
                key={id}
                {...itemProps}
                isAuth={isAuth}
                id={id}
                onDelete={() => onDelete(id)}
                onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
            />
        )
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default UsersList;