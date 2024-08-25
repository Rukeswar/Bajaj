function submitData() {
    const jsonInput = document.getElementById('jsonInput').value;
    let error = document.getElementById('error');
    let dropdownContainer = document.getElementById('dropdownContainer');
    let results = document.getElementById('results');
    error.innerText = '';
    results.innerHTML = '';

    try {
        const parsedData = JSON.parse(jsonInput);
        if (!parsedData.data || !Array.isArray(parsedData.data)) {
            throw new Error('Invalid JSON structure.');
        }

        dropdownContainer.style.display = 'block';

        // Save data for further use
        window.userData = parsedData.data;

    } catch (e) {
        error.innerText = 'Please enter a valid JSON.';
        dropdownContainer.style.display = 'none';
    }
}

function filterData() {
    const selectedOptions = Array.from(document.getElementById('dropdown').selectedOptions).map(option => option.value);
    const data = window.userData;
    let results = document.getElementById('results');
    results.innerHTML = '';

    if (selectedOptions.includes('Alphabets')) {
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
        results.innerHTML += `<p>Alphabets: ${alphabets.join(', ')}</p>`;
    }

    if (selectedOptions.includes('Numbers')) {
        const numbers = data.filter(item => /^\d+$/.test(item));
        results.innerHTML += `<p>Numbers: ${numbers.join(', ')}</p>`;
    }

    if (selectedOptions.includes('HighestLowercase')) {
        const lowercaseAlphabets = data.filter(item => /^[a-z]$/.test(item));
        const highestLowercase = lowercaseAlphabets.sort().pop() || '';
        results.innerHTML += `<p>Highest Lowercase Alphabet: ${highestLowercase}</p>`;
    }
}
