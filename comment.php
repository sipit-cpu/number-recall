<?php

session_start();

$conn = new mysqli("localhost","menantui_gameuser","DxOIi_e5[Xe9Qc0_","menantui_comments");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

/* anti spam 30 detik */

if(isset($_SESSION['last_comment'])){
    $diff = time() - $_SESSION['last_comment'];

    if($diff < 30){
        die("Tunggu 30 detik sebelum komentar lagi.");
    }
}

/* ambil data */

$name = htmlspecialchars($_POST['name']);
$comment = htmlspecialchars($_POST['comment']);
$rating = intval($_POST['rating']);

/* validasi */

if(strlen($name) < 2){
    die("Nama terlalu pendek");
}

if(strlen($comment) > 200){
    die("Komentar maksimal 200 karakter");
}

if($rating < 1 || $rating > 5){
    die("Rating tidak valid");
}

/* simpan */

$sql = "INSERT INTO comments (name,rating,comment)
VALUES ('$name','$rating','$comment')";

$conn->query($sql);

/* simpan waktu komentar */

$_SESSION['last_comment'] = time();

/* kembali ke homepage */

header("Location: index.html");

?>