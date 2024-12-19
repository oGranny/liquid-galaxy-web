<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!isset($data['command']) || !is_string($data['command'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input. Please provide a valid command string.']);
        exit;
    }

    $command = $data['command'];

    error_log("Executing command: $command");

    $output = [];
    $return_var = 0;
    exec("sudo -u lg bash -c '$command' 2>&1", $output, $return_var);

    error_log("Command output: " . implode("\n", $output));
    error_log("Return code: $return_var");

    if ($return_var === 0) {
        echo json_encode(['output' => $output]);
    } else {
        echo json_encode(['error' => 'Command failed to execute.', 'return_code' => $return_var, 'output' => $output]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Only POST requests are allowed.']);
}