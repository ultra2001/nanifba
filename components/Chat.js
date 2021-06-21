
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { useRouter } from "next/router";
import getRecipientEmail from "../utils/getRecipientEmail";

function Chat({ id, users }) {

    const router = useRouter();
    const [user] = useAuthState(auth);
    const [receiverSnapshot] = useCollection(
        db.collection("users").where("email", '==', getRecipientEmail(users, user))
    );

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }

    const recipient = receiverSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(users, user);

    return (
        <Container onClick={enterChat}>





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



