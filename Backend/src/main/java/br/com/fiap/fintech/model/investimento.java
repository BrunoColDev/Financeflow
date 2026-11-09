
package br.com.fiap.fintech.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "INVESTIMENTO")
public class investimento {

    @Id
    @SequenceGenerator(
            name = "investimento_seq",
            sequenceName = "SEQ_INVESTIMENTO",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "investimento_seq"
    )
    @Column(name = "ID_INVESTIMENTO")
    private Long idInvestimento;

    @Column(name = "ID_USUARIO", nullable = false)
    private Long idUsuario;

    @Column(name = "TIPO", nullable = false, length = 100)
    private String tipo;

    @Column(name = "VALOR_INVESTIDO", nullable = false, precision = 10, scale = 2)
    private BigDecimal valorInvestido;

    @Column(name = "RENDIMENTO", precision = 10, scale = 2)
    private BigDecimal rendimento;

    @Column(name = "DATA_INICIO", nullable = false)
    private LocalDate dataInicio;

    public investimento() {}

    public Long getIdInvestimento() {
        return idInvestimento;
    }

    public void setIdInvestimento(Long idInvestimento) {
        this.idInvestimento = idInvestimento;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public BigDecimal getValorInvestido() {
        return valorInvestido;
    }

    public void setValorInvestido(BigDecimal valorInvestido) {
        this.valorInvestido = valorInvestido;
    }

    public BigDecimal getRendimento() {
        return rendimento;
    }

    public void setRendimento(BigDecimal rendimento) {
        this.rendimento = rendimento;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }
}

