const Model = require('./model');
const base = require('../base/dal');

const dal = base(Model);

dal.getStats = function (opts) {
	const query = [
		{ "$project": {
			"createdAt": 1,
			"install": {
				"$cond": {
					"if": {
						"$eq": [ "$event", { "$literal": "install" } ]
					},
					"then": 1, "else": 0
				}
			},
			"uninstall": {
				"$cond": {
					"if": {
						"$eq": [ "$event", { "$literal": "uninstall" } ]
					},
					"then": 1, "else": 0
				}
			}
		}},
		{ "$group": {
			"_id": { "$dayOfYear": "$createdAt" },
			"install": { "$sum": "$install" },
			"uninstall": { "$sum": "$uninstall" },
		}}
	];
	return Model.aggregate(query);
}


module.exports = dal;
