package com.sapo.edu.mapper.dto;

import com.sapo.edu.dto.ProductDTO;
import com.sapo.edu.entity.Product;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Component
public class ProductDTOMapper {
    @Autowired
    private ModelMapper mapper;

    public ProductDTO toProductDTO(Product product) {
        DecimalFormat df = new DecimalFormat("#,###.00");
        df.setDecimalFormatSymbols(new DecimalFormatSymbols(Locale.getDefault()));
        TypeMap<Product, ProductDTO> propertyMapper = mapper.getTypeMap(Product.class, ProductDTO.class) == null ? mapper.createTypeMap(Product.class, ProductDTO.class) : mapper.getTypeMap(Product.class, ProductDTO.class);
        propertyMapper.addMappings(mapper -> {
            mapper.map(src -> src.getCategory().getName(), ProductDTO::setCategory);
            mapper.using(context -> df.format(((BigDecimal) context.getSource()))) // using converter
                    .map(Product::getPrice, ProductDTO::setPrice);
        });
        return mapper.map(product, ProductDTO.class);
    }

    public List<ProductDTO> toProductDTOs(List<Product> products) {
        return products.stream().map(this::toProductDTO).collect(Collectors.toList());
    }
}
