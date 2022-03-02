import { Pressable, View, Text } from 'react-native';

export default function ViewSaveNewProfileButtons(props: {
  updateProfile: Function;
  setShowModal: Function;
  setShowParent: Function;
}) {
  const { setShowModal, setShowParent, updateProfile } = props; 

  return (
    <View style={{ flexDirection: 'row' }}>
      <Pressable
        testID='cancel-btn'
        style={{
          backgroundColor: '#474C55',
          borderRadius: 10,
          marginRight: 10,
        }}
        onPress={() => {
          setShowModal(false);
          setTimeout(() => setShowParent(true), 200);
        }}>
        <Text style={{ padding: 15, color: 'white' }}>Cancel</Text>
      </Pressable>
      <Pressable
        testID='update-btn'
        style={{
          backgroundColor: '#474C55',
          borderRadius: 10,
          marginLeft: 10,
        }}
        onPress={() => updateProfile()}>
        <Text style={{ padding: 15, color: 'white' }}>Update Profile</Text>
      </Pressable>
    </View>
  );
}
