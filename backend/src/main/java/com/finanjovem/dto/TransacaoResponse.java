package com.finanjovem.dto;

import com.finanjovem.model.TipoTransacao;
import com.finanjovem.model.Transacao;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class TransacaoResponse {

    private Long id;
    private String descricao;
    private BigDecimal valor;
    private TipoTransacao tipo;
    private String categoria;
    private LocalDate data;
    private String observacoes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static TransacaoResponse from(Transacao t) {
        TransacaoResponse r = new TransacaoResponse();
        r.id = t.getId();
        r.descricao = t.getDescricao();
        r.valor = t.getValor();
        r.tipo = t.getTipo();
        r.categoria = t.getCategoria();
        r.data = t.getData();
        r.observacoes = t.getObservacoes();
        r.createdAt = t.getCreatedAt();
        r.updatedAt = t.getUpdatedAt();
        return r;
    }

    public Long getId() { return id; }
    public String getDescricao() { return descricao; }
    public BigDecimal getValor() { return valor; }
    public TipoTransacao getTipo() { return tipo; }
    public String getCategoria() { return categoria; }
    public LocalDate getData() { return data; }
    public String getObservacoes() { return observacoes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
