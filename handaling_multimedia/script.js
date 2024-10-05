const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const fileList = document.getElementById('file-list');
const browseBtn = document.getElementById('browse-btn');

// Ensure the browse button triggers the hidden file input
browseBtn.addEventListener('click', () => {
  fileInput.click(); // This will open the file selection dialog
});

dropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropArea.classList.add('dragover');
});

dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('dragover');
});

dropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  dropArea.classList.remove('dragover');
  const files = e.dataTransfer.files;
  handleFiles(files);
});

fileInput.addEventListener('change', (e) => {
  const files = e.target.files;
  handleFiles(files);
});

function handleFiles(files) {
  fileList.innerHTML = ''; // Clear the list
  for (let file of files) {
    const fileItem = document.createElement('div');
    fileItem.classList.add('file-item');
    fileItem.textContent = `File: ${file.name} (${Math.round(file.size / 1024)} KB)`;
    fileList.appendChild(fileItem);
  }
}
