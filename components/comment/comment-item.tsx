import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { Text } from "react-native-elements";
import Comment from "../../dtos/comment"
import Profile from "../../dtos/profile"
import endpoint from "../../endpoint";

export default function CommentItem(props: Comment){

    const [userProfile, setUserProfile] = useState<Profile>();

    useEffect(()=>{
        (async ()=>{
            const response = await fetch(`${endpoint}/profile/${props.pid}.json`);
            const commentProfile: Profile = await response.json();
            setUserProfile(commentProfile);
        })()
    },[])


    return(<>
        <Text>`${props.dateCreated.toLocaleString()}`</Text>
        <Text>`${userProfile?.username} says: /n${props.message}`</Text>
        <Pressable><Text>Reply</Text></Pressable>
    </>)
}