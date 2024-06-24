const https = require('https');

// URL of the website to visit
const url = 'https://www.kalbela.com/opinion-poll/-/103';

// Function to visit the website
function visitWebsite() {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            console.log(`Visited ${url} with status code: ${res.statusCode}`);
            res.on('data', () => {});
            res.on('end', () => {
                resolve();
            });
        }).on('error', (e) => {
            console.error(`Error visiting ${url}: ${e.message}`);
            reject(e);
        });
    });
}

// Function to visit the website multiple times concurrently
async function visitWebsiteMultipleTimes(times) {
    const promises = [];
    for (let i = 0; i < times; i++) {
        promises.push(visitWebsite());
    }
    await Promise.all(promises);
}

// Main function to handle the timed visits
async function main() {
    const visits = 600000;
    const interval = 30000; // 30 seconds

    console.log(`Starting to visit ${url} ${visits} times in ${interval / 1000} seconds...`);
    const start = Date.now();

    try {
        await visitWebsiteMultipleTimes(visits);
    } catch (error) {
        console.error('An error occurred during the visits:', error);
    }

    const end = Date.now();
    console.log(`Completed ${visits} visits in ${(end - start) / 1000} seconds`);
}

// Start the process
main();
