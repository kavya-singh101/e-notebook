import React from 'react'

function Alert(props) {
    const capatalize = (word) => {
        let lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{ height: '50px' }}>
            <div className={`alert alert-${props.type} alert-dismissible fade show`} role="alert" id='alertBox'>
                <strong>{capatalize(props.type)}</strong>: {props.msg}
            </div>
        </div>
    )
}

export default Alert
