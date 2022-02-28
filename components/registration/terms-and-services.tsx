import { useState } from "react";
import {
  Text,
  Pressable,
  View,
  Modal,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import styles from "./registration-style";
import TermsAndServicesContent from "./terms-and-services-display";

export default function TermsAndServices() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styless.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styless.centeredView}>
          <View style={styless.modalView}>
            <Text style={styles.regPageTermsViewTitle}>
              REVATURE BUBBLE TERMS AND SERVICES
            </Text>
            <TermsAndServicesContent />

            <Pressable
              style={[styless.button, styless.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styless.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)}>
        <Text style={styles.regPageLinkDiv}>Terms And Services</Text>
      </Pressable>
    </View>
  );
}

const styless = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  modalView: {
    height: "90%",
    width: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 35,
    borderWidth: 2,
    borderColor: "#252525",
    alignItems: "center",
    shadowColor: "#000",
    elevation: 10,
  },
  button: {
    width: 100,
    borderRadius: 20,
    padding: 10,
    marginTop: 15,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#72A4C2",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
