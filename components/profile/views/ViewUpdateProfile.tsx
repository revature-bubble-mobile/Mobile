import { View, Text } from "react-native";
import UpdateProfileInputs from "../interactive/UpdateProfileInputs";


export default function ViewUpdateProfile(){


    return(
        <View style={{flex:0.5,backgroundColor:'white', flexDirection:'row', padding:10, borderRadius:10}}>
                    
            <View style={{flex:0.3,backgroundColor:'lightblue',justifyContent:'center', borderBottomLeftRadius:10, borderTopLeftRadius:10}}>
                <Text style={{textAlign:'center'}}>Profile Pic</Text>
                <Text style={{textAlign:'center'}}>Change</Text>
            </View> 

            <View style={{flex:0.7,backgroundColor:'white', padding:10, justifyContent:'space-around', alignItems:'center', borderBottomRightRadius:10, borderTopRightRadius:10}}>
                <UpdateProfileInputs/>
            </View>

        </View>
    )
}

