import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, TextInput, View } from "react-native";
import Post from "../../dtos/post";
import endpoint, { azureEndpoint } from "../../endpoint";
import CommentItem from "./comment-item";
import Comment from "../../dtos/comment";
import { Pressable, Text } from "react-native";
import { useSelector } from "react-redux";
import { User } from "../../store";

export default function CommentView(props: {postId: string, setNumComments: Function, setUserCommented: Function}){

    const [comments, setComments] = useState<Comment[]>([]);
    const [replies, setReplies] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>("");

    // const testComments: Comment[] = [
    //     {cid: "123", writer: "test-profile", post: "test-post", message: "Test Comment 1", dateCreated: new Date()},
    //     {cid: "456", writer: "test-profile", post: "test-post", message: "Test Comment 2", dateCreated: new Date()},
    // ]
    // const testReplies: Comment[] = [
    //     {cid: "789", writer: "test-profile", post: "test-post", message: "Test Reply 1", dateCreated: new Date(), previous: "123"},
    //     {cid: "222", writer: "test-profile", post: "test-post", message: "Test Reply 2", dateCreated: new Date(), previous: "123"},
    //     {cid: "333", writer: "test-profile", post: "test-post", message: "Test Reply 3", dateCreated: new Date(), previous: "456"}
    // ]


    useEffect(()=>{
        (async ()=>{
            const response = await fetch(`${endpoint}/${props.postId}.json`)
            const data: Comment[] = await response.json();
            setComments(data.filter(d => !d.previous));
            setReplies(data.filter(d => d.previous));
            props.setNumComments(comments.length);
        })()
    },[])

    async function postComment(){
        if(!newComment) {
            alert("Comment field cannot be empty...")
        } else {
            const comment = {
                cid: "",
                writer: useSelector((state: User) => state.profile.pid),
                post: props.postId,
                message: newComment,
                dateCreated: new Date()
            }

            const response = await fetch(`${azureEndpoint}/comment`, {
                method: 'POST',
                body: JSON.stringify(comment),
                headers: {
                    'content-type':"application/json"
                }
            })

            comments.push(comment);
            setComments([...comments]);
            props.setNumComments(comments.length);
            props.setUserCommented(true);
        }
    }


    return(<View>
       {comments &&
            <FlatList
                data={comments}
                renderItem={({item})=><CommentItem {...item} replies={replies.filter((r) => r.previous === item.cid)} setReplies={setReplies}/>}
                keyExtractor={item => item.cid}
                style={styles.replyList}
            />
       }
        <View style={styles.commentView}>
            <Text style={styles.enterCommentLabel}>Enter your comment:</Text>
            <View style={{flexDirection:"row"}}>
                <Image style={styles.repliesImage} source={require("../../assets/favicon.png")} />
                <TextInput placeholder={"Add comment..."} onChangeText={t => setNewComment(t)}/>
            </View>
            <Pressable onPress={postComment} style={styles.postButton}><Text style={styles.postButtonText}>Post</Text></Pressable>
        </View>
    </View>)
}
const styles = StyleSheet.create({
    
    replyList: {
        marginBottom: 25
    },
    commentView: {
        marginLeft:20,
    },
    postButton: {
        backgroundColor: "#474C55",
        padding: 4,
        margin: 2,
        borderRadius: 100,
        width:"20%",
        height:30,
        alignSelf:"flex-end",
        marginRight:10,
        justifyContent:"center",
        alignItems:"center"
      },
    postButtonText: {
        color:'#fff',
        fontWeight:"bold"
    },
    enterCommentLabel: {
        fontWeight:"600",
        marginBottom:4
    },
    repliesImage: {
        height:40,
        width:40,
        borderRadius:100,
        marginRight:4
    },
})