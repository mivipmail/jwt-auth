import React from 'react';

export const Input = ({input, meta, ...props}) => {
    const showError = meta.touched && meta.error
    return (
        <div>
            <input {...input} {...props} className={props.className + ' ' + (showError ? 'input-error' : '')} />
            {showError &&
                <span className="text-xl-start text-danger">{meta.error}</span>
            }
        </div>
    )
}
