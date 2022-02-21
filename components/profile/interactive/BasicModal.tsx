import { Children, useState } from "react";
import { View, Text, Image, Dimensions, Modal, Pressable } from "react-native";
import ViewUpdateProfile from "../views/ViewUpdateProfile";

export default function BasicModal(props:{setShowParent: Function}){
    const {setShowParent} = props
    const [showModal, setShowModal] = useState<boolean>(true)

    return(<>
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {            
            }}>

            <ViewUpdateProfile setShowParent={setShowParent} setShowModal={setShowModal} />

            
        </Modal>
    </>)
}