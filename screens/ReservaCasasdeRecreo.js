import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Modal, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";


const ReservaCasasdeRecreo = () => {


    //fecha de ingreso
    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const today = new Date();
    const startDate = getFormatedDate(
        today.setDate(today.getDate() + 1),
        "DD/MM/YYYY"
    );
    const [selectedStartDate, setSelectedStartDate] = useState("Fecha de Ingreso");
    const [startedDate, setStartedDate] = useState("01/01/2023");

    function handleChangeStartDate(propDate) {
        setStartedDate(propDate);
    }
    const handleOnPressStartDate = () => {
        setOpenStartDatePicker(!openStartDatePicker);
    };

    //fecha de salida

    const [openStartDatePickerSalida, setOpenStartDatePickerSalida] = useState(false);
    const todaySalida = new Date();
    const startDateSalida = getFormatedDate(
        todaySalida.setDate(todaySalida.getDate() + 1),
        "DD/MM/YYYY"
    );
    const [selectedStartDateSalida, setSelectedStartDateSalida] = useState("Fecha de Salida");
    const [startedDateSalida, setStartedDateSalida] = useState("01/01/2023");

    function handleChangeStartDateSalida(propDate) {
        setStartedDateSalida(propDate);
    }
    const handleOnPressStartDateSalida = () => {
        setOpenStartDatePickerSalida(!openStartDatePickerSalida);
    };

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
                <TouchableOpacity
                    onPress={handleOnPressStartDate}
                >
                    <Text style={{ color: 'black' }}>{selectedStartDate}</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={openStartDatePicker}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <DatePicker
                        mode="datepicker"
                        minimumDate={startDate}
                        selected={startedDate}
                        onDateChanged={handleChangeStartDate}
                        onSelectedChange={(date) => setSelectedStartDate(date)}
                        options={{
                            mainColor: '#8fbc8f'
                        }}
                        locale='es-ES'
                    />
                    <TouchableOpacity activeOpacity={1} onPress={handleOnPressStartDate} style={{ width: '100%' }}>
                        <Text style={{ color: '#8fbc8f', textAlign: 'center', backgroundColor: 'white', padding: 20, fontWeight: 'bold' }}>Seleccionar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {/* salida */}
            <View style={styles.input}>
                <TouchableOpacity
                    onPress={handleOnPressStartDateSalida}
                >
                    <Text style={{ color: 'black' }}>{selectedStartDateSalida}</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={openStartDatePickerSalida}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <DatePicker
                        mode="datepicker"
                        minimumDate={startDateSalida}
                        selected={startedDateSalida}
                        onDateChanged={handleChangeStartDateSalida}
                        onSelectedChange={(date) => setSelectedStartDateSalida(date)}
                        options={{
                            mainColor: '#8fbc8f'
                        }}
                    />
                    <TouchableOpacity activeOpacity={1} onPress={handleOnPressStartDateSalida} style={{ width: '100%', }}>
                        <Text style={{ color: '#8fbc8f', textAlign: 'center', backgroundColor: 'white', padding: 20, fontWeight: 'bold' }}>Seleccionar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

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