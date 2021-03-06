exports.mm_dd_yyyy = function(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [month, day, year].join('-');
};

exports.yyyy_mm_dd = function(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
};



exports.m_d_yy = function(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear().toString().substr(-2);

    return [month, day, year].join('_');
};

exports.m_d_yy_To_mm_dd_yyyy = function(date) {
    const str = date.split("_")
          month = str[0]
          day = str[1]
          year = str[2]

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    year += "20"
    return [day, month, year].join('/');
}

exports.DaysBetween = function(d1, d2) {
    return Math.abs(Math.round(d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24).toFixed(0));
};
