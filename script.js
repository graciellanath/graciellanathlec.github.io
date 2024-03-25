function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var userName = getParameterByName('username');

if (userName) {
  document.getElementById('welcome-text').innerText = 'Hello, ' + userName + '!';
} else {
  document.getElementById('welcome-text').innerText = 'Hello, Guest!';
}

function updateClock() {
  console.log('Updating clock...');
  var now = new Date();
  var hours = now.getHours().toString().padStart(2, '0');
  var minutes = now.getMinutes().toString().padStart(2, '0');
  var seconds = now.getSeconds().toString().padStart(2, '0');
  var timeString = hours + ':' + minutes + ':' + seconds;
  document.getElementById('clock').textContent = timeString;
}

setInterval(updateClock, 1000);

updateClock();

var data = [];

function addData() {
  var nim = document.getElementById("nimInput").value;
  var nama = document.getElementById("namaInput").value;
  var alamat = document.getElementById("alamatInput").value;

  if (nim && nama && alamat) {
      var newRow = [nim, nama, alamat];
      data.push(newRow);
      renderData();
      resetForm();
  } else {
      alert("Harap lengkapi semua field!");
  }
}

function resetForm() {
  document.getElementById("nimInput").value = "";
  document.getElementById("namaInput").value = "";
  document.getElementById("alamatInput").value = "";
}

function renderData() {
  var tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  data.forEach(function(row, index) {
      var newRow = tableBody.insertRow();
      row.forEach(function(cell, cellIndex) {
          var newCell = newRow.insertCell();
          newCell.textContent = cell;
      });

      var editCell = newRow.insertCell();
      var editButton = document.createElement("button");
      editButton.innerHTML = '<i class="fas fa-pen-to-square"></i> Edit';
      editButton.classList.add("edit-button");
      editButton.addEventListener("click", function() {
          window.location.href = 'edit.html';
      });
      editCell.appendChild(editButton);

      var deleteCell = newRow.insertCell();
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.innerHTML = '<i class="fas fa-times"></i> Delete';
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", function() {
          deleteRow(index);
      });
      deleteCell.appendChild(deleteButton);
  });
}

function deleteRow(index) {
  if (index > -1 && index < data.length) {
      data.splice(index, 1);
      renderData();
  } else {
      alert("Indeks baris tidak valid.");
  }
}

document.addEventListener("DOMContentLoaded", function() {
  var headers = document.querySelectorAll("#data-table th");
  headers.forEach(function(header, index) {
      header.addEventListener("click", function() {
          sortTable(index);
      });
  });
});

function sortTable(columnIndex) {
  data.sort(function(a, b) {
      var x = a[columnIndex].toUpperCase();
      var y = b[columnIndex].toUpperCase();
      if (x < y) {
          return -1;
      }
      if (x > y) {
          return 1;
      }
      return 0;
  });
  renderData();
}

var editedIndex;

function saveEditedData() {
  var nama = document.getElementById('namaInput').value;
  var alamat = document.getElementById('alamatInput').value;

  if (nama.trim() === '' || alamat.trim() === '') {
      alert("Harap lengkapi semua field!");
      return;
  }

  data[editedIndex][1] = nama;
  data[editedIndex][2] = alamat;

  renderData();

  window.location.href = 'index.html';
}


function cancelEdit() {
  window.location.href = 'index.html';
}

const addButton = document.querySelector('button[type="button"][onclick="addData()"]');
const deleteButton = document.querySelector('button[id="resetBtn"]');
const resetButton = document.querySelector('button[type="button"][onclick="resetForm()"]');

function showAlertAdded() {
  alert('Added!');
}

function showAlertDeleted() {
  alert('Deleted!');
}

function showAlertWarning() {
  alert('Warning!');
}

addButton.addEventListener('click', showAlertAdded);

deleteButton.addEventListener('click', function() {
  showAlertDeleted();
});

resetButton.addEventListener('click', function() {
  showAlertWarning();
});


