import users from '../data/user.data.js'

/**
 * get user of specific id
 * @param userId
 * @returns {*}
 */
const get = (userId)=>users.find((user)=>user.id === userId);

/**
 * returns all the users when called
 * @returns {[]}
 */
const getAll=()=> users;

/**
 * updates the user of given id
 * @param userId
 * @param newDetails
 * @returns {*|boolean}
 */
const update = (userId,newDetails)=>{
    let existingUser=null;
    let userIndex;
    users.map((user, index) => {
        if(user.id===userId){
            existingUser=user;
            userIndex = index;
        }
    });
    if(!existingUser){
        return false;
    }
    const updatedUser ={
        ...existingUser,
        ...newDetails,
    };
    users.splice(userIndex, 1,updatedUser);
    return updatedUser;

}
/**
 * adds a user
 * @param details
 * @returns {*&{id: number}}
 */
const insert = (details)=>{
    const newUser={id: users.length + 1 , ...details};
    users.push(newUser);

    return newUser;
}
/**
 * removes user from its id
 * @param userId
 * @returns {*}
 */
const remove = (userId)=>{
    const deleteUser=(user,index) =>{
        if(user?.id===userId){
            //removes the user at the index
            users.splice(index,1);

        }

    };

    return users.find(deleteUser);
}

export default {
    get,
    getAll,
    update,
    insert,
    remove,
}