import React from 'react';
import ReactDOM from 'react-dom';
import CityItems from './CityItems';
import requestUrl from '../utils/requestUrl';
import 'whatwg-fetch';

export default class CityList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 'loading': false };
    }

    componentDidMount() {
        this.setState({ 'firstView': true });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.country === '' || this.props.country === nextProps.country) {
            return;
        };

        let country = nextProps.country;

        this.setState({ 'loading': true, 'firstView': false });
        fetch(requestUrl('country/' + country))
            .then((response) => {
                return response.json()
            }).then((json) => {
                if (json.code === 0) {
                    this.setState({ loading: false, list: json.data });
                } else {
                    this.setState({ loading: false, errMsg: json.msg });
                };
            }).catch((ex) => {
                this.setState({ loading: false, errMsg: ex });
            });
    }

    render() {
        if (this.state.loading) {
            return <p>LOADING...</p>;
        } else {
            if (this.state.list) {
                return (
                    <ul>
                        {this.state.list.map((city, key) => {
                            return (
                                <CityItems 
                                    key={key}
                                    cid={city.cid}
                                    cname={city.cname}
                                    country={this.props.country}
                                    changeAction={this.props.changeAction}
                                />
                            );
                        }) }
                    </ul>
                );
            } else {
                return <p>{this.state.errMsg}</p>;
            };
        };
    }
}