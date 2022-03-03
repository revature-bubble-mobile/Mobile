import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { View, Text, FlatList, Dimensions } from "react-native";
import firebaseEndpoint from "../../../endpoints";
import { CreatePost } from "../../create-post/create-post";
import PostFeedView from "../../home/post-feed/post-feed-view";

export default function ViewPosts(){

    const [postArray, setPostArray] = useState<any>([])

    useEffect(()=> {GetPosts()}, [])

    async function GetPosts(){
        const httpCall: AxiosResponse = await axios.get(`${firebaseEndpoint}post.json`);
        const postList = httpCall.data

        const postArray = []
        for (const post in postList){
            postArray.push(postList[post].body)
        }
  
        setPostArray(postArray)
    }
    
    return(
        <View style={{height:'65%'}}>
            <View style={{width:'100%', paddingBottom:4}}>
                <CreatePost getter={GetPosts}/>
            </View>
            <View style={{height:'88%'}}>
            <View style={{backgroundColor:'#B9B9BA', alignItems:'center', justifyContent:'center', borderRadius:10}}>
                <PostFeedView/>
            </View>
            </View>
        </View>
    )
}
