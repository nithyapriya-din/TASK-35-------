const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const folderPath = path.join(__dirname, 'files'); 

app.post('/createFile', async (req, res) => {
  const timestamp = new Date().toISOString().replace(/[-:]/g, ''); 
  const filename = `${timestamp}.txt`;
  const filePath = path.join(folderPath, filename);

  try {
    await fs.writeFile(path.join(__dirname,'Files','timestamp.txt'), timestamp);
    res.json({ success: true, message: 'File created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating file' });
  }
});

app.get('/getAllFiles', async (req, res) => {
  try {
    const files = await fs.readdir(path.join(__dirname,'Files','timestamp.txt'));
    const textFiles = files.filter(file => path.extname(file) === '.txt');
    res.json({ success: true, files: textFiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error retrieving files' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
