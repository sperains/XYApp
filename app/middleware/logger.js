/**
 * 中间件 ,可以捕捉action的操作,并添加其他逻辑.
 * @param dispatch
 * @param getState
 */

const logger = ({ dispatch, getState }) => next => action => {
    console.log('logger before', getState());
    let result = next(action);
    console.log('logger after', getState());
    return result;
}

export default logger;