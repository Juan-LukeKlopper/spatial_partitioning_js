class GameObject {
	constructor(x, y, width = 1, height = 1) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	getBounds() {
		return {
			minX: this.x,
			minY: this.y,
			maxX: this.x + this.width,
			maxY: this.y + this.height
		};
	}
}

module.exports = GameObject;

