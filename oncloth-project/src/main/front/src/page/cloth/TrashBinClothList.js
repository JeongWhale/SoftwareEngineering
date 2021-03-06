import axios from 'axios';
import React from 'react';
import Button from "../../base/Button";

const TrashBinClothList = ({clothList}) => {
    const onClickDelete = (e, id) => {
        e.preventDefault();
        axios.post(`/api/trashbin/remove/${id}`).then(
            response => {
                alert("영구삭제되었습니다.")
                window.location.reload();
            }
        );
        
    }
    const onClickRestore = (e, id) => {
        e.preventDefault();
        axios.post(`/api/trashbin/restore/${id}`).then(
            response => {
                alert("복원되었습니다");
                window.location.reload();
                }
        );
    }
    return(
        <div>
            {clothList.map((cloth) => (
                <div>
                    <h1>{cloth.description}</h1>
                    <Button onClick={(e) => onClickDelete(e, cloth.id)}>영구삭제</Button>
                    <Button onClick={(e) => onClickRestore(e, cloth.id)}>복원하기</Button>
                </div>
            ))}
        </div>
    );
}

export default TrashBinClothList;