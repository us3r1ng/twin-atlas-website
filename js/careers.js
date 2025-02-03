const NOTION_DATABASE_ID = '14630231eefa80c1a3c0e4abf9d2fa27';

// Start loading data immediately
fetchNotionCareers().then(positions => {
    if (positions && positions.length > 0) {
        const positionsContainer = document.querySelector('.positions-container');
        if (positionsContainer) {
            // Clear loading state
            positionsContainer.innerHTML = '';
            
            // Organize and create department sections
            const departmentPositions = organizePositionsByDepartment(positions);
            
            // Sort and render departments
            Object.entries(departmentPositions)
                .sort(([deptA], [deptB]) => {
                    if (deptA === 'Other') return 1;
                    if (deptB === 'Other') return -1;
                    return deptA.localeCompare(deptB);
                })
                .forEach(([department, deptPositions]) => {
                    const section = createDepartmentSection(department, deptPositions);
                    positionsContainer.appendChild(section);
                });
        }
    } else {
        // Show no positions message
        const positionsContainer = document.querySelector('.positions-container');
        if (positionsContainer) {
            positionsContainer.innerHTML = `
                <div class="no-positions">
                    No open positions at this time. Please check back later!
                </div>
            `;
        }
    }
}).catch(error => {
    console.error('Error loading positions:', error);
    const positionsContainer = document.querySelector('.positions-container');
    if (positionsContainer) {
        positionsContainer.innerHTML = `
            <div class="error">
                Error loading positions. Please try again later.
            </div>
        `;
    }
});

async function fetchNotionCareers() {
    try {
        const response = await fetch(getAssetPath('api/notion-careers.php'));
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        
        // Filter for live positions
        return data.results.filter(position => 
            position.properties['Live or Not Live']?.status?.name === 'Live'
        );
    } catch (error) {
        console.error('Error fetching careers from API, falling back to backup data:', error);
        try {
            // Attempt to load backup data
            const backupResponse = await fetch(getAssetPath('data/career_output.json'));
            if (!backupResponse.ok) {
                throw new Error(`Backup data HTTP error! status: ${backupResponse.status}`);
            }
            const backupData = await backupResponse.json();
            return backupData.results.filter(position => 
                position.properties['Live or Not Live']?.status?.name === 'Live'
            );
        } catch (backupError) {
            console.error('Error fetching backup careers data:', backupError);
            return null;
        }
    }
}

function createPositionCard(position) {
    try {
        const title = position.properties['Role Title']?.title?.[0]?.plain_text || 'Position Available';
        const location = position.properties.Location?.multi_select?.map(loc => loc.name).join(' / ') || 'Location TBD';
        const description = position.properties.Description?.rich_text?.[0]?.plain_text || '';
        const applicationLink = position.properties.Application?.url || '#';

        const card = document.createElement('div');
        card.className = 'position-card';
        
        const info = document.createElement('div');
        info.className = 'position-info';

        const titleElement = document.createElement('h3');
        titleElement.textContent = title;

        const locationElement = document.createElement('div');
        locationElement.className = 'position-location';
        locationElement.textContent = location;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = description;

        info.appendChild(titleElement);
        info.appendChild(locationElement);
        if (description) {
            info.appendChild(descriptionElement);
        }

        const applyButton = document.createElement('a');
        applyButton.href = applicationLink;
        applyButton.className = 'cta-button';
        applyButton.textContent = 'APPLY NOW';
        applyButton.target = '_blank';

        card.appendChild(info);
        card.appendChild(applyButton);

        return card;
    } catch (error) {
        console.error('Error creating position card:', error, position);
        return null;
    }
}

function organizePositionsByDepartment(positions) {
    const departments = {};
    
    positions.forEach(position => {
        // Department is a multi_select field, get the first department or 'Other'
        const departmentField = position.properties.Department?.multi_select;
        const department = departmentField && departmentField.length > 0 ? departmentField[0].name : 'Other';
        
        if (!departments[department]) {
            departments[department] = [];
        }
        departments[department].push(position);
    });
    
    return departments;
}

function createDepartmentSection(department, positions) {
    const section = document.createElement('div');
    section.className = 'department-section';
    
    const title = document.createElement('h2');
    title.className = 'section-subtitle';
    title.textContent =  department.toUpperCase();
    
    // const subtitle = document.createElement('h3');
    // subtitle.className = 'section-subtitle';
    // subtitle.textContent = `${positions.length} OPEN POSITION${positions.length !== 1 ? 'S' : ''}`;
    
    const list = document.createElement('div');
    list.className = 'positions-list';
    
    positions.forEach(position => {
        const card = createPositionCard(position);
        if (card) {
            list.appendChild(card);
        }
    });
    
    section.appendChild(title);
    //section.appendChild(subtitle);
    section.appendChild(list);
    return section;
}

// Function to check if element is ready
function waitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

// Initialize rendering as soon as the section is available
// waitForElement('.positions-section').then(positionsSection => {
//     const elements = initPositionsSection();
    
//     // Use the already started data loading
//     positionsDataPromise.then(positions => {
//         if (positions) {
//             renderPositions(positions, elements);
//         } else {
//             // Handle error state
//             const errorDiv = document.createElement('div');
//             errorDiv.className = 'error';
//             errorDiv.textContent = 'Error loading positions. Please try again later.';
//             elements.positionsSection.appendChild(errorDiv);
//             if (elements.loading) elements.loading.remove();
//         }
//     });
// }); 