package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.usuario;
import br.com.fiap.fintech.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public usuario salvar(usuario novoUsuario) {
        return usuarioRepository.save(novoUsuario);
    }

    public usuario atualizar(Long id, usuario dadosUsuario) {
        usuario usuarioExistente = buscarPorId(id);

        usuarioExistente.setNome(dadosUsuario.getNome());
        usuarioExistente.setEmail(dadosUsuario.getEmail());
        usuarioExistente.setSenha(dadosUsuario.getSenha());
        usuarioExistente.setTelefone(dadosUsuario.getTelefone());

        return usuarioRepository.save(usuarioExistente);
    }

    public void deletar(Long id) {
        usuario usuarioExistente = buscarPorId(id);
        usuarioRepository.delete(usuarioExistente);
    }
}
