import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

//screens
import Home from "./screens/Home"
import AddCase from "./screens/AddCase";
import Cases from "./screens/Cases";
import CasasdeRecreo from "./screens/CasasdeRecreo";
import Consultoria from "./screens/Consultoria";
import Servicios from "./screens/Servicios";
import GestionCasasdeRecreo from "./screens/GestionCasasdeRecreo";
import ReservaCasasdeRecreo from "./screens/ReservaCasasdeRecreo";

const AddStack = createNativeStackNavigator();

function MyStack() {
    return (
        <AddStack.Navigator initialRouteName="Home" screenOptions={{
            headerBackTitleVisible: false, headerShown: true
        }}>
            <AddStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <AddStack.Screen name="AddCase" component={AddCase} options={{ title: 'Registrar Caso', headerTitleAlign: 'center', headerTintColor: '#8fbc8f' }} />
            <AddStack.Screen name="Cases" component={Cases} options={{ title: 'Mis Casos', headerTitleAlign: 'center', headerTintColor: '#8fbc8f' }} />
            <AddStack.Screen name="CasasdeRecreo" component={CasasdeRecreo} options={{ title: 'Casas de Recreo', headerTitleAlign: 'center', headerTintColor: '#8fbc8f' }} />
            <AddStack.Screen name="Consultoria" component={Consultoria} options={{ title: 'Consultoría Legal', headerTitleAlign: 'center', headerTintColor: '#8fbc8f' }} />
            <AddStack.Screen name="Servicios" component={Servicios} options={{ title: 'Servicios Concierge', headerTitleAlign: 'center', headerTintColor: '#8fbc8f' }} />
            <AddStack.Screen name="GestionCasasdeRecreo" component={GestionCasasdeRecreo} options={{ title: 'Gestion Casas de Recreo', headerTitleAlign: 'center', headerTintColor: '#8fbc8f' }} />
            <AddStack.Screen name="ReservaCasasdeRecreo" component={ReservaCasasdeRecreo} options={{ title: 'Reserva Casas de Recreo', headerTitleAlign: 'center', headerTintColor: '#8fbc8f' }} />
        </AddStack.Navigator>
    )
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}