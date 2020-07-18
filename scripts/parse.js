const puppeteer = require('puppeteer');

(async () => {
	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto('http://127.0.0.1:5000/users/');
		//await page.screenshot({ path: 'example.png' });

		console.log(
			await page.$$eval("#users tr",
				async (arr) =>
					arr.map(el => el.querySelectorAll("td")[1].innerText)
			)
		);

		await browser.close();
	}
	catch (err) {
		console.log('error: ', err);
	}
})();