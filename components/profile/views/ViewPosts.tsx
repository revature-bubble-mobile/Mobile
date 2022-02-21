import { useState } from "react";
import { View, Text } from "react-native";

export default function ViewPosts(){

    return(
        <>
            <View style={{flex:0.45, backgroundColor:'white', alignItems:'center', justifyContent:'center', borderLeftWidth: 5, borderRightWidth:5, borderColor: 'lightgrey'}}>
                <Text>Post New</Text>
            </View>
    
            <View style={{flex:0.45, backgroundColor:'lightgrey', alignItems:'center', justifyContent:'center', borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
                <Text>Post List</Text>
            </View>
        </>
    )
}

