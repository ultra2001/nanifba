import { Button } from "@material-ui/core";

import styled from "styled-components";
import {auth, provider} from "../firebase";


function Login() {

    const signIn = () => {

        auth.signInWithPopup(provider).catch(alert);
    }
    return (
        
        <Container>

       

                <title> Login </title>   
            

            <LoginContainer>

                 <Logo src="https://icons.iconarchive.com/icons/bokehlicia/captiva/256/chat-bubble-icon.png" />
                   <Button onClick={signIn}>Sign in with Google</Button>
                 </LoginContainer>
     
           

        </Container>
    );
}

export default Login;

const Container = styled.div`
display: grid;
place-items: center;
height: 100vh;
background-color: #f5f5f5;
`;
const LoginContainer = styled.div`
display:flex;
flex-direction:column;
align-items: center;
background-color: white;
padding :40px;
border-radius: 5px;
box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7)
`;

const Logo = styled.img`
height:200px;
width:200px;
margin-bottom:50px;

`;

