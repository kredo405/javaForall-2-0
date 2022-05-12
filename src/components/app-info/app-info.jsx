import "./app-info.scss";

const AppInfo = ({users}) => {
    return (
        <div className="app-info">
            <h5>Общее число: {users}</h5>
        </div>
    )
}

export default AppInfo;