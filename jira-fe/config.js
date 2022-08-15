function getServerHost() {
    // const host = window.location.host
    return 'http://localhost:4000'
    // return 'https://jire-be.herokuapp.com'
    // local
    // if (host.indexOf('localhost:') > -1) {
    //     return 'http://localhost:4000'
    // }
    // //staging
    // else if(host === 'tapp.softily.com') {
    //     return 'https://jira-be.herokuapp.com'
    // }
    // // deployment
    // else if(host === 'app.softily.com') {
    //     return 'https://api.softily.com'
    // }
}

module.exports = {
    getServerHost
}
