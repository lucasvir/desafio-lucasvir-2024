import { RecintosResource } from './recintos-resource';

class RecintosZoo {
  recintos;
  recintosViaveis;
  animaisHabilitados;

  constructor() {
    this.recintos = RecintosResource.inicializaRecintos();
    this.recintosViaveis = [];
    this.animaisHabilitados = RecintosResource.animaisHabilitados;
  }

  analisaRecintos(animal, quantidade) {
    const animalValido = this.animaisHabilitados.find(
      a => a.especie.toLowerCase() === animal.toLowerCase()
    );

    if (!animalValido) return { erro: 'Animal inválido' };

    if (quantidade <= 0) return { erro: 'Quantidade inválida' };

    let recintosFiltrados = [];
    this.recintos.forEach(recinto => {
      recinto.biomas.forEach(bioma => {
        const isBiomaValido = animalValido.biomas.includes(bioma)
        if(isBiomaValido) recintosFiltrados.push(recinto);
      });
    });

    if (recintosFiltrados.length == 0) return { erro: 'Não há recinto viável' };

    let recintosValidos = [];
    //carnivoro
    if (animalValido.isCarnivoro) {
      handleCarnivoro(
        recintosFiltrados,
        recintosValidos,
        animalValido,
        quantidade
      );
    }

    //hipopotamos com outras especies => somente em recinto com savana e rio
    if (animalValido.especie.toLowerCase() === 'hipopotamo') {
      handleHipopotamo(
        recintosFiltrados,
        recintosValidos,
        animalValido,
        quantidade
      );
    }

    //macaco precisa de outro animal no recinto
    if (animalValido.especie.toLowerCase() === 'macaco') {
      handleMacaco(
        recintosFiltrados,
        recintosValidos,
        animalValido,
        quantidade
      );
    }

    this.recintosViaveis.push(...recintosValidos);

    const response =
      recintosValidos.length === 0
        ? { erro: 'Não há recinto viável' }
        : {
            recintosViaveis: this.recintosViaveis.map(recinto => {
              return `Recinto ${
                recinto.id
              } (espaço livre: ${recinto.getEspacoDisponivel()} total: ${
                recinto.tamanho
              })`;
            }),
          };

    return response;
  }
}
export { RecintosZoo as RecintosZoo };

function handleCarnivoro(
  recintosFiltrados,
  recintosValidos,
  animalValido,
  quantidade
) {
  recintosFiltrados.forEach(recinto => {
    if (recinto.animais.length === 0) {
      recinto.setAnimais(animalValido, quantidade);
      recintosValidos.push(recinto);
      return;
    }

    recinto.animais.forEach(animal => {
      const recintoComMesmoAnimal =
        animal.especie.toLowerCase() === animalValido.especie.toLowerCase();
      if (recintoComMesmoAnimal) {
        recinto.setAnimais(animalValido, quantidade);
        recintosValidos.push(recinto);
        return;
      }
    });
  });
}

function handleHipopotamo(
  recintosFiltrados,
  recintosValidos,
  animalValido,
  quantidade
) {
  recintosFiltrados.forEach(recinto => {
    recinto.animais.forEach(animal => {
      const recintoComMesmoAnimal =
        animal.especie.toLowerCase() === animalValido.especie.toLowerCase();

      if (
        !animal ||
        recintoComMesmoAnimal ||
        recinto.includes('savana', 'rio')
      ) {
        recinto.setAnimais(animalValido, quantidade);
        recintosValidos.push(recinto);
      }
    });
  });
}

function handleMacaco(
  recintosFiltrados,
  recintosValidos,
  animalValido,
  quantidade
) {
  for (const recinto of recintosFiltrados) {
    if (recinto.getEspacoDisponivel() >= animalValido.tamanho * quantidade) {
      if (
        recinto.animais.length > 0 ||
        (recinto.animais.length === 0 && quantidade > 1)
      ) {
        let temCarnivoros;
        recinto.animais.forEach(animal => {
          if (animal.isCarnivoro) temCarnivoros = true;
        });

        if (!temCarnivoros) {
          recinto.setAnimais(animalValido, quantidade);
          recintosValidos.push(recinto);
        }
      }
    }
  }
}
