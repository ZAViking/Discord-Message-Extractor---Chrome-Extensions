let extractedMessages = [];

// Extract messages
document.querySelectorAll('.message-2qnXI6').forEach(message => {
    const content = message.querySelector('.markup-eYLPri')?.innerText || '';
    const timestamp = message.querySelector('time')?.getAttribute('datetime') || '';
    extractedMessages.push({ content, timestamp });
});

// Convert extracted messages to JSON
const jsonData = JSON.stringify(extractedMessages, null, 2);

// Create a Blob from the JSON
const blob = new Blob([jsonData], { type: 'application/json' });
const url = URL.createObjectURL(blob);

// Create and click a download link
const a = document.createElement('a');
a.href = url;
a.download = 'discord_messages.json';
a.click();

// Clean up
URL.revokeObjectURL(url);
