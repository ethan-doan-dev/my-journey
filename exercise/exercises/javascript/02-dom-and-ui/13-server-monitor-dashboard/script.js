 // ==========================================
        // 1. DOM ELEMENT SELECTIONS
        // ==========================================
        const temperatureInput = document.getElementById("temperature-input");
        const electricityConsumption = document.getElementById("electricity-consumption");
        const doorStatus = document.getElementById("door-status");
        const updateBtn = document.getElementById("update-btn");
        const coolingStatus = document.getElementById("cooling-status");
        const sirenStatus = document.getElementById("siren-status");
        const infoStatus1 = document.getElementById("info-status1");
        const infoStatus2 = document.getElementById("info-status2");

        // ==========================================
        // 2. MAIN SYSTEM LOGIC (UPDATE EVENT)
        // ==========================================
        updateBtn.addEventListener("click", function() {

            // Extract values and convert inputs to numbers for logic evaluation
            const temperatureInputVL = Number(temperatureInput.value);
            const electricityConsumptionVL = Number(electricityConsumption.value);
            const doorStatusVL = doorStatus.value;

            // Reset error messages from previous execution
            infoStatus1.textContent = "";
            infoStatus2.textContent = "";

            // Reset the results screen
            coolingStatus.textContent = "--";
            coolingStatus.className = "status-value";

            sirenStatus.textContent = "--";
            sirenStatus.classList.remove("safe", "warning", "danger");
           

            // Initialize error flag for form validation
            let hasError = false;

            // --- VALIDATION PHASE ---
            
            // Check for empty input or temperature out of safe operational range
            if (temperatureInput.value === "" || temperatureInputVL < 10 || temperatureInputVL > 100) {
                infoStatus1.textContent = "❗❗❗ PLEASE ENTER A VALUE (10°C TO 100°C)";
                hasError = true;
            }
            
            // Check for empty input or negative electricity consumption
            if (electricityConsumption.value === "" || electricityConsumptionVL <= 0) {
                infoStatus2.textContent = "❗❗❗ PLEASE ENTER VALID ELECTRICITY CONSUMPTION (> 0)";
                hasError = true;
            }

            // Early return: Halt execution if any validation fails
            if (hasError === true) {
                return;
            }

            // --- COOLING SYSTEM LOGIC ---
            
            // Determine cooling requirements based on temperature thresholds
            if (temperatureInputVL < 24) {
                coolingStatus.textContent = "OFF";
                coolingStatus.className = "cooling-mode";
            } else if (temperatureInputVL >= 24 && temperatureInputVL <= 35) {
                coolingStatus.textContent = "ON (Normal Mode)";
                coolingStatus.className = "cooling-mode";
            } else {
                coolingStatus.textContent = "ON (Rapid Mode)";
                coolingStatus.className = "cooling-mode";
            }

            // --- SIREN ALARM LOGIC ---
            
            // Critical Priority: Check for critical limits (Danger)
            if (temperatureInputVL > 45 || electricityConsumptionVL > 50) {
                sirenStatus.textContent = "🚨 DANGER";
                sirenStatus.classList.remove("safe", "warning", "danger");
                sirenStatus.classList.add("danger");
                
            // Medium Priority: Check for security breaches (Warning)
            } else if (doorStatusVL === "open") {
                sirenStatus.textContent = "⚠ WARNING";
                sirenStatus.classList.remove("safe", "warning", "danger");
                sirenStatus.classList.add("warning");

            // Low Priority: System is operating normally (Safe)
            } else {
                sirenStatus.textContent = "✔ SAFE";
                sirenStatus.classList.remove("safe", "warning", "danger");
                sirenStatus.classList.add("safe");
            }

        }); 
        
        // ==========================================
        // 3. ACCESSIBILITY / KEYBOARD SUPPORT
        // ==========================================
        // Allow users to trigger the update by pressing the 'Enter' key
        document.addEventListener("keydown", function(event) { 
            if (event.key === "Enter") { 
                event.preventDefault(); // Prevent default browser behavior (e.g., page reload)
                updateBtn.click();      // Programmatically click the update button
            }
        });