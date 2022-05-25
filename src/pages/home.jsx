import AppInfo from '../components/app-info/app-info';
import SearchPanel from '../components/search-panel/search-panel';
import AppFilter from '../components/app-filter/app-filter';
import UsersList from '../components/users-list/users-list';
import UsersAddForm from '../components/users-add-form/users-add-form';

const Home = ({ onUpdateSearch, filter, onFilterSelect, users, data, onDelete, onToggleProp, onAdd, isAuth }) => {
    return (
        <div className='home'>
            <div className="search-panel">
                <SearchPanel onUpdateSearch={onUpdateSearch} />
                <AppFilter filter={filter} onFilterSelect={onFilterSelect} />
            </div>
            <AppInfo
                users={users}
            />
            <UsersList
                data={data}
                onDelete={onDelete}
                onToggleProp={onToggleProp}
                isAuth={isAuth} />
            <UsersAddForm onAdd={onAdd} />
        </div>
    )
}

export default Home