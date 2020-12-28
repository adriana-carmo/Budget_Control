window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

// Let us open the database_local
var request = window.indexedDB.open("Budget_local", 1);

var db;
request.onerror = function(event) {
    console.error("Database error: " + event.target.errorCode);
};

request.onsuccess = function(event) {
    console.log(event.target.result)
    db = event.target.result;
};

// This event is only implemented in recent browsers
request.onupgradeneeded = function(event) {
    // Save the IDBDatabase interface
    var db = event.target.result;
  
    // Create an objectStore for this database
    db.createObjectStore("pending", { autoIncrement: true });
};


function saveRecord (record) {
    const transaction = db.transaction(["pending"], "readwrite");

    // access your pending object store
    const store = transaction.objectStore("pending");

    // add record to your store with add method.
    store.add(record);
};
