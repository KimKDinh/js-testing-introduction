const { default: puppeteer } = require('puppeteer');
const {generateText, CheckAndGenerate} = require('./util');
// unit Testing
test('testing Output name and age',()=>{
    const text = generateText('Max', 29);
    expect(text).toBe('Max (29 years old)');
});

test("should output data-less text", () =>{
    const text = generateText('A', null);
    expect(text).toBe('A (null years old)');
})
// integration testing

test("should generate a valid text output", () =>{
 const text =  CheckAndGenerate("Mac", 29);
 expect(text).toBe('Mac (29 years old)');
})
//end to end testing with puppeteer
test("testing element creation with correct text and class", async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        //slowMo: 80,
        //args:['--window-size=1920,1080']
    });
    const page = await browser.newPage();
    await page.goto('file:///C:/Users/Yawach/Documents/Visual%20Code/testing/js-testing-introduction/index.html');
    await page.click('input#name')
    await page.type('input#name','Mike')
    await page.click('input#age')
    await page.type('input#age', '30')
    await page.click('#btnAddUser')
    const finaltext = await page.$eval('.user-list', el => el.textContent)
    expect(finaltext).toBe('Mike (30 years old)');
}, 10000);