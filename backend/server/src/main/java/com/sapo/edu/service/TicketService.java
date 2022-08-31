package com.sapo.edu.service;

import com.sapo.edu.entity.Ticket;
import com.sapo.edu.payload.request.TicketRequest;
import com.sapo.edu.service.base.BaseService;

public interface TicketService extends BaseService<Ticket> {
    public Ticket save(TicketRequest ticketRequest);

    public Ticket updateById(Long id, TicketRequest newTicketRequest);
}
