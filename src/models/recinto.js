export class Recinto {
  id = 0;
  animais = [];
  biomas = [];

  constructor(id, bioma, tamanho) {
    this.id = id;
    this.biomas.push(...bioma);
    this.tamanho = tamanho;
  }

  setAnimais = (animal, quantidade) => {
    for (let i = 0; i < quantidade; i++) {
      this.animais.push(animal);
    }
  };

  getEspacoDisponivel = () => {
    let tamanhoTotalAnimais = 0;

    this.animais.forEach(animal => {
      tamanhoTotalAnimais += animal.tamanho;
    });

    // aidicionando valor de um espaço a mais caso o recinto contenha animais de difrete especies
    if(this.animais.length > 0) {
      const especiePrimeiroAnimal = this.animais[0].especie;
      const animaisDiferentes = this.animais.filter(animal => animal.especie !== especiePrimeiroAnimal)
      if (animaisDiferentes.length > 0) tamanhoTotalAnimais++;
    }

    return this.tamanho - tamanhoTotalAnimais;
  };
}
