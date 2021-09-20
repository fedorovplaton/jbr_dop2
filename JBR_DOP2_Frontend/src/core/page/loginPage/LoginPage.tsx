import React, {useState} from 'react';
import 'antd/dist/antd.css';
import './LoginPage.css'
import {Form, Input, Button, Tag} from 'antd';
import {AuthService} from '../../service/AuthService';
import {TokenService} from '../../service/TokenService';
import {useHistory} from 'react-router-dom';
import CentralizedComponentHoc from '../../hoc/CentralizedComponentHoc';
import {AccessService} from '../../service/AccessService';

function LoginPage (): JSX.Element {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(TokenService.getToken() ? true : false);
    const [message, setMessage] = useState('');
    const history = useHistory();

    const onLogin = (): void => {
        AuthService.login(username, password).then((response) => {
            if (response.token) {
                setIsAuthorized(true);

                AccessService.getAccess('admin').then(() => {
                    history.push('/admin');
                }).catch(() => {
                    history.push('/client');
                });
            } else {
                setMessage(response.message ? response.message : '');
            }
        }).catch(() => {
            setMessage('Error while logging');
        });
    }

    const onRegister = (): void => {
        AuthService.register(username, password).then(() => {
            setMessage('Registration is successful');
        }).catch(() => {
            setMessage('Error in registration');
        });
    }

    const onLogOut = () => {
        TokenService.setToken('');
        setIsAuthorized(false);
    }

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const text = e.currentTarget.value;

        setPassword(text);
    }

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const text = e.currentTarget.value;

        setUsername(text);
    }

    if (isAuthorized) {
        return CentralizedComponentHoc(
            <Button className={'login-page-logout-wrapper'} onClick={onLogOut}>Logout</Button>
        );
    }

    return (
        CentralizedComponentHoc(
            <div>
                <Tag color={'blue'}>user&nbsp;/&nbsp;user</Tag>
                <Tag color={'green'}>admin&nbsp;/&nbsp;admin</Tag>
                <Form
                    className={'login-page-form'}
                    name='basic'
                    labelCol={{span: 8,}}
                    wrapperCol={{span: 16,}}
                    autoComplete='off'
                >
                    <Form.Item
                        label='Username'
                        name='username'
                        rules={[
                            {
                                required: true,
                                message: 'Username is required!',
                            },
                        ]}
                    >
                        <Input onChange={onUsernameChange} value={username}/>
                    </Form.Item>
                    <Form.Item
                        label='Password'
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Password is required. Min length is 4, max length is 30.',
                                min: 4,
                                max: 30
                            },
                        ]}
                    >
                        <Input.Password onChange={onPasswordChange} value={password}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type='primary' onClick={onLogin}>
                            Login
                        </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type='primary' onClick={onRegister}>
                            Register
                        </Button>
                    </Form.Item>
                    {
                        message && (
                            <Form.Item
                                label='Message'
                                name='maeesage'
                            >
                                {message}
                            </Form.Item>
                        )
                    }
                </Form>
            </div>
        )
    );
}

export default LoginPage;
