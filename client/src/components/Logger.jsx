const Logger = ({ logs }) => {
  return (
    <div className="logger">
      <h4>Logged Messages</h4>
      <ul>
        {logs.map((item) => (
          <li key={`v-${item}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Logger;
