import { Cell, CellStatus } from "../core/cell";
const { Dead, Alive } = CellStatus;

class World{
  constructor(readonly cellMatrix: Cell[][]){}

  static createFrom(initialStatus: CellStatus[][]){
    const cellMatrix = initialStatus.map(row => row.map(status => Cell.create(status)));
    return new World(cellMatrix);
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
        ] );
    });
});
