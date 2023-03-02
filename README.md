# TheBox


TheBox is a fullstack MERN party game app that allows you to chat and play with friends.

#Background and Overview

The Box delivers the fun of party games to your electronic devices. We provide a selection of entertaining games that are ideal for any social occasion and are created for friends and family to enjoy together. The Box is the app for you if you want to spice up a family gathering, mark a significant event, or just hang out with pals.

We will need to

*Create user auth, player stats
*Provide full CRUD for user lobbies
*Chat functionality
*Implement game(s)

#Functionality and MVP

1. Hosting - (2/20) 1 day
2. User Auth - (2/20) 1 day
   We will have demo logins to navigate the website
   Without logging in the user cannot play the game
3. Rooms/Lobby - (2/21) 1 day
   Users will be able to create a lobby or rooms to wait for enough people to start the game
   Logged in users can join existing lobbies
4. Game - (2/22) 2 days
   The main feature, the game can be played with multiple people
   Only users logged in can play the game
5. Sockets - (2/22) 2 days
   Sockets will allow all players to simultaneously play the game and update for everyone
   Users within the same lobby will be subscribed and listening to any updates
6. Profile - (2/23) 1 day
   Users will have their own profile page
   The profile page will have a users information and maybe some additional information
7. Production ReadMe - (2/24) 1 day
   Production ReadMe

#Group Members and Work Breakdown

Work Breakdown
Roles
Team Lead and CSS styler - Rex
Frontend - Kevin
Backend - Joey
Flex and Git Manager - Zahi
Monday
Build React app - Kevin, Rex
Build express backend app - Joey, Zahi
Finish User Auth and style including Profiles - ALL
Investigate Websockets - ALL
Tuesday
Create CRUD for rooms/lobbies - ALL
Backend - Joey, Zahi
Frontend - Kevin, Rex(Styler)
Brainstorm games - Rex
Wednesday
Start and play game functionality - ALL
Backend - Joey, Zahi
Frontend - Kevin, Rex
Setup Sockets - ALL
Thursday
CRUD for messages - ALL
Backend - Joey, Zahi
Frontend - Kevin, Rex(Styler)

#Technologies and Technical Challenges

MongoDB/Express - We are using MongoDB for our backend database to hold informations such as user's information, states, games and etc.

React/Node.js - We are using React for our frontend

Websocket - For multiplayer games and chatboxes

AWS - An object storage space to store and retrieve data. Mainly for our pictures.
