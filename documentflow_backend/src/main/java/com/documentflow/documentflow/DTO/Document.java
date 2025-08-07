package com.documentflow.documentflow.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Document {
    private String title;
    private  String fileUrl;
    private String description;
    private String userName;
}
