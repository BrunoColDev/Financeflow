
package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.investimento;
import br.com.fiap.fintech.repository.InvestimentoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvestimentoService {

    private final InvestimentoRepository investimentoRepository;

    public InvestimentoService(InvestimentoRepository investimentoRepository) {
        this.investimentoRepository = investimentoRepository;
    }

    public List<investimento> listarTodos() {
        return investimentoRepository.findAll();
    }

    public investimento buscarPorId(Long id) {
        return investimentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Investimento não encontrado"));
    }

    public investimento salvar(investimento novoInvestimento) {
        return investimentoRepository.save(novoInvestimento);
    }

    public investimento atualizar(Long id, investimento dadosInvestimento) {
        investimento investimentoExistente = buscarPorId(id);

        investimentoExistente.setIdUsuario(dadosInvestimento.getIdUsuario());
        investimentoExistente.setTipo(dadosInvestimento.getTipo());
        investimentoExistente.setValorInvestido(dadosInvestimento.getValorInvestido());
        investimentoExistente.setRendimento(dadosInvestimento.getRendimento());
        investimentoExistente.setDataInicio(dadosInvestimento.getDataInicio());

        return investimentoRepository.save(investimentoExistente);
    }

    public void deletar(Long id) {
        investimento investimentoExistente = buscarPorId(id);
        investimentoRepository.delete(investimentoExistente);
    }
}
