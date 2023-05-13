# TheBox

### Live Link: [TheBox](https://the-box.social/)

TheBox is a fullstack MERN party game app that allows you to chat and play with friends.

## Background and Overview

The Box delivers the fun of party games to your electronic devices. We provide a selection of entertaining games that are ideal for any social occasion and are created for friends and family to enjoy together. The Box is the app for you if you want to spice up a family gathering, mark a significant event, or just hang out with pals.

## Technologies and libraries used:
- Javascript
- MongoDB
- Express.js
- React/Redux
- Node.js
- AWS
- Websockets

# A peek into the box:

## Create or join a game

After creating an account, users can start playing by either creating their own game room or joining an existing one through the lobby. Each game room listed in the lobby displays the name of the room, the name of the host, and the current number of players in the room. Users can easily browse through the lobby list and select the game room they want to join and start playing.

![image](https://github.com/junjiequ1459/TheBox/assets/30753677/dd577c1d-0580-453f-bad1-6ad33b4b5f75)

## Live chat and game

After joining a game, users will be directed to the game lobby where they will wait for the host to start the game. The lobby displays important information such as the name of the host, the previous winner, the previous answer, and the current players in the lobby with their respective win count. The game lobby also includes a real-time chat feature, powered by Websocket, allowing users to communicate with other players in the lobby. This feature enables users to discuss previous games or plan strategies for upcoming games.

![image](https://github.com/junjiequ1459/TheBox/assets/30753677/1bc9d6d5-b550-4541-a4fa-4f1c763bd5bb)


### 2. User Auth - (2/20) 1 day
   We will have demo logins to navigate the website
   Without logging in the user cannot play the game
### 3. Rooms/Lobby - (2/21) 1 day
   Users will be able to create a lobby or rooms to wait for enough people to start the game
   Logged in users can join existing lobbies
### 4. Game - (2/22) 2 days
   The main feature, the game can be played with multiple people
   Only users logged in can play the game
### 5. Sockets - (2/22) 2 days
   Sockets will allow all players to simultaneously play the game and update for everyone
   Users within the same lobby will be subscribed and listening to any updates
### 6. Profile - (2/23) 1 day
   Users will have their own profile page
   The profile page will have a users information and a match history plus win percentage
### 7. Production ReadMe - (2/24) 1 day
   Production ReadMe
   
   
### Users

# Group Members and Work Breakdown

## Work Breakdown

### Roles

Team Lead and CSS styler - Rex

Frontend - Kevin

Fullstack Flex - Joey

Backend and Git Manager - Zahi

### Monday

Build React app - Kevin, Rex

Build express backend app - Joey, Zahi

Finish User Auth and style including Profiles - All

Investigate Websockets - Joey

### Tuesday

Create CRUD for rooms/lobbies - ALL

Backend - Joey, Zahi

Frontend - Kevin, Rex(Styler)

Brainstorm games - Rex

### Wednesday

Start and play game functionality - ALL

Backend - Joey, Zahi

Frontend - Kevin, Rex

Setup Sockets - Joey

### Thursday

Polish app

Backend - Joey, Zahi

Frontend - Kevin, Rex(Styler)

# Technologies and Technical Challenges

MongoDB/Express - We are using MongoDB for our backend database to hold informations such as user's information, states, games and etc.

React/Node.js - We are using React for our frontend

Websocket - For multiplayer games and chatboxes

AWS - An object storage space to store and retrieve data. Mainly for our pictures.
