import { Cell, CellStatus } from "../core/cell";
const { Dead, Alive } = CellStatus;

class World{
  constructor(readonly cellMatrix: Cell[][]){}

  static createFrom(initialStatus: CellStatus[][]){
    const cellMatrix = initialStatus.map(row => row.map(status => Cell.create(status)));
    return new World(cellMatrix);
  }

  aliveNeighbors(row: number, column: number) {
    return this.aliveColumnNeighbors(column, row);
  }

  private aliveColumnNeighbors(column: number, row: number) {
    let aliveNeighbors = 0;
    const previousColumn = column - 1;
    if (previousColumn >= 0 && this.isAliveCellAt(row, previousColumn)) {
      aliveNeighbors++;
    }
    const nextColumn = column + 1;
    const rowLength = this.cellMatrix[row].length;
    if (nextColumn < rowLength && this.isAliveCellAt(row, nextColumn)) {
      aliveNeighbors++;
    }
    return aliveNeighbors;
  }

  private isAliveCellAt(row: number, column: number) {
    return this.cellMatrix[row][column].isAlive();
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
      expect(World.createFrom([[Dead, Alive]]).aliveNeighbors(0,0)).toBe(1);
      expect(World.createFrom([[Alive, Dead]]).aliveNeighbors(0,1)).toBe(1);
      expect(World.createFrom([[Alive, Dead, Alive]]).aliveNeighbors(0,1)).toBe(2);
      expect(World.createFrom([
        [Alive, Dead, Alive],
        [Alive, Alive, Alive],
      ]).aliveNeighbors(0,1)).toBe(5);
    });
});
