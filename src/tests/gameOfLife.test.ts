/*
Any live cell with fewer than two live neighbors dies, as if caused by underpopulation.
Any live cell with two or three live neighbors lives on to the next generation.
Any live cell with more than three live neighbors dies, as if by overcrowding.
Any dead cell with exactly three live neighbors becomes a live cell.
 */

import { Cell, CellStatus } from "../core/cell";

describe('In the Game of Life', ()=>{
	it('Any live cell with fewer than two live neighbors dies, as if caused by underpopulation', ()=>{
		expect(new Cell(CellStatus.Alive).regenerate(1).isAlive()).toBe(false);
		expect(new Cell(CellStatus.Dead).regenerate(1).isAlive()).toBe(false);
	});

	it('Any live cell with two or three live neighbors lives on to the next generation', ()=>{
		expect(new Cell(CellStatus.Alive).regenerate(2).isAlive()).toBe(true);
		expect(new Cell(CellStatus.Alive).regenerate(3).isAlive()).toBe(true);
		expect(new Cell(CellStatus.Dead).regenerate(4).isAlive()).toBe(false)
	});

	it('Any live cell with more than three live neighbors dies, as if by overcrowding', ()=>{
		expect(new Cell(CellStatus.Alive).regenerate(4).isAlive()).toBe(false);
		expect(new Cell(CellStatus.Dead).regenerate(4).isAlive()).toBe(false);
	});

	it('Any dead cell with exactly three live neighbors becomes a live cell on the next generation', ()=> {
		expect(new Cell(CellStatus.Dead).regenerate(3).isAlive()).toBe(true);
	});
});
