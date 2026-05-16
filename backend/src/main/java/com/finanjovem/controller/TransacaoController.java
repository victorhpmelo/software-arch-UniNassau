package com.finanjovem.controller;

import com.finanjovem.dto.*;
import com.finanjovem.service.TransacaoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class TransacaoController {

    private final TransacaoService service;

    public TransacaoController(TransacaoService service) {
        this.service = service;
    }

    @PostMapping("/transacoes")
    public ResponseEntity<ApiResponse<TransacaoResponse>> create(@Valid @RequestBody TransacaoRequest request) {
        TransacaoResponse created = service.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Transação criada com sucesso", created));
    }

    @GetMapping("/transacoes")
    public ResponseEntity<ApiResponse<List<TransacaoResponse>>> findAll() {
        List<TransacaoResponse> transacoes = service.findAll();
        ApiResponse<List<TransacaoResponse>> response = ApiResponse.ok(transacoes);
        response.setCount(transacoes.size());
        response.setResumo(service.calcularResumo(transacoes));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/transacoes/{id}")
    public ResponseEntity<ApiResponse<TransacaoResponse>> findById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(service.findById(id)));
    }

    @PutMapping("/transacoes/{id}")
    public ResponseEntity<ApiResponse<TransacaoResponse>> update(
            @PathVariable Long id,
            @Valid @RequestBody TransacaoRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Transação atualizada com sucesso", service.update(id, request)));
    }

    @DeleteMapping("/transacoes/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Transação deletada com sucesso", null));
    }

    @GetMapping("/resumo/categorias")
    public ResponseEntity<ApiResponse<Map<String, CategoriaResumo>>> resumoCategorias() {
        return ResponseEntity.ok(ApiResponse.ok(service.resumoPorCategoria()));
    }
}
