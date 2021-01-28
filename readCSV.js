const csv = require("csv-parser");
const fs = require("fs");

const results = [];

fs.createReadStream("VBPCourseAttendees.csv")
	.pipe(csv({}))
	.on("data", (data) => {
		if (data["Mobile Number:"]) results.push(data);
	})
	.on("end", () => {
		results.map((result) => {
			let returnResult = { ...result };

			delete returnResult["Mobile Number:"];

			return returnResult;
		});

		let data = [];
		for (let result of results) {
			data.push({
				name: result["﻿Name"],
				known: result["Known"] === "TRUE",
			});
		}
		fs.writeFileSync("VBPCourseAttendees.json", JSON.stringify(data));
	});
