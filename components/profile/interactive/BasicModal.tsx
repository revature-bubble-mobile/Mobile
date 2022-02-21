import { Children, useState } from "react";
import { View, Text, Image, Dimensions, Modal, Pressable } from "react-native";

export default function BasicModal(props:{child: JSX.Element, setShowParent: Function}){
    const {child, setShowParent} = props
    const [showModal, setShowModal] = useState<boolean>(true)

    return(<>
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {            
            }}>

            {child}

            <Pressable
              onPress={() => { setShowModal(!showModal) ; setTimeout(()=>setShowParent(true),200) }}
            ><Text style={{textAlign:'center', color:"black"}}>Cancel</Text>
            </Pressable>
        </Modal>
    </>)
}