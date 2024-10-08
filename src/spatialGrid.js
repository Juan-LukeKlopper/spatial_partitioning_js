class SpatialGrid {
	constructor(cellSize = 10) {
		if (cellSize <= 0) {
			throw new Error('Cell size must be a positive value.');
		}
		this.cellSize = cellSize;
		this.grid = {};
	}
}

module.exports = SpatialGrid;


