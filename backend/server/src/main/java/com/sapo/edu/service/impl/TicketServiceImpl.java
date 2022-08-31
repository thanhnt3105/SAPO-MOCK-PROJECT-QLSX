package com.sapo.edu.service.impl;

import com.sapo.edu.entity.Ticket;
import com.sapo.edu.entity.compositekey.TicketProductId;
import com.sapo.edu.entity.compositekey.TicketServiceId;
import com.sapo.edu.entity.connectentity.TicketProduct;
import com.sapo.edu.entity.connectentity.TicketService;
import com.sapo.edu.exception.EntityNotFoundException;
import com.sapo.edu.mapper.dto.TicketDTOMapper;
import com.sapo.edu.mapper.request.TicketProductRequestMapper;
import com.sapo.edu.mapper.request.TicketRequestMapper;
import com.sapo.edu.mapper.request.TicketServiceRequestMapper;
import com.sapo.edu.payload.request.TicketRequest;
import com.sapo.edu.repository.TicketRepository;
import com.sapo.edu.repository.connect.TicketProductRepository;
import com.sapo.edu.repository.connect.TicketServiceRepository;
import com.sapo.edu.service.base.impl.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
public class TicketServiceImpl extends BaseServiceImpl<Ticket> implements com.sapo.edu.service.TicketService {
    @Autowired
    private TicketRequestMapper requestMapper;
    @Autowired
    private TicketProductRequestMapper ticketProductRequestMapper;
    @Autowired
    private TicketServiceRequestMapper ticketServiceRequestMapper;
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private TicketProductRepository ticketProductRepository;
    @Autowired
    private TicketServiceRepository ticketServiceRepository;
    @Autowired
    private TicketDTOMapper dtoMapper;

    protected TicketServiceImpl(TicketRepository ticketRepository) {
        super(ticketRepository);
    }

    @Transactional
    public Ticket save(TicketRequest ticketRequest) {
        BigDecimal totalPrice = new BigDecimal(0); // sum not discount
        Ticket ticket = requestMapper.toNewTicket(ticketRequest);
        ticket.setTotalPrice(totalPrice); // for temporary
        ticket = ticketRepository.save(ticket); // to get new ticketId
        for (var item : ticketRequest.getProductRequestSet()) {
            TicketProduct ticketProduct = ticketProductRequestMapper.toTicketProduct(item);
            ticketProduct.setTicket(ticket);
            ticketProduct.setId(new TicketProductId(ticket.getId(), item.getProductId()));
            ticketProductRepository.save(ticketProduct);
            ticket.addProduct(ticketProduct);
        }
        for (var item : ticketRequest.getServiceRequestSet()) {
            TicketService ticketService = ticketServiceRequestMapper.toTicketService(item);
            ticketService.setTicket(ticket);
            ticketService.setId(new TicketServiceId(ticket.getId(), item.getServiceId()));
            ticketServiceRepository.save(ticketService);
            ticket.addService(ticketService);
        }
        totalPrice = ticket.getTicketsServices().stream().map(item -> item.getPrice()).reduce(new BigDecimal(0), BigDecimal::add);
        for (var item : ticket.getTicketsProducts())
            totalPrice.add(item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        ticket.setTotalPrice(totalPrice);
        return super.save(ticket);
    }

    /**
     * Delete old ticket and Create new ticket with the same code and ticketId => cost too much ???
     *
     * @param id
     * @param newTicketRequest
     * @return
     */
    public Ticket updateById(Long id, TicketRequest newTicketRequest) {
        Ticket oldEntity = ticketRepository.findById(id).orElseThrow(() -> new EntityNotFoundException(Ticket.class, "ticketId", id.toString()));
        this.deleteById(oldEntity.getId());
        Ticket newTicket = requestMapper.toNewTicket(newTicketRequest);
        // these field cannot update
        newTicket.setId(oldEntity.getId());
        newTicket.setCode(oldEntity.getCode());
        newTicket.setMotorbike(oldEntity.getMotorbike());
        for (var item : newTicketRequest.getProductRequestSet()) {
            TicketProduct ticketProduct = ticketProductRequestMapper.toTicketProduct(item);
            ticketProduct.setTicket(newTicket);
            ticketProductRepository.save(ticketProduct);
            newTicket.addProduct(ticketProduct);
        }
        for (var item : newTicketRequest.getServiceRequestSet()) {
            TicketService ticketService = ticketServiceRequestMapper.toTicketService(item);
            ticketService.setTicket(newTicket);
            ticketServiceRepository.save(ticketService);
            newTicket.addService(ticketService);
        }
        BigDecimal totalPrice; // sum not discount
        totalPrice = newTicket.getTicketsServices().stream().map(item -> item.getPrice()).reduce(new BigDecimal(0), BigDecimal::add).add(newTicket.getTicketsProducts().stream().map(item -> item.getPrice()).reduce(new BigDecimal(0), BigDecimal::add));
        newTicket.setTotalPrice(totalPrice);
        return this.save(newTicket);
    }

    @Override
    public Map<String, Object> findAllPaging(int page, int size) {
        Map<String, Object> response = super.findAllPaging(page, size);
        List<Ticket> tickets = (List<Ticket>) response.get("listOfItems");
        response.put("listOfItems", dtoMapper.toTicketDTOs(tickets));
        return response;
    }
}
