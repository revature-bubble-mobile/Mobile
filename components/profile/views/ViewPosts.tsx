import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { View, Text, FlatList, Dimensions } from "react-native";
import Post from "../../../dtos/post";
import firebaseEndpoint from "../../../endpoints";
import { CreatePost } from "../../create-post/create-post";

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
        <View style={{height:'70%'}}>
            <View style={{width:'100%', paddingBottom:4}}>
                <CreatePost/>
            </View>
            <View style={{height:'88%'}}>
            <View style={{backgroundColor:'#B9B9BA', alignItems:'center', justifyContent:'center', borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
                <FlatList
                    data={postArray}
                    renderItem= { ({item}) => (<View style={{margin:Dimensions.get("window").width/16}}><Text style={{textAlign:'center'}}>{item}</Text></View>)}    
                    numColumns = {1}
                    keyExtractor = {(item, index)=>{return `${item}.${index}`}}     
                ></FlatList>
            </View>
            </View>
        </View>
    )
}

