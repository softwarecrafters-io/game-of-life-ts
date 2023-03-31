/*
Any live cell with fewer than two live neighbors dies, as if caused by underpopulation.
Any live cell with more than three live neighbors dies, as if by overcrowding.
Any live cell with two or three live neighbors lives on to the next generation.
Any dead cell with exactly three live neighbors becomes a live cell.
 */

enum CellStatus {
	Alive,
	Dead
}

class Cell {
	constructor(readonly status: CellStatus) {}


	regenerate(numberOfNeighbors: number) {
		return undefined;
	}
}

describe('In the Game of Life', ()=>{
	it('Any live cell with fewer than two live neighbors dies, as if caused by underpopulation', ()=>{
		const cell = new Cell(CellStatus.Alive);
		const numberOfNeighbors = 1;

		const nextStatus = cell.regenerate(numberOfNeighbors)

		expect(nextStatus).toBe(CellStatus.Dead);
	});


});
