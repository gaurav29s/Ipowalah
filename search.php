<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = ""; // Set your MySQL password
$database = "SearchApp";

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the search query
$query = isset($_POST['query']) ? $_POST['query'] : '';

if (!empty($query)) {
    // Prepare and execute the SQL query
    $stmt = $conn->prepare("SELECT name, description FROM Items WHERE name LIKE ? OR description LIKE ?");
    $searchTerm = "%" . $query . "%";
    $stmt->bind_param("ss", $searchTerm, $searchTerm);
    $stmt->execute();
    $result = $stmt->get_result();

    // Display the results
    if ($result->num_rows > 0) {
        echo "<h2>Search Results:</h2>";
        echo "<ul>";
        while ($row = $result->fetch_assoc()) {
            echo "<li><strong>" . htmlspecialchars($row['name']) . "</strong>: " . htmlspecialchars($row['description']) . "</li>";
        }
        echo "</ul>";
    } else {
        echo "<p>No results found for '<strong>" . htmlspecialchars($query) . "</strong>'</p>";
    }

    $stmt->close();
} else {
    echo "<p>Please enter a search term.</p>";
}

$conn->close();
?>