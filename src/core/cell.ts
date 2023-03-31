export enum CellStatus {
  Alive,
  Dead
}

export class Cell {
  constructor(readonly status: CellStatus) {}

  regenerate(numberOfNeighbors: number) {
    if (this.status === CellStatus.Alive) {
      return this.statusForAliveCell(numberOfNeighbors);
    } else {
      return this.statusForDeadCell(numberOfNeighbors);
    }
  }

  private statusForAliveCell(numberOfNeighbors: number) {
    if (numberOfNeighbors == 2 || numberOfNeighbors == 3)
      return CellStatus.Alive;
    return CellStatus.Dead;
  }

  private statusForDeadCell(numberOfNeighbors: number) {
    if (numberOfNeighbors == 3) {
      return CellStatus.Alive;
    }
    return CellStatus.Dead;
  }
}
