import React, { useContext, useEffect, useState } from "react";
import maplibregl, { LngLatLike, Map } from "maplibre-gl";
import '../css/component.css'
import 'maplibre-gl/dist/maplibre-gl.css';
import PathFinder from "geojson-path-finder";
import * as geolib from 'geolib';
import data from '../hust/data.json';
import distance from '@turf/distance';
import { point } from "@turf/helpers";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MapNew from "./mapnew";
import { MapContext } from "../contexts/tabnamecontext";
import { object3dcar1, object3dpeople } from "../map/object3d";
import { useTranslation } from "react-i18next";
const roads = require('../hust/bd.geojson');
library.add(fas);



const FindWay = () => {
    const { isMap, setIsMap } = useContext(MapContext)!;
    const {isNavigation, setIsNavigation} = useContext(MapContext)!; 
    const {isBlockNavigation, setIsBlockNavigation} = useContext(MapContext)!; 
    
    const [isDiBoLength, setIsDiBoLength] = useState<string | undefined>();
    const [isDiBoTime, setIsDiBoTime] = useState<string | undefined>();
    const {isHover, setIsHover} = useContext(MapContext)!;

    function resetSelectToDefault(selectElement: any) {
        selectElement.selectedIndex = 0; // Đặt lại thành phần được chọn đầu tiên
    }
    function closeNavigation(){
        setIsNavigation(true);
        setIsMap(true);
        setIsBlockNavigation(false);

        setStartValue('');
        setEndValue('');

        isCoordinate.setPaintProperty(`3d-building-${isHover}`, 'fill-extrusion-color', '#FFFFFF');
    };

    const options = data.features.map((feature) => feature.properties.name);
    const [listItem, setListItem] = useState(options);
    const {startValue, setStartValue} = useContext(MapContext)!;
    const {endValue, setEndValue} = useContext(MapContext)!;
    const {isCoordinate, setIsCoordinate} = useContext(MapContext)!; 

    function findPath(startPoint: number[], endPoint: number[], map: Map) {
        fetch(roads)
            .then((response) => response.json())
            .then((geojson) => {
    
            const start =  {
                latitude: startPoint[1],
                longitude: startPoint[0],
            };
            let minDistance = Infinity;
            let nearestPoint = null;
            
            const end =  {
                latitude: endPoint[1],
                longitude: endPoint[0],
            };
            let minDistance1 = Infinity;
            let nearestPoint1 = null;
            
            geojson.features.forEach((feature: any) => {
                const geometry = feature.geometry;
                if (geometry.type === 'LineString') {
                const lineString = geometry.coordinates;
                const closestPoint = geolib.findNearest(start, lineString) ;
                
                const distance = geolib.getDistance(start, closestPoint);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestPoint = closestPoint;
                }
                }
                const geometry1 = feature.geometry;
                if (geometry1.type === 'LineString') {
                const lineString1 = geometry1.coordinates;
                const closestPoint1 = geolib.findNearest(end, lineString1);
                const distance1 = geolib.getDistance(end, closestPoint1);
                if (distance1 < minDistance1) {
                    minDistance1 = distance1;
                    nearestPoint1 = closestPoint1;
                }
                }
            });
    
            if (nearestPoint && nearestPoint1){
                const pathFinder = new PathFinder(geojson);
                const startp = point(nearestPoint);
                const finish = point(nearestPoint1);
                const path = pathFinder.findPath(startp, finish);
    
                const calculatedDistance = distance(startp, finish,{ units: 'kilometers' } );
                const calculatedDistanceInMeters = calculatedDistance * 1000;
                 
                setIsBlockNavigation(true);

                setIsDiBoLength(`${calculatedDistanceInMeters.toFixed(2)} m`);
                const travelTimeInHours = calculatedDistance / 5; 
                const travelTimeInMinutes = travelTimeInHours * 60;
                setIsDiBoTime(`${travelTimeInMinutes.toFixed(2)} phút`);


                if (path) {
                    const pathSource = map.getSource('path') as any;
                    const coordinates = path.path;

                    //animation people on path
                    const pathLayer = map.getLayer('3d-model15') as any;
                    if (pathLayer) {
                        map.removeLayer('3d-model15');
                    }
                    const time = travelTimeInMinutes*60*1000/10;
                    const customLayer2= object3dcar1(map,coordinates, startPoint,time );
                    map.addLayer(customLayer2);
    
                    
                    if (pathSource) {
                        pathSource.setData({
                            type: 'Feature',
                            geometry: {
                            type: 'LineString',
                            coordinates: coordinates,
                            },
                        });
                    } else {
                        map.addSource('path', {
                            type: 'geojson',
                            data: {
                            type: 'Feature',
                            geometry: {
                                type: 'LineString',
                                coordinates: coordinates,
                            },
                            },
                        });
                        map.addLayer({
                            id: 'path-layer',
                            type: 'line',
                            source: 'path',
                            paint: {
                            'line-color': '#1D5D9B',
                            'line-opacity': 1,
                            'line-width': 4,
                            },
                        });
                        map.addLayer({
                            id: 'path-layer1',
                            type: 'line',
                            source: 'path',
                            paint: {
                            'line-color': '#6528F7',
                            'line-opacity': 0.5,
                            'line-width': 12,
                            },
                        });
                    }
                    // map.moveLayer('path-layer', 'home-layer');
                    // map.moveLayer('path-layer1', 'home-layer');
                    // map.moveLayer('path-layer', 'radar-layer');
                    map.moveLayer('path-layer1','3d-model15');
                    map.moveLayer('path-layer','3d-model15');
                    
                    const coordinateStart = [startPoint,nearestPoint];  
                    const checkStart = map.getSource('dasharray1') as any;
                    if(checkStart){
                        checkStart.setData({
                            type: 'Feature',
                            geometry: {
                            type: 'LineString',
                            coordinates: coordinateStart,
                            },
                        });
                    }else{
                        // đường nét đứt
                        map.addSource('dasharray1', {
                            type: 'geojson',
                            data: {
                                type: 'Feature',
                                geometry: {
                                type: 'LineString',
                                coordinates: coordinateStart,
                                },
                            },
                        });
                        map.addLayer({
                            id: 'dasharray1-id',
                            type: 'line',
                            source: 'dasharray1',
                            paint: {
                            'line-color': 'black',
                            'line-opacity': 1,
                            'line-width': 2,
                            'line-dasharray': [2, 1], // Thiết lập đường nét đứt
                            },
                        });
                    }
                    const coordinateEnd = [endPoint,nearestPoint1];  
                    const checkEnd = map.getSource('dasharray2') as any;
                    if(checkEnd){
                        checkEnd.setData({
                            type: 'Feature',
                            geometry: {
                            type: 'LineString',
                            coordinates: coordinateEnd,
                            },
                        });
                    }else{
                        // đường nét đứt
                        map.addSource('dasharray2', {
                            type: 'geojson',
                            data: {
                                type: 'Feature',
                                geometry: {
                                type: 'LineString',
                                coordinates: coordinateEnd,
                                },
                            },
                        });
                        map.addLayer({
                            id: 'dasharray2-id',
                            type: 'line',
                            source: 'dasharray2',
                            paint: {
                            'line-color': 'black',
                            'line-opacity': 1,
                            'line-width': 2,
                            'line-dasharray': [2, 1], // Thiết lập đường nét đứt
                            },
                        });
                    }
                } else {
                    console.error('Không tìm thấy đường đi.');
                }
            }
        })
        .catch((error) => {
            console.error('Lỗi khi tìm đường:', error);
        });
    }

    const searchPoint = (map: Map) => {
        const startResults = data.features.filter(function(feature) {
        return feature.properties.name.toLowerCase().includes(startValue.toLowerCase());
        });
    
        const endResults = data.features.filter(function(feature) {
        return feature.properties.name.toLowerCase().includes(endValue.toLowerCase());
        });
    
        var startPoint = startResults[0]?.geometry.coordinates;
        console.log('Điểm bắt đầu:', startPoint);
        var endPoint = endResults[0]?.geometry.coordinates;
        console.log('Điểm kết thúc:', endPoint);
    
        const center = startPoint as maplibregl.LngLatLike;
        map.setCenter(center);
        map.setZoom(17.5);
        findPath(startPoint, endPoint, map);
    }
    const handleSwap = () => {
        // Đổi giá trị các select khi nhấn nút "Swap"
        const tempValue = startValue;
        setStartValue(endValue);
        setEndValue(tempValue);
    };
    

    useEffect(() => {
        const map = isCoordinate;
        if (startValue && endValue) {
          searchPoint(map);
        }
    }, [startValue, endValue]);
    
    const {isOpenHeader, setIsOpenHeader} = useContext(MapContext)!;
    const {t} = useTranslation();
  
  return (
        <div id='navigation' style={{transform: isNavigation ? 'translateX(-200%)' : (isOpenHeader ? 'none' : 'translateX(-60%)')}}>
            <div id='close__detail' onClick={closeNavigation} >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
            </div>
            <MapNew/>
            <div id='all__select'>
                <div id='select__address'>
                    <div className='icon__select1'>
                        <span><FontAwesomeIcon icon="crosshairs" /></span>           
                        <select className="form-control form-control" id="start-street" value={startValue} onChange={(e) => setStartValue(e.target.value)}>
                            <option value="">
                                {t('direction.placeholder start')}
                            </option>
                            {listItem.map((name, index) => (
                                <option key={index} value={name}>
                                {name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='icon__select2'>
                        <span><FontAwesomeIcon icon="map-marker-alt" /></span>  
                        <select className="form-control input-solid" id="end-street" value={endValue} onChange={(e) => setEndValue(e.target.value)} >
                            <option value="">
                                {t('direction.placeholder end')}
                            </option>
                            {listItem.map((name, index) => (
                                <option key={index} value={name}>
                                {name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div id='dots'>
                        <p></p>
                        <p></p>
                        <p></p>
                    </div>
                    <div id='repeart' onClick={handleSwap}>
                        <img src="../images/repeart.png" alt="" />
                    </div>
                </div>
            </div>

            <div id='navigation__child' style={{display: isBlockNavigation ? 'block' : 'none'}}>
                <hr />
                    
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="dibo" role="tabpanel" aria-labelledby="pills-dibo">
                        <div className='if-length'>
                            <div className="row">
                                <div className="col-2">
                                    <div id='img_dibo'><img src="../images/dibo.png" alt="" /></div>
                                </div>
                                <div className="col-5">
                                    <span>Đi thẳng</span>
                                </div>
                                <div className="col-5">
                                    <div id='length'>
                                        <b id='length_dibo'>{isDiBoLength}</b>
                                        <p id='time_dibo'>{isDiBoTime}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

  )
}

export default FindWay