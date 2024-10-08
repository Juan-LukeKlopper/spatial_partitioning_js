class GameObject {
	/**
	 * Constructs a new game object with specified position and size.
	 * @param {number} x - The x-coordinate of the object's position.
	 * @param {number} y - The y-coordinate of the object's position.
	 * @param {number} [width=1] - The width of the object (default is 1 if not provided).
	 * @param {number} [height=1] - The height of the object (default is 1 if not provided).
	 */
	constructor(x, y, width = 1, height = 1) {
		if (width <= 0 || height <= 0) {
			throw new Error('Width and height must be positive values.');
		}
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	/**
	     * Returns the bounding box of the object as an object containing its min and max coordinates.
	     * @returns {Object} - The boundaries of the object (minX, minY, maxX, maxY).
	     */
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
