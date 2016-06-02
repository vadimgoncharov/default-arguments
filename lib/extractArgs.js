const extractArgs = fn => {
    if (typeof fn !== 'function') {
        return [];
    }
    
    let args = fn.toString(fn);
    
    args = args
        .replace(/\/\*[^\*]*\*\//mgi, '') // remove multi line comments
        .replace(/\/\/[\/]*.*$/mgi, '');  // remove single line comments

    const arrowFnOneArgMath = args.match(/^([^\(\)]+)\=\>[^\{]*\{/im);
    
    if (Array.isArray(arrowFnOneArgMath) && typeof arrowFnOneArgMath[1] !== 'undefined') {
        args = [arrowFnOneArgMath[1].trim()];
    }
    else {
        args = args.match(/\(([^\(\)]+?)\)/mi); // take content inside ( )

        if (Array.isArray(args) && typeof args[1] !== 'undefined') {
            args = args[1].replace(/[\n\r\t\(\) ]/mgi, ''); // remove white spaces and ( )

            args = args.split(',');
        }
        else {
            args = [];
        }
    }
    
    return args;
};

module.exports = extractArgs;
