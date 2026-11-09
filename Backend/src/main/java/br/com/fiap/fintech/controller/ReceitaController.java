
package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.model.receita;
import br.com.fiap.fintech.service.ReceitaService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/receitas")
public class ReceitaController {

    private final ReceitaService receitaService;

    public ReceitaController(ReceitaService receitaService) {
        this.receitaService = receitaService;
    }

    @GetMapping
    public ResponseEntity<List<receita>> listarTodos() {
        return ResponseEntity.ok(receitaService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<receita> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(receitaService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<receita> salvar(@RequestBody receita novaReceita) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(receitaService.salvar(novaReceita));
    }

    @PutMapping("/{id}")
    public ResponseEntity<receita> atualizar(
            @PathVariable Long id,
            @RequestBody receita dadosReceita) {

        return ResponseEntity.ok(receitaService.atualizar(id, dadosReceita));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        receitaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

