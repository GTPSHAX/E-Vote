<?php
$file = '../database/hasil_votes.json';

if (file_exists($file)) {
    $data = json_decode(file_get_contents($file), true);
} else {
    $data = [
        "paslon1" => 0,
        "paslon2" => 0
    ];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $selectedPaslon = $_POST['paslon'];

    if (isset($selectedPaslon) && isset($data["paslon$selectedPaslon"])) {
        $data["paslon$selectedPaslon"]++;
    }

    file_put_contents($file, json_encode($data));

    header('Location: ./success.html');
    exit();
}
?>
