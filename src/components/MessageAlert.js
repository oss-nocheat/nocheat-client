import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const MessageAlert = (props) => {
    const [visible, setVisible] = useState(true);

    const onDismiss = () => setVisible(false);

    return (
        <Alert color="info" isOpen={visible} toggle={onDismiss}>
            {props.message}
        </Alert>
    );
}

export default MessageAlert;
