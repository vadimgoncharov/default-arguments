const extractArgs = require('./extractArgs');

const defaultArgs = function(fn, defaults) {
    const returnFn = (...args) => {
        const originalFn = returnFn.originalFn;
        
        const hasDefaults = ({}).toString.call(defaults) === '[object Object]';

        const originalFnArgs = extractArgs(originalFn);

        const originalFnArgsWithDefaults = originalFnArgs.map((argName, index) => {
            if (typeof args[index] !== 'undefined') {
                return args[index];
            }
            else if (hasDefaults && typeof defaults[argName] !== 'undefined') {
                return defaults[argName];
            }
            
            return void 0;
        });

        return originalFn.apply(null, originalFnArgsWithDefaults);
    };

    returnFn.originalFn = typeof fn.originalFn === 'function'
        ? fn.originalFn
        : fn;
    
    return returnFn;
};

module.exports = defaultArgs;
