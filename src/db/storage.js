const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE
}).promise();

connection.connect()
    .then(() => {
        console.log('Database is connected');
    })
    .catch(err => {
        console.error('Database is disconnected:', err);
    });

class Storage {

    constructor(connection) {
        this.connection = connection;
    }

    connect() {
        return this.connection.connect();
    }

    end() {
        this.connection.end();
    }

    query(text, values) {
        return this.connection.query(text, values);
    }
}

module.exports = new Storage(connection);