
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { useRouter } from "next/router";
import getRecipientEmail from "../getRecipientEmail";

function Chat({ id, users }) {

    const router = useRouter();
    const [user] = useAuthState(auth);
   

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }

    const recipientEmail = getRecipientEmail(users, user);

 
      <Container>


            <p> {recipientEmail} </p>


        </Container>
    )
}

export default Chat


const Container = styled.div` 
display:flex;
align-items: center;
cursor:pointer;
padding: 15px;
word-break: break-word;

:hover {
    background-color: #e9eaeb;
}
`;


