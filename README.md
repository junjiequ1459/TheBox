# TheBox

### Live Link: [TheBox](https://the-box.social/)

TheBox is a fullstack MERN party game app that allows you to chat and play with friends.

## Background and Overview

The Box delivers the fun of party games to your electronic devices. We provide a selection of entertaining games that are ideal for any social occasion and are created for friends and family to enjoy together. The Box is the app for you if you want to spice up a family gathering, mark a significant event, or just hang out with pals.

## Technologies and libraries:

- MongoDB / Express.js
- React / Redux
- Node.js
- Websocket
- AWS 

# A peek into the box:

## Create or join a game

After creating an account, users can start playing by either creating their own game room or joining an existing one through the lobby. Each game room listed in the lobby displays the name of the room, the name of the host, and the current number of players in the room. Users can easily browse through the lobby list and select the game room they want to join and start playing.

![image](https://github.com/junjiequ1459/TheBox/assets/30753677/dd577c1d-0580-453f-bad1-6ad33b4b5f75)

## Game lobby

After joining a room, users will be directed to the room lobby where they will wait for the host to start the game, a room can hold up to four people but this number is decided by the host. The lobby displays important information such as the name of the host, the previous winner, the previous answer, and the current players in the lobby with their respective win count. The game lobby also includes a real-time chat feature, powered by Websocket, allowing users to communicate with other players in the lobby. This feature enables users to discuss previous games or plan strategies for upcoming games.

![image](https://github.com/junjiequ1459/TheBox/assets/30753677/1bc9d6d5-b550-4541-a4fa-4f1c763bd5bb)

## Playing games!

![image](https://github.com/junjiequ1459/TheBox/assets/30753677/c4d9bf5b-46af-495c-8f8e-d3176a43cdde)

Once the host initiates the game, a broadcast will be sent to all subscribed users via Websockets, starting the game simultaneously for everyone and eliminating any unfair advantages. The games all currently follows a similar format where users race to be the first to guess the image that slowly zooms out to reveal the complete picture. The game ends immediately when any player guesses the correct answer, and all users are returned to the lobby with updated lobby information.

## User Profiles

As users play more and more games, they may want to go and look at their statistics or previous games, this is where the profile page comes into play.

![image](https://github.com/junjiequ1459/TheBox/assets/30753677/681076e9-08e5-4aa6-97e1-b03a4121aeba)

The profile page displays crucial information such as the user's win/loss ratio, providing insights into their gameplay performance. It also shows the match history, enabling users to identify patterns and areas for improvement in their previous games. This is also where users can upload their profile picture through AWS to personalize their profile. Overall, the profile page offers a comprehensive view of a user's gameplay and progress, making it an invaluable tool for self-improvement and interaction with other players.

##Leaderboard

![image](https://github.com/junjiequ1459/TheBox/assets/30753677/f66afeb5-50d7-4d79-91ad-85429f11e66f)

The Box also features a global leaderboard, a place where the top players of our game are recognized for their impressive skills and strategy. It's a display of the best of the best, showcasing those who have earned their place through determination and hard work. So, take on the challenge and see where you stand among the best players of our game. Who knows, you might just surprise yourself and earn a spot on the leaderboard.

# Group Members

## Roles

Team Lead and CSS - Rex

Frontend Lead- Kevin

Fullstack Flex - Joey

Backend Lead and Git Manager - Zahi

# Future Features

- More games


