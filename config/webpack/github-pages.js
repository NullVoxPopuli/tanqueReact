const projectName = 'tanqueReact';


let config = require('./main.config.js');
config.output.publicPath = `/${projectName}/assets/`;

module.exports = config;
