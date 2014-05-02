/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  //See if there is a user logged in
  if(!req.user){
    res.redirect('/gettingStarted');
  }
  /**
  * If they are logged in but don't have a valid Key
  * Redirect them to the getting started Page
  * Flash message to add a key
  */
  else if(!req.user.profile.validRTKey){
    req.flash('errors', {
      msg: 'Please visit your profile and add your rescueTime key'
    });
    res.redirect('/gettingStarted');
  }
  res.render('home', {
    title: 'Home',
    data:[1,2,3]
  });
};
