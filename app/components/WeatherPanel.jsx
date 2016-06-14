import React from 'react';
import ReactDOM from 'react-dom';
import requestUrl from '../utils/requestUrl';
import 'whatwg-fetch';

export default class WeatherPanel extends React.Component {
    getweatherData(nextProps) {
        const query = nextProps || this.props;
        const panel = this.refs.panel;
        const startTimer = (new Date()).getTime();

        if (!panel.classList.contains("back")) {
            requestAnimationFrame(function () {
                panel.classList.add('back');
            });
        };

        fetch(requestUrl(query.data.code))
            .then((response) => {
                return response.json()
            }).then((json) => {
                if (json.code === 0) {
                    let temp = {};

                    temp.wind = {
                        speed: json.data.wind.speed,
                        deg: json.data.wind.deg
                    };
                    temp.cloudiness = json.data.clouds.all;
                    temp.pressure = json.data.main.pressure;
                    temp.humidity = json.data.main.humidity;
                    temp.temp_max = json.data.main.temp_max;
                    temp.temp_min = json.data.main.temp_min;

                    if (json.data.main.rain) {
                        temp.rain = json.data.main.rain['1h'];
                    };

                    this.setState({
                        weather: temp,
                        timer: ((new Date()).getTime() - startTimer)
                    });
                } else {
                    this.setState({ errMsg: json.msg, timer: ((new Date()).getTime() - startTimer) });
                };
            }).catch((ex) => {
                this.setState({ errMsg: ex, timer: ((new Date()).getTime() - startTimer) });
            });
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.getweatherData();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data.code === nextProps.data.code) {
            return;
        };

        this.getweatherData(nextProps);
    }

    componentDidUpdate() {
        const panel = this.refs.panel;
        const timeOut = (this.state.timer > 1000) ? this.state.timer : (1000 - this.state.timer);

        setTimeout(function () {
            requestAnimationFrame(function () {
                panel.classList.remove('back');
            });
        }, timeOut);
    }

    render() {
        if (this.state.weather) {
            return (
                <div ref="panel" className="panel back">
                    <div className="panel-front">
                        <dl>
                            <dt>Wind: </dt>
                            <dd>
                                <p>Speed: {this.state.weather.wind.speed}m/s</p>
                                <p>Deg: {this.state.weather.wind.deg}</p>
                            </dd>
                            <dt>Cloudiness: </dt>
                            <dd>{this.state.weather.cloudiness}</dd>
                            <dt>Pressure: </dt>
                            <dd>{this.state.weather.pressure}hpa</dd>
                            <dt>Humidity: </dt>
                            <dd>{this.state.weather.humidity}%</dd>
                            <dt>Temperature: </dt>
                            <dd>{this.state.weather.temp_min}°C - {this.state.weather.temp_max}°C</dd>
                        </dl>
                    </div>
                    <div className="panel-back">
                        <p>LOADING...</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div ref="panel" className="panel back">
                    <div className="panel-front">
                        <p>{this.state.errMsg}</p>
                    </div>
                    <div className="panel-back">
                        <p>LOADING...</p>
                    </div>
                </div>
            )
        };
    }
}