
package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.receita;
import br.com.fiap.fintech.repository.ReceitaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReceitaService {

    private final ReceitaRepository receitaRepository;

    public ReceitaService(ReceitaRepository receitaRepository) {
        this.receitaRepository = receitaRepository;
    }

    public List<receita> listarTodos() {
        return receitaRepository.findAll();
    }

    public receita buscarPorId(Long id) {
        return receitaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receita não encontrada"));
    }

    public receita salvar(receita novaReceita) {
        return receitaRepository.save(novaReceita);
    }

    public receita atualizar(Long id, receita dadosReceita) {
        receita receitaExistente = buscarPorId(id);

        receitaExistente.setDescricao(dadosReceita.getDescricao());
        receitaExistente.setValor(dadosReceita.getValor());
        receitaExistente.setDataReceita(dadosReceita.getDataReceita());
        receitaExistente.setCategoria(dadosReceita.getCategoria());
        receitaExistente.setIdUsuario(dadosReceita.getIdUsuario());

        return receitaRepository.save(receitaExistente);
    }

    public void deletar(Long id) {
        receita receitaExistente = buscarPorId(id);
        receitaRepository.delete(receitaExistente);
    }
}
