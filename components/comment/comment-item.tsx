import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Text, Pressable, StyleSheet,View, Image } from "react-native";
import { TextInput } from "react-native";
import { useSelector } from "react-redux";
import Comment from "../../dtos/comment"
import Profile from "../../dtos/profile"
import firebaseEndpoint, { azureEndpoint } from "../../endpoints";
import { User } from "../../store";

export default function CommentItem(props: Comment & {replies: Comment[], setReplies: Function}){

    const [userProfile, setUserProfile] = useState<Profile>();
    const [isReplyPressed, setIsReplyPressed] = useState(false);
    const [newReply, setReply] = useState("");
    const [allProfiles, setReplyProfiles] = useState<Profile[]>([]);
    const navigation = useNavigation<DrawerNavigationHelpers>();
    
    const currentUserPid = useSelector((state: User) => state.profile.pid)

    useEffect(()=>{
        (async ()=>{
            try {
                const response = await fetch(`${firebaseEndpoint}/profile/${props.writer}.json`);
                const commentProfile: Profile = await response.json();
                setUserProfile(commentProfile);
                const replyResponse = await fetch(`${firebaseEndpoint}/profile.json`);
                const profiles = await replyResponse.json();
                let result = [];
                for (const id in profiles){
                    profiles[id].uniqueId = id;
                    result.push(profiles[id]);
                }
                setReplyProfiles(result);
            } catch (error) {
                console.log(error);
            }
        })()
    },[])

    async function postReply(){
        if(!newReply) {
            alert("Reply field cannot be empty...")
        } else {
            const reply = {
                cid: "",
                writer: currentUserPid,
                post: props.post,
                message: newReply,
                dateCreated: new Date(),
                previous: props.cid
            }

            const response = await fetch(`${azureEndpoint}/comment`, {
                method: 'POST',
                body: JSON.stringify(reply),
                headers: {
                    'content-type':"application/json"
                }
            })

            props.replies.push(reply);
            props.setReplies([...props.replies]);
        }
    }

    function formatDate(oldDate: Date): string{
        const newDate = new Date(oldDate);
        const amPm = (newDate.getHours() / 12 >= 1) ? "PM" : "AM"; 
        const date = `${newDate.toLocaleDateString()} ${newDate.getHours() > 12 ? newDate.getHours() - 12 : newDate.getHours()}:${newDate.getMinutes()} ${amPm}`;
        return date;
    }


    return(<View style={styles.container}>
        <View>
            <Image style={styles.image} source={require("../../assets/favicon.png")} />
        </View>
        <View>
            <Text style={styles.date}>{formatDate(props.dateCreated)}</Text>
            <Pressable onPress={()=>{navigation.navigate('Profile', {pid: userProfile?.pid})}}>
                <Text style={styles.username}>{`${userProfile?.username} says:`}</Text>
            </Pressable>
            <Text style={styles.comment}>{props.message}</Text>
            <Pressable onPress={() => setIsReplyPressed(!isReplyPressed)}><Text style={styles.replyButton}>Reply</Text></Pressable>
            {isReplyPressed &&
            <View style={styles.replyInputContainer}>
                <TextInput multiline    style={styles.replyInput} placeholder={"Add reply..."} onChangeText={t => setReply(t)}/>
                <Pressable style={styles.postReplyButton} onPress={postReply}><Text style={styles.postReplyButtonText}>Post</Text></Pressable>
            </View>
            }
            {props.replies[0] &&
            <FlatList
            data={props.replies}
            renderItem={({item})=>
            <View style={styles.repliesListContainer}>
                <View>
                    <Image style={styles.repliesImage} source={require("../../assets/favicon.png")} />
                </View>
                <View>
                    <Text style={styles.date}>{formatDate(item.dateCreated)}</Text>
                    <Pressable onPress={()=>{navigation.navigate('Profile', {pid: allProfiles.find(p => p.pid === item.writer)?.pid})}}>
                        <Text style={styles.username}>{allProfiles.find(p => p.pid === item.writer)?.username}</Text>
                    </Pressable>
                    <Text style={styles.comment}>{item.message}</Text>
                </View>
            </View>
                
            }
            keyExtractor={item => item.cid}
            />
            }
        </View>
    </View>)
}
const styles = StyleSheet.create({
    
    container: {
        flex:1,
        flexDirection:"row",
        marginLeft:8,
        marginTop:8
    },
    image: {
        height:50,
        width:50,
        borderRadius:100,
        marginRight:8
    },
    date: {
        color:'rgba(72, 76, 86,0.7)'
    },
    username: {
        fontWeight:"bold",
        marginBottom:4,
        marginTop:2
    },
    comment: {
        marginBottom:4
    },
    replyButton: {
        color:"#F26925",
        fontWeight:"500",
        marginLeft:12,
        marginBottom:14
    },
    repliesListContainer: {
        flex:1,
        flexDirection:"row",
    },
    repliesImage: {
        height:40,
        width:40,
        borderRadius:100,
        marginRight:4
    },
    replyInputContainer: {
         marginBottom:20,
    },
    replyInput: {
        borderRadius:2,
        borderBottomWidth:1,
        borderColor:"#B9B9BA",
        width:240
    },
    postReplyButton: {
       marginLeft:200,
        marginTop:4,
    },
    postReplyButtonText: {
        color:"#F26925",
        fontWeight:"500",
    }
})