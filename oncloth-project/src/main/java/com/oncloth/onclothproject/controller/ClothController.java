package com.oncloth.onclothproject.controller;


import com.oncloth.onclothproject.dto.ClothDto;
import com.oncloth.onclothproject.model.Cloth;
import com.oncloth.onclothproject.model.ClothModify;
import com.oncloth.onclothproject.service.ClothService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.Option;
import java.util.Optional;

@RestController
public class ClothController {

    @Autowired
    private ClothService clothService;


    //의류 객체 생성
    @PostMapping("api/cloth/create")
    public Cloth create(ClothDto clothDto, @RequestParam("file") MultipartFile file) throws Exception {
        return clothService.create(clothDto, file);
    }


    //옷 상세조회
    @GetMapping("api/cloth/read/{id}")
    public Optional<Cloth> read(@PathVariable("id") Long id) {
        //아이디로 찾은 객체 전달
        return clothService.read(id);
    }

    //옷 수정페이지에서 수정확인 버튼 클릭
    @PostMapping("/api/cloth/modify/{id}")
    public Optional<Cloth> update(@PathVariable("id") Long id, @RequestBody ClothModify clothModify) {
        return clothService.update(id, clothModify);
    }

    //옷 상세페이지에서 삭제버튼 클릭
    //헌옷수거함 이동
    @GetMapping("api/cloth/delete/{id}")
    public void delete(@PathVariable("id") Long id) {
        clothService.delete(id);
    }
}
