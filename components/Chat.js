import { Avatar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import {useRouter} from "next/router";
import getRecipientEmail from "../utils/getRecipientEmail";

function Chat({ id, users}) {
   
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [receiverSnapshot] = useCollection(
        db.collection("users").where("email", '==', getRecipientEmail(users,user))
        ); 

        const enterChat = () => {
            router.push(`/chat/${id}`)
        }
    
    const recipient = receiverSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(users, user);
    
    return (
        <Container onClick={enterChat}>

        {recipient ?(
            <UserAvatar src={recipient?.photoURl} />
        ): (
            <UserAvatar> {recipientEmail[0]} </UserAvatar> 
          
        )}
        


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

const UserAvatar = styled(Avatar)`
margin: 5px;
margin-right: 15px;
border: 1px Solid black;

 :hover{
    background: #f12711;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #f5af19, #f12711);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #f5af19, #f12711); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

 }
`;

