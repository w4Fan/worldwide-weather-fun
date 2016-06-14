import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

export default function Header(props) {
    if (props.back) {
        return (
            <div className="header">
                <div className="icon left">
                    <Link to={`/`}><i className="fa fa-angle-left"></i></Link>
                </div>
                <div className="title">{props.text}</div>
            </div>
        )
    } else {
        return (
            <div className="header">
                <div className="title">{props.text}</div>
            </div>
        )
    };
}