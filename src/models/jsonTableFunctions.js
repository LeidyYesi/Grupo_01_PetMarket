const path = require('path');
const fs = require('fs');

let model = function(tableName) {
	return {
		fileName: path.join(__dirname, '../data/' + tableName + '.json'),

		getData: function () {
			const allRows = JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
			return allRows
		},
		generateId: function () {
			let allRows = this.findAll();
			let lastRow = allRows.pop();
			if (lastRow) {
				return lastRow.id + 1;
			}
			return 1;
		},
		findAll: function () {
			return this.getData();
		},
		findByPk: function (id) {
			let allRows = this.findAll();
			let rowFound = allRows.find(oneRow => oneRow.id === id);
			return rowFound;
		},
		findByField: function (field, text) {
			let allRows = this.findAll();
			console.log(field);
			console.log(text);
			let rowFound = allRows.find(oneRow => oneRow[field] === text);
			return rowFound;
		},
		create: function (rowData) {
			let allRows = this.findAll();
			let newRow = {
				id: this.generateId(),
				...rowData
			}
			allRows.push(newRow);
			fs.writeFileSync(this.fileName, JSON.stringify(allRows, null,  ' '));
			return newRow;
		},
		delete: function (id) {
			let allRows = this.findAll();
			let finalRows = allRows.filter(oneRow => oneRow.id !== id);
			fs.writeFileSync(this.fileName, JSON.stringify(finalRows, null, ' '));
			return true;
		},
		update(rowData) {
			let allRows = this.findAll();
            let updatedRows = allRows.map(oneRow => {
                if (oneRow.id == rowData.id) {
                    return rowData;
                }
                return oneRow;
            }); 

			fs.writeFileSync(this.fileName, JSON.stringify(updatedRows, null,  ' '));

            return rowData.id;
        },
	}
}

const groupsModel1 = model('users');

// console.log(groupsModel1.update({
// 	"id": 7,
// 	"nombre": "Ger",
// 	"apellido": "Man",
// 	"email": "gbogom@gmail.edu",
// 	"password": "$2a$10$Zeu/BsPoIACp/..R6Ld.i.3eOnQLcBuGUNGppxjqU04rTfEVP34Su",
// 	"category": "Administrador",
// 	"imagen": "1674523384767_img.png"
//    }))


module.exports = model;

