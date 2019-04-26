// clear filter
function clearFilter() {
    planSubmissions.setWhere("");
    $('#panelFilter').collapse("hide");
}

// set filter
function setFilter() {
    // beginning date
    var from = $('#fromDate').val();     
    // ending date
    var to = $('#toDate').val();
    // where clause for filter
    var where_clause = '"DATE" >= date ' + "'" + from + "'" + ' AND "DATE" <= date' + " '" + to + "'";  
    // apply filter
    planSubmissions.setWhere(where_clause);    
    // get count of features
    // if no features exist, add message
    // call clearFilter()
    // hide panel
    $('#panelFilter').collapse("hide");
}

// add event listeners
$('#setFilter').click(setFilter);
$('#clearFilter').click(clearFilter);