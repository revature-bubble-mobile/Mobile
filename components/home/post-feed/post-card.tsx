
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import { Icon, Overlay } from "react-native-elements";
import { Card } from "react-native-elements/dist/card/Card";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { useSelector } from "react-redux";
import Comment from "../../../dtos/comment";
import Post from "../../../dtos/post";
import Profile from "../../../dtos/profile";
import firebaseEndpoint from "../../../endpoints";
import { User } from "../../../store";
import CommentView from "../../comment/comment-view";


export default function PostCard(props:{post:Post, profiles:Profile[], refresh: any}){

    const {post, profiles} = props;
    const [userComment, setUserCommented] = useState<boolean>(false);
    const [numOfComments, setNumComments] = useState<number>(0);
    const [overlayVisible, setOverlayVisible] = useState(false);

    const authorProfile = profiles.find(p => post.creator === p.pid);

    useEffect(()=>{
        (async ()=>{

            const response = await axios.get(`${firebaseEndpoint}/${post.psid}.json`);
            const comments: Comment[] = [];
            const authors: string[] = [];

            if (response.data){
                for (let i in response.data["comment"]){
                    comments.push(response.data["comment"][i]);
                }

                let commented = false;
                comments.forEach( c => {
                    if (c.writer === "-MwdkbjuGoGXs8O247z_"){   //useSelector((state: User) => state.profile.pid)
                        setUserCommented(true);
                        commented = true;
                    }
                });
                if (!commented) setUserCommented(false);

                setNumComments(comments.length);
            }

        })()
    },[props.refresh])


    const postDate = new Date(post.datePosted)
    const amPm = (postDate.getHours() / 12 >= 1) ? "PM" : "AM";
    const postDateString = `${postDate.toLocaleDateString()} ${postDate.getHours() > 12 ? postDate.getHours() - 12 : postDate.getHours()}:${postDate.getMinutes()}`;


    return(<View>
        <Card containerStyle={styles.card}>
            <View style={styles.profileArea}>
                <Image
                source={require('../../../assets/favicon.png')}
                style={styles.profileIcon}
                />
                <Text style={styles.profileName}>{authorProfile?.username ?? "not found"}</Text>
            </View>
            <Text style={styles.dateText}>{post.datePosted ? `${postDateString} ${amPm}` : "(invalid date)"}</Text>
            <View style={styles.postBody}>
                <Text
                >{post.body ? post.body : "<failed to load>"}
                </Text>
            </View>

            <View style={styles.iconArea}>
                <Pressable onPress={()=>{ setOverlayVisible(!overlayVisible) } } 
                    style={styles.pressableIcon}>
                    {userComment ? <Icon name={"commenting"} type={"font-awesome"} color={"#f36a26"}/>
                    : 
                    numOfComments > 0 ? <Icon name={"comment"} type={"font-awesome"} color={"#009bff"}/>
                    :
                    <Icon name={"comment-o"} type={"font-awesome"} color={"#009bff"}/>}
                    
                </Pressable>
                <Text style={styles.commentNumber}>{numOfComments}</Text>
            </View>

        </Card>

        <Overlay 
            onBackdropPress = {()=>setOverlayVisible(!overlayVisible)}
            isVisible={overlayVisible}
            overlayStyle = {styles.overlay}>
            
            <View >
                <Pressable onPress={()=>setOverlayVisible(!overlayVisible)}
                    style={styles.closeButton}>
                    <Text style = {styles.closeText}> X </Text>
                </Pressable>
                <View style = {styles.profileArea}>
                    <Image
                    source={require('../../../assets/favicon.png')}
                    style={styles.profileIcon}
                    />
                    <Text style={styles.profileName}>{authorProfile?.username ?? "not found"}</Text>
                </View>
                <Text style={styles.dateText}>{post.datePosted ? `${postDateString} ${amPm}` : "(invalid date)"}</Text>
                <View style={styles.postBody}>
                    <Text
                    >{post.body ? post.body : "<failed to load>"}
                    </Text>
                </View>
                <View style={styles.iconArea}>
                    <Pressable onPress={()=>{ setOverlayVisible(!overlayVisible) }} 
                        style={styles.pressableIcon}>
                        {userComment ? <Icon name={"commenting"} type={"font-awesome"} color={"#f36a26"}/>
                        : 
                        numOfComments > 0 ? <Icon name={"comment"} type={"font-awesome"} color={"#009bff"}/>
                        : 
                        <Icon name={"comment-o"} type={"font-awesome"} color={"#009bff"}/>}
                        
                    </Pressable>
                    <Text style={styles.commentNumber}>{numOfComments}</Text>
                </View>
                <Divider style={{borderWidth: 2, borderColor:"lightgray", marginTop:5,}} />

                <View style={styles.commentsView}>
                    <CommentView postId={post.psid} setNumComments={setNumComments} setUserCommented={setUserCommented} />
                </View>
                

            </View>
        </Overlay>
    </View>)
}

const styles = StyleSheet.create({
    card:{
        elevation:0,
        borderWidth:0,
        borderRadius: 15,
        backgroundColor:"white",
    },
    profileArea:{
        flexDirection:"row",
        alignItems:"center",
    },
    profileIcon:{
        marginLeft:5,
        width: 55,
        height: 55,
        borderRadius: 30,
    },
    profileName:{
        marginLeft:10,
        fontSize:18,
        fontWeight:"bold",
    },
    dateText:{
        color:"darkgray",
        fontSize:12,
        marginTop:3,
        marginLeft:5,
    },
    postBody:{
        marginVertical:10,
        marginLeft:8,
    },
    iconArea:{
        flexDirection:"row",
        justifyContent:"flex-end",
    },
    pressableIcon:{
        padding:8,
    },
    commentNumber:{
        alignSelf:"center",
        fontSize: 18,
        marginHorizontal:5
    },
    commentsView: {
        height:320,
    },
    overlay:{
        height:"90%",
        width:"90%",
        borderRadius: 15,
    },
    closeButton: {
        alignSelf:"flex-end",
        position:"absolute"
    },
    closeText: {
        fontSize:20,
        fontWeight:"bold",
    }
})