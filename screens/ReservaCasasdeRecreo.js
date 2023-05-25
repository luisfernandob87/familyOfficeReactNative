import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, Pressable, ActivityIndicator, Platform } from 'react-native'
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment/moment';
import 'moment/locale/es'


const ReservaCasasdeRecreo = () => {

    //

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false)
    const [fechaIngreso, setFechaIngreso] = useState("")



    const toggleDatePicker = () => {
        setShowPicker(!showPicker)
    }

    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate
            setDate(currentDate)
            if (Platform.OS == "android") {
                toggleDatePicker()
                setFechaIngreso(currentDate.toDateString())

            }
        } else {
            toggleDatePicker()
        }
    }

    const selectedStartDate = moment(fechaIngreso).format("DD/MM/YYYY h:mm:ss a")
    console.log(selectedStartDate)

    //
    const [dateSalida, setDateSalida] = useState(new Date());
    const [showPickerSalida, setShowPickerSalida] = useState(false)
    const [fechaSalida, setFechaSalida] = useState("")



    const toggleDatePickerSalida = () => {
        setShowPickerSalida(!showPickerSalida)
    }

    const onChangeSalida = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate
            setDate(currentDate)
            if (Platform.OS == "android") {
                toggleDatePickerSalida()
                setFechaSalida(currentDate.toDateString())

            }
        } else {
            toggleDatePickerSalida()
        }
    }

    const selectedStartDateSalida = moment(fechaSalida).format("DD/MM/YYYY h:mm:ss a")
    console.log(selectedStartDateSalida)

    //
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false)


    const datosCasa = [
        { key: "Puerta del Mar", value: "Puerta del Mar" },
        { key: "Atitlán", value: "Atitlán" }
    ]

    const datosGeneracion = [
        { key: "Generación Familiar", value: "Generación Familiar" },
        { key: "2da. Generación", value: "2da. Generación" },
        { key: "3ra. Generación", value: "3ra. Generación" }
    ]


    const datosSolicitante = {
        "Generación Familiar": [
            { key: "Solicitante", value: "Solicitante" }
        ],
        "2da. Generación": [
            { key: "COFIÑO ALVARO", value: "COFIÑO ALVARO" },
            { key: "COFIÑO PATTY", value: "COFIÑO PATTY" },
            { key: "COFIÑO LIZA", value: "COFIÑO LIZA" },
        ], "3ra. Generación": [
            { key: "MASSANET COFIÑO, CRISTINA", value: "MASSANET COFIÑO, CRISTINA" },
            { key: "MASSANET COFIÑO, JAVIER", value: "MASSANET COFIÑO, JAVIER" },
            { key: "MASSANET COFIÑO, JORGE", value: "MASSANET COFIÑO, JORGE" },
            { key: "COFIÑO FIGUEROA, ANA LUCIA", value: "COFIÑO FIGUEROA, ANA LUCIA" },
            { key: "COFIÑO FIGUEROA, ALVARO JOSE", value: "COFIÑO FIGUEROA, ALVARO JOSE" },
            { key: "COFIÑO FIGUEROA, RODRIGO", value: "COFIÑO FIGUEROA, RODRIGO" },
            { key: "FERNANDEZ COFIÑO, MARIELA", value: "FERNANDEZ COFIÑO, MARIELA" },
            { key: "FERNANDEZ COFIÑO, JOSE ANDRES", value: "FERNANDEZ COFIÑO, JOSE ANDRES" },
            { key: "FERNANDEZ COFIÑO, RAFAEL", value: "FERNANDEZ COFIÑO, RAFAEL" },
        ]
    }



    const [value, setValue] = useState(null);
    const [valueGeneracion, setValueGeneracion] = useState("");
    const [valueSolicitante, setValueSolicitante] = useState("");
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

        if (value == null || valueGeneracion == null || valueGeneracion == "Generación Familiar" || valueSolicitante == null || valueSolicitante == "Solicitante" || asunto == null || desc == null) {
            Alert.alert('Por favor llenar toda la información que se solicita')
        } else {
            setLoading(true)

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
                            setLoading(false)
                            setModalVisible(true)
                        })

                })
        }
    }
    const updCaso = () => {

        axios.post('https://sarservicedesk.sarlatam.com/ASDKAPI/Api/v8.6/user/login', user)
            .then(res => {
                const token = res.data[1].Value


                const bodyAdicional = [
                    {
                        "Id": 3353,
                        "CaseId": caso,
                        "CaseType": 4,
                        "IsBasic": false,
                        "UserId": "12817",
                        "Value": value,
                        "ValueType": 1
                    },
                    {
                        "Id": 3354,
                        "CaseId": caso,
                        "CaseType": 4,
                        "IsBasic": false,
                        "UserId": "12817",
                        "Value": valueGeneracion,
                        "ValueType": 1
                    },
                    {
                        "Id": 3355,
                        "CaseId": caso,
                        "CaseType": 4,
                        "IsBasic": false,
                        "UserId": "12817",
                        "Value": valueSolicitante,
                        "ValueType": 1
                    },
                    {
                        "Id": 3356,
                        "CaseId": caso,
                        "CaseType": 4,
                        "IsBasic": false,
                        "UserId": "12817",
                        "Value": selectedStartDate,
                        "ValueType": 2
                    },
                    {
                        "Id": 3357,
                        "CaseId": caso,
                        "CaseType": 4,
                        "IsBasic": false,
                        "UserId": "12817",
                        "Value": selectedStartDateSalida,
                        "ValueType": 2
                    }
                ]
                console.log(bodyAdicional);
                axios.post('https://sarservicedesk.sarlatam.com/ASDKAPI/Api/v8.6/additionalfield/update', bodyAdicional, {
                    headers: {
                        'Authorization': `${token}`
                    }
                }).then(res => console.log(res))
            })
    }

    return (
        <View>

            <TextInput
                onChangeText={setAsunto}
                style={styles.input}
                placeholder="Asunto" />

            <TextInput
                onChangeText={setDesc}
                style={styles.input}
                placeholder='Descripción' />

            <SelectList
                boxStyles={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}
                search={false}
                setSelected={setValue}
                data={datosCasa}
                placeholder='Casa de Recreo'
            />
            <SelectList
                boxStyles={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}
                search={false}
                setSelected={setValueGeneracion}
                data={datosGeneracion}
                placeholder='Generación Familiar'
                defaultOption={{ key: "Generación Familiar", value: "Generación Familiar" }}
            />
            <SelectList
                boxStyles={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}
                search={false}
                setSelected={setValueSolicitante}
                data={datosSolicitante[valueGeneracion]}
                placeholder='Solicitante'
                defaultOption={{ key: "Solicitante", value: "Solicitante" }}
            />
            <View style={styles.input}>
                {!showPicker && (<Pressable onPress={toggleDatePicker}>
                    <TextInput style={{ color: 'black' }} value={fechaIngreso === "" ? "Ingrese Fecha de Ingreso" : moment(fechaIngreso).format("DD/MM/YYYY")} onChangeText={setFechaIngreso} editable={false} placeholder='Fecha de Ingreso' />
                </Pressable>)}
            </View>

            {showPicker && (<DateTimePicker
                display='spinner'
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                locale='es-ES'
                onChange={onChange}
            />)}
            {/* salida */}
            <View style={styles.input}>
                {!showPickerSalida && (<Pressable onPress={toggleDatePickerSalida}>
                    <TextInput style={{ color: 'black' }} value={fechaSalida === "" ? "Ingrese Fecha de Salida" : moment(fechaSalida).format("DD/MM/YYYY")} onChangeText={setFechaSalida} editable={false} placeholder='Fecha de Salida' />
                </Pressable>)}
            </View>


            {showPickerSalida && (<DateTimePicker
                display='spinner'
                testID="dateTimePickerSalida"
                value={dateSalida}
                mode="date"
                is24Hour={true}
                locale='es-ES'
                onChange={onChangeSalida}
            />)}


            <TouchableOpacity style={styles.boton} onPress={() => submitBtn()}>
                <View style={styles.centrar}>
                    <Text style={styles.textBoton}>Registrar Caso</Text>
                </View>
            </TouchableOpacity>
            <ActivityIndicator animating={loading} size="large" color='#8fbc8f' style={{ marginTop: 30 }} />
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
                                    updCaso()
                                }
                            }>
                            <Text style={styles.textStyle}>Cerrar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal >
        </View>
    )
}

export default ReservaCasasdeRecreo

const styles = StyleSheet.create({
    input: {
        marginRight: 10,
        marginLeft: 10,
        borderWidth: 1,
        padding: 10,
        marginTop: 20,
        borderRadius: 10
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