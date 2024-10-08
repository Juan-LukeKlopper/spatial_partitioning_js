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


	isCovered(obj1, obj2) {
		const bounds1 = obj1.getBounds();
		const bounds2 = obj2.getBounds();
		return bounds1.minX >= bounds2.minX && bounds1.minY >= bounds2.minY &&
			bounds1.maxX <= bounds2.maxX && bounds1.maxY <= bounds2.maxY;
	}
}

module.exports = SpatialGrid;


