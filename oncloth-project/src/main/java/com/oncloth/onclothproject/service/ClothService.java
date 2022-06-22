package com.oncloth.onclothproject.service;

import com.oncloth.onclothproject.dto.ClothDto;
import com.oncloth.onclothproject.model.Cloth;
import com.oncloth.onclothproject.model.ClothModify;
import com.oncloth.onclothproject.repository.ClothRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Optional;
import java.util.UUID;

@Service
public class ClothService {

    @Autowired
    private ClothRepository clothRepository;

    public Cloth create(ClothDto clothDto,MultipartFile file) throws Exception{

        UUID uuid = UUID.randomUUID();
        String filename = uuid + "_" + file.getOriginalFilename();

        String projectPath = System.getProperty("user.dir") + "/src/main/resources/static/files";
        File saveFile = new File(projectPath,filename);

        clothDto.setImagename(filename);
        clothDto.setImagepath("/files/"+filename);
        clothDto.setTrashbin(false);

        file.transferTo(saveFile);

        Cloth cloth1 = clothRepository.save(new Cloth(clothDto));
        return cloth1;
    }

    public Optional<Cloth> read(Long id){
        Optional<Cloth> savedCloth = clothRepository.findById(id);
        return savedCloth;
    }
    public Optional<Cloth> update(Long id, ClothModify clothModify){
        Optional<Cloth> originalcloth = clothRepository.findById(id);

//        //create new image info // *파일 수정관련
//        UUID uuid = UUID.randomUUID();
//        String filename = uuid + "_" + file.getOriginalFilename();
//
//        String projectPath = System.getProperty("user.dir") + "/src/main/resources/static/files";
//        File saveFile = new File(projectPath,filename);

        //modify new to original
        originalcloth.ifPresent(u -> {
            u.setSeasoncategory(clothModify.getSeasoncategory());
            u.setPartcategory(clothModify.getPartcategory());
            u.setCustomcategory(clothModify.getCustomcategory());
            u.setLocation(clothModify.getLocation());
            u.setDescription(clothModify.getDescription());
//            u.setImagename(filename); // *파일 수정관련
//            u.setImagepath("/files/"+filename);
            clothRepository.save(u);
        });

        return originalcloth;
    }
    public void delete(Long id){
        Optional<Cloth> originalcloth = clothRepository.findById(id);
        originalcloth.ifPresent(o->{
            o.setTrashbin(true);
            clothRepository.save(o);
        });
    };

}