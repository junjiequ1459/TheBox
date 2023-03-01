import "./ProfilePage.css";
function MatchItem({ userId, game }) {
  const users = game.players;
  const userItems = users.map((user, i) => <li key={i}> {user.username} </li>);
  return (
    <li>
      <h2 id="roomname-title-match">RoomName: {game.roomName}</h2>
      <ul>
        <p id="player-list-title">Players</p>: {userItems}
      </ul>
      <div className="win-loss-match">
        {game.winnerId._id === userId ? (
          <p>WIN</p>
        ) : (
          <p style={{ color: "red" }}>LOSS</p>
        )}
      </div>
    </li>
  );
}

export default MatchItem;
