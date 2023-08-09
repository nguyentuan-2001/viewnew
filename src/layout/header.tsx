import React, { useContext, useEffect, useState } from "react";
import '../css/component.css'
import 'maplibre-gl/dist/maplibre-gl.css';
import { Fade as Hamburger } from 'hamburger-react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MapContext } from "../contexts/tabnamecontext";
import { useTranslation } from "react-i18next";

library.add(fas);

const Header = () => {
    const { isList, setIsList } = useContext(MapContext)!;
    const { isMap, setIsMap } = useContext(MapContext)!;
    const { isSearch, setIsSearch } = useContext(MapContext)!;
    const {isNavigation, setIsNavigation} = useContext(MapContext)!; 
    const {isClose, setIsClose} = useContext(MapContext)!; 
    const {isBlockNavigation, setIsBlockNavigation} = useContext(MapContext)!;
    const {startValue, setStartValue} = useContext(MapContext)!;
    const {endValue, setEndValue} = useContext(MapContext)!;
    const {isCoordinate, setIsCoordinate} = useContext(MapContext)!; 

    const openList = () => {
        setIsList(false);
        setIsNavigation(true);
        setIsSearch(true);
        setIsMap(false);
        setIsClose(true);
        setIsBlockNavigation(false);
        setStartValue('');
        setEndValue('');
    };

    const openNavigation = () => {
        setIsNavigation(false);
        setIsList(true);
        setIsSearch(true);
        setIsMap(false);
        setIsClose(true);
    };
    
    const openSearch = () => {
        setIsSearch(false);
        setIsNavigation(true);
        setIsList(true);
        setIsMap(false);
        setIsClose(true);
        setIsBlockNavigation(false);
        setStartValue('');
        setEndValue('');
    };

    const openMap = () => {
        setIsSearch(true);
        setIsNavigation(true);
        setIsList(true);
        setIsMap(true);
        setIsClose(true);
        setIsBlockNavigation(false);
        setStartValue('');
        setEndValue('');
    };
    
    
    const {isSwitchOn, setIsSwitchOn} = useContext(MapContext)!; 
    const {isOpenHeader, setIsOpenHeader} = useContext(MapContext)!; 

    const handleStyleChange = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    const openLeft = () =>{
        setIsOpenHeader(true)
    }
    const closeLeft = () =>{
        setIsOpenHeader(false)
    }

    const {t} = useTranslation();
    const {i18n} = useTranslation();
    const [isBooleanClick, setIsBooleanClick] = useState(true);
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsBooleanClick(!isBooleanClick);
    };

  return (
    <div style={{ height:'100%'}}>
        <div className="header_all">
            <div id="icon__open" onClick={openLeft} style={{display: isOpenHeader ? 'none' : 'block'}}>
                <FontAwesomeIcon icon="bars" />
            </div>
            <div className="left__panel" style={{transform: isOpenHeader ? 'none' : 'translateX(-200%)'}}>
                <div id="icon__close__header" onClick={closeLeft}>
                    <FontAwesomeIcon icon="arrow-left" />
                </div>
                <div id='logo__digiuni'>
                    <img src="./images/digiuni.png" alt="" />
                </div>
                <div id='line_image'></div>

                <div id='list_p'>
                    <p onClick={openMap} style={{ color: isMap ? 'black' : '#9e9c9c' }}><FontAwesomeIcon icon="map" /> {t('header.map')}</p>
                    <p onClick={openList} style={{ color: isList ? '#9e9c9c' : 'black' }}><FontAwesomeIcon icon="map-marked-alt" /> {t('header.area')}</p>
                    <p onClick={openSearch} style={{ color: isSearch ? '#9e9c9c' : 'black' }}><FontAwesomeIcon icon="search" />  {t('header.search')}</p>
                    <p onClick={openNavigation}  style={{ color: isNavigation ? '#9e9c9c' : 'black' }}><FontAwesomeIcon icon="directions" />  {t('header.direction')}</p>
                </div>

                <div id='logo'>
                    <img src="./images/logo.png" alt="" />
                </div>
                <div id="input_onoff">
                    <label className="switch">
                        <input type="checkbox" checked={isSwitchOn} onChange={handleStyleChange} />
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="language">
                    <div className="en" style={{borderColor: isBooleanClick ? 'black': '#E34A66', color: isBooleanClick ? 'black': '#E34A66'}}>
                        <span onClick={() => changeLanguage('en')}>EN</span>
                    </div>
                    <div className="vi" style={{borderColor: isBooleanClick ? '#E34A66': 'black', color: isBooleanClick ? '#E34A66': 'black'}}>
                        <span onClick={() => changeLanguage('vi')}>VN</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="language_mobile">
            <img src="../images/digiuni.png" alt="" />
            <div>
                <div className="en" style={{borderColor: isBooleanClick ? 'black': '#E34A66', color: isBooleanClick ? 'black': '#E34A66'}}>
                    <span onClick={() => changeLanguage('en')}>EN</span>
                </div>
                <div className="vi" style={{borderColor: isBooleanClick ? '#E34A66': 'black', color: isBooleanClick ? '#E34A66': 'black'}}>
                    <span onClick={() => changeLanguage('vi')}>VN</span>
                </div>
            </div>
        </div>

        <div className="header_all_mobile">
            <ul id="ul_list_mobile" >
                <li><div onClick={openMap} style={{ color: isMap ? 'black' : '#9e9c9c' }}><FontAwesomeIcon icon="map" /><p> {t('header.map')}</p></div></li>
                <li><div onClick={openList} style={{ color: isList ? '#9e9c9c' : 'black' }}><FontAwesomeIcon icon="map-marked-alt" /><p> {t('header.area')}</p></div></li>
                <li><div onClick={openSearch} style={{ color: isSearch ? '#9e9c9c' : 'black' }}><FontAwesomeIcon icon="search" /><p>  {t('header.search')}</p></div></li>
                <li><div onClick={openNavigation}  style={{ color: isNavigation ? '#9e9c9c' : 'black' }}><FontAwesomeIcon icon="directions" /> <p> {t('header.direction')}</p></div></li>
            </ul>
        </div>
    </div>
   
  )
}

export default Header