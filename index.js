const puppeteer = require("puppeteer");
const fs = require("fs");

const data = JSON.parse(fs.readFileSync("VBPCourseAttendees.json"));

// const data = [{ name: "Carolyn", known: "true" }];

(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto("https://web.whatsapp.com");
	await page.waitForSelector(".selectable-text");
	// Type our query into the search bar
	await page.click(".selectable-text");

	for (let i = 0; i < data.length; i++) {
		const person = data[i];
		await page.type(".selectable-text", person.name);
		await page.waitForSelector(".matched-text");
		await page.click(".matched-text");

		await page.click(
			"#main > footer > div._3SvgF._1mHgA.copyable-area > div._3qpzV.rN1v9 > div.bDS3i > div > div > span"
		);

		// Upload image
		const inputUploadHandle = await page.$(
			"#main > footer > div._3SvgF._1mHgA.copyable-area > div._3qpzV.rN1v9 > div.bDS3i > div > span > div > div > ul > li:nth-child(1) > button > input[type=file]"
		);
		inputUploadHandle.uploadFile("Veda-SSR.jpeg");
		await page.waitFor(2000);
		await page.waitForSelector(
			"#app > div > div > div._3Bog7 > div.i5ly3._2l_Ww > span > div > span > div > div > div._1RHZR.b-lt8 > span > div > div"
		);
		await page.click(
			"#app > div > div > div._3Bog7 > div.i5ly3._2l_Ww > span > div > span > div > div > div._1RHZR.b-lt8 > span > div > div"
		);

		// Send Messages

		await sendMessage(
			page,
			`Hare Krishna ${person.name.split(" ")[0]}!! ${
				person.known ? "" : "This is Josh from KCSOC National "
			}`
		);
		await sendMessage(
			page,
			`Have you signed up to our latest _exclusive_ KCSOC course yet? It's called Veda: Science of Self Realisation! and it's being facilitated by Sesa Das who used to be monk at Bhaktivedanta Manor`
		);
		await sendMessage(
			page,
			`We're gonna be diving deep into topics like "The Existence of God" and "How do we know truth", DEEEP stuff like that lol`
		);
		await sendMessage(
			page,
			`If you're interested, the first session is on 7th Feb at 10am! (On Zoom) You can find out more here: bit.ly/veda-signup`
		);
	}
})();

const sendMessage = async (page, message) => {
	await page.click(
		"#main > footer > div._3SvgF._1mHgA.copyable-area > div.DuUXI > div > div._1awRl.copyable-text.selectable-text"
	);
	await page.type(
		"#main > footer > div._3SvgF._1mHgA.copyable-area > div.DuUXI > div > div._1awRl.copyable-text.selectable-text",
		message
	);
	await page.click(
		"#main > footer > div._3SvgF._1mHgA.copyable-area > div:nth-child(3) > button > span"
	);
};
