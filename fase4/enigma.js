
// Função para remover acentos da string, facilitando a comparação
function removerAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

document.getElementById('verificarButton').addEventListener('click', function () {
  const respostaInput = document.getElementById('respostaInput').value.trim().toLowerCase();
  const resposta = removerAcentos(respostaInput);
  const radios = document.getElementsByName('concorda');
  const feedback = document.getElementById('mensagemFeedback');
  const respostaCorreta = "voce deve obedecer a tatiane em tudo"; // Gabarito
  const barra = document.querySelector(".barra");
  const progresso = document.querySelector(".progresso");

  let escolha = null;
  for (let r of radios) {
    if (r.checked) {
      escolha = r.value;
      break;
    }
  }

  // Se a resposta estiver errada
  if (resposta !== respostaCorreta) {
    feedback.textContent = "RESPOSTA INCORRETA — TENTE NOVAMENTE!";
    feedback.style.color = "#b30000";
    barra.style.display = "none";


    // Remove mensagem após 3 segundos
    setTimeout(() => {
      feedback.textContent = "";
    }, 3000);
    return;
    return;
  }

  // Se a resposta estiver certa mas a pessoa respondeu "não"
  if (resposta === respostaCorreta && escolha === "nao") {
    feedback.textContent = "VOCÊ LEU OS SINAIS CORRETAMENTE E ESTÁ ERRANDO NO MAIS FÁCIL!";
    feedback.style.color = "#b30000";
    barra.style.display = "none";

    // Remove mensagem após 5 segundos
    setTimeout(() => {
      feedback.textContent = "";
    }, 5000);
    return;
    return;
  }

  // Se tudo estiver correto (resposta e escolha "sim")
  if (resposta === respostaCorreta && escolha === "sim") {
    feedback.textContent = ""; // Limpa mensagem anterior
    barra.style.display = "block"; // Mostra a barra de progresso
    progresso.style.width = "0%"; // Zera a largura inicial da barra

    // Inicia a animação da barra
    setTimeout(() => {
      progresso.style.width = "100%";
    }, 50);

    const mensagem = "MANDOU BEM! PREPARE-SE PARA A ÚLTIMA FASE...";
    feedback.textContent = mensagem;
    feedback.style.color = "#263238";


    // Redireciona após 5 segundos
    setTimeout(() => {
      location.href = "/fase5/baratas.html";
    }, 5000);
  }
});
