export const environment = {
  production: true
};



export let APIURL = '';

switch (window.location.hostname) {
    // this is the deployed angular application
<<<<<<< HEAD

    case 'board-meeting-client.herokuapp.com':
    
    // case 'localhost':
=======
    // case 'board-meeting-client.herokuapp.com':
      case 'localhost':
>>>>>>> cf1158632b80cba35d13574eb8e4e23d4161fc39
        // this is the full url of your deployed API
        APIURL = 'https://board-meeting-sever.herokuapp.com'
        break;
    default:
        // this is the local host name of your API
        APIURL = 'http://localhost:3000';
} 