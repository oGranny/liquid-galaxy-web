<?php
// NOTE: return_code: 2 means bad permissions

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the POST request data
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!isset($data['link']) || !filter_var($data['link'], FILTER_VALIDATE_URL) || !isset($data['path']) || !is_string($data['path'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input. Please provide a valid link and path.']);
        exit;
    }

    $link = $data['link'];
    $path = $data['path'];

    error_log("Downloading content from: $link");
    error_log("Saving content to: $path");

    $content = file_get_contents($link);
    if ($content === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to download content from the provided link.']);
        exit;
    }

    // Save the content to the specified path
    if (file_put_contents($path, $content) === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save content to the specified path.']);
        exit;
    }

    echo json_encode(['success' => 'Content downloaded and saved successfully.']);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Only POST requests are allowed.']);
}