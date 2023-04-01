import { Cell, CellStatus } from "../core/cell";
import { World } from "../core/world";

const { Dead, Alive } = CellStatus;

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
    expect(World.createFrom([
      [Alive, Dead, Alive],
      [Dead, Dead, Dead],
    ]).aliveNeighbors(0,1)).toBe(2);
    expect(World.createFrom([
      [Alive, Alive, Alive],
      [Alive, Dead, Alive],
      [Alive, Alive, Alive]]).aliveNeighbors(1, 1)).toBe(8);
  });

  it('generates the next state of the world', ()=>{
    const initialStatus = [
      [Dead, Alive, Dead],
      [Dead, Alive, Dead],
      [Dead, Alive, Dead],
    ];

    const nextGeneration = World.createFrom(initialStatus).nextGeneration();

    expect(nextGeneration.cellMatrix).toEqual([
      [Cell.create(Dead), Cell.create(Dead), Cell.create(Dead)],
      [Cell.create(Alive), Cell.create(Alive), Cell.create(Alive)],
      [Cell.create(Dead), Cell.create(Dead), Cell.create(Dead)],
    ]);
  });

  it('never changes for a given initial block pattern', () => {
    const initialWorld = World.createFrom([
      [Alive, Alive, Dead, Dead, Dead],
      [Alive, Alive, Dead, Dead, Dead],
      [Dead, Dead, Dead, Dead, Dead],
      [Dead, Dead, Dead, Dead, Dead],
      [Dead, Dead, Dead, Dead, Dead],
    ]);

    const currentWorld = initialWorld.nextGeneration().nextGeneration().nextGeneration();

    expect(currentWorld).toEqual(initialWorld);
  });

  it('Reestablishes the same state after two generations when a given oscillator pattern is provided', () => {
    const world = World.createFrom([
      [Dead, Dead, Dead, Dead, Dead],
      [Dead, Dead, Alive, Dead, Dead],
      [Dead, Dead, Alive, Dead, Dead],
      [Dead, Dead, Alive, Dead, Dead],
      [Dead, Dead, Dead, Dead, Dead],
    ]);

    const result = world.nextGeneration().nextGeneration();

    expect(result).toEqual(world);
  });
});
