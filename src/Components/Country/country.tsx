import React from 'react';
import WeatherComponent from '../Weather/weather';
import styles from './country.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';

const api = {
    key: "68fd2ff6e9ce64ca04ded7fd07dd664b",
    baseUrl: "https://api.openweathermap.org/data/2.5/"
}
interface Day{
    temp : any;
    description : any;
    date : any;
}
class CountryComponent extends React.Component<{}, { [key: string]: any }> {
    constructor(props: any) {
        super(props);
        this.state = {
            data :[],
            eachDayData :[]
        };
    }

    btnActive : number = 1;

    componentDidMount() {
        this.fetchTodayWeather("vancouver");
        this.fetchWeather("vancouver");
        
    }

    handleClick = (e: any, i:number) => {
        this.fetchWeatherWithFetchAPI(e.target.value);
        this.fetchTodayWeatherWithFetchAPI(e.target.value);
        this.btnActive = i;
    };

    fetchWeatherWithFetchAPI = (city: string) => {
        const options = {
            method: 'GET',
            headers: new Headers({ Accept: "Application/json" })
        };
        let cities = ["OTTAWA", "MOSCOW", "TOKYO"];
        fetch(
            `${api.baseUrl}forecast?q=${city}&units=metric&APPID=${api.key}`, options)
            .then(response => response.json())
            .then(res => {
                let eachDayData = res.list.filter((day: { dt_txt: string | string[]; }) => day.dt_txt.includes("18:00:00")).slice(0,-1);
                this.setState({ 
                    eachDayData : eachDayData
                })
            })
            .catch(error => console.log(error))
    };
    fetchWeather = this.fetchWeatherWithFetchAPI;

    fetchTodayWeatherWithFetchAPI = (city: string) => {
        const options = {
            method: 'GET',
            headers: new Headers({ Accept: "Application/json" })
        };
        fetch(
            `${api.baseUrl}weather?q=${city}&units=metric&APPID=${api.key}`, options)
            .then(response => response.json())
            .then(res => {
                console.log("Today ", Math.round(res.main.temp));
                this.setState({ 
                    data : res
                })
            })
            .catch(error => console.log(error))
    };
    fetchTodayWeather = this.fetchTodayWeatherWithFetchAPI;

    render() {
        const { data, eachDayData } = this.state;
        return (
            <div className='container'>
                <div className='headerPart'>
                    <button className={this.btnActive === 1 ? styles.country : styles.countryActive } value={"vancouver"} onClick={e => this.handleClick(e,1)}>VANCOUVER</button>
                    <button className={this.btnActive === 2 ? styles.country : styles.countryActive } value={"moscow"} onClick={e => this.handleClick(e,2)}>MOSCOW</button>
                    <button className={this.btnActive === 3 ? styles.country : styles.countryActive } value={"tokyo"} onClick={e => this.handleClick(e,3)}>TOKYO</button>
                </div>
                <div className={styles.weather_container}>
                    {(typeof data.main != "undefined") ? (
                        <div className={styles.weather_main}>
                            <div className={styles.weather_today}>Today</div>
                            <div className={styles.weather_box}>
                                <div className={styles.childContainer1}>
                                    <FontAwesomeIcon icon={faCloud} color={'rgba(205,240,240,255)'} size={'10x'}/>
                                </div>
                                <div className={styles.childContainer2}>
                                    <div className={styles.weather_temp}>{Math.round(data.main.temp)}°</div>
                                    <div className={styles.weather_type}>{data.weather[0].main}</div>  
                                </div>
                            </div>
                        </div>
                    ) : ('')}
                    {(typeof data != "undefined" && typeof eachDayData != "undefined") ? (
                        eachDayData.map((day: any,i: any) => <WeatherComponent eachDay={day} key={i} />)                    
                    ) : ('')}
                </div>
            </div>
        )
    }
}

export default CountryComponent;

