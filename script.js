async function loadSakaStats() {
    try {
        // 1. Fetch the local JSON file
        const response = await fetch("saka.json");
        
        if (!response.ok) {
            throw new Error(`Could not load stats: ${response.status}`);
        }

        // 2. Parse the JSON
        const saka = await response.json();
        
        const club = saka.club;
        const international = saka.international;

        // 3. Calculate combined totals (including trophies and awards)
        const combined = {
            appearances: club.appearances + international.appearances,
            goals: club.goals + international.goals,
            assists: club.assists + international.assists,
            trophies: (club.trophies || 0) + (international.trophies || 0),
            awards: (club.awards || 0) + (international.awards || 0)
        };

        // 4. Helper function to update the HTML DOM
        const updateDOM = (prefix, data) => {
            document.getElementById(`${prefix}-appearances`).textContent = data.appearances;
            document.getElementById(`${prefix}-goals`).textContent = data.goals;
            document.getElementById(`${prefix}-assists`).textContent = data.assists;
            document.getElementById(`${prefix}-trophies`).textContent = data.trophies;
            document.getElementById(`${prefix}-awards`).textContent = data.awards;
        };

        // 5. Update all three cards
        updateDOM("club", club);
        updateDOM("international", international);
        updateDOM("combined", combined);

        // 6. Update footer info
        document.getElementById("last-updated").textContent = `Last updated: ${saka.lastUpdated}`;
        document.getElementById("source").textContent = `Source: Bzzoiro API + Manual data`;

    } catch (error) {
        console.error(error);
        alert("Could not load stats. Check that saka.json is in the same folder.");
    }
}

// Run the function when the page loads
loadSakaStats();