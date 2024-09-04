<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>E-Vote</title>
        <link rel="shortcut icon" href="./assets/logo-sekolah-1.1.png" type="image/x-icon">
        <meta name="description" content="Website untuk melakukan voting secara online dan gratis dengan sistem login. Dikembangkan oleh GROWPLUS Community">
        <meta name="keywords" content="voting, vote, pemilihan suara, coblos, elektrik, elektrik vote, e-vote, growplus, growplus community">
        <meta name="author" content="GrowPlus Community">
        <meta name="robots" content="noindex, nofollow">
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="./vote.js"></script>
    </head>
    <body class="bg-gray-100 flex items-center justify-center min-h-screen">

        <?php
        $jsonData = file_get_contents('../database/hasil_votes.json');
        $votes = json_decode($jsonData, true);

        $votePaslon1 = $votes['paslon1'];
        $votePaslon2 = $votes['paslon2'];
        $voteAll = $votePaslon1 + $votePaslon2;

        $percentagePaslon1 = $voteAll > 0 ? round(($votePaslon1 / $voteAll) * 100) : 0;
        $percentagePaslon2 = $voteAll > 0 ? round(($votePaslon2 / $voteAll) * 100) : 0;
        ?>

        <div id="confirmation" class="flex flex-col items-center justify-center bg-white p-10 rounded-lg shadow-lg">
            <h1 class="text-2xl font-bold mb-4">Apakah Anda yakin ingin menampilkan hasil akhir vote?</h1>
            <button id="confirmButton" class="bg-red-500 text-white px-6 py-3 rounded-lg cursor-not-allowed opacity-50">
                Lanjutkan [10 Detik]
            </button>
        </div>

        <div id="result" class="hidden flex flex-col items-center w-full">
            <div class="flex items-center justify-center mb-8 w-full">
                <div class="relative w-1/2 sm:w-1/4">
                    <div class="absolute inset-0 flex flex-col items-center justify-center">
                        <h2 class="text-2xl font-bold">Total Vote: <?= $voteAll ?></h2>
                        <div class="flex justify-between items-center gap-5 w-[80%] box-sizing flex-wrap text-center">
                            <p>Paslon 1: <?= $percentagePaslon1 ?>%</p>
                            <p>Paslon 2: <?= $percentagePaslon2 ?>%</p>
                        </div>
                    </div>
                    <svg viewBox="0 0 36 36" class="w-full">
                        <circle cx="18" cy="18" r="15.915" class="text-gray-300 fill-none stroke-red-500" stroke-width="2"/>
                        <circle cx="18" cy="18" r="15.915" class="text-green-500 fill-none stroke-current" stroke-width="2" stroke-dasharray="<?= $percentagePaslon1 ?>, 100"/>
                    </svg>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row justify-between w-full px-4">
                <!-- Paslon 1 -->
                <div class="text-center w-full sm:w-1/2 p-4">
                    <img src="./assets/foto-calon1.png" alt="Paslon 1" class="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-2">
                    <h3 class="text-lg">Paslon 1</h3>
                    <div class="w-full bg-gray-300 rounded-full h-4 relative my-2">
                        <div class="bg-green-500 h-4 rounded-full" style="width: <?= $percentagePaslon1 ?>%;"></div>
                    </div>
                    <h4 class="text-xl">Suara: <?= $votePaslon1 ?></h4>
                </div>
                
                <!-- Paslon 2 -->
                <div class="text-center w-full sm:w-1/2 p-4">
                    <img src="./assets/foto-calon2.png" alt="Paslon 2" class="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-2">
                    <h3 class="text-lg">Paslon 2</h3>
                    <div class="w-full bg-gray-300 rounded-full h-4 relative my-2">
                        <div class="bg-red-500 h-4 rounded-full" style="width: <?= $percentagePaslon2 ?>%;"></div>
                    </div>
                    <h4 class="text-xl">Suara: <?= $votePaslon2 ?></h4>
                </div>
            </div>
        </div>
    </body>
</html>