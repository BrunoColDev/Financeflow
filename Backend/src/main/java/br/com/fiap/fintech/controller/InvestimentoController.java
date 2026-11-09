
package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.model.investimento;
import br.com.fiap.fintech.service.InvestimentoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/investimentos")
public class InvestimentoController {

    private final InvestimentoService investimentoService;

    public InvestimentoController(InvestimentoService investimentoService) {
        this.investimentoService = investimentoService;
    }

    @GetMapping
    public ResponseEntity<List<investimento>> listarTodos() {
        return ResponseEntity.ok(investimentoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<investimento> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(investimentoService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<investimento> salvar(@RequestBody investimento novoInvestimento) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(investimentoService.salvar(novoInvestimento));
    }

    @PutMapping("/{id}")
    public ResponseEntity<investimento> atualizar(
            @PathVariable Long id,
            @RequestBody investimento dadosInvestimento) {

        return ResponseEntity.ok(investimentoService.atualizar(id, dadosInvestimento));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        investimentoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

