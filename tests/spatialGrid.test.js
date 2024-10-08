const GameObject = require('../src/gameObject');
const SpatialGrid = require('../src/spatialGrid');

test('Object is inserted correctly into the grid', () => {
	const grid = new SpatialGrid(10);
	const obj = new GameObject(5, 5, 2, 2);
	grid.insert(obj);

	const result = grid.retrieve(0, 0, 10, 10);
	expect(result).toContain(obj);
});

test('Retrieve objects within a rectangular area', () => {
	const grid = new SpatialGrid(10);
	const obj1 = new GameObject(5, 5, 2, 2);
	const obj2 = new GameObject(15, 15, 2, 2);
	grid.insert(obj1);
	grid.insert(obj2);


	const result = grid.retrieve(0, 0, 10, 10);
	expect(result).toContain(obj1);
	expect(result).not.toContain(obj2);
});




