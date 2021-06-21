
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components"
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { useRef, useState } from "react";
import firebase from "firebase";



function ChatScreen({ chat, messages, users }) {

    const [user] = useAuthState(auth);



    const router = useRouter();
    const [input, setInput] = useState("")
    const endOfMessageRef = useRef(null);
    const [messagesSnapshot] = useCollection(
        db
            .collection("chats")
            .doc(router.query.id)
            .collection("messages")
            .orderBy("timestamp", "asc")
    );





    const showMessage = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map((message) => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                />
            ));
        } else {
            return JSON.parse(messages).map((message) => (
                <Message key={message.id} user={message.user} message={message} />
            ));
        }

    };

    const ScrollToBottom = () => {

        endOfMessageRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }







    const sendMessage = (e) => {
        e.preventDefault();

        // Update Last Seen...
        db.collection("users").doc(user.uid).set(
            {
                lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
        );

        db.collection("chats").doc(router.query.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL,
        });

        setInput("");
        ScrollToBottom();


    };



    return (


        <Container>

            <Header>


           



                <HeaderInformation />

                <HeaderIcon>


                </HeaderIcon>

            </Header>

            <MessageContainer>
                {showMessage()}
                <EndOfMessage ref={endOfMessageRef} />
            </MessageContainer>

            <InputContainer>

                <Input value={input} onChange={(e) => setInput(e.target.value)} />
                <button hidden disabled={!input} type="submit" onClick={sendMessage}>
                    Send Message</button>
            </InputContainer>

        </Container>

    );

}



export default ChatScreen;

const Container = styled.div`
width:500px;
`;

const Input = styled.input`
flex: 1;
outline: 0;
border-radius: 10px;
background-color:  #f5f5f5;
padding: 20px;
margin-left: 15px;
margin-right: 15px;	

`;

const InputContainer = styled.form`
display: flex;
align-items: center;
padding: 10px;
position: sticky;
bottom: 0;
background-color: white;
z-index: 100;

`;

const Header = styled.div`
position: sticky;
background-color: white;
z-index: 100;
top: 0;
display: flex;
padding: 11px;
height: 80px;
align-items: center;
border-bottom: 1px solid #f5f5f5;
`;

const HeaderInformation = styled.div`
margin-left: 15px;
flex: 1;

> h3 {
    margin-bottom: 3px;
}

> p {
    font-size: 14px;
    color: gray;
}
`;

const EndOfMessage = styled.div``;

const HeaderIcon = styled.div``;

const MessageContainer = styled.div`
padding: 30px;
background-color: #e5ded8;
min-height: 90vh;
`;
