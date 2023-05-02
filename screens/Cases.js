import { Text, View, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment/moment';
import 'moment/locale/es'

const Cases = () => {

    const [casos, setCasos] = useState([]);

    const user = [
        {
            "Field": "username",
            "Value": "luis.morales"
        },
        {
            "Field": "password",
            "Value": "123"
        }
    ];

    useEffect(() => {
        axios.post('https://sarservicedesk.sarlatam.com/ASDKAPI/Api/v8.6/user/login', user)
            .then(res => {
                const token = res.data[1].Value

                console.log(token);

                const obj = {
                    "Paging": {
                        "Start": 1,
                        "End": 50,
                        "Size": 0
                    },
                    "Criteria": [
                        {
                            "Value": "18",
                            "FieldName": "CustomerId",
                            "LogicOperatorId": 1,
                            "ComparisonOperatorId": 5
                        },
                    ],
                    "WhereCriteria": [],
                    "Order": {
                        "ColumnName": "RegistrationDate",
                        "ModeId": 2
                    },
                    "ViewId": 5,
                    "ProjectId": 1
                };

                axios.post('https://sarservicedesk.sarlatam.com/ASDKAPI/Api/v8.6/item/list', obj, {
                    headers: {
                        'Authorization': `${token}`
                    }
                })
                    .then(res => setCasos(res.data.Data))
            })
    }, [])
    return (
        <FlatList data={casos}
            renderItem={({ item }) => (
                <View key={item.IdByProject} style={styles.container}>
                    <Text style={styles.tittle}>Número de Caso: {item.IdByProject}</Text>
                    <Text>Fecha de Registro: {moment(item.RegistrationDate).format('LLLL')} </Text>
                    <Text>Servicio: {item.ServiceName}</Text>
                    <Text>Categoría: {item.CategoryName}</Text>
                    <Text>Estado: {item.StateName}</Text>
                    <Text>Asunto: {item.Subject}</Text>
                </View>
            )} />
    )
}
export default Cases
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 10,
        padding: 10,
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
    tittle: {
        alignSelf: 'center',
        color: '#8fbc8f',
        fontWeight: 'bold',
        fontSize: 20,
        padding: 5
    }
})