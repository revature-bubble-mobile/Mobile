import { useEffect, useState } from "react";
import { FlatList, Text, Pressable } from "react-native";
import Comment from "../../dtos/comment"
import Profile from "../../dtos/profile"
import endpoint from "../../endpoint";

export default function CommentItem(props: Comment & {replies: Comment[]}){

    const [userProfile, setUserProfile] = useState<Profile>();

    const testProfile = {
        pid: "test-profile",
        firstName: "test",
        lastName: "profile",
        passkey: "xxxxx",
        email: "none@email.com",
        username: "tprofile",
        imgurl: "",
        verification: true,
        followers: [],
        following: []}

    useEffect(()=>{
        // (async ()=>{
        //     const response = await fetch(`${endpoint}/profile/${props.pid}.json`);
        //     const commentProfile: Profile = await response.json();
        //     setUserProfile(commentProfile);
        // })()
        setUserProfile(testProfile);
    },[])

    async function getReplyProfile(pid: string){
        const response = await fetch(`${endpoint}/profile/${pid}.json`);
        const replyProfile: Profile = await response.json();
        return replyProfile.username;
    }


    return(<>
        <Text>{props.dateCreated.toLocaleString()}</Text>
        <Text>{`${userProfile?.username} says: \n${props.message}`}</Text>
        <Pressable><Text>Reply</Text></Pressable>
        {props.replies[0] &&
            <FlatList
            data={props.replies}
            renderItem={({item})=><><Text>{item.dateCreated.toLocaleString()}</Text><Text>{`${()=>getReplyProfile(item.pid)} says: \n${item.message}`}</Text></>}
            keyExtractor={item => item.cid}
            />
        }
    </>)
}