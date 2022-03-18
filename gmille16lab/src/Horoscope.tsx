import logo from './logo.svg';
import React, {useState} from 'react';  // for hooks!
import './App.css';

import './TextBox';
import {TextBox} from './TextBox';


// @ts-ignore
import {AwesomeButton} from "react-awesome-button";  // for external button
import "react-awesome-button/dist/styles.css";  // for external button styling
import axios from 'axios';

function Horoscope() {
    const [sun, setSun] = useState("");
    const [moon, setMoon] = useState("");
    const [rising, setRising] = useState("");
    const [horoscope, setHoroscope] = useState([]);
    const requestHoroscope = () => {
        const request = 'http://localhost:4567/horoscope';  // 1) location for request

        const toSend = {  // 2) your data
            "sun": sun,
            "moon": moon,
            "rising": rising
        }

        let config = {  // 3) config
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        // 1) location for request 2) data 3) configuration
        axios.post(request, toSend, config)

            .then((response: any) => {
                console.log(response.data);

                // set field name to the map from "Main.java"
                setHoroscope(response.data["horoscope"]);
            })

            .catch((error: any) => {
                console.log(error);
            });
    }


    return (
        <div>
            <header> Horoscope </header>
            <TextBox label={"Sun Sign"} change={setSun}/>
            <TextBox label={"Moon Sign"} change={setMoon}/>
            <TextBox label={"Rising Sign"} change={setRising}/>

            <AwesomeButton
                type="primary"
                ripple
                onPress={requestHoroscope}>
                Submit! </AwesomeButton>
                {horoscope.map(x => React.createElement('p', {}, x))}


        </div>
    );
}

export default Horoscope;