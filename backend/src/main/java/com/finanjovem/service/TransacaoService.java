package com.finanjovem.service;

import com.finanjovem.dto.*;
import com.finanjovem.model.TipoTransacao;
import com.finanjovem.model.Transacao;
import com.finanjovem.repository.TransacaoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TransacaoService {

    private final TransacaoRepository repository;

    public TransacaoService(TransacaoRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public TransacaoResponse create(TransacaoRequest request) {
        Transacao transacao = mapToEntity(new Transacao(), request);
        return TransacaoResponse.from(repository.save(transacao));
    }

    @Transactional(readOnly = true)
    public List<TransacaoResponse> findAll() {
        return repository.findAllByOrderByDataDescCreatedAtDesc()
                .stream()
                .map(TransacaoResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public TransacaoResponse findById(Long id) {
        return repository.findById(id)
                .map(TransacaoResponse::from)
                .orElseThrow(() -> new ResourceNotFoundException("Transação não encontrada"));
    }

    @Transactional
    public TransacaoResponse update(Long id, TransacaoRequest request) {
        Transacao transacao = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transação não encontrada"));
        mapToEntity(transacao, request);
        return TransacaoResponse.from(repository.save(transacao));
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Transação não encontrada");
        }
        repository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public ResumoFinanceiro calcularResumo(List<TransacaoResponse> transacoes) {
        BigDecimal totalReceitas = BigDecimal.ZERO;
        BigDecimal totalDespesas = BigDecimal.ZERO;

        for (TransacaoResponse t : transacoes) {
            if (t.getTipo() == TipoTransacao.Receita) {
                totalReceitas = totalReceitas.add(t.getValor());
            } else {
                totalDespesas = totalDespesas.add(t.getValor().abs());
            }
        }

        return new ResumoFinanceiro(totalReceitas, totalDespesas, totalReceitas.subtract(totalDespesas));
    }

    @Transactional(readOnly = true)
    public Map<String, CategoriaResumo> resumoPorCategoria() {
        Map<String, CategoriaResumo> resumo = new HashMap<>();

        for (Transacao t : repository.findAll()) {
            CategoriaResumo cat = resumo.computeIfAbsent(t.getCategoria(), k -> new CategoriaResumo());
            BigDecimal valor = t.getValor();

            if (t.getTipo() == TipoTransacao.Receita) {
                cat.setReceitas(cat.getReceitas().add(valor));
                cat.setTotal(cat.getTotal().add(valor));
            } else {
                cat.setDespesas(cat.getDespesas().add(valor));
                cat.setTotal(cat.getTotal().subtract(valor));
            }
        }

        return resumo;
    }

    private Transacao mapToEntity(Transacao transacao, TransacaoRequest request) {
        transacao.setDescricao(request.getDescricao());
        transacao.setValor(request.getValor());
        transacao.setTipo(request.getTipo());
        transacao.setCategoria(request.getCategoria());
        transacao.setData(request.getData());
        transacao.setObservacoes(request.getObservacoes());
        return transacao;
    }
}
