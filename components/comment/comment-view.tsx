import { useEffect, useState } from "react";
import { FlatList, ScrollView, TextInput } from "react-native";
import Post from "../../dtos/post";
import endpoint from "../../endpoint";
import CommentItem from "./comment-item";
import Comment from "../../dtos/comment";
import { Pressable, Text } from "react-native";

export default function CommentView(props: {postId: string, setNumComments: Function, setUserCommented: Function}){

    const [comments, setComments] = useState<Comment[]>([]);
    const [replies, setReplies] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>("");

    const testComments: Comment[] = [
        {cid: "123", pid: "test-profile", psid: "test-post", message: "Test Comment 1", dateCreated: new Date()},
        {cid: "456", pid: "test-profile", psid: "test-post", message: "Test Comment 2", dateCreated: new Date()},
    ]
    const testReplies: Comment[] = [
        {cid: "789", pid: "test-profile", psid: "test-post", message: "Test Reply 1", dateCreated: new Date(), parentComment: "123"},
        {cid: "222", pid: "test-profile", psid: "test-post", message: "Test Reply 2", dateCreated: new Date(), parentComment: "123"},
        {cid: "333", pid: "test-profile", psid: "test-post", message: "Test Reply 3", dateCreated: new Date(), parentComment: "456"}
    ]


    // useEffect(()=>{
    //     (async ()=>{
    //         const response = await fetch(`${endpoint}/${props.post.psid}.json`);
    //         const currentComments: Comment[] = await response.json();
    //         setComments(currentComments);
    //     })()
    // },[])

    function postComment(){
        
    }


    return(<>
       {testComments &&
            <FlatList
                data={testComments}
                renderItem={({item})=><CommentItem {...item} replies={testReplies.filter((c) => c.parentComment === item.cid)}/>}
                keyExtractor={item => item.cid}
            />
       }
       <TextInput placeholder={"Add comment..."} onChangeText={t => setNewComment(t)}/>
       <Pressable onPress={postComment}><Text>Post</Text></Pressable>
    </>)
}