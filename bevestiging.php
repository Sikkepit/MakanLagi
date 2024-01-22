<!DOCTYPE html>
<html data-bs-theme="dark" lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">  
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="assets/css/font-awesome.min.css">
    <title>Indonesisch Restaurant Makan Lagi</title>
</head>
<body>
    <header class="container-fluid">
    <nav id="navigation-bar" class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
          <a class="navbar-brand" href="index.html">Makan Lagi</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="index.html">Bestellen</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="index.html">Over Ons</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="index.html">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <div id="main-wrapper">
    <div id="header-image-index" class="header-image"></div> 
      <main class="container">        
          <div id="menu-wrapper">
            <header>
                <h1>Bedankt voor je bestelling</h1>
            </header>
            <p>
                <?php

                    $straat = $_POST['straat'];
                    $huisnummer = $_POST['huisnummer'];
                    $postcode = $_POST['postcode'];
                    $woonplaats = $_POST['woonplaats'];
                    $naam = $_POST['naam'];
                    $email = $_POST['email'];
                    $telefoon = $_POST['telefoon'];
                    $opmerkingen = $_POST['opmerkingen'];
                    $bestelling = $_POST['bestelling'];

                    $message = '<div style="font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif;">';
                    $message .= "<h1>Bedankt voor jouw bestelling bij Makan Lagi!</h1>";
                    $message .= "<b>Jouw gegevens:</b><br>";
                    $message .= $naam . "<br>";
                    $message .= $straat . " " . $huisnummer . "<br>";
                    $message .= $postcode . " " . $woonplaats . "<br>";
                    $message .= $email . "<br>" . $telefoon . "<br><br>";
                    $message .= "<b>Opmerkingen:</b><br>" . $opmerkingen . "<br><br>";
                    $message .= "<b>Jouw bestelling:</b>";
                    $message .= $bestelling;
                    $message .= "<br>Als je nog vragen of aanvullende opmerkingen hebt, neem dan z.s.m. contact met ons op.</div>";

                    $errors = [];

                    if (!empty($_POST)) {         


                        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                            $errors[] = 'Email is invalid';
                            echo "Het e-mailadres dat je hebt opgegeven is ongeldig. Ga terug en probeer het opnieuw";
                        }

                        if (empty($errors)) {
                            $toEmail = 'dennis.hemstra@gmail.com';
                            $subject = 'Makan Lagi | Jouw bestelling bij Makan Lagi';
                            $headers = ['From' => 'no-reply@makanlagi.nl', 'Reply-To' => $email, 'Content-type' => 'text/html; charset=utf-8'];

                            if (mail($email, $subject, $message, $headers)) {
                                echo "Fijn dat je weer voor Makan Lagi hebt gekozen. We gaan meteen voor je aan de slag. Houd de deurbel in de gaten!";
                                echo "<script>localStorage.clear();</script>";
                                mail($toEmail, $subject, $message, $headers);

                            } else {
                                echo 'Oeps, er is iets mis gegaan. probeer het later nog eens';
                            }

                        }
                    }

                    ?>
            </p>
        </div>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
</html>
