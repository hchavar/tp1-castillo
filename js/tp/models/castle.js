const castleConfig = {
    floors: [
        {
            number: 1,
            position: [2.5, 0.5, 2.5]

        },
        {
            number: 2,
            position: [2.5, 1.5, 2.5]

        },
        {
            number: 3,
            position: [2.5, 2.5, 2.5]

        },
        {
            number: 4,
            position: [2.5, 3.5, 2.5]

        }
    ],
    columns : [
        {
            position: [0, 0, 0]
        },
        {
            position: [5, 0, 0]
        },
        {
            position: [5, 0, 5]
        },
        {
            position: [0, 0, 5]
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
    
            floor.setPosition(floorConfig.position);
            floor.number = floorConfig.number;
            floor.updateLocalMatrix();
    
            this.addChild(floor);
            this.floors.push(floor);
        }
        
        for (const columnConfig of castleConfig.columns) {
            let column = new Column(30, 30, menu);
            column.setPosition(columnConfig.position);
            column.updateLocalMatrix();
            this.addChild(column);

            this.columns.push(column);
        }
    }

    update() {
        for (const floor of this.floors) {
            // hide upper floors
            floor.empty = (floor.number > this.menu.castleFloors );
        }
    }
}