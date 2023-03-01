function MatchItem({ userId, game }) {
  const users = game.players;
  const userItems = users.map((user, i) => <li key={i}> {user.username} </li>);
  return (
    <li>
      {game.roomName}
      <ul>{userItems}</ul>
      {game.winnerId._id === userId ? "Win" : "Loss"}
    </li>
  );
}

export default MatchItem;
