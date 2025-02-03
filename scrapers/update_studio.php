#!/usr/bin/env php
<?php

// Fetch data from the chart API
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://chart.ber.gg/datagroupta');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
if (curl_errno($ch)) {
    die('Error fetching data: ' . curl_error($ch));
}
curl_close($ch);

// Decode the JSON response
$data = json_decode($response, true);
if (!$data || !isset($data['-1']['members'])) {
    die('Invalid data format received');
}

// Get the latest member count (last element in the members array)
$memberCount = end($data['-1']['members']);

// Create studio data array
$studioData = [
    'communitySize' => $memberCount,
    'lastUpdated' => date('Y-m-d H:i:s')
];

// Save to studio_data.json
$jsonData = json_encode($studioData, JSON_PRETTY_PRINT);
if (file_put_contents('../data/studio_data.json', $jsonData) === false) {
    die('Error writing to ../data/studio_data.json');
}

echo "Studio data updated successfully.\n";
echo "Community size: " . number_format($memberCount) . "\n";
?> 