export enum CellStatus {
  Alive,
  Dead
}

export class Cell {
  constructor(readonly status: CellStatus) {
  }


  regenerate(numberOfNeighbors: number) {
    if (this.status === CellStatus.Alive) {
      if (numberOfNeighbors == 2 || numberOfNeighbors == 3)
        return CellStatus.Alive;
      return CellStatus.Dead;
    } else {
      if (numberOfNeighbors == 3) {
        return CellStatus.Alive;
      }
      return CellStatus.Dead;
    }
  }
}
