const notificationContainer = document.getElementById('alert-container');
const NOTIFICATION_TYPES = {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
    MINT: 'mint'
};



function addNotification(type, text) {
    // create the DIV and add the required classes
    const newNotification = document.createElement('div');
    newNotification.classList.add('notification', `notification-${type}`);

    const innerNotification = `<strong>${type == "mint" ? "New Mint" : type}:</strong> ${text}`;

    // insert the inner elements
    newNotification.innerHTML = innerNotification;

    // add the newNotification to the container
    document.getElementById('alert-container').appendChild(newNotification);

    return newNotification;
}

function removeNotification(notification, delay = 2000) {
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => { // remove notification from the DOM after 0.5 seconds
            document.getElementById('alert-container').removeChild(notification);
        }, 500);
    }, delay);
}

setInterval(() => {
    for (let i = 0; i < getRdm(1, 2); i++) {
        let n = addNotification(NOTIFICATION_TYPES.MINT, `<i>0x${generateRandomString(3)}...${generateRandomString(3)}</i> just minted ${getRdm(1, 3)} NFT!`);
        removeNotification(n, getRdm(3500, 5000))
    };
}, getRdm(6000, 10000));

function getRdm(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Generate a random string of a given length
function generateRandomString(length) {
    const possibleCharacters = 'ABCDEFabcdef0123456789';
    let text = '';
    for (let i = 0; i < length; i++) {
        text += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
    }
    return text;
}

// const info = addNotification(NOTIFICATION_TYPES.INFO, 'Info text added');
// setTimeout(() => {
//     removeNotification(info);
// }, 5000);