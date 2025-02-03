<?php
header('Content-Type: application/json');

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    // Load environment variables
    $env = parse_ini_file(__DIR__ . '/../.env');
    if (!$env) {
        throw new Exception('Failed to load .env file');
    }
    
    $NOTION_API_KEY = $env['NOTION_API_KEY'];
    $DATABASE_ID = '14630231eefa80c1a3c0e4abf9d2fa27';

    // Validate API key exists
    if (!$NOTION_API_KEY) {
        throw new Exception('Notion API key not configured');
    }

    $ch = curl_init();
    if (!$ch) {
        throw new Exception('Failed to initialize CURL');
    }

    $url = "https://api.notion.com/v1/databases/{$DATABASE_ID}/query";
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
        'sorts' => [
            [
                'property' => 'Role Title',
                'direction' => 'ascending'
            ]
        ]
    ]));

    $headers = [
        'Authorization: Bearer ' . $NOTION_API_KEY,
        'Notion-Version: 2022-06-28',
        'Content-Type: application/json'
    ];

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $response = curl_exec($ch);
    if ($response === false) {
        throw new Exception('CURL error: ' . curl_error($ch));
    }

    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200) {
        echo $response;
    } else {
        $error = json_decode($response, true);
        throw new Exception('Notion API error: ' . json_encode($error) . ' (HTTP ' . $httpCode . ')');
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => $e->getMessage(),
        'file' => $e->getFile(),
        'line' => $e->getLine()
    ]);
} 