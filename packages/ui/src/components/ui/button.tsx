import React from 'react';

function Button({children,...props}) {
    return (
        <div>{children}</div>
    );
}

export  {
    Button
};