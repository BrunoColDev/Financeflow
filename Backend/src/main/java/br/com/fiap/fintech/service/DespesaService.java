
package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.despesa;
import br.com.fiap.fintech.repository.DespesaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DespesaService {

    private final DespesaRepository despesaRepository;

    public DespesaService(DespesaRepository despesaRepository) {
        this.despesaRepository = despesaRepository;
    }

    public List<despesa> listarTodos() {
        return despesaRepository.findAll();
    }

    public despesa buscarPorId(Long id) {
        return despesaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Despesa não encontrada"));
    }

    public despesa salvar(despesa novaDespesa) {
        return despesaRepository.save(novaDespesa);
    }

    public despesa atualizar(Long id, despesa dadosDespesa) {
        despesa despesaExistente = buscarPorId(id);

        despesaExistente.setDescricao(dadosDespesa.getDescricao());
        despesaExistente.setValor(dadosDespesa.getValor());
        despesaExistente.setDataDespesa(dadosDespesa.getDataDespesa());
        despesaExistente.setCategoria(dadosDespesa.getCategoria());
        despesaExistente.setIdUsuario(dadosDespesa.getIdUsuario());

        return despesaRepository.save(despesaExistente);
    }

    public void deletar(Long id) {
        despesa despesaExistente = buscarPorId(id);
        despesaRepository.delete(despesaExistente);
    }
}
