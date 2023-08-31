module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    'd3': 'd3-showcase/node_modules/d3/dist/d3.min.js',
    "axios": "axios/dist/node/axios.cjs",
  },
  transformIgnorePatterns: [
    'd3-showcase/node_modules/(?!d3|internmap|delaunator|robust-predicates)'
  ],
};
