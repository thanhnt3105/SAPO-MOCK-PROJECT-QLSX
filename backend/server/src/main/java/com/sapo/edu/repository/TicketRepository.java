package com.sapo.edu.repository;

import com.sapo.edu.entity.Ticket;
import com.sapo.edu.repository.base.BaseRepository;

public interface TicketRepository extends BaseRepository<Ticket, Long> {
    boolean existsByCode(String code);
}
