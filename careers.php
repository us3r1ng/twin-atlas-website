<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Careers - Twin Atlas</title>
    <link rel="icon" href="/icon/ta-gradientcircle-32x32.png" sizes="32x32">
    <link rel="icon" href="/icon/ta-gradientcircle-192x192.png" sizes="192x192">
    <link rel="stylesheet" href="styles.css">
    <script src="js/shared.js"></script>
    <script src="js/careers.js" async></script>
    <script src="//www.googletagmanager.com/gtag/js?id=G-6YVQZTK28J" data-cfasync="false" data-wpfc-render="false" async=""></script>
</head>
<body>
    <?php
        include_once('components/header.php');
    ?>

    <main>
        <section class="hero careers-hero">
            <div class="hero-content">
                <h1>JOIN OUR<br>CREATIVE TEAM</h1>
                <p class="hero-description">Be part of the fastest growing studio in the Roblox space</p>
            </div>
        </section>

        <section class="content-section values-section">
            <h2 class="section-title">TWIN ATLAS VALUES</h2>
            <h3 class="section-subtitle">DISCOVER WHAT MAKES US GREAT</h3>
            <div class="values-grid">
                <div class="value-card">
                    <div class="value-icon">
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="30" cy="30" r="25" stroke="#FF00FF" stroke-width="2"/>
                            <path d="M20 30L27 37L40 24" stroke="#FF00FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <h3>Quality</h3>
                    <p>From the games we create to how we approach our work, quality is at the heart of everything we do. Our commitment to quality ensures that anyone who interacts with our titles are always happy with their experience.</p>
                </div>
                <div class="value-card">
                    <div class="value-icon">
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <!-- Left puzzle piece -->
                            <path d="M15 20H25C25 20 25 15 28 15C31 15 31 20 31 20V25C31 25 36 25 36 28C36 31 31 31 31 31V40H15C12.7909 40 11 38.2091 11 36V24C11 21.7909 12.7909 20 15 20Z" stroke="#FF00FF" stroke-width="2"/>
                            <!-- Right puzzle piece -->
                            <path d="M45 40H35C35 40 35 45 32 45C29 45 29 40 29 40V35C29 35 24 35 24 32C24 29 29 29 29 29V20H45C47.2091 20 49 21.7909 49 24V36C49 38.2091 47.2091 40 45 40Z" stroke="#FF00FF" stroke-width="2"/>
                        </svg>
                    </div>
                    <h3>Integrity</h3>
                    <p>For us, integrity is a company core value that means doing the right thing, even when no one is looking. This includes being honest with our customers, vendors, and employees, as well as following through on commitments.</p>
                </div>
                <div class="value-card">
                    <div class="value-icon">
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 20H40C42.2091 20 44 21.7909 44 24V36C44 38.2091 42.2091 40 40 40H20C17.7909 40 16 38.2091 16 36V24C16 21.7909 17.7909 20 20 20Z" stroke="#FF00FF" stroke-width="2"/>
                            <path d="M16 25L30 32L44 25" stroke="#FF00FF" stroke-width="2"/>
                        </svg>
                    </div>
                    <h3>Communication</h3>
                    <p>We pride ourselves on our ability to effectively and efficiently relay information between individuals and groups. Our commitment to clear and concise communication is foundational to our success as a company.</p>
                </div>
            </div>
        </section>

        <section class="content-section benefits-section">
            <h2 class="section-title">WHY JOIN US</h2>
            <h3 class="section-subtitle">DISCOVER OUR BENEFITS</h3>
            <div class="benefits-grid">
                <div class="benefit-card">
                    <h3>Flexible Work Environment</h3>
                    <ul>
                        <li>Remote positions available</li>
                        <li>Office locations for those who prefer in-person</li>
                        <li>Hybrid work options</li>
                    </ul>
                </div>
                <div class="benefit-card">
                    <h3>Comprehensive Benefits</h3>
                    <ul>
                        <li>Full healthcare coverage</li>
                        <li>Dental and vision plans</li>
                        <li>Mental health support</li>
                    </ul>
                </div>
                <div class="benefit-card">
                    <h3>Growth Opportunity</h3>
                    <ul>
                        <li>Fastest growing Roblox studio</li>
                        <li>Rapid career advancement</li>
                        <li>Learn from industry experts</li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="content-section positions-section">
            <h2 class="section-title">OPEN POSITIONS</h2>
            <div class="positions-container">
                <div class="department-section">
                    <div class="positions-list">
                        <div class="position-card loading-card">
                            <div class="position-info">
                                <div class="loading-title"></div>
                                <div class="loading-location"></div>
                            </div>
                            <div class="loading-button"></div>
                        </div>
                        <div class="position-card loading-card">
                            <div class="position-info">
                                <div class="loading-title"></div>
                                <div class="loading-location"></div>
                            </div>
                            <div class="loading-button"></div>
                        </div>
                        <div class="position-card loading-card">
                            <div class="position-info">
                                <div class="loading-title"></div>
                                <div class="loading-location"></div>
                            </div>
                            <div class="loading-button"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <?php
        include_once('components/footer.php');
    ?>

    <style>
        .careers-hero {
            background: linear-gradient(135deg, var(--gradient-start), var(--gradient-middle));
            min-height: 60vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            position: relative;
            overflow: hidden;
            padding: 8rem 2rem 4rem;
            margin: -2rem -2rem 0;
        }

        .hero-content h1 {
            font-family: 'Futura', sans-serif;
            font-weight: 900;
            font-size: 4rem;
            margin-bottom: 1rem;
            color: var(--text-white);
            text-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
        }

        .hero-description {
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.9);
            max-width: 600px;
            margin: 0 auto;
        }

        .content-section {
            padding: 4rem 2rem;
            max-width: 1275px;;
            margin: 0 auto;
        }

        .values-grid, .benefits-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        .value-card, .benefit-card, .position-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            padding: 2rem;
            border-radius: 20px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .value-card::before, .benefit-card::before, .position-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, 
                rgba(255, 0, 255, 0.1),
                rgba(108, 0, 255, 0.1));
            z-index: -1;
            transition: opacity 0.3s ease;
            opacity: 0;
        }

        .value-card:hover, .benefit-card:hover, .position-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(255, 0, 255, 0.2);
        }

        .value-card:hover::before, .benefit-card:hover::before, .position-card:hover::before {
            opacity: 1;
        }

        .value-icon {
            width: 60px;
            height: 60px;
            margin-bottom: 1.5rem;
        }

        .value-icon svg {
            width: 100%;
            height: 100%;
            transition: transform 0.3s ease;
        }

        .value-icon svg path,
        .value-icon svg circle {
            transition: stroke 0.3s ease;
        }

        .value-card:hover .value-icon svg {
            transform: scale(1.1);
        }

        .value-card:hover .value-icon svg path,
        .value-card:hover .value-icon svg circle {
            stroke: var(--gradient-middle);
        }

        .value-card h3, .benefit-card h3, .position-card h3 {
            color: var(--text-white);
            margin-bottom: 1rem;
            font-family: 'Futura', sans-serif;
            font-weight: 700;
            font-size: 1.5rem;
        }

        .value-card p, .benefit-card p, .position-card p {
            color: rgba(255, 255, 255, 0.8);
            font-size: 1rem;
            line-height: 1.6;
        }

        .benefit-card ul {
            list-style: none;
            padding: 0;
            margin: 0;
            color: rgba(255, 255, 255, 0.8);
        }

        .benefit-card li {
            margin-bottom: 0.8rem;
            padding-left: 1.5rem;
            position: relative;
        }

        .benefit-card li::before {
            content: "→";
            position: absolute;
            left: 0;
            color: var(--gradient-start);
        }

        .position-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            padding: 1.5rem 2rem;
            border-radius: 20px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
            overflow: hidden;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 2rem;
            width: 100%;
        }

        .position-info {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            flex: 1;
            min-width: 0;
        }

        .position-card h3 {
            color: var(--text-white);
            margin: 0;
            font-family: 'Futura', sans-serif;
            font-weight: 700;
            font-size: 1.5rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .position-location {
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.9rem;
        }

        .position-card .cta-button {
            flex-shrink: 0;
            width: 180px;
            text-align: center;
            padding: 0.75rem 1rem;
        }

        .tags-container, .department-tag, .location-tag {
            display: none;
        }

        .loading, .error, .no-positions {
            text-align: center;
            padding: 3rem;
            color: rgba(255, 255, 255, 0.8);
            font-size: 1.2rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            backdrop-filter: blur(10px);
            width: 100%;
            grid-column: 1 / -1;
        }

        .error {
            color: #FF4444;
            background: rgba(255, 68, 68, 0.1);
        }

        .department-section {
            margin-bottom: 3rem;
            width: 100%;
        }

        .department-title {
            font-family: 'Futura', sans-serif;
            font-weight: 900;
            font-size: 2rem;
            margin: 3rem 0 0;
            color: var(--text-white);
            text-transform: uppercase;
        }

        .department-wedge {
            background: rgba(255, 0, 255, 0.8);
            clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
            padding: 1rem 2rem;
            margin: 0.5rem 0 2rem;
            text-align: center;
            width: 100%;
            max-width: 600px;
        }

        .department-wedge span {
            display: block;
            color: white;
            font-weight: 500;
            font-size: 1rem;
            text-transform: uppercase;
        }

        .positions-grid {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            width: 100%;
        }

        .positions-section {
            max-width: 1275px;;
             margin: 0 auto;
            padding: 4rem 2rem;
        }

        .loading-card {
            background: rgba(255, 255, 255, 0.05);
            animation: pulse 1.5s infinite;
        }

        .loading-title {
            height: 24px;
            width: 60%;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            margin-bottom: 8px;
        }

        .loading-location {
            height: 16px;
            width: 40%;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
        }

        .loading-button {
            height: 48px;
            width: 180px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
        }

        @keyframes pulse {
            0% { opacity: 0.5; }
            50% { opacity: 0.8; }
            100% { opacity: 0.5; }
        }

        @media (max-width: 768px) {
            .hero-content h1 {
                font-size: 2.5rem;
            }

            .hero-description {
                font-size: 1.2rem;
            }

            .content-section {
                padding: 2rem 1rem;
            }

            .values-grid, .benefits-grid {
                grid-template-columns: 1fr;
            }

            .careers-hero {
                min-height: 40vh;
            }
        }
    </style>
</body>
</html> 