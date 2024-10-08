class SpatialGrid {
	/**
	 * Constructs a grid for spatial partitioning, with cells of a given size.
	 * @param {number} [cellSize=10] - The size of each grid cell (default is 10 units).
	 */
	constructor(cellSize = 10) {
		// Ensure the cell size is a positive value
		if (cellSize <= 0) {
			throw new Error('Cell size must be a positive value.');
		}
		this.cellSize = cellSize;
		this.grid = {};
	}

	/**
	  * Converts a coordinate into grid cell coordinates.
	  * @param {number} x - The x-coordinate.
	  * @param {number} y - The y-coordinate.
	  * @returns {Object} - The grid cell coordinates (cellX, cellY) based on the object's position.
	  */
	_getCellCoords(x, y) {
		return {
			cellX: Math.floor(x / this.cellSize),
			cellY: Math.floor(y / this.cellSize)
		};
	}

	/**
	    * Inserts a game object into the appropriate grid cells based on its bounding box.
	    * @param {GameObject} gameObject - The object to be inserted into the grid.
	    */
	insert(gameObject) {
		const { minX, minY, maxX, maxY } = gameObject.getBounds();

		for (let x = Math.floor(minX / this.cellSize); x <= Math.floor(maxX / this.cellSize); x++) {
			for (let y = Math.floor(minY / this.cellSize); y <= Math.floor(maxY / this.cellSize); y++) {
				const key = `${x},${y}`;
				if (!this.grid[key]) {
					this.grid[key] = [];
				}
				this.grid[key].push(gameObject);
			}
		}
	}

	/**
	     * Retrieves all objects located within the specified rectangular area.
	     * @param {number} minX - The left boundary of the area.
	     * @param {number} minY - The bottom boundary of the area.
	     * @param {number} maxX - The right boundary of the area.
	     * @param {number} maxY - The top boundary of the area.
	     * @returns {Array} - The list of objects fully contained within the area.
	     */
	retrieve(minX, minY, maxX, maxY) {
		const results = new Set();

		for (let x = Math.floor(minX / this.cellSize); x <= Math.floor(maxX / this.cellSize); x++) {
			for (let y = Math.floor(minY / this.cellSize); y <= Math.floor(maxY / this.cellSize); y++) {
				const key = `${x},${y}`;
				if (this.grid[key]) {
					this.grid[key].forEach(obj => results.add(obj));
				}
			}
		}

		// Filter objects that don't fully fit inside the area
		return Array.from(results).filter(obj => {
			const bounds = obj.getBounds();
			return bounds.minX >= minX && bounds.maxX <= maxX &&
				bounds.minY >= minY && bounds.maxY <= maxY;
		});
	}

	/**
	     * Checks if one object is completely covered by another object.
	     * @param {GameObject} obj1 - The object to check.
	     * @param {GameObject} obj2 - The potential covering object.
	     * @returns {boolean} - True if obj1 is fully covered by obj2, false otherwise.
	     */
	isCovered(obj1, obj2) {
		const bounds1 = obj1.getBounds();
		const bounds2 = obj2.getBounds();
		return bounds1.minX >= bounds2.minX && bounds1.minY >= bounds2.minY &&
			bounds1.maxX <= bounds2.maxX && bounds1.maxY <= bounds2.maxY;
	}

	/**
	     * Checks if a given object is completely covered by any other object in the grid.
	     * @param {GameObject} targetObj - The object to check for coverage.
	     * @returns {boolean} - True if the object is covered by any other object, false otherwise.
	     */
	isCoveredByAny(targetObj) {
		const { minX, minY, maxX, maxY } = targetObj.getBounds();
		const checkedObjects = new Set();

		// Iterate over the grid cells the target object occupies
		for (let x = Math.floor(minX / this.cellSize); x <= Math.floor(maxX / this.cellSize); x++) {
			for (let y = Math.floor(minY / this.cellSize); y <= Math.floor(maxY / this.cellSize); y++) {
				const key = `${x},${y}`;

				// Check each object in the same cell
				if (this.grid[key]) {
					for (const obj of this.grid[key]) {
						// Avoid checking the target object against itself and avoid duplicate checks
						if (obj !== targetObj && !checkedObjects.has(obj)) {
							if (this.isCovered(targetObj, obj)) {
								return true;
							}
							checkedObjects.add(obj);
						}
					}
				}
			}
		}
		return false;
	}
}

module.exports = SpatialGrid;


