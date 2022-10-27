
const center = {
    x: 2.5,
    z: 2.5
}

const castleConfig = {
    floors: [
        {
            number: 1,
            position: [center.x, 0.5, center.z]

        },
        {
            number: 2,
            position: [center.x, 1.5, center.z]

        },
        {
            number: 3,
            position: [center.x, 2.5, center.z]

        },
        {
            number: 4,
            position: [center.x, 3.5, center.z]

        }
    ],
    columns: [
        {
            position: [0, 0, 0]
        },
        {
            position: [floorScale.x, 0, 0]
        },
        {
            position: [floorScale.x, 0, floorScale.z]
        },
        {
            position: [0, 0, floorScale.z]
        },
    ]
}

class Castle extends Objeto3D {
    constructor(menu) {
        super(null, null, menu);
        this.menu.addCastlePart(this);

        this.columns = [];
        this.floors = [];

        for (const floorConfig of castleConfig.floors) {
            let floor = new Floor(menu);
            floor.build();

            floor.setPosition(floorConfig.position);
            floor.number = floorConfig.number;
            floor.updateLocalMatrix();

            this.addChild(floor);
            this.floors.push(floor);
        }

        for (const columnConfig of castleConfig.columns) {
            let column = new Column(30, 30, menu);
            column.build();
            column.setPosition(columnConfig.position);
            column.updateLocalMatrix();
            this.addChild(column);

            this.columns.push(column);
        }
    }

    update() {
        for (const floor of this.floors) {
            // hide upper floors
            floor.empty = (floor.number > this.menu.castleFloors);
        }
    }
}