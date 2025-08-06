import userDao from '../models/persistance/user.dao.js'


const getUser =(userId) =>userDao.get(userId);


const getAllUsers =() =>userDao.getAll();


const updateUser =(userId, details) =>userDao.update(userId, details);


const addUser =(details) =>userDao.insert(details);


const removeUser =(userId) =>userDao.remove(userId);


export default{
    getUser,
    getAllUsers,
    updateUser,
    addUser,
    removeUser,
}