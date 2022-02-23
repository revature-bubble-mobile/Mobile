import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    regPageWholeView:{
        alignContent: 'center',
        alignItems: 'center',
        maxWidth: "100%",
        maxHeight: "100%",
    },

    regPageLogo:{
        height: 135,
        width: 300,
        resizeMode: 'contain',
        alignSelf: 'center',
        margin: 1,
    },

    regPageInstruction:{
        fontSize: 16,
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

    regPageRequireFont:{
        fontSize: 14,
        color: '#474C55'
    },

    regPageMissingFieldAlert:{
        fontSize: 18,
        color: '#721c24',
        backgroundColor: '#f8d7da',
        height: 45,
        width: 300,
        alignSelf: 'center',
        padding: 10,
        paddingLeft: 20,
    },

    regPagePasswordMatchAlert:{
        fontSize: 18,
        color: '#721c24',
        backgroundColor: '#f8d7da',
        height: 45,
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

    regPageTextboxInput:{
        borderWidth: 2,
        borderColor: '#252525',
        borderRadius: 8,
        height: 35,
        paddingLeft: 15,
        width: 250,
    },

    regPageTextboxInputAlt:{
        borderWidth: 2,
        borderColor: '#72A4C2',
        borderRadius: 8,
        height: 35,
        paddingLeft: 15,
        width: 250,
    },

    regPageSubmitButton:{
        borderWidth: 2,
        borderRadius: 8,
        backgroundColor: "#474C55",
        alignSelf: 'center',
        width: 90,
        height: 40,
    },

    regPageButtonText:{
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 7,
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

    regPageHiddenAlert:{
        display: 'none',
    },

    regPageTermsViewSection:{
        fontSize:15, 
        fontWeight:'bold', 
        color: '#72A4C2'
    }
})

export default styles