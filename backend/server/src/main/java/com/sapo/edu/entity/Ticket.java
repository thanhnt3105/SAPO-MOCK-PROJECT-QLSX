package com.sapo.edu.entity;

import com.sapo.edu.entity.base.BaseEntity;
import com.sapo.edu.entity.connectentity.TicketProduct;
import com.sapo.edu.entity.connectentity.TicketService;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "tickets", indexes = {@Index(name = "code", columnList = "code", unique = true), @Index(name = "repairing_employee_id", columnList = "repairing_employee_id"), @Index(name = "customer_id", columnList = "customer_id"), @Index(name = "motorbike_id", columnList = "motorbike_id")})
public class Ticket extends BaseEntity {
    @Column(name = "code", nullable = false, length = 20)
    private String code;
    @Column(name = "description", length = 1024)
    private String description;
    @Column(name = "note", length = 1024)
    private String note;
    @Column(name = "status")
    private Byte status; // -1 / 0 / 1
    @Column(name = "discount", precision = 5, scale = 2)
    private BigDecimal discount;
    @Column(name = "total_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "motorbike_id", nullable = false)
    private Motorbike motorbike;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "repairing_employee_id", nullable = false)
    private Employee repairingEmployee;
    @Column(name = "payment_method", length = 100)
    private String paymentMethod;
    @Column(name = "appointment_date")
    private LocalDateTime appointmentDate;
    @Column(name = "created_date")
    private LocalDateTime createdDate;
    @Column(name = "updated_date")
    private LocalDateTime updatedDate;
    @OneToMany(mappedBy = "ticket")
    private Set<TicketService> ticketsServices = new LinkedHashSet<>();
    @OneToMany(mappedBy = "ticket")
    private Set<TicketProduct> ticketsProducts = new LinkedHashSet<>();

    public void addProduct(TicketProduct ticketProduct) {
        this.ticketsProducts.add(ticketProduct);
    }

    public void addService(TicketService ticketService) {
        this.ticketsServices.add(ticketService);
    }

    public LocalDateTime getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDateTime appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Motorbike getMotorbike() {
        return motorbike;
    }

    public void setMotorbike(Motorbike motorbike) {
        this.motorbike = motorbike;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Employee getRepairingEmployee() {
        return repairingEmployee;
    }

    public void setRepairingEmployee(Employee repairingEmployee) {
        this.repairingEmployee = repairingEmployee;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(LocalDateTime updatedDate) {
        this.updatedDate = updatedDate;
    }

    public Set<TicketService> getTicketsServices() {
        return ticketsServices;
    }

    public void setTicketsServices(Set<TicketService> ticketsServices) {
        this.ticketsServices = ticketsServices;
    }

    public Set<TicketProduct> getTicketsProducts() {
        return ticketsProducts;
    }

    public void setTicketsProducts(Set<TicketProduct> ticketsProducts) {
        this.ticketsProducts = ticketsProducts;
    }
}