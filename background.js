// Listen for messages from the popup or other parts of the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extract_messages") {
        // Query the currently active tab in the current window
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                const activeTabId = tabs[0].id;

                // Inject content.js into the active tab
                chrome.scripting.executeScript(
                    {
                        target: { tabId: activeTabId },
                        files: ["content.js"]
                    },
                    () => {
                        if (chrome.runtime.lastError) {
                            console.error(
                                `Failed to execute script: ${chrome.runtime.lastError.message}`
                            );
                        } else {
                            console.log("Content script injected successfully.");
                        }
                    }
                );
            } else {
                console.error("No active tab found to inject the script.");
            }
        });
    }
});
