import React from 'react';
import Header from "../../base/Header";
import {useParams } from "react-router";
import { useState } from "react";
import axios from 'axios';
import ClothList from './ClothList';
import '../style/category.css';
import { useEffect } from 'react';

const CategoryList = () => {
    const detailCategory = ["상의", "하의", "겉옷", "신발", "악세서리"];
    const {season} = useParams();
    const [all, setAll] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [clothList, setClothList] = useState([]);
    const onClink = (e) => {
        setAll(true);
        setFilteredData(clothList.filter((cloth) => cloth.category === e.target.value));
    }

    useEffect(() => {
        axios.get(`/api/category/${season}`)
        .then(response => {
            setClothList(response.data);
            setFilteredData(response.data)
        })
        .catch(e => alert(e));
    }, []);
    

    const onChangeSelect = (e) => {
        const data = clothList.filter((cloth) => (cloth.partcategory === e.target.value))
        setFilteredData(data);
    }
    return(
        <>
            <Header mode />
            <div className='categoryBlock'>
              <h1 className='categoryTitle'>{`${season}`}</h1>
              <select onChange={onChangeSelect}>
                <option value=''>카테고리 선택</option>
                {detailCategory.map((category) => (
                    <option value={category}>{category}</option>
                ))}
            </select>
              <ClothList clothList={filteredData} />
            </div>
        </>
    );
};

export default CategoryList;