
  

  

  

  

#  Tic-tac-toe Multiplayer

  

  

  

  

A tic-tac-toe multiplayer game where you can have fun with your friends in private matches.

  

  

  

  

**Link to project:** https://ttc-multiplayer.herokuapp.com/

  

  

  

  

##  How It's Made:

  

  

  

  

**Tech used:**  `JavaScript`, `Node.js`, `Express.js`, `EJS`, `MongoDB`, `mongoose`, `Socket.IO`, and `CSS3`

  

  

  

  

###  The application layout is built around three pages:

  

  

  

  

1. Login:

  

  

  

    -  ![Login page image](https://i.imgur.com/1FEmgtE.png)

  

  

  

2. Enter/New Game:

  

  

  

    -  ![Enter/New Game page image](https://i.imgur.com/zhk9KZa.png)

  

  

  

3. Game:

  

  

  

    -  ![Game page image](https://i.imgur.com/6jobbbm.png)

  

  

  

  

###  Behind the pages:

  

  

  

1. Login:

  

  

  

    - Here `passport.js` handles login with OAuth 2.0 strategy and mongoose stores the current session in the sessions collection. If it's the first login mongoose also updates the users collection with the new user.

  

  

  

2. Enter/New Game:

  

  

  

    - When a user enters a game code and clicks 'Go' a GET request is sent to '/game/:id', where the id param is the code passed on the input, and the server will verify if the game exists on the database:

  

  

        - If the code doesn't belong to an existing game the user will be redirected to a 404 error page;

  

  

        - If the code belongs to an existing game then the user will be redirected to '/game/:id';

  

  

    - When a user clicks on 'New Game' a POST request is sent to '/' and mongoose creates a new game inside the collection rooms, then redirect the user to '/game/:id'.

  

  

3. Game:

  

  

    - On every connection a new WebSocket is created through `socket.IO`:

  

        - The WebSocket is used to:

  

            - broadcast the player's actions;

  

            - control the turns so that each player has a move;

  

    - The game logic is managed through the `game.js` file:

        - At every connection the `TicTacToe` class is instantiated inside the variable `game` to create the game;

        - Only the first two players to connect will be able to play;