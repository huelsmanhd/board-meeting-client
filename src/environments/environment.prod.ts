export const environment = {
  production: true
};

//quinn is awesome

export let APIURL = '';

switch (window.location.hostname) {
    // this is the deployed angular application
    case 'board-meeting-client.herokuapp.com':
      // case 'localhost':
      //   // this is the full url of your deployed API
        APIURL = 'https://board-meeting-sever.herokuapp.com'
        break;
    default:
        // this is the local host name of your API
        APIURL = 'http://localhost:3000';
} 