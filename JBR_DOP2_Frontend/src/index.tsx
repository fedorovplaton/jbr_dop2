import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from 'react-router-dom';
import {Layout} from 'antd';
import MainPage from './core/page/mainPage/MainPage';
import ClientPage from './core/page/clientPage/ClientPage';
import AdminPage from './core/page/adminPage/AdminPage';
import LoginPage from './core/page/loginPage/LoginPage';

const App = () => {
    const renderOnBadUrl = () => {
        return (
            <Redirect to={'/'}/>
        );
    }

    return (
        <Layout>
            <Layout.Header className={'app-header'}>
                <Link to='/login'>Login</Link>&nbsp;&nbsp;
                <Link to='/'>Home</Link>&nbsp;&nbsp;
                <Link to='/client'>Client</Link>&nbsp;&nbsp;
                <Link to='/admin'>Admin</Link>
            </Layout.Header>
            <Layout.Content className={'app-content'}>
                <Switch>
                    <Route exact path='/'>
                        <MainPage/>
                    </Route>
                    <Route path='/login'>
                        <LoginPage/>
                    </Route>
                    <Route path='/client'>
                        <ClientPage/>
                    </Route>
                    <Route path='/admin'>
                        <AdminPage/>
                    </Route>
                    <Route render={renderOnBadUrl}/>
                </Switch>
            </Layout.Content>
            <Layout.Footer className={'app-footer'}>
                Platon Fedorov
            </Layout.Footer>
        </Layout>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <Router basename={'/'} >
            <App/>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
