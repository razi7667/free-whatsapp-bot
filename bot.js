const qrcode = require('qrcode-terminal');
const { Client, MessageMedia } = require('whatsapp-web.js');
const puppeteer = require('puppeteer');
const fs = require('fs');

// Initialize the WhatsApp client
const client = new Client();

// Generate and display the QR code
client.on('qr', (qr) => {
    console.log('Scan the QR code below to log in:');
    qrcode.generate(qr, { small: true });
});

// Log a message when the client is ready
client.on('ready', () => {
    console.log('WhatsApp bot is ready!');
});

// Handle incoming messages
client.on('message', (message) => {
    console.log(`Message from ${message.from}: ${message.body}`);

    // Auto-reply example
    if (message.body.toLowerCase() === 'hello') {
        message.reply('Hi there! How can I help you today?');
    } else if (message.body.toLowerCase() === 'bye') {
        message.reply('Goodbye! Have a great day!');
    } else if (message.body.toLowerCase() === 'send pdf') {
        // Define the absolute path of the existing PDF file
        const filePath = 'file.pdf'; // Replace with your PDF file path

        // Check if the file exists before sending
        if (fs.existsSync(filePath)) {
            console.log('PDF file exists. Sending...');

            try {
                // Create media from the file path
                const media = MessageMedia.fromFilePath(filePath);

                // Send the PDF with a caption
                client.sendMessage(message.from, media, { caption: 'Here is your PDF!' });
                console.log('PDF sent successfully!');
            } catch (error) {
                console.error('Error sending PDF:', error);
            }
        } else {
            console.log('PDF file does not exist at:', filePath);
            message.reply('Sorry, the PDF file could not be found.');
        }
    }
});

// Start the client
client.initialize();
