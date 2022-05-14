import { Alert, CloseButton } from 'react-bootstrap';
import { useState } from 'react';
import './erorr-message.scss';

const ErrorMessage = (props) => {
    const { name } = props;
    const [className, setClassName] = useState(name);
    const setStateClassName = () => {
        setClassName('error hideError');
        props.func();
    }

    return (
        <div className={className}>
            <Alert key='danger' variant='danger'>
                {props.error.message}
                <CloseButton  onClick={setStateClassName}/>
            </Alert>
        </div>
    )
}

export default ErrorMessage;