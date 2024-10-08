class SpatialGrid {
	constructor(cellSize = 10) {
		if (cellSize <= 0) {
			throw new Error('Cell size must be a positive value.');
		}
		this.cellSize = cellSize;
		this.grid = {};
	}

	_getCellCoords(x, y) {
		return {
			cellX: Math.floor(x / this.cellSize),
			cellY: Math.floor(y / this.cellSize)
		};
	}
}

module.exports = SpatialGrid;


