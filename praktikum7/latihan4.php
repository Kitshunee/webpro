<?php
// Latihan 4: grade berdasarkan nilai (if - elseif - else)
// Ubah nilai di bawah untuk mencoba hasil yang berbeda
$nilai = 85;

if ($nilai >= 90) {
    $grade = "A";
} elseif ($nilai >= 80) {
    $grade = "B";
} elseif ($nilai >= 70) {
    $grade = "C";
} else {
    $grade = "D";
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Latihan 4</title>
</head>
<body>
    <h2>Penilaian</h2>
    <p>Nilai: <?php echo $nilai; ?></p>
    <p>Grade: <strong><?php echo $grade; ?></strong></p>
</body>
</html>