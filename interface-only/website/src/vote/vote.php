<?php
session_start();
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hasilvote"; // Ganti dengan nama database Anda

$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Pastikan metode yang digunakan adalah POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Ambil ID calon yang dipilih
    $candidate_id = intval($_POST['candidate_id']);
    $user_id = $_SESSION['user_id']; // Anggap user ID disimpan di sesi setelah login

    // Cek apakah user sudah pernah vote
    $stmt = $conn->prepare("SELECT id FROM votes WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo "Anda sudah melakukan vote!";
    } else {
        // Simpan vote ke database
        $stmt = $conn->prepare("INSERT INTO votes (candidate_id, user_id) VALUES (?, ?)");
        $stmt->bind_param("ii", $candidate_id, $user_id);

        if ($stmt->execute()) {
            echo "Vote Anda berhasil disimpan!";
        } else {
            echo "Terjadi kesalahan: " . $stmt->error;
        }
    }
    $stmt->close();
}

$conn->close();
?>