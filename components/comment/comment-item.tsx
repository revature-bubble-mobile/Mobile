import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { Text } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import Comment from "../../dtos/comment"
import Profile from "../../dtos/profile"
import endpoint from "../../endpoint";

export default function CommentItem(props: Comment & {replies: Comment[]}){

    const [userProfile, setUserProfile] = useState<Profile>();

    useEffect(()=>{
        (async ()=>{
            const response = await fetch(`${endpoint}/profile/${props.pid}.json`);
            const commentProfile: Profile = await response.json();
            setUserProfile(commentProfile);
        })()
    },[])

    async function getReplyProfile(pid: string){
        const response = await fetch(`${endpoint}/profile/${pid}.json`);
        const replyProfile: Profile = await response.json();
        return replyProfile.username;
    }


    return(<>
        <Text>`${props.dateCreated.toLocaleString()}`</Text>
        <Text>`${userProfile?.username} says: /n${props.message}`</Text>
        <Pressable><Text>Reply</Text></Pressable>
        {props.replies[0] &&
            <FlatList
            data={props.replies}
            renderItem={({item})=><><Text>`${item.dateCreated.toLocaleString()}`</Text><Text>`${()=>getReplyProfile(item.pid)} says: /n${item.message}`</Text></>}
            keyExtractor={item => item.cid}
            />
        }
    </>)
}