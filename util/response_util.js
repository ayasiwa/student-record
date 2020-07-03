var os = require('os'),
  log = require('./../logger');

const hostname = os.hostname();

exports.buildResponse = buildResponse;
exports.successResponse = successResponse;
exports.failResponse = failResponse;
exports.processResponse = processResponse;
exports.successPromise = successPromise;
exports.failPromise = failPromise;

/**
 * 
 * @param {*} message 
 * @param {*} res 
 * @param {*} req 
 */
function successPromise(result, message, res, req) {
  var json = successResponse(req, message, result);
  return res.json(json);
}

/**
 * 
 * @param {*} status_code 
 * @param {*} res 
 * @param {*} req 
 * @param {*} next 
 */
function failPromise(error, status_code, res, req, next) {

  if (status_code > 0 == false) {
    status_code = 500;
  }

  log.error('request error via promise', { url: req.originalUrl, error: error });
  var json = failResponse(req, null, error);
  res.status(status_code).json(json);
  return next(error);

}

/**
 *  OLD Build Response
 * 
 * @param {*} status 
 * @param {*} message 
 * @param {*} actor 
 * @param {*} reference_data 
 */
function buildResponse(status, message, actor, reference_data) {
  return { "success": (status == "success"), "status": status, "message": message, "actor": actor, "host": hostname, "reference_data": reference_data };
}

/**
 * 
 * @param {*} req 
 * @param {*} message 
 * @param {*} reference_data 
 */
function successResponse(req, message, reference_data) {
  return build(req, true, message, reference_data);
}

/**
 * 
 * @param {*} req 
 * @param {*} message 
 * @param {*} reference_data 
 */
function failResponse(req, message, reference_data) {
  return build(req, false, message, reference_data);
}

/**
 * 
 * @param {*} req 
 * @param {*} success 
 * @param {*} message 
 * @param {*} reference_data 
 */
function build(req, success, message, reference_data) {
  var _response = {};
  _response.success = (success == true);
  _response.status = (success == true) ? "success" : "failure";

  if (message)
    _response.message = message;

  _response.actor = req.originalUrl;
  _response.hostname = hostname;
  _response.reference_data = reference_data;

  return _response;
}

/**
 * 
 * @param {*} err 
 * @param {*} result 
 * @param {*} res 
 * @param {*} req 
 * @param {*} next 
 * @param {*} statusCodeWhenError 
 */
function processResponse(err, result, res, req, next, statusCodeWhenError) {
  var status_code = (statusCodeWhenError > 200 && statusCodeWhenError <= 300) ? status_code : 500;
  if (err) {
    //check error on log
    log.error('request error', { url: req.originalUrl, error: err });
    res.status(status_code).json(failResponse(req, null, err));
    return next(err);
  }
  return res.json(successResponse(req, null, result));
}