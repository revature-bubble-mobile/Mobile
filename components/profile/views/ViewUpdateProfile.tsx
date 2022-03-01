import { View, Text, Dimensions } from "react-native";
import UpdateProfileInputs from "../interactive/UpdateProfileInputs";


export default function ViewUpdateProfile(props:{setShowModal: Function, setShowParent: Function}){
    const {setShowModal, setShowParent} = props


    return(
        <View style={{flex:1,backgroundColor:'white', flexDirection:'row', padding:10, borderRadius:10, marginTop:Dimensions.get('window').height/15}}>
                    
            <View style={{flex:0.3,backgroundColor:'#72A4C2',justifyContent:'center', borderBottomLeftRadius:10, borderTopLeftRadius:10}}>
                <Text style={{textAlign:'center'}}>Profile Pic</Text>
                <Text style={{textAlign:'center'}}>Change</Text>
            </View> 

            <View style={{flex:0.7,backgroundColor:'white', padding:10, justifyContent:'space-around', alignItems:'center', borderBottomRightRadius:10, borderTopRightRadius:10}}>
                <UpdateProfileInputs setShowModal={setShowModal} setShowParent={setShowParent}/>
            </View>

        </View>
    )
}

