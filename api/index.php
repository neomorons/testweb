<?php
// Set the content type to JSON
header('Content-Type: application/json');

// Function to extract title and image path from HTML content
function extractInfo($htmlContent) {
    // Assuming the title is in the <title> tag
    $titleRegex = '/<title>(.*?)<\/title>/';
    preg_match($titleRegex, $htmlContent, $titleMatches);
    $title = $titleMatches[1] ?? 'Untitled';

    // Assuming the image path is in a script tag
    $scriptRegex = '/<script>[\s\S]*?var\s+imagePath\s*=\s*["\'](.*?)["\'];[\s\S]*?<\/script>/';
    preg_match($scriptRegex, $htmlContent, $imageMatches);
    $imagePath = $imageMatches[1] ?? '';

    return [
        'name' => $title,
        'imagePath' => $imagePath,
    ];
}

// Function to create a JavaScript-readable array
function createArray($directory) {
    $htmlFiles = glob($directory . '/*.html');
    $array = [];

    foreach ($htmlFiles as $file) {
        $htmlContent = file_get_contents($file);
        $info = extractInfo($htmlContent);
        $fileName = basename($file);

        // Create an array entry with name, link, and image path
        $array[] = [
            'name' => $info['name'],
            'link' => './projects/' . $fileName,
            'imagePath' => $info['imagePath'],
        ];
    }

    return $array;
}

// Specify the path to the "projects" folder
$projectsFolderPath = '../projects';

// Generate the array
$array = createArray($projectsFolderPath);

// Output as JSON
echo json_encode($array);

?>
