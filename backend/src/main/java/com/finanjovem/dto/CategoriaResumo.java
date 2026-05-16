package com.finanjovem.dto;

import java.math.BigDecimal;

public class CategoriaResumo {

    private BigDecimal receitas = BigDecimal.ZERO;
    private BigDecimal despesas = BigDecimal.ZERO;
    private BigDecimal total = BigDecimal.ZERO;

    public BigDecimal getReceitas() { return receitas; }
    public void setReceitas(BigDecimal receitas) { this.receitas = receitas; }

    public BigDecimal getDespesas() { return despesas; }
    public void setDespesas(BigDecimal despesas) { this.despesas = despesas; }

    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }
}
