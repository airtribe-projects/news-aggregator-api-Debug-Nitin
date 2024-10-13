const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../' ,'users.json');

const users = [];
const loadUsers = async () => {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        let parsedData = JSON.parse(data).users;
        users.length = 0;
        users.push(...parsedData);
    } catch (err) {
        console.log('Error reading file:', err);
    }
}

const saveUsers = async () => {
    try {
        await fs.promises.writeFile(filePath, JSON.stringify({users},null,2), 'utf8');
    }catch(err) {
        console.log('Error writing file:', err);
    }
}

const findOne = async(query) => {
    await loadUsers();
    return users.find(user => user.email === query.email);
}

const createUser = async(userDTO) => {
    await loadUsers();
    //converting the class instance into a plain object
    const userObject = Object.assign({}, userDTO);
    users.push(userObject);
    console.log(users);
    await saveUsers();
    return userDTO;
}

const updateUser = async(user) => {
    await loadUsers();
    const index = users.findIndex(u => u.email === user.email);
    users[index] = user;
    await saveUsers();
    return user;
}

module.exports = {
    findOne,
    createUser,
    updateUser
};