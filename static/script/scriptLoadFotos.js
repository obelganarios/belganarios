(() => {
  const fotosGrid = document.getElementById('belg-fotos-grid');
  const spinner = document.getElementById('loading-spinner');
  const botaoCarregar = document.getElementById('carregar-mais-btn');

  let pagina = 0;

  const baseDeFotos = [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Canary_bird_yellow.jpg",
      nome: "Canário Belga Clássico",
      local: "São Paulo, SP",
      usuario: "João Canaril"
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Serinus_canaria_-Galicia%2C_Spain_-male-8.jpg",
      nome: "Canário do Realejo",
      local: "Curitiba, PR",
      usuario: "Marina Passarinheira"
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Canary-bird.jpg",
      nome: "Canário Belga Amarelo",
      local: "Rio de Janeiro, RJ",
      usuario: "Carlos Criador"
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/3/38/Canary_Bird_Serinus_Canaria.JPG",
      nome: "Canário do Norte",
      local: "Porto Alegre, RS",
      usuario: "Luciana Petz"
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Serinus_canaria_-pet_canary_in_cage-8a.jpg",
      nome: "Canário Canto Longo",
      local: "Belo Horizonte, MG",
      usuario: "Tiago Aves"
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/d/de/Yellow_Canary.jpg",
      nome: "Canário Canela",
      local: "Fortaleza, CE",
      usuario: "Amanda Criadora"
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Yellow_canary_male_RWD.jpg",
      nome: "Canário Solar",
      local: "Manaus, AM",
      usuario: "Pedro do Canto"
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Canary_(Serinus_canaria_domestica).jpg",
      nome: "Canário Dourado",
      local: "Recife, PE",
      usuario: "Isabela Rios"
    }
  ];

  function buscarMaisFotos(pagina) {
    return new Promise((resolve) => {
      spinner.style.display = 'block';

      setTimeout(() => {
        const fotos = [];

        for (let i = 0; i < 8; i++) {
          const index = (pagina * 8 + i) % baseDeFotos.length;
          fotos.push(baseDeFotos[index]);
        }

        spinner.style.display = 'none';
        resolve(fotos);
      }, 1200);
    });
  }

  function criarFotoCard({ src, nome, local, usuario }) {
    const div = document.createElement('div');
    div.className = 'belg-foto-card';

    const img = document.createElement('img');
    img.src = src;
    img.alt = nome;
    img.onload = () => {
      img.classList.add('loaded');
    };

    const infoDiv = document.createElement('div');
    infoDiv.className = 'foto-info';

    const h3 = document.createElement('h3');
    h3.textContent = nome;

    const pLocal = document.createElement('p');
    pLocal.innerHTML = `<strong>Local:</strong> ${local}`;

    const pUsuario = document.createElement('p');
    pUsuario.innerHTML = `<strong>Postado por:</strong> ${usuario}`;

    infoDiv.appendChild(h3);
    infoDiv.appendChild(pLocal);
    infoDiv.appendChild(pUsuario);

    div.appendChild(img);
    div.appendChild(infoDiv);

    return div;
  }

  function adicionarFotos(fotos) {
    fotos.forEach(foto => {
      const card = criarFotoCard(foto);
      fotosGrid.appendChild(card);
    });

    // Após 8 fotos, mostrar botão
    if (fotosGrid.children.length >= 8) {
      botaoCarregar.style.display = 'inline-block';
    }
  }

  // Ação ao clicar no botão
  botaoCarregar.addEventListener('click', () => {
    pagina++;
    buscarMaisFotos(pagina).then(fotos => adicionarFotos(fotos));
  });

  // Primeira carga
  buscarMaisFotos(pagina).then(fotos => adicionarFotos(fotos));
})();
