import "./ProfilePage.css";

function MatchItem({ userId, game }) {
  const users = game?.players ? game?.players : [];

  const userItems = users.map((user, i) => (
    <li
      key={i}
      style={
        user._id === game?.winner?._id ? { color: "#8eff1e" } : { color: "red" }
      }
    >
      {" "}
      {user.username}{" "}
    </li>
  ));

  return (
    <li>
      <div className="roomname-wins-container">
        <h2 id="roomname-title-match">Room : {game?.roomName}</h2>
        <h2 id="roomname-title-match">Answer : {game?.answer}</h2>
        <ul>
          <p id="player-list-title">Players</p>: {userItems}
        </ul>
        <div className="win-loss-match">
          {game?.winner ? (
            game?.winner._id === userId ? (
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
