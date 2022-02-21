import { useEffect, useState } from "react";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import Post from "../../dtos/post";
import endpoint from "../../endpoint";
import CommentItem from "./comment-item";
import Comment from "../../dtos/comment";
import { Pressable } from "react-native";
import { Text } from "react-native-elements";
import { ListItem } from "react-native-elements/dist/list/ListItem";

export default function CommentView(props: {post: Post, updatePost: Function}){

    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>("");


    useEffect(()=>{
        (async ()=>{
            const response = await fetch(`${endpoint}/${props.post.psid}.json`);
            const currentComments: Comment[] = await response.json();
            setComments(currentComments);
        })()
    },[])

    function postComment(){
        
    }


    return(<ScrollView>
       {comments[0] &&
            <FlatList
                data={comments}
                renderItem={({item})=><CommentItem {...item} replies={comments.filter((c) => c.parentComment === item.cid)}/>}
                keyExtractor={item => item.cid}
            />
       }
       <TextInput placeholder={"Add comment..."} onChangeText={t => setNewComment(t)}/>
       <Pressable onPress={postComment}><Text>Post</Text></Pressable>
    </ScrollView>)
}