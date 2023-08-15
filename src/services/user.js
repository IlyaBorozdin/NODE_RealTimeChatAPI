const storage = require('../db/storage');

class User {
    constructor({ name }) {
        this.name = name;
    }

    addUser() {
        const query = `
            INSERT INTO users (name)
            VALUES (?)
            ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id);
        `;
        const values = [this.name];
    
        return storage.query(query, values)
            .then(([res]) => {
                return res.insertId;
            })
            .catch((err) => {
                throw new Error('Error adding user');
            });
    }
}

module.exports = User;