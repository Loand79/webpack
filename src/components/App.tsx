import {useState} from 'react';
import classes from './App.module.scss';
import {Link, Outlet} from "react-router-dom";
import avatarPNG from '../assets/spider.png';
import avatarJPEG from '../assets/[eq.jpg';
import Cross from '../assets/cross.svg';

export const App = () => {

    const [count, setCount] = useState<number>(0);

    const increment = () => setCount(prev => prev + 1)

    // if (__PLATFORM__ === 'desktop') {
    //     return <div>ITSDESTOPPLATFORM</div>
    // }
    //
    // if (__PLATFORM__ === 'mobile') {
    //     return <div>ITSMOBILEPLATFORM</div>
    // }

    return (
        <div>
            <h1>PLATFORM={__PLATFORM__}</h1>
            <div>
                <img width={100} height={100} src={avatarPNG} alt=""/>
                <img width={100} height={100} src={avatarJPEG} alt=""/>
                <Cross width={100} height={100} />
            </div>
            <Link to={'/about'}>about</Link>
            <br/>
            <Link to={'/shop'}>shop</Link>
            <h1>{count}</h1>
            <button className={classes.button} onClick={increment}><span>button</span></button>
            <Outlet />
        </div>
    );
};
