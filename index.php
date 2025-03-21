<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Twin Atlas - Roblox Experience Creators</title>
    <link rel="icon" href="/icon/ta-gradientcircle-32x32.png" sizes="32x32">
    <link rel="icon" href="/icon/ta-gradientcircle-192x192.png" sizes="192x192">
    <link rel="stylesheet" href="styles.css">
    <script src="js/shared.js"></script>
    <script src="//www.googletagmanager.com/gtag/js?id=G-6YVQZTK28J" data-cfasync="false" data-wpfc-render="false" async=""></script>
</head>
<body>
    <?php
        include_once('components/header.php');
    ?>

    <main>
        <section class="hero">
            <div class="hero-content">
                <h1>IMAGINE. CREATE. PLAY</h1>
                <p class="hero-description">Twin Atlas is an independent game development studio dedicated to creating unforgettable and award-winning experiences on Roblox that reach millions of users.</p>
            </div>
        </section>

        <section class="cta-section">
            <div class="cta-card bizdev">
                <div class="cta-content">
                    <h2>Introduce your brand to millions</h2>
                    <p>Millions of people. Billions of plays. Why not partner with a game development studio who knows what your customers want to play?</p>
                    <button class="cta-button contact-form-button" id="bizdevButton" data-form-id="business">Let's Talk Business</button>
                    <div class="brands-slider">
                        <div class="brands-container">
                            <!-- Brands will be populated by JavaScript -->
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="cta-card merch">
                <div class="cta-content">
                    <div class="merch-content">
                        <h2>Official Merch</h2>
                        <p>Show your support with Twin Atlas gear</p>
                    </div>
                    <div class="merch-slider">
                        <div class="merch-items">
                            <!-- Merch items will be populated by JavaScript -->
                        </div>
                    </div>
                    <button class="cta-button" onclick="window.location.href='https://merch.twinatlas.com'">Shop Now</button>
                </div> 
            </div>

            <div class="cta-card support">
                <div class="cta-content"> 
                    <div class="text-content">
                        <h2>Need Help?</h2>
                        <p>Our support team is here for you</p>
                    </div>
                    <button class="cta-button contact-form-button" id="supportButton" data-form-id="game">Contact Support</button>
                </div>
            </div>
        </section>

        <section class="stats">
            <div class="stat-card">
                <h3 class="stat-number" id="experienceCount">0</h3>
                <p>Experiences Created</p>
            </div>
            <div class="stat-card">
                <h3 class="stat-number" id="likeRatio">0%</h3>
                <p>Average Rating</p>
            </div>
            <div class="stat-card">
                <h3 class="stat-number" id="communitySize">0</h3>
                <p>Community Members</p>
            </div>
        </section>

        <section class="portfolio">
            <h2 class="section-title">Our Portfolio</h2>
            <h3 class="section-subtitle">Discover Our Titles</h3>
            <div class="games-slider-container">
                <button class="slider-control prev">&lt;</button>
                <div class="games-slider">
                    <!-- Games will be populated by JavaScript -->
                </div>
                <button class="slider-control next">&gt;</button>
            </div>
        </section>
    </main>

    <?php
        include_once('components/contact-form.php');
        include_once('components/footer.php');
    ?>

    <script src="js/main.js"></script>
</body>
</html> 