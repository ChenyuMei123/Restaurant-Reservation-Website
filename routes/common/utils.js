//require 方式
var moment = require('moment');
const utilsObj = {
    formatArrayOfDate: function (originArray, dateKey, formatStr) {
        var arrayLength = originArray.length;
        for (var i = 0; i < arrayLength; i++) {
            var currentObj = originArray[i];
            if (formatStr === undefined) {
                currentObj[dateKey] = moment(currentObj[dateKey]).format("yyyy-mm-dd");
            } else {
                currentObj[dateKey] = moment(currentObj[dateKey]).format(formatStr);
            }
        }
        return originArray;
    }
}
module.exports = utilsObj;