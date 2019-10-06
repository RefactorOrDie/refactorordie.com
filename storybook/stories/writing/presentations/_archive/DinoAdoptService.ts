export type Dinosaur = {
  imageUrl?: string;
  name: string;
  id: string;
};

const DINO_NOT_FOUND: Dinosaur = {
  id: '404',
  name: 'Missing Dinosaur'
}

const dinos: Dinosaur[] = [
  { id: "carl1", name: "Carl Marx" },
  { id: "rexie", name: "Trex" },
  { id: "carl2", name: "Carl Marx" },
  { id: "carl4", name: "Carl Marx", imageUrl: "https://i.pinimg.com/originals/e2/73/69/e27369ec030ac2d54ac98506ad574af8.jpg" },
  { id: "carl5", name: "Carl Marx" },
  { id: "carl6", name: "Carl Marx" },
  { id: "carl7", name: "Carl Marx" },
];

export interface DinoAdoptService {
  fetchDinoRange(from?: number, count?: number): Promise<Dinosaur[]>;
  fetchDino(id: string): Promise<Dinosaur>;
}

export function createDinoService(): DinoAdoptService {
  return {
    fetchDino(id: string) {
      return Promise.resolve(dinos.find(dino => dino.id === id) || DINO_NOT_FOUND)
    },
    fetchDinoRange(from = 0, count = 5) {
      return Promise.resolve(dinos.slice(from, from + count))
    }
  }
}

