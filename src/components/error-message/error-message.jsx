import { Alert, CloseButton } from 'react-bootstrap';
import './erorr-message.scss';

const ErrorMessage = (props) => {
    const setIsError = () => {
        props.setError();
    }

    return (
        <div className='error'>
            <Alert key='danger' variant='danger'>
                {props.error.message}
                <CloseButton  onClick={setIsError}/>
            </Alert>
        </div>
    )
}

export default ErrorMessage;