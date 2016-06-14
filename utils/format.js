exports.resJson = function(code, data){
    var temp = {};
    
    temp.code = code;
    temp.data = data;

    if (code === -1) {
        if (data.message) {
            temp.msg = data.message;
        } else {
            temp.msg = data;
        };
    };
    
    return temp;
};