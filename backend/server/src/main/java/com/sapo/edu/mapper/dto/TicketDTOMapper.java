package com.sapo.edu.mapper.dto;

import com.sapo.edu.dto.TicketDTO;
import com.sapo.edu.entity.Customer;
import com.sapo.edu.entity.Employee;
import com.sapo.edu.entity.Motorbike;
import com.sapo.edu.entity.Ticket;
import com.sapo.edu.entity.connectentity.TicketProduct;
import com.sapo.edu.entity.connectentity.TicketService;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class TicketDTOMapper {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private MotorbikeDTOMapper motorbikeDTOMapper;
    @Autowired
    private CustomerDTOMapper customerDTOMapper;
    @Autowired
    private EmployeeDTOMapper employeeDTOMapper;
    @Autowired
    private TicketServiceDTOMapper ticketServiceDTOMapper;
    @Autowired
    private TicketProductDTOMapper ticketProductDTOMapper;

    public TicketDTO toTicketDTO(Ticket ticket) {
        TypeMap<Ticket, TicketDTO> propertyMapper = modelMapper.getTypeMap(Ticket.class, TicketDTO.class) == null ? modelMapper.createTypeMap(Ticket.class, TicketDTO.class) : modelMapper.getTypeMap(Ticket.class, TicketDTO.class);
        Converter<Byte, String> statusConverter = context -> {
            Byte status = context.getSource();
            switch (status) {
                case -1:
                    return "Đã huỷ";
                case 0:
                    return "Đang sửa";
                case 1:
                    return "Hoàn thành";
                default:
                    return "Unknown status";
            }
        };
        propertyMapper.addMappings(mapper -> {
            mapper.using(statusConverter).map(Ticket::getStatus, TicketDTO::setStatus);
            mapper.using(context -> motorbikeDTOMapper.toMotorbikeDTO((Motorbike) context.getSource())).map(Ticket::getMotorbike, TicketDTO::setMotorbike);
            mapper.using(context -> customerDTOMapper.toCustomerDTO((Customer) context.getSource())).map(Ticket::getCustomer, TicketDTO::setCustomer);
            mapper.using(context -> employeeDTOMapper.toEmployeeDTO((Employee) context.getSource())).map(Ticket::getRepairingEmployee, TicketDTO::setRepairingEmployee);
            mapper.using(context -> ticketProductDTOMapper.toTicketProductDTOs((Set<TicketProduct>) context.getSource())).map(Ticket::getTicketsProducts, TicketDTO::setProducts);
            mapper.using(context -> ticketServiceDTOMapper.toTicketServiceDTOs((Set<TicketService>) context.getSource())).map(Ticket::getTicketsServices, TicketDTO::setServices);
        });
        return this.modelMapper.map(ticket, TicketDTO.class);
    }

    public List<TicketDTO> toTicketDTOs(List<Ticket> tickets) {
        return tickets.stream().map(this::toTicketDTO).collect(Collectors.toList());
    }
}
