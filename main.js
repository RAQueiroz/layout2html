const perfilBase = document.querySelector('.perfil:not(.perfil__selecionado)')
const perfilSelecionado = document.querySelector('.perfil__selecionado')
const main = document.querySelector('main')

const atualizaDataset = (perfilDom, perfilDados) => {
  perfilDom.setAttribute('style', '')
  perfilDom.dataset.id = perfilDados.id
  perfilDom.dataset.foto = `/assets/images/${perfilDados.foto}`
  perfilDom.dataset.nome = perfilDados.nome
  perfilDom.dataset.cargo = perfilDados.cargo
  perfilDom.dataset.idade = perfilDados.idade
}

const atualizaPerfilPadrao = (perfilDom, perfilDados) => {
  perfilDom.querySelector('.number__tag').innerHTML =perfilDados.id
  perfilDom.querySelector('img').setAttribute('src', `/assets/images/${perfilDados.foto}`) 
  perfilDom.querySelector('.dado').innerHTML = perfilDados.nome
  perfilDom.querySelector('.cargo').innerHTML = perfilDados.cargo
}

const habilitaSelecao = perfil => {
  perfil.addEventListener('click', e => {
    if(document.querySelector('.clickado')){
      document.querySelector('.clickado').classList.remove('clickado')
    }
    const perfilClickado = e.target.closest('.perfil')
    perfilClickado.classList.add('clickado')
    
    perfilSelecionado.querySelector('img').setAttribute('src', perfilClickado.dataset.foto)
    perfilSelecionado.querySelector('.nome').innerHTML = perfilClickado.dataset.nome
    perfilSelecionado.querySelector('.posicao').innerHTML = perfilClickado.dataset.cargo
    perfilSelecionado.querySelector('.idade').innerHTML = perfilClickado.dataset.idade
    perfilSelecionado.querySelector('.number__tag').innerHTML = perfilClickado.dataset.id
    perfilSelecionado.setAttribute('style','')
    
  })
}

fetch('/data/dados.json')
  .then(dados => dados.json())
  .then(perfis => {
    perfis.map(perfil => {
      const novoPerfil = perfilBase.cloneNode(true)
      
      atualizaDataset(novoPerfil, perfil)
      atualizaPerfilPadrao(novoPerfil, perfil)    
      habilitaSelecao(novoPerfil)  
      main.appendChild(novoPerfil)

    })

  })