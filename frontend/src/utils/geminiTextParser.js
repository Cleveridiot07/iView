const extractJsonFromText = (text) => {
    // Remove unnecessary symbols (backticks and hash symbols)
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').replace(/#[^\n]*/g, '').trim();
    
    // Extract JSON blocks using regex
    const jsonRegex = /\[([\s\S]+?)\]/g; // This matches the content inside the array brackets
    const matches = []; 
    let match;

    // Loop through all matches and store them
    while ((match = jsonRegex.exec(cleanedText)) !== null) {
        try {
            // Parse the JSON string and push to the result array
            matches.push(JSON.parse(`[${match[1]}]`)); // Wrap content in brackets before parsing
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    }

    return matches;
}

export default extractJsonFromText;
