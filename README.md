## **Spatial Partitioning Project**

### **Overview**
This project implements a **grid-based spatial partitioning technique** for handling 2D objects with positions and dimensions. The spatial grid divides a 2D space into cells of fixed size (default 10x10 units), allowing efficient insertion, retrieval, and coverage detection of objects within the grid.

Key functionalities include:
- Inserting objects into the appropriate grid cells based on their position.
- Retrieving all objects that reside within a specified rectangular area.
- Determining if one object is completely covered by another.

### **Features**
- Grid-based partitioning for 2D spatial data.
- Efficient object insertion and retrieval.
- Coverage detection between objects.
- Configurable cell size.
  
### **Project Structure**
```
.
├── src
│   ├── gameObject.js     # Defines the GameObject class.
│   └── spatialGrid.js    # Implements the SpatialGrid class for partitioning.
├── tests
│   ├── spatialGrid.test.js              # Unit tests for core functionality.
│   └── spatialGrid.heavy.test.js  # Large-scale testing.
├── package.json          # Project configuration and dependencies.
├── package-lock.json    
└── README.md             # Project documentation.
```

### **Setup**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Juan-LukeKlopper/spatial_partitioning_js.git  spatial-partitioning 
   cd spatial-partitioning
   ```

2. **Install dependencies** (if any, e.g., for testing):
   ```bash
   npm install
   ```

### **Usage**

1. **GameObject**:
   The `GameObject` class is used to create objects with position `(x, y)` and dimensions `(width, height)`.

   Example:
   ```js
   const GameObject = require('./src/gameObject');
   const obj = new GameObject(10, 20, 5, 5); // Object at position (10, 20) with width 5 and height 5.
   ```

2. **SpatialGrid**:
   The `SpatialGrid` class is used to create a spatial grid and manage objects within it. Objects can be inserted into the grid and retrieved based on their position or area.

   Example:
   ```js
   const SpatialGrid = require('./src/spatialGrid');
   const grid = new SpatialGrid(10); // Grid with 10x10 unit cells.
   
   const obj1 = new GameObject(5, 5, 2, 2);
   grid.insert(obj1);  // Insert object into the grid.

   const retrievedObjects = grid.retrieve(0, 0, 10, 10); // Retrieve objects in a 10x10 area.
   ```

### **Methods Overview**

1. **GameObject Class**:
   - `constructor(x, y, width = 1, height = 1)`: Creates a new object with the specified position and dimensions.
   - `getBounds()`: Returns the object's bounding box (min and max coordinates).

2. **SpatialGrid Class**:
   - `insert(gameObject)`: Inserts an object into the appropriate grid cells based on its position.
   - `retrieve(minX, minY, maxX, maxY)`: Retrieves all objects within the specified rectangular area.
   - `isCovered(obj1, obj2)`: Checks if `obj1` is completely covered by `obj2`.
   - `isCoveredByAny(targetObj)`: Checks if `targetObj` is covered by any other object in the grid.

### **Testing**

The project uses **Jest** for testing. Unit tests ensure the functionality of core methods, and additional "Heavy" tests stress-test the system with large datasets.

To run the tests:

1. **Run all tests**:
   ```bash
   npx jest 
   ```

2. **Run specific tests**:
    ```bash
    npx jest tests/spatialGrid.test.js
    ```

