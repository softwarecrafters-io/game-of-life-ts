import { Cell, CellStatus } from "../core/cell";
const { Dead, Alive } = CellStatus;

class World{
  constructor(readonly cellMatrix: Cell[][]){}

  static createFrom(initialStatus: CellStatus[][]){
    const cellMatrix = initialStatus.map(row => row.map(status => Cell.create(status)));
    return new World(cellMatrix);
  }

  aliveNeighbors(row: number, column: number) {
    if(this.cellMatrix[row][column - 1]?.isAlive()){
      return 1;
    }
    return 0;
  }
}

describe('The World', ()=>{
    it('creates a cell matrix for a given cell status', ()=>{
      const initialStatus = [
        [Dead, Dead],
        [Dead, Alive],
      ];

      const world = World.createFrom(initialStatus);

      expect(world.cellMatrix).toEqual([
          [Cell.create(Dead), Cell.create(Dead)],
          [Cell.create(Dead), Cell.create(Alive)],
        ]);
    });

    it('gets alive neighbors for a given coordinates', ()=>{
      expect(World.createFrom([[Dead]]).aliveNeighbors(0,0)).toBe(0);
      expect(World.createFrom([[Alive, Dead]]).aliveNeighbors(0,1)).toBe(1);
    });
});
