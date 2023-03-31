/*
Any live cell with fewer than two live neighbors dies, as if caused by underpopulation.
Any live cell with two or three live neighbors lives on to the next generation.
Any live cell with more than three live neighbors dies, as if by overcrowding.
Any dead cell with exactly three live neighbors becomes a live cell.
 */

enum CellStatus {
	Alive,
	Dead
}

class Cell {
	constructor(readonly status: CellStatus) {}


	regenerate(numberOfNeighbors: number) {
		if (this.status === CellStatus.Alive) {
			if(numberOfNeighbors == 2 || numberOfNeighbors == 3)
				return CellStatus.Alive;
		}
		return CellStatus.Dead;
	}
}

describe('In the Game of Life', ()=>{
	it('Any live cell with fewer than two live neighbors dies, as if caused by underpopulation', ()=>{
		expect(new Cell(CellStatus.Alive).regenerate(1)).toBe(CellStatus.Dead);
		expect(new Cell(CellStatus.Dead).regenerate(1)).toBe(CellStatus.Dead);
	});

	it('Any live cell with two or three live neighbors lives on to the next generation', ()=>{
		expect(new Cell(CellStatus.Alive).regenerate(2)).toBe(CellStatus.Alive);
		expect(new Cell(CellStatus.Alive).regenerate(3)).toBe(CellStatus.Alive);
		expect(new Cell(CellStatus.Dead).regenerate(3)).toBe(CellStatus.Dead);
	});
});
