function formatCommands(commands) {
  return commands
    .map((c) => `  ${c.name} ${c.args || ""}\t${c.description}`)
    .join("\n");
}

module.exports = {
  formatCommands,
};
