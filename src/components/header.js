import React from 'react';
import Button from 'react-toolbox/lib/button/Button';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';

export default ({ login, logout, user, loggedIn }) => (
  <AppBar title='Todo Playground' fixed>
    <Navigation type="horizontal" className="navigation">
    {loggedIn ?
    	<div className="restrictedNavigation">
    		{user ? <Button flat inverse>{user.displayName}</Button> : null}
	      <Button 
	      	label='Logout' 
	      	onClick={logout} 
	      	flat 
	      	inverse  
	      />
    	</div>
    :
      <Button 
      	label='Login' 
      	onClick={login.bind(this, 'facebook')} 
      	flat 
      	inverse  
      />
    }
    </Navigation>
  </AppBar>
);