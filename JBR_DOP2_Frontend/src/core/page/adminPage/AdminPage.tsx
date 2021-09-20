import React, {useEffect, useState} from 'react';
import CentralizedComponentHoc from '../../hoc/CentralizedComponentHoc';
import {AccessService} from '../../service/AccessService';
import {Redirect} from 'react-router-dom';

function AdminPage (): JSX.Element | null {
    const [access, setAccess] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        AccessService.getAccess('admin').then(() => {
            setAccess(true);
        }).catch(() => {
            setAccess(false);
        });
    }, [])

    if (access === undefined) {
        return null;
    }

    return (
        access ? (
            CentralizedComponentHoc(<div>AdminPage</div>)
        ) : (
            <Redirect to={'/login'}/>
        )
    );
}

export default AdminPage;
