var fs = require('fs'), 
    bunyan = require('bunyan'), 
    morgan_middleware = require('morgan');

var config = require('./configuration');    

const EXCLUDE_API_ON_ACCESS_LOG = ['/api/healthcheck', '/api/shallowcheck'];
    
/**
 * Create Logger
 */
const logger = bunyan.createLogger({
    name: "NEW PROJECT", 
    streams: [
        {
          level: "trace", //log on console
          stream: process.stdout    
        },
        {
          level: 'error', //log errors on file
          path:  "./logs/error.log" // log ERROR and above to a file
        }
      ]    
});

//create middleware for access logging
const accessLogStream = fs.createWriteStream("./logs/access.log", {flags: 'a'});

//write on file
const logger_middleware_to_logfile = morgan_middleware("combined", {
    stream: accessLogStream, 
    skip : _skipAccessMiddleware
});

//log on stdout (cli)
const logger_middleware_to_stdout = morgan_middleware("[:date[iso]][ACCESS-LOG] :method :url :status :response-time ms - :res[content-length]", {
    skip : _skipAccessMiddleware
});

/////

exports.middleware_access_logger_to_stdout = logger_middleware_to_stdout;
exports.middleware_access_logger_to_logfile = logger_middleware_to_logfile;

exports.error = logError;
exports.warn = logWarn;
exports.info = logInfo;
exports.verbose = logVerbose;
exports.debug = logDebug;

////

/**
 * 
 * @param {*} message 
 * @param {*} data 
 */
function logError(message, data){
    return logger.error(message, _cleanLogData(data));
}

/**
 * 
 * @param {*} message 
 * @param {*} data 
 */
function logWarn(message, data){
    return logger.warn(message, _cleanLogData(data));
}

/**
 * 
 * @param {*} message 
 * @param {*} data 
 */
function logInfo(message, data){
    return logger.info(message, _cleanLogData(data));
}

/**
 * 
 * @param {*} message 
 * @param {*} data 
 */
function logVerbose(message, data){
    return logger.verbose(message, _cleanLogData(data));
}

/**
 * 
 * @param {*} message 
 * @param {*} data 
 */
function logDebug(message, data){
    return logger.debug(message, _cleanLogData(data));
}

/**
 * Remove Unnecessary log data, like undefined
 * Created to easily adjust criteria of unnecessary
 * @param {*} data 
 */
function _cleanLogData(data){
    return (data == undefined) ? '' : data;
}

/**
 * Will not log based on criteria
 * 
 * - skip apis included on EXCLUDE_API_ON_ACCESS_LOG
 * - log only api access
 * 
 * @param {*} req 
 * @param {*} res 
 */
function _skipAccessMiddleware(req, res){

    var original_url = req.originalUrl + '';

    //included on skip api
    if ( EXCLUDE_API_ON_ACCESS_LOG.indexOf(original_url) > -1 ){
        return true;
    }

    //skip if request is not api
    if ( original_url.indexOf('/api') != 0 ){
        return true;
    }

    return false;

}