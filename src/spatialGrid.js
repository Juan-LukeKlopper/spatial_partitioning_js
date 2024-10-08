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



}

module.exports = SpatialGrid;


