package com.oncloth.onclothproject.model;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Id;

@Getter
@Setter
@NoArgsConstructor
public class ClothModify {

    @Id
    private Long id;
    private String seasoncategory;
    private String partcategory;
    private String customcategory;
    private String location;
    private String description;

    public ClothModify(Long id, String seasoncategory,String partcategory,String customcategory,String location,String description) {
        this.id = id;
        this.seasoncategory = seasoncategory;
        this.partcategory = partcategory;
        this.customcategory = customcategory;
        this.location = location;
        this.description = description;
    }
}
