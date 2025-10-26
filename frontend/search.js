const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    // Get the student name from the query string
    const nameQuery = event.queryStringParameters.name;

    // The actual API URL is stored as an environment variable on the server
    const API_URL = process.env.VITE_API_URL;

    if (!nameQuery) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Name query parameter is required.' }),
        };
    }

    try {
        const response = await fetch(`${API_URL}?name=${encodeURIComponent(nameQuery)}`);
        const data = await response.json();
        return { statusCode: 200, body: JSON.stringify(data) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ message: 'Error fetching data.' }) };
    }
};
