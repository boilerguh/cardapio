export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  subtext?: string; // Informação curta que aparece logo abaixo do nome
  category: string;
  featured?: boolean;
  image?: string;
}

export const products: Product[] = [
  // Signature Drinks
  {
    id: 'margarita',
    name: 'Margarita',
    price: 30,
    subtext: 'Tequila, Limão e Sal',
    description: 'A clássica Margarita preparada com Tequila José Cuervo, licor de laranja, suco de limão fresco e a tradicional borda de sal.',
    category: 'Signature',
    featured: true,
    image: 'https://images.unsplash.com/photo-1655546837806-76a6dd54ee2b?q=80'
  },
  {
    id: 'gin-sunset',
    name: 'Gin Sunset',
    price: 35,
    subtext: 'Gin, Red Bull & Especiarias',
    description: 'Drink refrescante com Gin Tanqueray, Red Bull Tropical, fatias de laranja e especiarias selecionadas.',
    category: 'Signature',
    featured: true,
    image: 'https://images.unsplash.com/photo-1637518122612-60ac167cf93b?q=80'
  },

  // Combos
  {
    id: 'combo-red-label-redbull',
    name: 'Red Label + 4 Red Bull',
    price: 300,
    subtext: '+ 4 Gelos de Coco',
    description: 'Garrafa de Red Label + 4 latas de Red Bull + 4 Gelos de Coco.',
    category: 'Combos'
  },
  {
    id: 'combo-red-label-bally',
    name: 'Red Label + Energético 2L',
    price: 230,
    subtext: '+ 4 Gelos de Coco',
    description: 'Opção econômica: Garrafa Red Label + Energético 2L + 4 Gelos de Coco.',
    category: 'Combos'
  },
  {
    id: 'combo-gin-redbull',
    name: 'Gin (Bombay/Tanq) + 4 Red Bull',
    price: 250,
    subtext: '+ 4 Gelos de Coco',
    description: 'Escolha entre Tanqueray ou Bombay. Acompanha 4 Red Bulls e 4 Gelos de Coco.',
    category: 'Combos'
  },
  {
    id: 'combo-gin-bally',
    name: 'Gin (Bombay/Tanq) + Bally 2L',
    price: 200,
    subtext: '+ 4 Gelos de Coco',
    description: 'Escolha entre Tanqueray ou Bombay. Acompanha Energético 2L e 4 Gelos de Coco.',
    category: 'Combos'
  },
  {
    id: 'combo-absolut-redbull',
    name: 'Absolut + 4 Red Bull',
    price: 250,
    subtext: '+ 4 Gelos de Coco',
    description: 'Vodka Absolut Original + 4 Red Bulls + 4 Gelos de Coco.',
    category: 'Combos'
  },
  {
    id: 'combo-absolut-bally',
    name: 'Absolut + Energético 2L',
    price: 180,
    subtext: '+ 4 Gelos de Coco',
    description: 'Vodka Absolut Original + Energético 2L + 4 Gelos de Coco.',
    category: 'Combos'
  },

  // Bebidas & Drinks
  {
    id: 'gin-tonic-redbull',
    name: 'Gin Tanqueray ou Bombay + Red Bull',
    price: 40,
    description: 'Taça de Gin tônica preparada com especiarias e Red Bull.',
    category: 'Drinks'
  },
  {
    id: 'gin-tonic-tropical',
    name: 'Gin Tanqueray + Bally Tropical',
    price: 35,
    description: 'Taça de Gin com Energético Tropical.',
    category: 'Drinks'
  },
  {
    id: 'copao-red-label-redbull',
    name: 'Copão Red Label + Red Bull',
    price: 40,
    subtext: '+ Gelo de Coco',
    description: 'O tradicional copão de 700ml montado na hora com Whisky e Red Bull.',
    category: 'Drinks'
  },
  {
    id: 'copao-red-label-flyhorse',
    name: 'Copão Red Label + Fly Horse',
    price: 35,
    subtext: '+ Gelo de Coco',
    description: 'Copão montado com Whisky e energético Fly Horse.',
    category: 'Drinks'
  },
  {
    id: 'copao-absolut-redbull',
    name: 'Copão Absolut + Red Bull',
    price: 40,
    subtext: '+ Gelo de Coco',
    description: 'Copão de Vodka Absolut com Red Bull e Gelo de Coco.',
    category: 'Drinks'
  },
  {
    id: 'copao-absolut-flyhorse',
    name: 'Copão Absolut + Fly Horse',
    price: 35,
    subtext: '+ Gelo de Coco',
    description: 'Copão de Vodka Absolut com Fly Horse e Gelo de Coco.',
    category: 'Drinks'
  },
  {
    id: 'jagerbomb',
    name: 'Jägermeister + Red Bull',
    price: 40,
    description: 'Dose dupla de Jäger com Red Bull (JägerBomb).',
    category: 'Drinks'
  },
  {
    id: 'margarita-dose',
    name: 'Margarita',
    price: 30,
    description: 'Clássica: Tequila, Licor de Laranja, Limão e borda de sal.',
    category: 'Drinks'
  },
  {
    id: 'licor-43',
    name: 'Dose Licor 43',
    price: 30,
    description: 'Dose pura de Licor 43.',
    category: 'Drinks'
  },
  {
    id: 'dose-red-label',
    name: 'Dose Red Label',
    price: 26,
    description: 'Dose pura de Whisky.',
    category: 'Drinks'
  },
  {
    id: 'shot-tequila',
    name: 'Shot Tequila',
    price: 20,
    description: 'Dose de Tequila José Cuervo com limão e sal.',
    category: 'Drinks'
  },
  {
    id: 'taca-champanhe',
    name: 'Taça Champanhe',
    price: 20,
    description: 'Taça individual.',
    category: 'Drinks'
  },
  {
    id: 'garrafa-salton',
    name: 'Champanhe Salton (Garrafa)',
    price: 90,
    description: 'Garrafa fechada de Espumante Salton.',
    category: 'Drinks'
  },

  // Cervejas & Softs
  {
    id: 'redbull-sabores',
    name: 'Red Bull / Monster (Sabores)',
    price: 18,
    description: 'Consulte sabores disponíveis no bar (Tradicional, Tropical, Melancia, etc).',
    category: 'Cervejas & Softs'
  },
  {
    id: 'energetico-2l',
    name: 'Energético 2L',
    price: 18,
    subtext: 'Bally / Fly Horse',
    description: 'Garrafa de 2 Litros.',
    category: 'Cervejas & Softs'
  },
  {
    id: 'heineken-lata',
    name: 'Heineken 269ml',
    price: 7,
    category: 'Cervejas & Softs'
  },
  {
    id: 'original-lata',
    name: 'Original 269ml',
    price: 7,
    category: 'Cervejas & Softs'
  },
  {
    id: 'refri-lata',
    name: 'Refrigerante Lata',
    price: 6.5,
    subtext: 'Coca-Cola / Guaraná / Sprite',
    category: 'Cervejas & Softs'
  },
  {
    id: 'suco-laranja',
    name: 'Suco de Laranja',
    price: 12,
    subtext: 'Natural',
    category: 'Cervejas & Softs'
  },
  {
    id: 'agua',
    name: 'Água',
    price: 5,
    subtext: 'c/ ou s/ Gás',
    category: 'Cervejas & Softs'
  },
  {
    id: 'gelo-coco-avulso',
    name: 'Extra: Gelo de Coco',
    price: 6,
    category: 'Cervejas & Softs'
  },

  // Porções
  {
    id: 'batata-calabresa',
    name: 'Meia Batata + Meia Calabresa',
    price: 35,
    category: 'Porções'
  },
  {
    id: 'batata-nuggets',
    name: 'Meia Batata + 6 Nuggets',
    price: 25,
    category: 'Porções'
  },
  {
    id: 'calabresa-acebolada',
    name: 'Calabresa Acebolada',
    price: 25,
    category: 'Porções'
  },
  {
    id: 'mini-pastel',
    name: 'Mini Pastel',
    price: 25,
    subtext: 'Carne / Queijo / Misto',
    category: 'Porções'
  },
  {
    id: 'batata-frita',
    name: 'Batata Frita',
    price: 20,
    category: 'Porções'
  },
  {
    id: 'nuggets-10',
    name: 'Nuggets (10 un)',
    price: 20,
    category: 'Porções'
  },

  // Snacks & Doces
  {
    id: 'doritos-dinamita',
    name: 'Doritos Dinamita',
    price: 7,
    category: 'Snacks & Doces'
  },
  {
    id: 'cebolitos',
    name: 'Cebolitos',
    price: 6.5,
    category: 'Snacks & Doces'
  },
  {
    id: 'salgadinhos-vários',
    name: 'Doritos / Ruffles / Cheetos',
    price: 6,
    category: 'Snacks & Doces'
  },
  {
    id: 'fandangos',
    name: 'Fandangos',
    price: 5,
    category: 'Snacks & Doces'
  },
  {
    id: 'mentos',
    name: 'Mentos',
    price: 4,
    category: 'Snacks & Doces'
  },
  {
    id: 'halls',
    name: 'Halls',
    price: 3,
    category: 'Snacks & Doces'
  },
  {
    id: 'pirulito',
    name: 'Pirulito',
    price: 0.5,
    category: 'Snacks & Doces'
  }
];
