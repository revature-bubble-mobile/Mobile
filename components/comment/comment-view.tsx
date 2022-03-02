import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, StyleSheet, TextInput, View, Keyboard, Animated } from "react-native";
import firebaseEndpoint, { azureEndpoint } from "../../endpoints";
import CommentItem from "./comment-item";
import Comment from "../../dtos/comment";
import { Pressable, Text } from "react-native";
import { useSelector } from "react-redux";
import { User } from "../../store";




export default function CommentView(props: {postId: string, setNumComments: Function, setUserCommented: Function}){

    const [comments, setComments] = useState<Comment[]>([]);
    const [replies, setReplies] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const paddingAnim = useRef(new Animated.Value(0)).current;
    
    const currentUserPid = useSelector((state: User) => state.profile.pid)

    function increasePadding(){
        Animated.timing(paddingAnim, {
            toValue: 0,
            duration: 400,
            useNativeDriver: false
        }).start();
    }
    function decreasePadding(){
        Animated.timing(paddingAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false
        }).start();
    }
    
    useEffect(()=>{
        (async ()=>{
            try {
                const response = await fetch(`${firebaseEndpoint}/${props.postId}.json`)
                const data = await response.json();

                if(data){
                    let result:Comment[] = [];
                    for (let i in data["comment"]){
                        result.push(data["comment"][i])
                    }
                    const comments = result.filter(r => !r.previous);
                    const replies = result.filter(r => r.previous);
                    setComments(comments);
                    setReplies(replies);

                    setTimeout(() => {
                        props.setNumComments(comments.length + replies.length);
                    }, 1000);
                }
            } catch (error) {
                console.log(error);
            }
        })()
    },[])

    async function postComment(){
        if(!newComment) {
            alert("Comment field cannot be empty...")
        } else {
            const comment = {
                cid: "",
                writer: currentUserPid,
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
    
    return(<Animated.View style={[styles.container, {paddingBottom : paddingAnim}]}>
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
            <View style={{maxHeight:"20%"}}>
                <View style={{flexDirection:"row",width:"85%"}}>
                    <Image style={styles.repliesImage} source={require("../../assets/favicon.png")} />
                    <TextInput multiline onPressIn={increasePadding} onEndEditing={decreasePadding} onBlur={decreasePadding} placeholder={"Add comment..."} onChangeText={t => setNewComment(t)}/>
                </View>
            </View>
            <Pressable onPress={postComment} style={styles.postButton}><Text style={styles.postButtonText}>Post</Text></Pressable>
            </View>
    </Animated.View>
    
    )
}
const styles = StyleSheet.create({
    
    container:{
        flex:1,
        width: "100%",
        alignSelf:"flex-end"
    },
    replyList: {
        marginBottom:25,
    },
    commentView: {
        marginLeft:6,
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