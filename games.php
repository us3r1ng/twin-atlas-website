<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Games - Twin Atlas</title>
    <link rel="icon" href="/icon/ta-gradientcircle-32x32.png" sizes="32x32">
    <link rel="icon" href="/icon/ta-gradientcircle-192x192.png" sizes="192x192">
    <link rel="stylesheet" href="styles.css">
    <script src="js/shared.js"></script>
</head>
<body>
    <?php
        include_once('components/header.php');
    ?>

    <main>
        <section class="games-hero">
            <div class="games-hero-content">
                <h1>GAMES</h1>
                <p class="games-hero-description">From award-winning original games to brand integrations that reach millions, Twin Atlas delivers immersive experiences that players love. Partner with us to bring your brand to life.</p>
                <div class="hero-cta-container">
                    <a class="cta-button contact-form-button">Partner With Us</a>
                </div>
            </div>
            <div class="games-hero-character"></div>
            <div class="games-hero-wave"></div>
        </section>

        <section class="games-grid-section">
            <h2 class="section-title">Original Games</h2>
            <div class="games-grid" id="original-games">
                <!-- Original games will be populated by JavaScript -->
            </div>

            <h2 class="section-title">Brand Experiences</h2>
            <div class="games-grid" id="brand-games">
                <!-- Brand games will be populated by JavaScript -->
            </div>

            <h2 class="section-title">Roblox Events</h2>
            <div class="games-grid" id="event-games">
                <!-- Event games will be populated by JavaScript -->
            </div>
        </section>
    </main>

    <?php
        include_once('components/contact-form.php');
        include_once('components/footer.php');
    ?>

    <script src="js/games.js"></script>
</body>
</html> 