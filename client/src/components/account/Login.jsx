import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Component = styled(Box)`
    width: 100%;
    max-width: 400px;
    margin: auto;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: #fff;
`;

const Image = styled('img')({
    width: 80,
    display: 'flex',
    margin: 'auto',
    padding: '30px 0 10px'
});

const Wrapper = styled(Box)`
    padding: 20px 30px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    // background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 5px;
    &:hover {
        background:#1cc0fb;
    }
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    &:hover {
        background: #f5f5f5;
    }
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 14px;
`;

const Error = styled(Typography)`
    font-size: 12px;
    color: #ff6161;
    line-height: 1;
    margin-top: 10px;
    font-weight: 600;
`;

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    const imageURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS20BUPvCKcqyhP_hjhi1h3i-8D1BS-ZwYGt-wzE1wcdQdofhSV37w8XvIXzBG4Lrgku3w&usqp=CAU';

    useEffect(() => {
        showError(false);
    }, [login]);

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            showError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            
            isUserAuthenticated(true);
            setLogin(loginInitialValues);
            navigate('/');
        } else {
            showError('Something went wrong! Please try again later.');
        }
    };

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong! Please try again later.');
        }
    };

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    };

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="blog" />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField 
                                variant="standard" 
                                value={login.username} 
                                onChange={(e) => onValueChange(e)} 
                                name='username' 
                                label='Enter Username' 
                                fullWidth
                            />
                            <TextField 
                                variant="standard" 
                                value={login.password} 
                                onChange={(e) => onValueChange(e)} 
                                name='password' 
                                label='Enter Password' 
                                type='password' 
                                fullWidth
                            />

                            {error && <Error>{error}</Error>}

                            <LoginButton variant="contained" onClick={() => loginUser()} fullWidth>Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={() => toggleSignup()} style={{ marginBottom: 50 }} fullWidth>Create an account</SignupButton>
                        </Wrapper> :
                        <Wrapper>
                            <TextField 
                                variant="standard" 
                                onChange={(e) => onInputChange(e)} 
                                name='name' 
                                label='Enter Name' 
                                fullWidth
                            />
                            <TextField 
                                variant="standard" 
                                onChange={(e) => onInputChange(e)} 
                                name='username' 
                                label='Enter Username' 
                                fullWidth
                            />
                            <TextField 
                                variant="standard" 
                                onChange={(e) => onInputChange(e)} 
                                name='password' 
                                label='Enter Password' 
                                type='password' 
                                fullWidth
                            />

                            <SignupButton onClick={() => signupUser()} fullWidth>Signup</SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant="contained" onClick={() => toggleSignup()} fullWidth>Already have an account</LoginButton>
                        </Wrapper>
                }
            </Box>
        </Component>
    )
}

export default Login;
