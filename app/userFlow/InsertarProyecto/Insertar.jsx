import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ImageBackground, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import NavBarBack from '../../../components/navbarBack';


const InsertarProyecto = () => {
    const router = useRouter();
    const [nombreProyecto, setNombreProyecto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [metaRecaudacion, setMetaRecaudacion] = useState('');
    const [fechaHora, setFechaHora] = useState(new Date());
    const [categoria, setCategoria] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handlePress = () => {
        router.back()
    };

    const handlePost = async () => {
        const UserID = await AsyncStorage.getItem('userID');
        try {
            if (!nombreProyecto || !descripcion || !metaRecaudacion  || !fechaHora || !categoria  || !UserID) {
                Alert.alert('Error', 'Todos los campos son obligatorios');
                return;
            }
            const storedUrl = await AsyncStorage.getItem('API_URL');
            const response = await axios.post(`${storedUrl}/proyecto`, {
                titulo: nombreProyecto,
                descripcion: descripcion,
                dinero: metaRecaudacion,
                fechaHora: fechaHora.toISOString(),
                categoria: categoria,
                idUser: UserID,
            });

            console.log("creacion exitosa");
            Alert.alert('Éxito', 'Proyecto creado correctamente');

        } catch (error) {
            Alert.alert('Error', 'Hubo un problema al crear el proyecto');
            console.error(error);
        }
    };
    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || fechaHora;
        setShowDatePicker(false);
        setFechaHora(currentDate);
    };


    return(
        <View style={{flex: 1}}>
            <Stack.Screen
                options={{
                    headerShown: false, 
                }}
            >
            </Stack.Screen>
            <KeyboardAvoidingView
                style={styles.containerWrapper}
                behavior="height"
                keyboardVerticalOffset={30}
                > 
                <NavBarBack/>
                <View style={styles.container}>
                    <Text
                        style={styles.titleText}
                    >
                        Crear Proyecto
                    </Text>
                    <View>
                        <TextInput   
                            style={styles.Items} 
                            placeholder="Nombre del proyecto"
                            value={nombreProyecto}
                            onChangeText={setNombreProyecto}
                        />
                        <TextInput
                            style={styles.Items} 
                            placeholder="Descripción"
                            value={descripcion}
                            onChangeText={setDescripcion}
                        />
                        <TextInput
                            style={styles.Items} 
                            placeholder="Meta de recaudación"
                            value={metaRecaudacion}
                            onChangeText={setMetaRecaudacion}
                        />
                        <TouchableOpacity onPress={showDatepicker} style={styles.datePickerButton}>
                            <Text style={styles.datePickerText}>{fechaHora ? fechaHora.toDateString() : 'Seleccionar fecha'}</Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                style={styles.datePicker}
                                value={fechaHora}
                                mode="date"
                                display="default"
                                onChange={onDateChange}
                            />
                        )}
                        <View style={styles.Picker}>
                            <Picker
                                style={styles.Items}
                                mode={"dropdown"}
                                selectedValue={categoria}
                                onValueChange={(itemValue) => setCategoria(itemValue)}
                            >
                                <Picker.Item label="Tecnología" value="Tecnología" />
                                <Picker.Item label="Salud" value="Salud" />
                                <Picker.Item label="Entretenimiento" value="Entretenimiento" />
                                <Picker.Item label="Educación" value="Educación" />
                                <Picker.Item label="Energía" value="Energía" />
                                <Picker.Item label="Arte" value="Arte" />
                                <Picker.Item label="Investigación" value="Investigación" />
                                <Picker.Item label="Cocina" value="Cocina" />
                                {/* Añadir más opciones aquí */}
                            </Picker>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.Button}
                        onPress={handlePost}
                    >
                        <Text style={styles.buttonText}>Crear Proyecto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.CancelButton}
                        onPress={() => handlePress()}
                    >
                        <Text style={styles.cancelButtonText}>Cancelar y Volver</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>    
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    containerWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcfcfc',
    },
    container: {
        width: 400,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
    titleText: {
        fontSize: 24,
        fontFamily: 'SpaceGroteskBold',
        marginBottom: 20
    },
    Items: {
        width: 350,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 30
    },
    textArea: {
        width: '100%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 15,
        height: 100,
        textAlignVertical: 'top'
    },
    Picker: {
        width: '100%',
        borderColor: '#ccc',
        alignContent: 'center',
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 15
    },
    Button: {
        backgroundColor: '#1C7690',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontFamily: 'SpaceGrotesk',
    },
    CancelButton: {
        backgroundColor: '#FF5733',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
        marginTop: 10
    },
    cancelButtonText: {
        color: 'white',
        fontFamily: 'SpaceGrotesk',
        
    },
    datePickerButton: {
        width: '100%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 30,
    }
});

export default InsertarProyecto;
