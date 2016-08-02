$.getJSON("data.json", function(users) {
    console.log('LIST OF UNIQUE SKILLS', _.union.apply(this, _.map(users, 'skills')).sort());
    console.log('LIST OF NAMES SORTED BY FRIEND NUMBER', _.map(_.sortBy(users, 'friends.length'), 'name'));
    console.log('LIST OF UNIQUE FRIENDS', _.uniqBy(_.union.apply(this, _.map(users, 'friends')), 'name'));
});