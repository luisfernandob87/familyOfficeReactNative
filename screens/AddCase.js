import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import casa from '../img/vacaciones-en-la-playa.png';
import abogado from '../img/abogado.png';
import varios from '../img/servicios-de-apoyo.png';
import { useNavigation } from '@react-navigation/native';

const AddCase = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.containerHome} onPress={() => navigation.navigate("CasasdeRecreo")}>
                <Image source={casa}></Image>
                <Text>Casas de Recreo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerAbogado} onPress={() => navigation.navigate("Consultoria")}>
                <Image source={abogado}></Image>
                <Text>Consultoría Legal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerVarios} onPress={() => navigation.navigate("Servicios")}>
                <Image source={varios}></Image>
                <Text>Servicios Concierge</Text>

            </TouchableOpacity>
        </View>
    )
}

export default AddCase

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center'
    },
    containerHome: {
        flex: 2,
        alignItems: 'center',
        marginTop: '15%',
        maxHeight: 100

    },
    containerAbogado: {
        flex: 3,
        alignItems: 'center',
        marginTop: '20%',
        maxHeight: 100
    },
    containerVarios: {
        flex: 4,
        alignItems: 'center',
        marginTop: '20%',
        maxHeight: 100
    },
})