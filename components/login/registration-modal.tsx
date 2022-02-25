import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
} from "react-native";
import RegistrationForm from "../registration/registration-form";
//import styles from "../registration/registration-style";

export default function RegistrationModal() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        style={{width:'100%'}}
      >
          <View style={styles.modalView}>
            <RegistrationForm/>
            <View>
              <Text style={{}}>
                Already have an account?
                <Text
                  style={{color:'#fd7e14'}}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  {" "}
                  Sign in
                </Text>
              </Text>
            </View>
          </View>
        
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle2}>
          Not a user yet? <Text style={styles.textStyle}>Register Now</Text>
        </Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  
  modalView: {
    justifyContent:'center',
    width:'100%',
    backgroundColor: "white",
    paddingTop:20,
    paddingBottom: 45,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "blue",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "#fd7e14",
    textAlign: "center",
  },
  textStyle2: {
    color: "black",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
