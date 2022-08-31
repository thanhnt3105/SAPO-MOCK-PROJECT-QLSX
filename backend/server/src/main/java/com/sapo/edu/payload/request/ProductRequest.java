package com.sapo.edu.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
    @NotBlank
    @Size(max = 100)
    private String name;
    @Size(max = 1024)
    private String description;
    @NotNull
    private Long categoryId; // must need category before
    @NotNull
    private BigDecimal price;
    private Integer quantity = 0;
    @Size(max = 512)
    private String image;
}
