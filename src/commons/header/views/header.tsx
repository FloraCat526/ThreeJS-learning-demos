import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

export default () => {
    return (
        <header className="header-box">
            <div className="headLogo"></div>
            <ul className="navUlbox">
                <li>
                    <Link to="/home" className="navSubItem">主页</Link>
                </li>
                <li>
                    <a href="#" className="navItem">案例作品</a>
                    <ul className="subNavBox">
                        <li><Link to="/demo/threedemo2" className="navSubItem">demo1</Link></li>
                        <li><Link to='/demo/threedemo3' className="navSubItem">demo2</Link></li>
                    </ul>
                </li>
                <li>
                    <a href="#" className="navItem">关于我</a>
                </li>
            </ul>
        </header>
    );
};