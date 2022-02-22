import { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, TextInput, View } from "react-native";
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
        {cid: "123", writer: "test-profile", post: "test-post", message: "Test Comment 1", dateCreated: new Date()},
        {cid: "456", writer: "test-profile", post: "test-post", message: "Test Comment 2", dateCreated: new Date()},
    ]
    const testReplies: Comment[] = [
        {cid: "789", writer: "test-profile", post: "test-post", message: "Test Reply 1", dateCreated: new Date(), previous: "123"},
        {cid: "222", writer: "test-profile", post: "test-post", message: "Test Reply 2", dateCreated: new Date(), previous: "123"},
        {cid: "333", writer: "test-profile", post: "test-post", message: "Test Reply 3", dateCreated: new Date(), previous: "456"}
    ]


    // useEffect(()=>{
    //     (async ()=>{
    //         const response = await fetch(`${endpoint}/${props.post.post}.json`);
    //         const currentComments: Comment[] = await response.json();
    //         setComments(currentComments);
    //     })()
    // },[])

    function postComment(){
        
    }


    return(<View>
       {testComments &&
            <FlatList
                data={testComments}
                renderItem={({item})=><CommentItem {...item} replies={testReplies.filter((c) => c.previous === item.cid)}/>}
                keyExtractor={item => item.cid}
                style={styles.replyList}
            />
       }
       <View style={styles.commentView}>
       <Text>Enter your comment:</Text>
       <TextInput placeholder={"Add comment..."} onChangeText={t => setNewComment(t)}/>
       <Pressable onPress={postComment} style={styles.postButton}><Text>Post</Text></Pressable>
       </View>
    </View>)
}
const styles = StyleSheet.create({
    replyList: {
        marginBottom: 25
    },
    commentView: {
        marginLeft:20
    },
    postButton: {
        backgroundColor: "#474C55",
        padding: 4,
        margin: 2,
        borderRadius: 100,
        width:"20%",
        height:30,
        alignSelf:"flex-end",
        marginRight:10
      }
   
})