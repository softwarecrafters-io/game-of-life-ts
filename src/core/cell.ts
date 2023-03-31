export enum CellStatus {
  Alive,
  Dead
}

export class Cell {
  constructor(readonly status: CellStatus) {}

  regenerate(numberOfNeighbors: number) {
    return this.status === CellStatus.Alive
      ? this.statusForAliveCell(numberOfNeighbors)
      : this.statusForDeadCell(numberOfNeighbors);
  }

  private statusForAliveCell(numberOfNeighbors: number) {
    const isStablePopulation = numberOfNeighbors == 2 || numberOfNeighbors == 3;
    if (isStablePopulation)
      return CellStatus.Alive;
    return CellStatus.Dead;
  }

  private statusForDeadCell(numberOfNeighbors: number) {
    const isFertilePopulation = numberOfNeighbors == 3;
    if (isFertilePopulation) {
      return CellStatus.Alive;
    }
    return CellStatus.Dead;
  }
}
