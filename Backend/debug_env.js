require('dotenv').config();

console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? 'Loaded (Length: ' + process.env.CLOUDINARY_API_KEY.length + ')' : 'Missing');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? 'Loaded (Length: ' + process.env.CLOUDINARY_API_SECRET.length + ')' : 'Missing');

// Check for common issues like quotes in the value
if (process.env.CLOUDINARY_API_SECRET) {
    if (process.env.CLOUDINARY_API_SECRET.startsWith('"') || process.env.CLOUDINARY_API_SECRET.startsWith("'")) {
        console.log('WARNING: API Secret starts with a quote character!');
    }
}
