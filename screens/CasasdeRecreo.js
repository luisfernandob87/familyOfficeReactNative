import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const CasasdeRecreo = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.containerGestion} onPress={() => navigation.navigate("GestionCasasdeRecreo")}>
                <View style={styles.containerTexto}>
                    <Text style={styles.texto}>Gestion Casas de Recreo</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerReserva} onPress={() => navigation.navigate("ReservaCasasdeRecreo")}>
                <View style={styles.containerTexto}>
                    <Text style={styles.texto}>Reserva Casas de Recreo</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default CasasdeRecreo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,

    },
    containerGestion: {
        flex: 2,
        backgroundColor: 'white',
        maxHeight: '30%',
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 15,
        marginTop: 20,
        borderColor: '#a9a9a9',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    containerReserva: {
        flex: 3,
        backgroundColor: 'white',
        maxHeight: '30%',
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 15,
        borderColor: '#a9a9a9',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    containerTexto: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    texto: {
        fontSize: 20
    }
})