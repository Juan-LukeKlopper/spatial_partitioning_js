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

test('Object is completely covered by another object', () => {
	const obj1 = new GameObject(5, 5, 2, 2);
	const obj2 = new GameObject(4, 4, 5, 5);
	const grid = new SpatialGrid();

	// Insert objects to check coverage
	grid.insert(obj1);
	grid.insert(obj2);

	expect(grid.isCovered(obj1, obj2)).toBe(true);
});

test('Object is covered by any other object', () => {
	const grid = new SpatialGrid(10);
	const obj1 = new GameObject(5, 5, 2, 2); // Smaller object
	const obj2 = new GameObject(4, 4, 5, 5); // Larger object that covers obj1
	const obj3 = new GameObject(10, 10, 2, 2); // Object not covering obj1

	grid.insert(obj1);
	grid.insert(obj2);
	grid.insert(obj3);

	// Test that obj1 is covered by obj2
	expect(grid.isCoveredByAny(obj1)).toBe(true);

	// Test that obj3 is not covered by any object
	expect(grid.isCoveredByAny(obj3)).toBe(false);
});

