import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import logoInicio from '../img/logo_inicio.png';
import add from '../img/add.png';
import cases from '../img/cases.png'
import iungoLogo from '../img/iungoLogo.png'
import { useNavigation } from '@react-navigation/native';

export default function App() {

    const navigation = useNavigation();

    return (

        <View style={styles.container}>
            <View style={styles.containerImage}>
                <Image source={logoInicio} style={styles.image} />
                <Text style={styles.text}>Bienvenido</Text>
            </View>
            <View style={styles.containerButtons}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AddCase")}>
                    <Image source={add} style={styles.imageButton} />
                    <Text style={styles.textButton}>Registrar Caso</Text>
                    <Text>Registre su caso y en breve daremos una respuesta.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Cases")}>
                    <Image source={cases} style={styles.imageButton} />
                    <Text style={styles.textButton}>Mis Casos</Text>
                    <Text>Haga un seguimiento de los casos registrados.</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerText}>
                <Text style={styles.text}>Family Office by </Text>
                <Image source={iungoLogo} />
            </View>
            {/* <StatusBar style="auto" /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    containerImage: {
        flex: 1,
        maxHeight: 200,
        alignSelf: 'flex-end',
        alignItems: 'center',
        marginTop: 50,
    },
    containerButtons: {
        flex: 2,
        alignSelf: 'center',
        maxHeight: 200,
        marginTop: 250,
        gap: 30,
    },
    containerText: {
        flex: 3,
        marginTop: 350,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    image: {
        width: 200,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 10
    },
    text: {
        fontSize: 15
    },
    button: {
        // backgroundColor: '#dcdcdc',
        width: 400,
        borderRadius: 20,
        alignItems: 'center',
    },
    textButton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: `#8fbc8f`
    },
    imageButton: {
        width: 32,
        height: 32
    }
});
