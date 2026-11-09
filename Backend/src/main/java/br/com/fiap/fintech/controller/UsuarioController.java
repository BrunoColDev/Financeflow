package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.model.usuario;
import br.com.fiap.fintech.service.UsuarioService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public ResponseEntity<List<usuario>> listarTodos() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<usuario> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<usuario> salvar(@RequestBody usuario novoUsuario) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(usuarioService.salvar(novoUsuario));
    }

    @PutMapping("/{id}")
    public ResponseEntity<usuario> atualizar(
            @PathVariable Long id,
            @RequestBody usuario dadosUsuario) {

        return ResponseEntity.ok(usuarioService.atualizar(id, dadosUsuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        usuarioService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}