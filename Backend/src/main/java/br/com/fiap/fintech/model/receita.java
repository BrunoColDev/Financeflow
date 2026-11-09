
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
@Table(name = "RECEITA")
public class receita {

    @Id
    @SequenceGenerator(
            name = "receita_seq",
            sequenceName = "SEQ_RECEITA",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "receita_seq"
    )
    @Column(name = "ID_RECEITA")
    private Long idReceita;

    @Column(name = "DESCRICAO", nullable = false, length = 100)
    private String descricao;

    @Column(name = "VALOR", nullable = false, precision = 10, scale = 2)
    private BigDecimal valor;

    @Column(name = "DATA_RECEITA", nullable = false)
    private LocalDate dataReceita;

    @Column(name = "CATEGORIA", nullable = false, length = 100)
    private String categoria;

    @Column(name = "ID_USUARIO", nullable = false)
    private Long idUsuario;

    public receita() {
    }

    public Long getIdReceita() {
        return idReceita;
    }

    public void setIdReceita(Long idReceita) {
        this.idReceita = idReceita;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public LocalDate getDataReceita() {
        return dataReceita;
    }

    public void setDataReceita(LocalDate dataReceita) {
        this.dataReceita = dataReceita;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }
}
