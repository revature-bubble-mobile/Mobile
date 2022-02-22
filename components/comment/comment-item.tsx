import { useEffect, useState } from "react";
import { FlatList, Text, Pressable, StyleSheet,View, Image } from "react-native";
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


    return(<View style={styles.container}>
    <View>
        <Image style={styles.image} source={require("../../assets/favicon.png")} />
        </View>
        <View>
        <Text style={styles.date}>{props.dateCreated.toLocaleString()}</Text>
        <Text style={styles.username}>{`${userProfile?.username} says:`}</Text>
        <Text style={styles.comment}>{props.message}</Text>
        <Pressable><Text style={styles.replyButton}>Reply</Text></Pressable>
        {props.replies[0] &&
            <FlatList
            data={props.replies}
            renderItem={({item})=><><Text>{item.dateCreated.toLocaleString()}</Text><Text>{`${()=>getReplyProfile(item.writer)} says: \n${item.message}`}</Text></>}
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
       
    }
})