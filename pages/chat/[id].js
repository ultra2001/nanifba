import styled from "styled-components";
import Sidebar from "../../Component/Sidebar";
import ChatScreen from "../../Component/ChatScreen";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";




function Chat({ chat, messages }) {



    const [user] = useAuthState(auth);

    return <Container>


        <title>chat</title>



        <Sidebar />

        <ChatContainer>

            <ChatScreen chat={chat} messages={messages} />

        </ChatContainer>

    </Container>;


}

export default Chat;

export async function getServerSideProps(context) {

    const ref = db.collection("Chats").doc(context.query.id);

    //  messages from server render 

    const messagesRes = await ref
        .collection("messages")
        .orderBy("timestamp", "asc")
        .get();

    const messages = messagesRes.docs
        .map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        .map((messages) => ({
            ...messages,
            timestamp: messages.timestamp.toDate().getTime(),
        }));

    //prepare ChatS

    const chatRes = await ref.get();
    const chat = {
        id: chatRes.id,
        ...chatRes.data(),
    };



    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat,
        },
    };

}



const Container = styled.div`
display:flex;

`;

const ChatContainer = styled.div`
display:flex;
overflow:scroll;
height:100vh;

::-webkit-scrollbar {
    display:none;
}
-ms-overflow-style: none;
scrollbar-width:none;
`;