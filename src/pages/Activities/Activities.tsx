import {
    IonButtons, IonCol, IonContent, IonDatetime, IonGrid, IonHeader, IonInput, IonItem, IonItemDivider,
    IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, IonLoading, IonButton, IonToast, IonText, IonAlert
} from "@ionic/react";

import React, { useContext, useRef, useState } from "react";
import { Plugins } from "@capacitor/core";
import "capacitor-gray-geolocation";

import './style.css'
import ActivitiesContext from "../../data/context";

const { GrayGeolocation } = Plugins;

const Activities: React.FC = () => {
    const [location, setLocation] = useState<string>("Ubicación")
    const [alert, setAlert] = useState<boolean>(false)
    const [visible, setIsvisible] = useState<boolean>(false)
 
    const nameInput = useRef<HTMLIonInputElement>(null)
    const lastNameInput = useRef<HTMLIonInputElement>(null)
    const selectedInput = useRef<HTMLIonDatetimeElement>(null)
    const estaturaInput = useRef<HTMLIonInputElement>(null)
    const pesoInput = useRef<HTMLIonInputElement>(null)
    const temperaturaInput = useRef<HTMLIonInputElement>(null)
    const presionInput = useRef<HTMLIonInputElement>(null)
    const saturacionInput = useRef<HTMLIonInputElement>(null)

    const [geolocation, setGeolocation] = useState({
        latitude: 0,
        longitude: 0
    })

    const getLocation = async () => {
        setIsvisible(true)
        let locationOn = await GrayGeolocation.turnLocationOn();
        if (locationOn.res) {
            let coords = await GrayGeolocation.getCurrentPosition();
            console.log("latitude :", coords.latitude, "longitude :", coords.longitude);
            fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + coords.latitude + ',' + coords.longitude
                + '&key=AIzaSyC2lXFhtyWxIwnmcqTfYCS3B8uX7uamOn0')
                .then(res => res.json())
                .then(response => {
                    //console.log(response.results)
                    setLocation(response.results[0].address_components[1].long_name + " " + response.results[0].address_components[0].long_name + ", " + response.results[0].address_components[2].long_name);
                    console.log(response.results[0].address_components[1].long_name + " " + response.results[0].address_components[0].long_name + ", " + response.results[0].address_components[2].long_name);
                },
                    (error) => {

                    })

            setGeolocation(coords)
            setIsvisible(false)
        }
        else {
            //failed to turn on location : User declined
        }
    }


    const activities = useContext(ActivitiesContext);

    const addActivity = () => {
        const name = nameInput.current?.value as string
        const lastName = lastNameInput.current?.value as string
        const selectedDate = new Date(selectedInput.current?.value as string)
        const estatura = estaturaInput.current?.value
        const peso = pesoInput.current?.value
        const temperatura = temperaturaInput.current?.value
        const presion = presionInput.current?.value
        const saturacion = saturacionInput.current?.value
        const date = selectedDate.getDay() + "/" + selectedDate.getMonth() + "/" + selectedDate.getFullYear()

        console.log(isNaN(selectedDate.getTime()))

        if (name && lastName && estatura && peso && temperatura && presion && saturacion && date && location !== "Ubicación" && !isNaN(selectedDate.getTime())) {
            activities.addActivity(name, lastName, date, +estatura, +peso, +temperatura, +presion, +saturacion, location)
            nameInput.current!.value = ''
            lastNameInput.current!.value = ''
            estaturaInput.current!.value = ''
            pesoInput.current!.value = ''
            temperaturaInput.current!.value = ''
            presionInput.current!.value = ''
            saturacionInput.current!.value = ''
            selectedInput.current!.value = ''
            setLocation("Ubicación")
        } else {
            setAlert(true)
        }

    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle> AGREGAR UN PACIENTE </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem style={{ marginLeft: 40, marginRight: 40 }}>
                        <IonLabel position="floating">Nombres</IonLabel>
                        <IonInput ref={nameInput}></IonInput>
                    </IonItem>
                    <IonItem style={{ marginLeft: 40, marginRight: 40 }}>
                        <IonLabel position="floating">Apellidos</IonLabel>
                        <IonInput ref={lastNameInput}></IonInput>
                    </IonItem>
                    <IonItem style={{ marginLeft: 40, marginRight: 40 }}>
                        <IonLabel position="floating">Fecha de Nacimiento</IonLabel>
                        <IonDatetime displayFormat="DDDD MMM D, YYYY" placeholder="Select Date" ref={selectedInput}></IonDatetime>
                    </IonItem>
                </IonList>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonItem style={{ marginLeft: 20 }}>
                                <IonLabel position="floating">Estatura</IonLabel>
                                <IonInput placeholder="(cm)" type="number" ref={estaturaInput}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem style={{ marginLeft: 10 }}>
                                <IonLabel position="floating">Peso</IonLabel>
                                <IonInput placeholder="(Kg)" type="number" ref={pesoInput}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem style={{ marginLeft: 10, marginRight: 20 }}>
                                <IonLabel position="floating">Temp.</IonLabel>
                                <IonInput placeholder="(°C)" type="number" ref={temperaturaInput}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem style={{ marginLeft: 20 }}>
                                <IonLabel position="floating">Preción</IonLabel>
                                <IonInput type="number" ref={presionInput}></IonInput>
                            </IonItem>
                        </IonCol>
                        <IonCol>
                            <IonItem style={{ marginLeft: 10, marginRight: 20 }}>
                                <IonLabel position="floating">Nivel de Saturación</IonLabel>
                                <IonInput type="number" ref={saturacionInput}></IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton style={{ marginLeft: 20 }} onClick={getLocation}>Localización</IonButton>
                        </IonCol>
                        <IonCol>
                            <IonItem style={{ marginTop: 3 }}>
                                <IonText >{location}</IonText>
                            </IonItem>

                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonButton onClick={addActivity}>Guardar</IonButton>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonLoading isOpen={visible} message={"Obteniendo ubicacion"} onDidDismiss={() => setIsvisible(false)}/>
                <IonAlert
                    isOpen={alert}
                    onDidDismiss={() => setAlert(false)}
                    header={'UPS!'}
                    message={'Le falta llenar un campo!!!'}
                    buttons={[
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: blah => {
                                console.log('Confirm Cancel: blah');
                            }
                        },
                        {
                            text: 'Okay',
                            handler: () => {
                                console.log('Confirm Okay');
                            }
                        }
                    ]}
                />

            </IonContent>
        </IonPage>
    )
}

export default Activities;