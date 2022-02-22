import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { Card } from "react-native-elements/dist/card/Card";
import Post from "../../dtos/post";
import Profile from "../../dtos/profile";


export default function PostCard(props:{post:Post, profiles:Profile[]}){

    const {post, profiles} = props;
    const [userComment, setUserCommented] = useState<boolean>(false);
    const [numOfComments, setNumComments] = useState<number>(0);

    const currentProfile = profiles.find(p => post.creator === p.pid);

    function commentPressed(){
        
        if (userComment) {
            setUserCommented(false)
            setNumComments(0);
        }
        else {
            setUserCommented(true);
            setNumComments(1);
        }
    }


    return(<View>
        <Card containerStyle={styles.card}>
            <View style={styles.profileArea}>
                <Image
                source={require('../../assets/favicon.png')}
                style={styles.profileIcon}
                />
                <Text style={styles.profileName}>{currentProfile?.username ?? "not found"}</Text>
            </View>
            <Text style={styles.dateText}>{post.datePosted ? new Date(post.datePosted).toLocaleDateString() : "(invalid date)"}</Text>
            <View style={styles.postBody}>
                <Text
                >{post.body ? post.body : "<failed to load>"}
                </Text>
            </View>
            <View style={styles.iconArea}>
                <Pressable onPress={()=>{ commentPressed() }} 
                    style={styles.pressableIcon}>
                    {userComment ? <Icon name={"commenting"} type={"font-awesome"} color={"#f36a26"}/>
                    : 
                    <Icon name={"comment-o"} type={"font-awesome"} color={"#007bff"}/>}
                    
                </Pressable>
                <Text style={styles.commentNumber}>{numOfComments}</Text>
            </View>

        </Card>
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
        marginVertical:20,
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
})