import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    regPageWholeView:{
        alignContent: 'center',
        alignSelf: 'center',
        maxWidth: "100%",
        maxHeight: "100%",
    },

    regPageLogo:{
        height: 103,
        width: 230,
        alignSelf: 'center',
    },

    regPageInstruction:{
        fontSize: 13,
        padding: 5,
        textAlign: 'center',
    },

    regInputView:{
        flexDirection: 'row',
        alignContent: 'space-between',
        padding: 1,
        paddingLeft: 25
    },

    regPageAsterisk:{
        fontSize: 16,
        color: '#f26925',
    },

    regPageBasicFont:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#474C55'
    },

    regPageMissingFieldAlert:{
        fontSize: 16,
        color: '#721c24',
        backgroundColor: '#f8d7da',
        height: 40,
        width: 300,
        textAlign: 'center',
        padding: 5,
        paddingLeft: 0,
    },

    regPageUnderline:{
        borderBottomWidth: 1,
        borderColor: '#B9B9BA',
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
        color: '#FFFFFF',
        height: 35,
        width: 120,
        alignSelf:'center',
        padding:3,
        paddingLeft: 12,
        borderWidth: 2,
        borderColor: '#252525',
        borderRadius:8,
        backgroundColor: '#474C55',
    },
    regPageSubmitButtonText:{
        color:'#FFFFFF',
        padding:2,
        paddingLeft:20

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
        fontSize:12
    },

    regPageTermsView:{
        padding:15, 
        backgroundColor:'rgba(50,50,50,.15)'
    },
    regPageTermsViewTitle:{
        color:'#72A4C2',
        fontSize:24,
        textAlign:'center'
    },
    regPageTermsViewSection:{
        fontSize:15, 
        fontWeight:'bold', 
        color: '#72A4C2'
    }
})

export default styles