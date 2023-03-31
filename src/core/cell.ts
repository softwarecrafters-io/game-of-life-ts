export enum CellStatus {
  Alive,
  Dead
}

export class Cell {
  constructor(readonly status: CellStatus) {}

  regenerate(numberOfNeighbors: number) {
    const nextStatus = this.status === CellStatus.Alive
      ? this.statusForAliveCell(numberOfNeighbors)
      : this.statusForDeadCell(numberOfNeighbors);
    return new Cell(nextStatus);
  }

  isAlive() {
    return this.status === CellStatus.Alive;
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
