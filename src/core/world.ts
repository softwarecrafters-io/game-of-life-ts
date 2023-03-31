import { Cell, CellStatus } from "./cell";

export class World {
  constructor(readonly cellMatrix: ReadonlyArray<ReadonlyArray<Cell>>) {}

  static createFrom(initialStatus: CellStatus[][]) {
    const cellMatrix = initialStatus.map(row => row.map(status => Cell.create(status)));
    return new World(cellMatrix);
  }

  aliveNeighbors(row: number, column: number) {
    return (
      this.alivePreviousRowNeighbors(row, column) +
      this.aliveColumnNeighbors(row, column) +
      this.aliveNextRowNeighbors(row, column)
    );
  }

  private alivePreviousRowNeighbors(row: number, column: number) {
    let aliveNeighbors = 0;
    if (row - 1 >= 0) {
      if (this.isAliveCellAt(row - 1, column)) {
        aliveNeighbors++;
      }
      aliveNeighbors += this.aliveColumnNeighbors(row - 1, column);
    }
    return aliveNeighbors;
  }

  private aliveNextRowNeighbors(row: number, column: number) {
    let aliveNeighbors = 0;
    if (row + 1 < this.cellMatrix.length) {
      if (this.isAliveCellAt(row + 1, column)) {
        aliveNeighbors++;
      }
      aliveNeighbors += this.aliveColumnNeighbors(row + 1, column);
    }
    return aliveNeighbors;
  }

  private aliveColumnNeighbors(row: number, column: number) {
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

  nextGeneration() {
    const nextGenerationCellMatrix = this.cellMatrix.map((row, rowIndex) =>
      row.map((cell, columnIndex) =>
        cell.regenerate(this.aliveNeighbors(rowIndex, columnIndex))));
    return new World(nextGenerationCellMatrix);
  }
}
