import { sucessMessageCreate } from "../helper/response.js";
import CustomError from "../services/errors/customError.js";
import { productNotExistError, productCustomError, productNullIdError } from "../services/errors/products.js";
import EErrors from "../services/errors/enums.js";
import { loadFile } from '../helper/fs.js';

export const getLogs = async (req, res) => {
    try {
        const arrayLogs = await loadFile("./errors.log", false);
        return res.status(200).type("text/plain").send(arrayLogs);
        //return res.status(200).json(arrayLogs);
    } catch (error) {
        next(error);
        //return res.status(400).json(errorMessage("Error creating cart"));
    }
};

export const getLogsTest = async (req, res) => {
    req.logger.debug('DEBYG')
    req.logger.http('http meh')
    req.logger.info('R2 Rocks')
    req.logger.warning('WARNING')
    req.logger.error('Errors 🛑')
    req.logger.fatal('FATAL !!! 🛑')

    return res.status(200).json(sucessMessageCreate("Logs test"));

}