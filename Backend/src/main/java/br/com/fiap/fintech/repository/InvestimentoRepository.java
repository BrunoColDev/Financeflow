package br.com.fiap.fintech.repository;

import br.com.fiap.fintech.model.investimento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvestimentoRepository extends JpaRepository<investimento, Long> {
}

