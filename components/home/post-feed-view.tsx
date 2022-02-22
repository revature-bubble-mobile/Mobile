import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Post from "../../dtos/post";
import firebaseEndpoint from "../../endpoints";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardProps } from "react-native-elements/dist/card/Card";
import { Divider } from "react-native-elements/dist/divider/Divider";
import Profile from "../../dtos/profile";
import { Icon } from "react-native-elements/dist/icons/Icon";
import PostCard from "./post-card";



export default function PostFeedView(){

    const pid = "-MwDDfSFxbE7KDt9aWY4";
    const psid = "-MwS6gcwhPPVKGAkoM7P";

    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [run, setRun] = useState<{}>();
    
    useEffect(()=>{
        (async ()=>{
            const profileResponse = await axios.get(`${firebaseEndpoint}/profile.json`)
            .then((r) => r.data)
            .catch((error)=>{console.log(error)});
            
            const newProfiles = [];
            
            for (const id in profileResponse){
                profileResponse[id].uniqueId = id;
                
                newProfiles.push(profileResponse[id]);
                // console.log(profileResponse[id]);
                
            }
            setProfiles(newProfiles);
    

            const postResponse = await axios.get(`${firebaseEndpoint}/post.json`)
            .then((r) => r.data)
            .catch((error)=>{console.log(error)});

            const newPosts: Post[] = [];

            for (const id in postResponse){
                postResponse[id].uniqueId = id;
                newPosts.push(postResponse[id]);
                // console.log(postResponse[id])
            }
            newPosts.sort((a, b)=>{
                const date1 = new Date(a.datePosted).valueOf();
                const date2 = new Date(b.datePosted).valueOf();
                return date2 - date1;
            });
            setPosts(newPosts);
            
        })();
        setRefreshing(false);
    },[run])

    function refresh(){
        setRefreshing(true);
        setRun({...run});
    }



  
    return(<View style={styles.container}>
        
        <FlatList 
        keyExtractor={(item)=>item.psid}
        data={posts}
        refreshing={refreshing}
        onRefresh={refresh}
        renderItem={({item, index}) => (
            <PostCard post={item} profiles={profiles}/>
        )}
        />
        
    </View>)
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#F0F2F5"
    },
    
});