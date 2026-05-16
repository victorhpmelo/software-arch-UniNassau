package com.finanjovem.dto;

import java.math.BigDecimal;

public class ResumoFinanceiro {

    private BigDecimal totalReceitas;
    private BigDecimal totalDespesas;
    private BigDecimal saldo;

    public ResumoFinanceiro(BigDecimal totalReceitas, BigDecimal totalDespesas, BigDecimal saldo) {
        this.totalReceitas = totalReceitas;
        this.totalDespesas = totalDespesas;
        this.saldo = saldo;
    }

    public BigDecimal getTotalReceitas() { return totalReceitas; }
    public BigDecimal getTotalDespesas() { return totalDespesas; }
    public BigDecimal getSaldo() { return saldo; }
}
