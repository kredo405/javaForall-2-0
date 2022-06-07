import { useState } from 'react';
import {Alert, AlertTitle, Stack, IconButton, Collapse} from '@mui/material';
import './erorr-message.scss';

const ErrorMessage = (props) => {
    const [open, setOpen] = useState(true);
    // const setIsError = () => {
    //     props.setError();
    // }

    return (
        <div className='error'>
            <Stack sx={{ width: '100%' }} spacing={2}>
            <Collapse in={open}>
                <Alert severity="error"
                        action={
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                            >
                            </IconButton>
                        }
                >
                    <AlertTitle>Error</AlertTitle>
                    {props.error.message}
                </Alert>
            </Collapse>
            </Stack>
        </div>
    )
}

export default ErrorMessage;