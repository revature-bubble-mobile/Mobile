import { Pressable, View, Text } from "react-native"


export default function ViewSaveNewProfileButtons(props:{updateReduxProfile: Function, setShowModal: Function, setShowParent: Function}){
    const {setShowModal, setShowParent, updateReduxProfile} = props

    return(

        <View style={{flexDirection:'row'}}>
            <Pressable style={{backgroundColor:"dimgrey", borderRadius:10, marginRight:10}}
              onPress={() => { setShowModal(false) ; setTimeout(()=>setShowParent(true),200)}}
            ><Text style={{padding:15, color:'white'}}>Cancel</Text>
            </Pressable>
            <Pressable style={{backgroundColor:"dimgrey", borderRadius:10, marginLeft:10}} onPress={()=>updateReduxProfile()}><Text style={{padding:15, color:'white'}}>Update Profile</Text></Pressable>  
        </View> 
    )
}

