import React from 'react';
import './CentralizedComponentHoc.css';

function CentralizedComponentHoc(component: React.ReactNode): JSX.Element {
    return (
        <div className={'centralized-component-wrapper'}>
            {component}
        </div>
    );
}

export default CentralizedComponentHoc;
