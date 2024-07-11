// babel.config.js
module.exports = {
  presets: [
    ["@babel/preset-env", { "targets": { "node": "current" } }],
    '@babel/preset-react',
    '@babel/preset-typescript',
    [
      "babel-preset-vite",
      {
        "env": true,
        "glob": false
      }
    ]
  ],
};
