import React, { useContext, useEffect, useState } from "react";
import '../css/component.css'
import 'maplibre-gl/dist/maplibre-gl.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from "react-i18next";
import { MapContext } from "../contexts/tabnamecontext";
import 'maplibre-gl/dist/maplibre-gl.css';
import data from '../hust/data.json';
import { searchAddress, updateSuggestions } from "../map/search";
import maplibregl, { Map, Marker } from 'maplibre-gl';
import MapNew from "./mapnew";
import { showLocationDetail } from "../map/showinformation";
library.add(fas);

const Search = () => {
    const { isMap, setIsMap } = useContext(MapContext)!;
    const { isSearch, setIsSearch } = useContext(MapContext)!;
    const {isHover, setIsHover} = useContext(MapContext)!;
    const {isCoordinate, setIsCoordinate} = useContext(MapContext)!;  
    const {isOpenHeader, setIsOpenHeader} = useContext(MapContext)!;
    
    const closeSearch = () => {
        setIsSearch(true);
        setIsMap(true);
        if(isHover){
            isCoordinate.setPaintProperty(`3d-building-${isHover}`, 'fill-extrusion-color', '#FFFFFF');
        }
    };
    const {t} = useTranslation();
    searchAddress(isCoordinate);
    function getBounds(features: any[]) {
        const bounds = new maplibregl.LngLatBounds();
        features.forEach((feature: any) => {
          bounds.extend(feature.geometry.coordinates);
        });
        return bounds;
    }

    function searchAddress(map: Map){
        const searchInput = document.getElementById('search__address') as HTMLInputElement;
        if(searchInput){
            searchInput.addEventListener('change', () => {
                const searchText = searchInput.value;
                const allAddress = data.features.filter((feature: any) => {
                  return feature.properties.name.toLowerCase().includes(searchText.toLowerCase());
                });
            
                if (allAddress.length > 0) {
                  const firstAddress = allAddress[0];
                  const lngLat: [number, number] = firstAddress.geometry.coordinates as [number, number];
                  map.setCenter(lngLat);
                  map.setZoom(18);
                  map.fitBounds(getBounds(allAddress), {
                    padding: 100
                  });
                  
                  showLocationDetail(firstAddress);
                }
            });
        }
    }
   
    const searchInput = document.getElementById("search__address") as HTMLInputElement;
      if (searchInput) {
        searchInput.addEventListener("input", () => {
          const searchText = searchInput.value;
          const suggestions = data.features.filter(function (feature) {
            return feature.properties.name
              .toLowerCase()
              .includes(searchText.toLowerCase());
          });
          updateSuggestions(suggestions, isCoordinate);
        });
    }

  return (
    <div id='search' style={{transform: isSearch ? 'translateX(-300%)' : (isOpenHeader ? 'none' : 'translateX(-60%)')}}>
        <div id='close__detail' onClick={closeSearch} >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
        </div>

        <div>
            <div id='input_search'>
                <div id='border_input_search'></div>
                <input type="text" placeholder={t('search.placeholder')} id='search__address'/>
            </div>
            <div id='history__search'>
                <p>{t('search.recent')}</p>
                <p> <FontAwesomeIcon icon="clock" /> Cổng bắc</p>
            </div>
            <div id='list__address'>
                <p>{t('search.suggest')}</p>
                <ul id="suggestions-list"></ul>
            </div>
        </div>
    </div>

  )
}

export default Search