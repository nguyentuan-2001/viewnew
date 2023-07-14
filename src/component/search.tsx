import React, { useState } from 'react';
import { Fade as Hamburger } from 'hamburger-react'
import './component.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const Search = () => {

    return(
        <div id='child__search' >
            <div id='input_search'>
                <input type="text" placeholder='Tìm kiếm tên khu vực'></input>
            </div>
            <div id='list__address'>
                <p>Tìm kiếm gần đây</p>
            </div>
        </div>
    )
}

export default Search