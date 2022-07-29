import React from 'react';
import styles from './weather.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faCloudRain, faCloudShowersHeavy,faSun } from '@fortawesome/free-solid-svg-icons';
const WeatherComponent = (props: any) => {
    const fontAwesomeIcons :any = {
        "Clear" : faSun, 
        "Clouds" : faCloud,
        "Rain" : faCloudRain,
    }
    const fontAwesomeColor :any ={
        "Clear" : 'rgba(253,184,19)', 
        "Clouds" : 'rgba(205,240,240,255)',
        "Rain" : 'rgba(205,240,240,255)',
    }
    return (
        <div className={styles.childContainer}>
            <div className={styles.box_day}>{new Date(props.eachDay.dt_txt).toUTCString().split(',')[0]}</div>
            <div className={styles.box_weather}>
                <FontAwesomeIcon icon={fontAwesomeIcons[props.eachDay.weather[0].main]} color={fontAwesomeColor[props.eachDay.weather[0].main]} size={'5x'}/>
            </div>
            {typeof props.eachDay.main.temp != undefined ? (
            <div className={styles.box_temp}>{Math.round(props.eachDay.main.temp)}°</div>) : ('')}
        </div>
    );
}

export default WeatherComponent;

