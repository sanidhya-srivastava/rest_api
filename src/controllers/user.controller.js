import {StatusCodes} from 'http-status-codes';
import pino from 'pino';

import userService from "../services/user.service.js";


const logger= pino();

const STATUS={
    success: true,
    failure: false
};

/**
 * retrieves all users
 * @param req
 * @param res
 * @returns {*}
 */
const getAllUsers = (req,res)=>{

    const users= userService.getAllUsers();

    if(users.length){
        logger.info(`retrieving all user `);
        return res.status(StatusCodes.OK).send(users);
    }
    return res.status(StatusCodes.NOT_FOUND).send({
        status : STATUS.failure,
        message:`no users found`,
    });
}

/**
 * retrieves the user of specified id
 * @param req
 * @param res
 * @returns {*}
 */
const getUser = (req,res)=>{

    const id=parseInt(req.params.id,10);
    const user= userService.getUser(id);

    if(user){
        logger.info(`retrieving user ${id}`);
        return res.status(StatusCodes.OK).send({
            status :STATUS.success,
            user,
        });
    }

    return res.status(StatusCodes.NOT_FOUND).send({
        status : STATUS.failure,
        message:`user ${id} is not found`,
    });
}

/**
 * adds a user
 * @param req
 * @param res
 * @returns {*}
 */
const addUser =  (req,res)=> {
    const {body: user} = req;

    const addedUser = userService.addUser(user);

    logger.info('creating a user')

    return res.status(StatusCodes.CREATED).send({
        status: STATUS.success,
        message: addedUser,
    });
};

/**
 * updates the user of given id
 * @param req
 * @param res
 * @returns {*}
 */
const updateUser = (req,res)=> {
    const {body: user} = req;

    const id=parseInt(req.params.id,10);

    const updatedUser = userService.updateUser(id, user);

    if (updatedUser) {
        logger.info(`updating user ${id}`);
        return res.status(StatusCodes.OK).send({
            status: STATUS.success,
            user: updatedUser,
        });
    } else{
        return res.status(StatusCodes.NOT_FOUND).send({
            status : STATUS.failure,
            message:`user ${id} is not found`,
        });
    }
};

/**
 * removes user of given id
 * @param req
 * @param res
 * @returns {*}
 */
const removeUser = (req,res)=> {
    const {params}=req;
    const id=parseInt(params.id,10);
    const user= userService.getUser(id);
    if(user){
        logger.info(`deleting user no ${id} `);
        userService.removeUser(id);
        return res.status(StatusCodes.OK).send({
            status: STATUS.success,
            message:`user ${id} has been deleted`,
        });
    }else {
        return res.status(StatusCodes.NOT_FOUND).send({
            status: STATUS.failure,
            message:`user ${id} is not  found`,
        });
    }

}




export default{
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    removeUser,
}