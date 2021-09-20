import React from 'react';
import {Layout} from 'antd'
import 'antd/dist/antd.css';
import './MainPage.css'
import CentralizedComponentHoc from '../../hoc/CentralizedComponentHoc';

function MainPage (): JSX.Element {
    return CentralizedComponentHoc(
        <div className={'main-page-wrapper'}>
            <Layout.Header className={'main-header'}>
                JBR_DOP2 Test task
            </Layout.Header>
        </div>
    );
}

export default MainPage;
