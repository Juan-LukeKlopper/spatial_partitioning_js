const GameObject = require('../src/gameObject');
const SpatialGrid = require('../src/spatialGrid');

// Helper function to generate a large number of random objects
function generateRandomObjects(grid, numObjects, maxX, maxY) {
	for (let i = 0; i < numObjects; i++) {
		const x = Math.floor(Math.random() * maxX);  // Random x position
		const y = Math.floor(Math.random() * maxY);  // Random y position
		const width = Math.floor(Math.random() * 5) + 1; // Random width between 1 and 5
		const height = Math.floor(Math.random() * 5) + 1; // Random height between 1 and 5
		const obj = new GameObject(x, y, width, height);
		grid.insert(obj);
	}
}

// Test with a much larger grid and more objects
test('Insert 1000 objects into a large 1000x1000 grid', () => {
	const grid = new SpatialGrid(10);  // Grid with 10x10 cells
	const numObjects = 1000;           // Insert 1000 objects
	const maxGridSize = 1000;          // Grid covers 1000x1000 units

	generateRandomObjects(grid, numObjects, maxGridSize, maxGridSize);


	// Retrieve objects in an area and ensure they are correctly inserted
	const retrieved = grid.retrieve(0, 0, 50, 50); // Retrieve objects in a small area of the large grid
	expect(retrieved.length).toBeGreaterThan(0);   // Ensure some objects are retrieved
});

// Test the performance and correctness of retrieval in a large grid
test('Retrieve objects from a large grid (2000x2000) after inserting 5000 objects', () => {
	const grid = new SpatialGrid(10);  // Grid with 10x10 cells
	const numObjects = 5000;           // Insert 5000 objects
	const maxGridSize = 2000;          // Grid covers 2000x2000 units

	generateRandomObjects(grid, numObjects, maxGridSize, maxGridSize);


	// Retrieve objects in a section of the grid and validate
	const retrieved = grid.retrieve(100, 100, 200, 200); // A slice of the large grid
	expect(retrieved.length).toBeGreaterThan(0);  // Ensure objects are retrieved
});

// Test inserting and checking coverage in a large grid
test('Check object coverage in a large grid after inserting 2000 objects', () => {
	const grid = new SpatialGrid(10);  // Grid with 10x10 cells
	const numObjects = 2000;           // Insert 2000 objects
	const maxGridSize = 1000;          // Grid covers 1000x1000 units

	generateRandomObjects(grid, numObjects, maxGridSize, maxGridSize);

	// Insert two overlapping objects for coverage testing
	const obj1 = new GameObject(500, 500, 10, 10); // Larger object
	const obj2 = new GameObject(505, 505, 5, 5);   // Smaller object inside obj1
	grid.insert(obj1);
	grid.insert(obj2);

	// Check if obj2 is covered by obj1
	expect(grid.isCoveredByAny(obj2)).toBe(true);
});


