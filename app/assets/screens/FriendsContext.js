// app/assets/screens/FriendsContext.js
import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context
const FriendsContext = createContext();

// 2. Create a Provider Component
// This component will wrap parts of your app that need access to the friends list.
export const FriendsProvider = ({ children }) => {
  const [friends, setFriends] = useState([]); // State to hold the list of friends

  // Function to add a friend
  const addFriend = (newFriend) => {
    // Check if the friend already exists to avoid duplicates
    if (!friends.some(friend => friend.id === newFriend.id)) {
      setFriends((prevFriends) => [...prevFriends, newFriend]);
      console.log('Friend added:', newFriend.name);
    } else {
      console.log('Friend already in list:', newFriend.name);
    }
  };

  // The value that will be provided to consumers of this context
  const contextValue = {
    friends,
    addFriend,
  };

  return (
    <FriendsContext.Provider value={contextValue}>
      {children}
    </FriendsContext.Provider>
  );
};

// 3. Create a Custom Hook to easily use the Context
// This hook makes it cleaner to access the friends data and addFriend function
// in your components without explicitly importing FriendsContext and useContext everywhere.
export const useFriends = () => {
  const context = useContext(FriendsContext);
  if (context === undefined) {
    throw new Error('useFriends must be used within a FriendsProvider');
  }
  return context;
};