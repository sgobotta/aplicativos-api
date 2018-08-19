
const utils = {};

utils.tokenToHeader = (context) => {
  return dispatchByService(context);
};

function dispatch(context, field) {
  const { storageKey } = context.app.get('authentication');
  if (context.params[field] && context.params[field][storageKey]) {
    const token = context.params[field][storageKey];
    context.params.headers = { authorization: token };
    delete context.params[field][storageKey];
    return context;
  }
  return context;
}

function dispatchByData(context) {
  const { storageKey } = context.app.get('authentication');
  if (context.data && context.data[storageKey]) {
    const token = context.data[storageKey];
    context.params.headers = { authorization: token };
    delete context.data[storageKey];
    return context;
  }
  return context;
}

function dispatchByQuery(context) {
  return dispatch(context, 'query');
}

function dispatchById(context) {
  const { storageKey } = context.app.get('authentication');
  if (context.id && context.id[storageKey]) {
    const token = context.id[storageKey];
    const id = context.id.id;
    context.params.headers = { authorization: token };
    context.id = id;
    delete context.id['feathers-jwt'];
    delete context.id.id;
    return context;
  }
  return context;
}

function dispatchByService(context) {
  const services = {
    find:   () => dispatchByQuery(context),
    get:    () => dispatchByQuery(context),
    create: () => dispatchByData(context),
    update: () => dispatchByQuery(context),
    patch:  () => dispatchByQuery(context),
    remove: () => dispatchById(context)
  };
  return services[context.method]();
}

module.exports = utils;
