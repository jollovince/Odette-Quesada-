<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit('Invalid request');
}

$type = $_POST['type'] ?? '';

$mail = new PHPMailer(true);

try {
    // SMTP SETTINGS
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'vincejollografel@gmail.com';        // 🔴 palitan
    $mail->Password = 'GMAIL_APP_PASSWORD';          // 🔴 Gmail APP PASSWORD
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom('YOUR_GMAIL@gmail.com', 'Website Form');
    $mail->addAddress('vincejollografel@gmail.com'); // TEST EMAIL
    $mail->isHTML(true);

    // ===== INQUIRY =====
    if ($type === 'inquiry') {
        $mail->Subject = 'New Inquiry';
        $mail->Body = "
            <b>Name:</b> {$_POST['name']}<br>
            <b>Email:</b> {$_POST['email']}<br>
            <b>Subject:</b> {$_POST['subject']}<br><br>
            " . nl2br($_POST['message']);
    }

    // ===== MERCH =====
    if ($type === 'merch') {
        $mail->Subject = 'Merchandise Order';
        $mail->Body = "
            <b>Name:</b> {$_POST['fullname']}<br>
            <b>Phone:</b> {$_POST['phone']}<br>
            <b>Order:</b> {$_POST['order']}<br><br>
            <b>Address:</b><br>" . nl2br($_POST['address']);
    }

    $mail->send();

    // ✅ SUCCESS → popup trigger
    header("Location: contact.html?success=1");
    exit;

} catch (Exception $e) {
    echo "Mailer Error: " . $mail->ErrorInfo;
}