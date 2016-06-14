import React from 'react';
import ReactDOM from 'react-dom';
import requestUrl from '../utils/requestUrl';
import 'whatwg-fetch';

export default class CountryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
        this.selectedCountry = this.selectedCountry.bind(this);
    }

    componentWillMount() {
        this.state = { loading: true };
        fetch(requestUrl('country'))
            .then((response) => {
                return response.json()
            }).then((json) => {
                if (json.code === 0) {
                    this.setState({ loading: false, country: json.data });
                } else {
                    this.setState({ loading: false, errMsg: json.msg });
                };
            }).catch((ex) => {
                this.setState({ loading: false, errMsg: ex });
            });
    }

    selectedCountry() {
        let country = ReactDOM.findDOMNode(this.refs.country).value;

        if (country === '--') {
            return;
        };

        this.props.selectedAction(country);
    }

    render() {
        if (this.state.loading) {
            return <p>LOADING...</p>;
        } else {
            if (this.state.country) {
                return (
                    <ul>
                        <li>
                            <div className="select">
                                <select ref="country" onChange={this.selectedCountry}>
                                    <option>select country</option>
                                    {this.state.country.map((item, key) => {
                                        return <option key={key}>{item}</option>;
                                    }) }
                                </select>
                            </div>
                        </li>
                    </ul>
                );
            } else {
                return <p>{this.state.errMsg}</p>;
            };
        };
    }
}