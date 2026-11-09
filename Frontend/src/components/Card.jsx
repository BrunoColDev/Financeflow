// Card de resumo (usado 4 vezes na Home).
// Props: titulo, valor, detalhe e cor ("azul", "verde", "vermelho" ou "dourado").
function Card(props) {
  return (
    <div className="card">
      <p className="card-label">{props.titulo}</p>
      <p className={"card-valor " + props.cor}>{props.valor}</p>
      <p className="card-detalhe">{props.detalhe}</p>
    </div>
  );
}

export default Card;
