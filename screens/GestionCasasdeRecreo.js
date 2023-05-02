import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, Pressable } from 'react-native'
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const GestionCasasdeRecreo = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const dataCasa = [
        { label: "Puerta del Mar", value: 15602 },
        { label: "Atitlán", value: 15603 }
    ]

    const dataGeneracion = [
        { label: "2da. Generación", value: 15630 },
        { label: "3ra. Generación", value: 15631 }
    ]

    const dataSolicitante = [
        { label: "Cofiño Alvarado", value: 15660 },
        { label: "Cofiño Patty", value: 15661 },
        { label: "Cofiño Liza", value: 15662 },
        { label: "Massanet Cofiño, Cristina", value: 15663 },
        { label: "Massanet Cofiño, Javier", value: 15664 },
        { label: "Massanet Cofiño, Jorge", value: 15665 },
        { label: "Cofiño Figueroa, Ana Lucia", value: 15666 },
        { label: "Cofiño Figueroa, Alvaro Jose", value: 15667 },
        { label: "Cofiño Figueroa, Rodrigo", value: 15668 },
        { label: "Fernandez Cofiño, Mariela", value: 15669 },
        { label: "Fernandez Cofiño, Jose Andres", value: 15670 },
        { label: "Fernandez Cofiño, Rafael", value: 15671 },
    ]

    const dataServicios = [
        { label: "Administración Personal de Servicio", value: 15598 },
        { label: "Comité Tercera Generación", value: 15601 },
        { label: "Compra de Insumos", value: 15596 },
        { label: "Mantenimiento de Casas", value: 15599 },
        { label: "Presupuesto y su Ejecución", value: 15600 },
        { label: "Solicitud Pagos Servicios", value: 15597 },
    ]


    const [value, setValue] = useState(null);
    const [valueGeneracion, setValueGeneracion] = useState(null);
    const [valueSolicitante, setValueSolicitante] = useState(null);
    const [valueServicios, setValueServicios] = useState(null);
    const [asunto, setAsunto] = useState(null);
    const [desc, setDesc] = useState(null);
    const [caso, setCaso] = useState({});
    const [casoPublico, setCasoPublico] = useState({})


    const user = [
        {
            "Field": "username",
            "Value": "luis.morales"
        },
        {
            "Field": "password",
            "Value": "123"
        }
    ]

    function submitBtn() {

        if (value == null || valueGeneracion == null || valueSolicitante == null || valueServicios == null || asunto == null || desc == null) {
            Alert.alert('Por favor llenar toda la información que se solicita')
        } else {
            axios.post('https://sarservicedesk.sarlatam.com/ASDKAPI/Api/v8.6/user/login', user)
                .then(res => {
                    const token = res.data[1].Value

                    const body = [
                        {
                            "Field": "ProjectId",
                            "Value": 6
                        },
                        {
                            "Field": "CategoryId",
                            "Value": 1817
                        },
                        {
                            "Field": "RegistryTypeId",
                            "Value": 1
                        },
                        {
                            "Field": "StateId",
                            "Value": 177
                        },
                        {
                            "Field": "ServiceId",
                            "Value": 435
                        },
                        {
                            "Field": "SlaId",
                            "Value": 979
                        },
                        {
                            "Field": "GroupId",
                            "Value": 334
                        },
                        {
                            "Field": "Description",
                            "Value": `${desc}`
                        },
                        {
                            "Field": "CompanyId",
                            "Value": 45
                        },
                        {
                            "Field": "UrgencyId",
                            "Value": 2
                        },
                        {
                            "Field": "Subject",
                            "Value": `${asunto}`
                        },
                        {
                            "Field": "CustomerId",
                            "Value": 12817
                        },
                        {
                            "Field": "AuthorId",
                            "Value": 12817
                        }
                    ]

                    axios.post('https://sarservicedesk.sarlatam.com/ASDKAPI/Api/v8.6/item/add/4', body, {
                        headers: {
                            'Authorization': `${token}`
                        }
                    })
                        .then(res => {
                            setCaso(res.data[0].Value, setCasoPublico(res.data[2].Value))
                            setModalVisible(true)

                            const bodyAdicional = [
                                {
                                    "Id": 3345,
                                    "CaseId": `${caso}`,
                                    "CaseType": 4,
                                    "IsBasic": false,
                                    "UserId": "12817",
                                    "Value": `${value}`,
                                    "ValueType": 1
                                },
                                {
                                    "Id": 3347,
                                    "CaseId": `${caso}`,
                                    "CaseType": 4,
                                    "IsBasic": false,
                                    "UserId": "12817",
                                    "Value": `${valueGeneracion}`,
                                    "ValueType": 1
                                },
                                {
                                    "Id": 3352,
                                    "CaseId": `${caso}`,
                                    "CaseType": 4,
                                    "IsBasic": false,
                                    "UserId": "12817",
                                    "Value": `${valueSolicitante}`,
                                    "ValueType": 1
                                },
                                {
                                    "Id": 3344,
                                    "CaseId": `${caso}`,
                                    "CaseType": 4,
                                    "IsBasic": false,
                                    "UserId": "12817",
                                    "Value": `${valueServicios}`,
                                    "ValueType": 1
                                }
                            ]

                            setTimeout(() => {
                                axios.post('https://sarservicedesk.sarlatam.com/ASDKAPI/Api/v8.6/additionalfield/update', bodyAdicional, {
                                    headers: {
                                        'Authorization': `${token}`
                                    }
                                }).then(res => console.log(res))
                            }, 5000);


                        })
                    // console.log(caso);
                    // console.log(casoPublico);

                })
        }
    }

    return (
        <View>
            <TextInput
                onChangeText={setAsunto}
                style={styles.inputAsunto}
                placeholder="Asunto" />

            <TextInput
                onChangeText={setDesc}
                style={styles.inputDesc}
                placeholder='Descripción' />
            <Dropdown style={styles.dropdown}
                data={dataCasa}
                labelField="label"
                valueField="value"
                placeholder='Casa de Recreo'
                value={value}
                onChange={item => {
                    setValue(item.value)
                }}
            />
            <Dropdown style={styles.dropdown}
                data={dataGeneracion}
                labelField="label"
                valueField="value"
                placeholder='Generación Familiar'
                value={valueGeneracion}
                onChange={item => {
                    setValueGeneracion(item.value)
                }}
            />
            <Dropdown style={styles.dropdown}
                data={dataSolicitante}
                labelField="label"
                valueField="value"
                placeholder='Solicitante'
                value={valueSolicitante}
                onChange={item => {
                    setValueSolicitante(item.value)
                }}
            />
            <Dropdown style={styles.dropdown}
                data={dataServicios}
                labelField="label"
                valueField="value"
                placeholder='Tipo de Servicio'
                value={valueServicios}
                onChange={item => {
                    setValueServicios(item.value)
                }}
            />
            <TouchableOpacity style={styles.boton} onPress={() => submitBtn()}>
                <View style={styles.centrar}>
                    <Text style={styles.textBoton}>Registrar Caso</Text>
                </View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Número de Caso: {casoPublico}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={
                                () => {
                                    navigation.navigate("Home")
                                    setModalVisible(!modalVisible)
                                }
                            }>
                            <Text style={styles.textStyle}>Cerrar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal >
            {/* <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable> */}
        </View>
    )
}

export default GestionCasasdeRecreo

const styles = StyleSheet.create({
    inputAsunto: {
        marginRight: 10,
        marginLeft: 10,
        borderWidth: 1,
        padding: 10,
        marginTop: 20,
        borderRadius: 10
    },
    inputDesc: {
        marginRight: 10,
        marginLeft: 10,
        borderWidth: 1,
        padding: 10,
        marginTop: 20,
        borderRadius: 10
    },
    dropdown: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 20,
        maxHeight: 300,
        height: 50,
        fontSize: 16,
        borderColor: '#a9a9a9',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    boton: {
        backgroundColor: '#8fbc8f',
        width: 200,
        height: 50,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 75,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textBoton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center',
    },
    centrar: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 60,
        alignItems: 'center',
        shadowColor: '#000',
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
    },
    buttonClose: {
        backgroundColor: '#8fbc8f',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

})