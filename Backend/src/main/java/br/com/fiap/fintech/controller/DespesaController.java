
package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.model.despesa;
import br.com.fiap.fintech.service.DespesaService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/despesas")
public class DespesaController {

    private final DespesaService despesaService;

    public DespesaController(DespesaService despesaService) {
        this.despesaService = despesaService;
    }

    @GetMapping
    public ResponseEntity<List<despesa>> listarTodos() {
        return ResponseEntity.ok(despesaService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<despesa> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(despesaService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<despesa> salvar(@RequestBody despesa novaDespesa) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(despesaService.salvar(novaDespesa));
    }

    @PutMapping("/{id}")
    public ResponseEntity<despesa> atualizar(
            @PathVariable Long id,
            @RequestBody despesa dadosDespesa) {

        return ResponseEntity.ok(despesaService.atualizar(id, dadosDespesa));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        despesaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

