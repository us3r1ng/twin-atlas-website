<?php

// Read local game data JSON file
$gameData = file_get_contents('game_data.json');
if ($gameData === false) {
    die('Error: Failed to read game_data.json');
}

$games = json_decode($gameData, true);
if ($games === null) {
    die('Error: Failed to decode game_data.json');
}

function fetchData($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $data = curl_exec($ch);
    if (curl_errno($ch)) {
        throw new Exception('Curl error: ' . curl_error($ch));
    }
    curl_close($ch);
    $decodedData = json_decode($data, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('JSON Decode Error: ' . json_last_error_msg());
    }
    return $decodedData;
}

// Filter for pinned games
$pinnedGames = array_filter($games, function($game) {
    return isset($game['pinned']) && $game['pinned'] === true;
});

if (empty($pinnedGames)) {
    die('Error: No pinned games found.');
}

$universeIds = array_column($pinnedGames, 'universe_id');
$universeIdList = implode(',', $universeIds);

// Fetch visit and vote data
$visitsUrl = "https://games.roblox.com/v1/games?universeIds=$universeIdList";
$votesUrl = "https://games.roblox.com/v1/games/votes?universeIds=$universeIdList";

// Fetch data
$visitData = fetchData($visitsUrl);
$voteData = fetchData($votesUrl);

// Index visit and vote data by universe ID for easy lookup
$visitsIndexed = [];
foreach ($visitData['data'] as $item) {
    $visitsIndexed[$item['id']] = $item['visits'];
}

$votesIndexed = [];
$upVotesIndexed = [];
$downVotesIndexed = [];
foreach ($voteData['data'] as $item) {
    $totalVotes = $item['upVotes'] + $item['downVotes'];
    $likeRatio = $totalVotes > 0 ? round(($item['upVotes'] / $totalVotes) * 100) : 0;
    $votesIndexed[$item['id']] = $likeRatio;
    $upVotesIndexed[$item['id']] = $item['upVotes'];
    $downVotesIndexed[$item['id']] = $item['downVotes'];
}

// Add visits and votes to games array
$outputGames = [];
foreach ($pinnedGames as $game) {
    $universeId = $game['universe_id'] ?? null;
    $visits = $universeId && isset($visitsIndexed[$universeId]) ? $visitsIndexed[$universeId] : 0;
    $likeRatio = $universeId && isset($votesIndexed[$universeId]) ? $votesIndexed[$universeId] : 0;
    $upVotes = $universeId && isset($upVotesIndexed[$universeId]) ? $upVotesIndexed[$universeId] : 0;
    $downVotes = $universeId && isset($downVotesIndexed[$universeId]) ? $downVotesIndexed[$universeId] : 0;
    $placeLink = "https://www.roblox.com/games/" . $game['place_id'];

    $outputGames[] = [
        'title' => $game['title'],
        'link' => $placeLink,
        'visits' => $visits,
        'like_ratio' => $likeRatio,
        'up_votes' => $upVotes,
        'down_votes' => $downVotes,
        'image_url' => $game['image_url']
    ];
}

// Sort games by visit count in descending order
usort($outputGames, function($a, $b) {
    return $b['visits'] - $a['visits'];
});

// Output the updated game data to a JSON file
file_put_contents('updated_game_data.json', json_encode($outputGames, JSON_PRETTY_PRINT));

echo "Pinned game stats updated successfully.\n";

?>