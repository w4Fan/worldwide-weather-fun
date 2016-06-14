import React from 'react';
import ReactDOM from 'react-dom';
import CountryList from './CountryList';
import CityList from './CityList';

export default class CityPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            country: ''
        };
        this.changeCountry = this.changeCountry.bind(this);
    }

    changeCountry(country) {
        this.setState({ 'country': country });
    }

    render() {
        return (
            <div className="aside-container">
                <div className="aside-title">
                    <CountryList selectedAction={this.changeCountry} />
                </div>
                <div className="aside-list">
                    <CityList changeAction={this.props.changeAction} country={this.state.country} />
                </div>
            </div>
        )
    }
}