package com.documentflow.documentflow.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class ApproveOrRejectRequest {
    private String userName;
    private String comment;
}
