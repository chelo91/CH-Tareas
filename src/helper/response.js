const baseMessage = (status, payload = null, message = null) => {
    const ret = {
        status: status
    };
    if (payload != null) {
        ret.payload = payload;
    }
    if (message != null) {
        if (status === 'error') {
            ret.error = message;
        } else {
            ret.message = message;
        }
    }
    return ret;
}

const sucessMessage = (payload, message) => {
    return baseMessage('success', payload, message);
}
const errorMessage = (message) => {
    return baseMessage('error', null, message);
}
const sucessMessageCreate = (id) => {
    return baseMessage('success', id, 'Created correctly');
}
const sucessMessageUpdate = (product) => {
    return baseMessage('success', product, 'Updated correctly');
}
const sucessMessageDelete = (id) => {
    return baseMessage('success', id, 'Deleted correctly');
}
export { sucessMessage, errorMessage, sucessMessageCreate, sucessMessageUpdate, sucessMessageDelete };