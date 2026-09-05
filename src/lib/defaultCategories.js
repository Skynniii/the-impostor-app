function parseWords(str) {
  return str.split(" · ").map(pair => {
    const idx = pair.indexOf(": ");
    return { word: pair.slice(0, idx).trim(), hint: pair.slice(idx + 2).trim() };
  });
}

export const defaultCategories = [
  {
    id: "animales",
    name: "Animales",
    emoji: "🐾",
    isDefault: true,
    words: parseWords("Perro: Cartero · Gato: Cambia-llanta · León: Cobarde de Oz · Elefante: Miedo al ratón · Jirafa: Vértigo de altura · Tiburón: Prestamista · Águila: Legión romana · Serpiente: Fruto prohibido · Mono: Bonito · Caballo: Ajedrez · Vaca: Sagrada en India · Oveja: Dolly · Cerdo: Alcancía · Gallina: Cobardía · Pato: Cuento de Andersen · Delfín: Título francés · Ballena: Pinocho · Pingüino: Villano de Batman · Oso: Teddy · Lobo: Luna llena · Rana: Cuento de hadas · Tortuga: Carrera con liebre · Cocodrilo: Lágrimas falsas · Canguro: Niñera · Murciélago: Batman · Abeja: Winnie Pooh · Mariposa: Efecto · Hormiga: Cigarra · Pulpo: Tres corazones · Camello: Miércoles"),
  },
  {
    id: "cosas-casa",
    name: "Cosas de la Casa",
    emoji: "🏠",
    isDefault: true,
    words: parseWords("Cama: Ricitos de Oro · Silla: Musical · Mesa: Camelot · Sofá: Terapia · Televisor: Control perdido · Refrigerador: Nota con imán · Estufa: Prohibido · Espejo: Blancanieves · Lámpara: Aladino · Reloj: Cenicienta · Puerta: Truco o trato · Ventana: Ojos del alma · Almohada: Guerra de plumas · Cobija: Linus · Toalla: Tirar la toalla · Jabón: Se escapa de las manos · Cepillo: Placa dental · Plato: OVNI · Vaso: Medio lleno · Cuchara: No hay cuchara · Cuchillo: Suizo · Tenedor: Bifurcación · Sartén: Por el mango · Escoba: Bruja · Basura: Tesoro ajeno · Teléfono: Descompuesto · Llave: Clave musical · Cuadro: Mona Lisa · Cortina: Ducha · Planta: Regalo de oficina"),
  },
  {
    id: "lugares",
    name: "Lugares y Geografía",
    emoji: "🌍",
    isDefault: true,
    words: parseWords("Playa: Castillo de arena · Montaña: Everest · Río: Nilo · Bosque: Caperucita · Desierto: Espejismo · Parque: Ardillas · Escuela: Examen sorpresa · Hospital: Sala de espera · Supermercado: Código de barras · Restaurante: Propina · Cine: Palomitas · Aeropuerto: Migración · Estación: Andén · Hotel: Cisne de toalla · Biblioteca: Sistema decimal · Museo: Restauración · Farmacia: Turno de guardia · Iglesia: Diezmo · Estadio: La ola · Gimnasio: Propósito de enero · Isla: Robinson Crusoe · Volcán: Pompeya · Cueva: Altamira · Lago: Ness · Ciudad: Nunca duerme · Pueblo: Chisme · Castillo: Rapunzel · Puente: Peaje · Zoo: Excursión escolar · Oficina: Lunes"),
  },
  {
    id: "comida",
    name: "Comida y Gastronomía",
    emoji: "🍽️",
    isDefault: true,
    words: parseWords("Pizza: Piña polémica · Hamburguesa: Payaso de McDonald's · Sushi: Cinta transportadora · Tacos: Martes · Lasaña: Garfield · Empanada: Discusión regional · Helado: Cerebro congelado · Paella: Domingo español · Arepa: Discusión de frontera · Hot dog: Debate del sándwich · Sopa: Resfriado · Ensalada: César (persona) · Chocolate: Willy Wonka · Pan: Migas de Hansel · Queso: La luna · Huevo: Dilema · Arroz: Boda · Pasta: Lady y el Vagabundo · Pescado: Viernes santo · Carne: Asado dominical · Pollo: Cruzó la calle · Manzana: Newton · Banana: República bananera · Papa: Hambruna irlandesa · Cebolla: Shrek · Ajo: Repele vampiros · Miel: Winnie Pooh · Café: Turco · Té: Boston · Pastel: María Antonieta"),
  },
  {
    id: "profesiones",
    name: "Profesiones y Oficios",
    emoji: "💼",
    isDefault: true,
    words: parseWords("Bombero: Dálmata · Astronauta: Armstrong · Cirujano: Grey's Anatomy · Detective: Sherlock · Piloto: Turbulencia · Chef: Estrella Michelin · Arquitecto: Torre de Pisa · Electricista: Cortocircuito · Juez: Martillo · Fotógrafo: Diga whisky · Profesor: Año sabático · Médico: Juramento hipocrático · Abogado: Objeción · Carpintero: Gepetto · Plomero: Mario Bros · Mecánico: Overol manchado · Periodista: Primicia · Científico: Eureka · Pintor: Oreja cortada · Músico: Beethoven · Actor: Alfombra roja · Policía: Placa · Enfermero: Florence Nightingale · Veterinario: Susurrador de perros · Economista: Mano invisible · Contador: Partida doble · Dentista: Miedo a la silla · Sastre: Dedal · Albañil: Casco amarillo · Granjero: Espantapájaros"),
  },
  {
    id: "deportes",
    name: "Deportes",
    emoji: "⚽",
    isDefault: true,
    words: parseWords("Baloncesto: Air Jordan · Fútbol: Maradona · Natación: Phelps · Esgrima: Mosqueteros · Tenis: Fresas con crema · Boxeo: Alí · Voleibol: Wilson (Cast Away) · Ciclismo: Maillot amarillo · Patinaje: Axel · Surf: Hawái · Karate: Miyagi · Béisbol: Séptima entrada · Golf: Caddie · Rugby: Haka · Atletismo: Bolt · Gimnasia: Diez perfecto · Remo: Timonel · Esquí: Telesilla · Pádel: Paredes de cristal · Bádminton: Pluma rápida · Taekwondo: Origen coreano · Judo: Kano, fundador · Escalada: Free Solo · Vela: Copa América · Tiro con arco: Robin Hood · Bowling: El Gran Lebowski · Patinaje sobre hielo: Tonya y Nancy · Waterpolo: Gorra con orejeras · Motorismo: Valentino Rossi · Hípica: Doma clásica"),
  },
  {
    id: "objetos",
    name: "Objetos Cotidianos",
    emoji: "📦",
    isDefault: true,
    words: parseWords("Reloj: Dalí · Cepillo de dientes: Antiguo Egipto · Sombrilla: Rihanna · Llaves: Bajo el tapete · Audífonos: Burbuja social · Mochila: Dora la Exploradora · Tijeras: Piedra, papel · Cuaderno: Diario de Voldemort · Billetera: Le salen polillas · Gafas: Disfraz de Superman · Peine: Para un calvo · Cargador: Batería al 1% · Moneda: Cara o cruz · Candado: Puente de París · Bolígrafo: Sin tinta · Lápiz: Sabor a madera · Goma de borrar: Manchas rosas · Paraguas: Olvidado en el bus · Linterna: Apagón · Monedero: Cambio suelto · Cinturón: Alarma del auto · Zapato: Cenicienta · Anillo: Señor de los Anillos · Gorra: Visera atrás · Toalla: Rendirse en el ring · Jabón: Se resbala · Monopatín: Marty McFly · Botella: Mensaje en el mar · Maleta: Extraviada en aeropuerto · Encendedor: Prohibido en aviones"),
  },
  {
    id: "naturaleza",
    name: "Naturaleza y Fenómenos",
    emoji: "🌩️",
    isDefault: true,
    words: parseWords("Volcán: Pompeya · Huracán: Categoría 5 · Cascada: Niágara · Arcoíris: Olla de oro · Terremoto: Falla de San Andrés · Desierto: Espejismo · Eclipse: Saga Crepúsculo · Tsunami: Fukushima · Cueva: Altamira · Glaciar: Titanic · Rayo: Cicatriz de Harry Potter · Tornado: Dorothy de Kansas · Nube: Forma de conejo · Lluvia: Cantando bajo ella · Nieve: Blancanieves · Granizo: Abolla el carro · Niebla: Londres clásico · Trueno: Thor · Marea: Atracción lunar · Avalancha: Grito prohibido · Inundación: Arca de Noé · Oasis: Banda británica · Géiser: Yellowstone · Aurora boreal: Islandia · Cometa: Halley · Río: Heráclito · Cráter: Extinción de dinosaurios · Selva: Mowgli · Viento: Molinos de Quijote · Fuego: Prometeo"),
  },
];
