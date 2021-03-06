import React from 'react';
import { useState, useEffect } from "react";
import Button from "../../base/Button";
import style from "../style/MainPage.css";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';

const styled = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid rgba(0,0,0,0.4)',
    boxShadow: 24,
    p: 4,
};

const CustomCategoryList = () => {
    const [CustomCategories, setCustomCategories] = useState([]);
    const [editCustomCategory, setEditCustomCategory] = useState("");
    const [id, setId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/api/customcategory/list/")
        .then(response => {
            setCustomCategories(response.data);
        })
        .catch(e => alert(e));
    }, [])


    const [newCustomCategory, setNewCustomCategory] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [editOpen, setEditOpen] = useState(false);
    const handleEditOpen = (category) => {
        setEditOpen(true);
        setEditCustomCategory(category.name);
        setId(category.id);
    }
    const handleEditClose = () => setEditOpen(false);

    const onChangeEditCustomCategory = (e) => {
        setEditCustomCategory(e.target.value);
    }

    const onSubmitEditCustomCategory = (e) => {
        e.preventDefault();
        axios.post(`/api/customcategory/${id}/update/`, {name: editCustomCategory})
        .then(response => console.log(response))
        .catch(e => alert(e));
        window.location.reload();
    }

    const onClickRemoveCategory = (e, category) => {
        e.preventDefault();
        axios.post(`/api/customcategory/${category.id}/remove/`)
        .then(response => console.log(response))
        .catch(e => alert(e));
        window.location.reload();
    }

    const onChangeNewCustomCategory = (e) => {
        setNewCustomCategory(e.target.value);
    }
    const onSubmitNewCustomCategory = (e) => {
        e.preventDefault();
        const data = {
            name: newCustomCategory
        };
        axios.post("/api/customcategory/create/", data)
        .then(response => {
            alert("??????????????? ?????????????????????!");
            window.location.reload();
        })
        .catch(e => alert(e));

    }
    return (
        <div style={{"margin": "1rem 5rem",}}>
            <Button onClick={handleOpen} style={{"margin-left": "5rem"}}>my style ??????</Button>
            <div className="MyStyleList">
                {CustomCategories.map((category, index) => 
                (<div className='myStyleListBlock'>
                    <Link to={`/customcategory/${category.id}`}>
                        <button className='customButton' key={index}>
                        <span style={{"fontSize": "1.5rem", "fontWeight": "500"}}>{category.name}</span>
                        </button>
                    </Link>
                    <div style={{"display": "flex"}}>
                        <button className='myStylebutton' onClick={() => (handleEditOpen(category))}>??????</button>
                        <button className='myStylebutton' onClick={(e) => onClickRemoveCategory(e, category)}>??????</button>
                    </div>
                </div>))}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styled}>
                    <input value={newCustomCategory} onChange={onChangeNewCustomCategory} type="text" placeholder="???????????? ????????? ??????????????????"/>
                    <Button onClick={onSubmitNewCustomCategory}>??????</Button>
                </Box>
            </Modal>

            <Modal
                open={editOpen}
                onClose={handleEditClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styled}>
                    <input value={editCustomCategory} onChange={onChangeEditCustomCategory} type="text" placeholder="???????????? ????????? ??????????????????"/>
                    <Button onClick={onSubmitEditCustomCategory}>??????</Button>
                </Box>
            </Modal>
        </div>
    );
};

export default CustomCategoryList;