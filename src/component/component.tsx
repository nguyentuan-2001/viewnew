import React, { useState } from 'react';
import { Fade as Hamburger } from 'hamburger-react'
import './component.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Tabname from './tabname';
import Detail from './detail';
import Search from './search';

const Navbar: React.FC = () => {
    const [isOpen, setOpen] = useState(false);

    const [backgroundColor, setBackgroundColor] = useState('#eac870');
    const [isClicked, setIsClicked] = useState(true);
    const [menu, setMenu] = useState('MENU');
    const [isTransformed, setIsTransformed] = useState(true); 
    const [opacityList, setopacityList] = useState('0');
    const [isClose, setIsClose] = useState(true); 
    const [isCloseSearch, setIsCloseSearch] = useState(false); 

    const handleClick = () => {
        if (isClicked) {
            setBackgroundColor('#4f4f4f'); 
            setIsClicked(false);
            setMenu('CLOSE');
            setIsTransformed(false);
            setopacityList('1');
        } else {
            setBackgroundColor('#eac870');
            setIsClicked(true);
            setMenu('MENU');
            setIsTransformed(true);
            setopacityList('0');
        }
        const divElements = document.querySelectorAll<HTMLElement>('.hamburger-react div');
        divElements.forEach((divElement) => {
            if(isClicked){
                divElement.style.background = 'white';
            }else{
                divElement.style.background = 'black';
            }   
        });
    };

    const [activeLink, setActiveLink] = useState<string>('');
    const openList = (link: string) => {
        setActiveLink(link);
    };

    const closeDetail = () => {
        setIsClose(true);
    };
    const closeSearch = () => {
        setIsCloseSearch(true);
    };

    return(
        <div className="all__map">
            <div className="left__panel">
                <div id='icon__close' onClick={handleClick} style={{ backgroundColor }}>
                    <Hamburger toggled={isOpen} toggle={setOpen} />
                    <p>{menu}</p>
                </div>

                <div id='list_a' style={{opacity: opacityList}}>
                    <a style={{ color: activeLink === 'map' ? 'black' : '#bdbdbd' } }
                        onClick={() => openList('map')}
                        href='#'>
                        BẢN ĐỒ
                    </a>
                    <br /><br />
                    <a style={{ color: activeLink === 'list' ? 'black' : '#bdbdbd' } }
                        onClick={() => openList('list')}
                        href='#'>
                        DANH SÁCH
                    </a>
                    <br /><br />
                    <a style={{ color: activeLink === 'search' ? 'black' : '#bdbdbd' }}
                        onClick={() => openList('search')}
                        href='#' >
                        TÌM KIẾM
                    </a>
                    <br /><br />
                    <a style={{ color: activeLink === 'navigation' ? 'black' : '#bdbdbd' }}
                        onClick={() => openList('navigation')}
                        href='#' >
                        CHỈ ĐƯỜNG
                    </a>
                </div>

                <div id='logo'>
                    <img src="./images/logo.png" alt="" />
                </div>
                <div id='line_image'></div>
                <div id='logo__digiuni'>
                    <img src="./images/digiuni.png" alt="" />
                </div>
            </div>
            <div className="main__map">
                <div id="map" />
            </div>
            
            <div id='show__name' style={{transform: isTransformed ? 'translateX(-200%)' : 'none'}}>
                <Tabname/>
            </div>
            <div id='detail' style={{transform: isClose ? 'translateX(-200%)' : 'none'}}>
                <div id='close__detail' onClick={closeDetail} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                </div>
                <Detail/>
            </div>
            <div id='search' style={{transform: isCloseSearch ? 'translateX(-200%)' : 'none'}}>
                <div id='close__detail' onClick={closeSearch} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                </div>
                <Search/>
            </div>
        </div>
    )
}

export default Navbar