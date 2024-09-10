export class Animal {
  especie = ''
  tamanho = 0
  biomas = []
  isCarnivoro = false

  constructor(especie, tamanho, bioma, isCarnivoro) {
    this.especie = especie
    this.tamanho = tamanho
    this.biomas.push(...bioma)
    this.isCarnivoro = isCarnivoro;
  }
}