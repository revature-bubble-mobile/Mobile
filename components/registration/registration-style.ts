import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    regPageWholeView:{
        alignContent: 'center',
        alignItems: 'center',
        maxWidth: "100%",
        maxHeight: "100%",
    },

    regPageLogo:{
        height: 144,
        width: 320,
        alignSelf: 'center',
        padding: 15,
    },

    regPageInstruction:{
        fontSize: 18,
        padding: 10,
        textAlign: 'center',
    },

    regInputView:{
        flexDirection: 'row',
        alignContent: 'space-between',
        padding: 5,
    },

    regPageAsterisk:{
        fontSize: 20,
        color: '#f26925',
    },

    regPageBasicFont:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#474C55'
    },

    regPageMissingFieldAlert:{
        fontSize: 18,
        color: '#721c24',
        backgroundColor: '#f8d7da',
        height: 40,
        width: 300,
        alignSelf: 'center',
        padding: 10,
        paddingLeft: 20,
    },

    regPageUnderline:{
        borderBottomWidth: 1,
        borderColor: '#B9B9BA',
        padding: 10,
        marginBottom: 10,
        width: 300,
    },

    regPageNameInput:{
        borderWidth: 2,
        borderColor: '#252525',
        borderRadius: 8,
        height: 35,
        paddingLeft: 15,
        width: 250,
    },

    regPageUsernameInput:{
        borderWidth: 2,
        borderColor: '#252525',
        borderRadius: 8,
        height: 35,
        paddingLeft: 15,
        width: 250,
    },

    regPagePasswordInput:{
        borderWidth: 2,
        borderColor: '#252525',
        borderRadius: 8,
        height: 35,
        paddingLeft: 15,
        width: 250,
    },

    regPageEmailInput:{
        borderWidth: 2,
        borderColor: '#252525',
        borderRadius: 8,
        height: 35,
        paddingLeft: 15,
        width: 250,
        
    },

    regPageSubmitButton:{
        color: '#474C55',
    },

    regPageButtonUnderline:{
        borderBottomWidth: 1,
        borderColor: '#B9B9BA',
        padding: 10,
        marginBottom: 10,
        width: 300,
    },

    regPageLinkText:{
        color: '#F26925',
    },


})

export default styles