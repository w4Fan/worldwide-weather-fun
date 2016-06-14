import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Header from './Header';

export default function Intro() {
    return (
        <div className="view has-header" ref="view">
            <Header text="Intro" back />
            <div className="page">
                <dl>
                    <dt>author:</dt>
                    <dd>w.Fan</dd>
                    <dt>server:</dt>
                    <dd>
                        <p>nodejs</p>
                        <p>express</p>
                    </dd>
                    <dt>dependencies:</dt>
                    <dd>
                        <p>react</p>
                        <p>react-router</p>
                    </dd>
                    <dt>api support:</dt>
                    <dd><a href="//http://openweathermap.org/">openweathermap</a></dd>
                </dl>
            </div>
        </div >
    )
}