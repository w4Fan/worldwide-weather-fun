import React from 'react';
import ReactDOM from 'react-dom';

export default class CityItems extends React.Component {
    constructor(props) {
        super(props);
        this.selectedCity = this.selectedCity.bind(this);
    }

    selectedCity() {
        console.log('changecity');
        const query = {
            cid: this.props.cid,
            cname: this.props.cname,
            country: this.props.country
        };

        this.props.changeAction(query);
    }

    render() {
        return <li onClick={this.selectedCity}>{this.props.cname}</li>;
    }
}