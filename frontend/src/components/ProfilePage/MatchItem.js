import "./ProfilePage.css";
function MatchItem({ userId, game }) {
  const users = game.players ? game.players : [];
  const userItems = users.map((user, i) => (
    <li
      key={i}
      style={
        user._id === game.winnerId?._id ? { color: "green" } : { color: "red" }
      }
    >
      {" "}
      {user.username}{" "}
    </li>
  ));
  return (
    <li>
      <div className="roomname-wins-container">
        <h2 id="roomname-title-match">RoomName: {game.roomName}</h2>
        <ul>
          <p id="player-list-title">Players</p>: {userItems}
        </ul>
        <div className="win-loss-match">
          {game.winnerId ? (
            game.winnerId._id === userId ? (
              <p>WIN</p>
            ) : (
              <p style={{ color: "red" }}>LOSS</p>
            )
          ) : (
            <p style={{ color: "blanchedalmond" }}>DRAW</p>
          )}
        </div>
      </div>
    </li>
  );
}

export default MatchItem;
