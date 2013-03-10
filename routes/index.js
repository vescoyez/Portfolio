
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {title: 'Home Page', className: 'home', pageNumber: '0', errorMessage: ''});
};