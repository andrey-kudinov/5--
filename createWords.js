const fs = require('fs');

fs.readFile('data.json', 'utf8', (error, data) => {
  if (error) {
    console.error(error);
    return;
  }

  const jsonData = JSON.parse(data);

  const words = Object.keys(jsonData).filter(word => word.length === 5);

  // Write the words to a new JSON file as an array
  fs.writeFile('new_data.json', JSON.stringify(words), 'utf8', error => {
    if (error) {
      console.error(error);
      return;
    }
  });
});
