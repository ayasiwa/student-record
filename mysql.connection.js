const mysql = require('mysql');
const util = require('util');
const { db,  } = require('./configuration');
const { host, user, password, database, connectionLimit } = db;

var pool = mysql.createPool({
    host,
    user, 
    password,
    database,
    connectionLimit,
    acquireTimeout : (50 * 10000),
    connectTimeout : (50 * 10000)    
});

/**
 * Public
 */
module.exports = {
	getTransactionalConnection,
	commit,
	rollback
};

/**
 *
 */
async function getTransactionalConnection() {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				console.log('[DB_CONNECTION] get connection Error ', err);
				return reject(err);
			}

			// open transactional connection
			connection.beginTransaction(err => {
				if (err) {
					console.log('[DB_CONNECTION] begin transaction Error ', err);
					return _closeConnection(connection)
						.then(() => reject(err))
						.catch(reject);
				}

				// add connection.queryAsync
				connection.queryAsync = util.promisify(connection.query);
				// add connection.queryOneAsync
				// this will return the first value from select
				connection.queryOneAsync = function (...args) {
					return this.queryAsync(...args)
						.then(result => result[0] ? result[0] : null);
				};

				return resolve(connection);
			});
		});
	});
}

/**
 *
 * @param {*} resultSet
 */
async function commit(connection, resultSet) {
	return new Promise((resolve, reject) => {
		// set default callback
		if (connection) {
			return connection.commit(err => {
				if (err) {
					// had commit issue
					console.log('[DB_CONNECTION] : commit error ', err);
					return rollback(connection, err)
						.then(() => reject(err)) // throw original err
						.catch(reject);
				}
				return _closeConnection(connection)
					.then(() => resolve(resultSet)) // send resultSet
					.catch(reject);
			});
		}
		return reject(new Error('[COMMIT] connection is undefined'));
	});
}

/**
 *
 * @param {*} connection
 */
function rollback(connection, err, throwErrorAfterRollback = true) {
	return new Promise((resolve, reject) => {
		if (connection) {
			return connection.rollback(onRollbackErr => {
				if (onRollbackErr) {
					console.log('[DB_CONNECTION] : rollback err ', onRollbackErr);
					// close connection
					// both are reject
					return _closeConnection(connection)
						.then(() => reject(onRollbackErr)) // throw original err
						.catch(reject);
				} else {
					// close connection
					_closeConnection(connection)
						.then(() => throwErrorAfterRollback ? reject(err) : resolve(err))
						.catch(reject);
				}
			});
		}
		return reject(new Error('[ROLLBACK] connection is undefined'));
	});
}


/**
 *
 * @param {*} connection
 */
async function _closeConnection(connection) {
	// if connection not null && connection not yet released
	if (connection && !pool._freeConnections.indexOf(connection) > -1) {
		connection.release();
	}
}
