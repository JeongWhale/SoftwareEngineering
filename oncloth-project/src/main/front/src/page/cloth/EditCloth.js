import React, { useEffect } from 'react';
import Button from "../../base/Button";
import logo from "../../base/소공로고.jpg";
import {useState} from "react";
import {Link} from "react-router-dom"
import { useNavigate, useParams } from "react-router";
import style from "../style/EditCloth.css";
import TextField from '@mui/material/TextField';
import axios from "axios";

const EditCloth = () => {

    const [currentCustomCategory, setCurrentCustomCategory] = useState([]);
    axios.get("/api/customcategory/list/")
    .then(response => setCurrentCustomCategory(response.data))
    .catch(e => alert(e));


    const [inputImg, setInputImg] = useState(''); //미리보기
    const [seasonCategory, setSeasonCategory] = useState("spring");
    const [partCategory, setPartCategory] = useState("상의");
    const [inputCustomCategory, setCustomCategory] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(() => {
        axios.get(`/api/cloth/read/${id}`)
        .then(response => {
            setSeasonCategory(response.data.seasoncategory);
            setPartCategory(response.data.partcategory);
            setCustomCategory(response.data.customcategory);
            setLocation(response.data.location);
            setDescription(response.data.description);
            setInputImg(response.data.imagepath);
        })
        .catch(e => alert(e));
    }, []);
    
    
    const onChangeSeasonCategory = (e) => {
        setSeasonCategory(e.target.value);
    }
    const onChangePartCategory = (e) => {
        setPartCategory(e.target.value);
    }
    const onChangeCustomCategory = (e) => {
        setCustomCategory(e.target.value);
    }
    const onChangeLocation = (e) => {
        setLocation(e.target.value);
    }
    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const encodeFileToBase64 = (e, fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) =>{
            reader.onload= () => {
                setInputImg(reader.result);
                resolve();
            }
        });
    }

    const onSubmitCloth = (e) => {
        e.preventDefault();
        const data = {
            seasoncategory: seasonCategory,
            partcategory: partCategory,
            customcategory: inputCustomCategory,
            location: location,
            description: description
        }
        axios.post(`/api/cloth/modify/${id}`, data, {
            headers: {
                "Content-Type":"application/json",
            }

        })
        .then(response => {
            console.log(response);
            alert(`의류가 수정 되었습니다!`);
            navigate(-1);
        })
        .catch(e => console.log(e));
    }
    return(
        <div className="addCloth">
            <main className="addClothBox">
                <header className="addClothHeader">
                    <Link to = "/"><img src={logo} alt="logo" /></Link>
                    <h1>옷 편집하기</h1>
                </header>
                <form onSubmit={onSubmitCloth} className="addClothForm">
                    <div className="addClothFormInput">
                        <div className="addClothFormLeft">
                            <div style={{"display": "flex"}} className="imgPreview">
                                {inputImg?
                                    <img style={{"height": "20rem"}} src={inputImg} alt="imgpreview" />
                                    :
                                    <div style={{"height": "10rem",
                                        "backgroundColor": "beige",
                                        "display": "flex",
                                        "justifyContent": "center",
                                        "alignItems": "center",
                                        "fontWeight": 600,
                                        "width": "100%"}}>이미지 미리보기</div>}
                            </div>
                            <div>
                                <select onChange={onChangeSeasonCategory} className="addClothSelect" value={seasonCategory}>
                                    <option value="spring">봄</option>
                                    <option value="summer">여름</option>
                                    <option value="autumn">가을</option>
                                    <option value="winter">겨울</option>
                                </select>
                                <select onChange={onChangePartCategory} className="addClothSelect" value={partCategory}>
                                    <option value="상의">상의</option>
                                    <option value="하의">하의</option>
                                    <option value="겉옷">겉옷</option>
                                    <option value="신발">신발</option>
                                    <option value="악세서리">악세서리</option>
                                </select>
                            </div>
                        </div>
                        <div className="addClothFormRight">
                            <input onChange={onChangeLocation} value={location} type="text" placeholder="위치를 입력해주세요"/>
                            <textarea onChange={onChangeDescription} value={description} name="" id="" cols="20" rows="10" placeholder="상세정보를 입력해주세요"></textarea>
                            <select className="addClothSelect" onChange={onChangeCustomCategory} name="" id=""  value={inputCustomCategory}>
                                <option >--개인카테고리 선택--</option>
                                {currentCustomCategory.map((category) => (
                                    <option key={category.name} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="addClothFormButton">
                        <Button type="submit">편집</Button>
                        <Link to = "/"><Button>취소</Button></Link>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default EditCloth;