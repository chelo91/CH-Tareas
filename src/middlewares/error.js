import EErrors from "../services/errors/enums.js";
import { logger } from '../helper/logger.js';
export default (error, req, res, next) => {

    logger.error(error);
    
    switch (error.code) {
        case EErrors.ROUTING_ERROR:
            return res.status(404).send({
                status: 'error',
                error: error.name,
                cause: error.cause
            })
            break;
        case EErrors.INVALID_TYPES_ERROR:
            return res.status(400).send({
                status: 'error',
                error: error.name,
                cause: error.cause
            })
            break;
        case EErrors.DATABASE_ERROR:
            return res.status(500).send({
                status: 'error',
                error: error.name,
                cause: error.cause
            })
            break;
        case EErrors.AUTHENTICATION_ERROR:
            return res.status(401).send({
                status: 'error',
                error: error.name,
                cause: error.cause
            })
            break;
        default:
            return res.status(500).send({ status: 'error', error: 'Unhandled error' })
    }
}