import { generateUUIDV4 } from '@node-collection/nest-ready';

const ATTRIBUTE_NAME = 'id';

function requestIdGenerator(_request) {
  return generateUUIDV4();
}

export default function generateRequestId({
  generator = requestIdGenerator,
  headerName = 'x-request-id',
  setHeader = true,
} = {}) {
  return function (request, response, next) {
    const oldValue = request.get(headerName);
    const id = oldValue === undefined ? generator(request) : oldValue;

    if (setHeader) {
      response.set(headerName, id);
    }

    request[ATTRIBUTE_NAME] = id;

    next();
  };
}
