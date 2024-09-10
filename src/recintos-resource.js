import { Recinto } from "./models/recinto";
import { Animal } from "./models/animal";

export class RecintosResource {
  static animaisHabilitados = [
    new Animal('LEAO', 3, ['savana'], true),
    new Animal('LEOPARDO', 2, ['savana'], true),
    new Animal('CROCODILO', 3, ['rio'], true),
    new Animal('MACACO', 1, ['savana', 'floresta']),
    new Animal('GAZELA', 2, ['savana']),
    new Animal('HIPOPOTAMO', 4, ['savana', 'rio']),
  ];

  static inicializaRecintos() {
    //inicializando recinto de Savana 1
    const savana1 = new Recinto(1, ['savana'], 10);
    savana1.setAnimais(new Animal('MACACO', 1, ['savana', 'floresta']), 3);
  
    //inicializando recinto de Floresta
    const floresta = new Recinto(2, ['floresta'], 5);
  
    //inicializando recinto de Savana e Rio
    const savanaERio = new Recinto(3, ['savana', 'rio'], 7);
    savanaERio.setAnimais(new Animal('GAZELA', 2, ['savana']), 1);
  
    //inicializando recinto de Rio
    const rio = new Recinto(4, ['rio'], 8);
  
    //inicializando recinto de Savana 2
    const savana2 = new Recinto(5, ['savana'], 9);
    savana2.setAnimais(new Animal('LEAO', 3, ['savana'], true), 1);
  
    return [savana1, floresta, savanaERio, rio, savana2];
  }
}
