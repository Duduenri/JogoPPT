import { useState } from "react";
import "./App.css";

function App() {
  const [figura, setFigura] = useState("");
  const [figuraPC, setFiguraPC] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [vitoriasUsuario, setVitoriasUsuario] = useState(0);
  const [vitoriasComputador, setVitoriasComputador] = useState(0);
  const [empates, setEmpates] = useState(0);
  const [jogoTravado, setJogoTravado] = useState(false);

  function figuraAposta(texto) {
    if (!jogoTravado) {
      setFigura(`./${texto}.png`);
    }
  }

  function desafiarPC() {
    if (figura === "" || jogoTravado) {
      setMensagem(
        "Erro... Faça primeiro a sua aposta ou clique em Jogar Novamente!"
      );
      return;
    }

    const opcoes = ["pedra", "papel", "tesoura"];
    const escolhaUsuario = figura.substring(2, figura.length - 4); 
    const num = Math.floor(Math.random() * 3);
    const escolhaComputador = opcoes[num];

    setFiguraPC(`./${escolhaComputador}.png`);

    if (escolhaUsuario === escolhaComputador) {
      setMensagem("Ah... Deu Empate!");
      setEmpates((prev) => prev + 1);
    } else if (
      (escolhaUsuario === "pedra" && escolhaComputador === "tesoura") ||
      (escolhaUsuario === "papel" && escolhaComputador === "pedra") ||
      (escolhaUsuario === "tesoura" && escolhaComputador === "papel")
    ) {
      setMensagem("Você Venceu! Parabéns!");
      setVitoriasUsuario((prev) => prev + 1);
    } else {
      setMensagem("Você Perdeu!");
      setVitoriasComputador((prev) => prev + 1);
    }
    setJogoTravado(true);
  }

  function jogarNovamente() {
    setFigura("");
    setFiguraPC("");
    setMensagem("");
    setJogoTravado(false);
  }

  return (
    <div className="container">
      <h1>Jogo: Pedra, Papel & Tesoura</h1>
      <div>
        <h2 className="cor-aposta">
          Clique sobre a imagem para fazer a sua Aposta
        </h2>
        <div className="opcoes">
          <img
            src="./pedra.png"
            alt=""
            className="figura-pequena ponteiro"
            onClick={() => figuraAposta("pedra")}
          />
          <img
            src="./papel.png"
            alt=""
            className="figura-pequena ponteiro"
            onClick={() => figuraAposta("papel")}
          />
          <img
            src="./tesoura.png"
            alt=""
            className="figura-pequena ponteiro"
            onClick={() => figuraAposta("tesoura")}
          />
        </div>
      </div>

      {figura && (
        <div className="aposta">
          <h2 className="cor-aposta texto-grande">Sua Aposta é</h2>
          <img src={figura} alt="aposta" className="figura-grande" />
        </div>
      )}

      {!jogoTravado && (
        <h2 className="cor-computador texto-grande">
          Clique em Desafiar PC para verificar o resultado da sua Aposta
        </h2>
      )}

      <button className="btn" onClick={desafiarPC}>
        Desafiar PC
      </button>

      {figuraPC && (
        <div className="aposta">
          <h2 className="cor-computador texto-grande">Computador Apostou</h2>
          <img src={figuraPC} alt="aposta" className="figura-grande" />
        </div>
      )}

      <h1 className="mensagem">{mensagem}</h1>

      {jogoTravado && (
        <button className="btn" onClick={jogarNovamente}>
          Jogar Novamente
        </button>
      )}

      <div className="placar">
        <div className="placar-item">
          <p>Usuário</p>
          <p>{vitoriasUsuario}</p>
        </div>
        <div className="placar-item">
          <p>Computador</p>
          <p>{vitoriasComputador}</p>
        </div>
      </div>

      <div className="placar">
        <div className="placar-item">
          <p>Empates</p>
          <p>{empates}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
