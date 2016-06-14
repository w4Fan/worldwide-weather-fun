import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Header from './Header';
import WeatherPanel from './WeatherPanel';
import CityPanel from './CityPanel';

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCity: {
                code: 1816670,
                name: 'Beijing',
                country: 'CN'
            }
        };

        this.openCityPanel = this.openCityPanel.bind(this);
        this.closeCityPanel = this.closeCityPanel.bind(this);
        this.changeCity = this.changeCity.bind(this);
    }

    openCityPanel() {
        const view = this.refs.view;
        const aside = this.refs.aside;
        const mask = this.refs.mask;

        aside.classList.remove('hide');
        mask.classList.remove('hide');

        requestAnimationFrame(function () {
            view.classList.add('aside-open');
        });
    }

    closeCityPanel() {
        const view = this.refs.view;
        const aside = this.refs.aside;
        const mask = this.refs.mask;

        requestAnimationFrame(function () {
            view.classList.remove('aside-open');
        });

        setTimeout(function () {
            aside.classList.add('hide');
            mask.classList.add('hide');
        }, 210);
    }

    changeCity(query) {
        this.closeCityPanel();
        this.setState({
            selectedCity: {
                code: query.cid,
                name: query.cname,
                country: query.country
            }
        });
    }

    render() {
        return (
            <div className="view has-header" ref="view">
                <Header text="WORLDWIDE WEATHER FUN" />
                <div className="page">
                    <h5 className="city" onClick={this.openCityPanel}>
                        <p>CITY: {this.state.selectedCity.name}</p>
                        <p>COUNTRY: {this.state.selectedCity.country}</p>
                        <i className="fa fa-edit"></i>
                    </h5>
                    <WeatherPanel data={this.state.selectedCity} />
                </div>
                <div className="intro">
                    <Link to={`/intro`}><i className="fa fa-info-circle"></i></Link>
                </div>
                <div className="aside hide" ref="aside">
                    <CityPanel changeAction={this.changeCity} />
                </div>
                <div className="mask hide" ref="mask" onClick={this.closeCityPanel}></div>
            </div >
        )
    }
}