class CarGenerator {
    constructor(room) {
        this.room = room; 
        this.generateBtn = document.getElementById('generateBtn');
        this.manufacturerInput = document.getElementById('manufacturer');
        this.bodyTypeSelect = document.getElementById('bodyType');
        this.fuelTypeSelect = document.getElementById('fuelType');
        this.drivetrainInput = document.getElementById('drivetrainInput'); 
        this.yearInput = document.getElementById('year');
        this.designEraSelect = document.getElementById('designEra');
        this.modelInput = document.getElementById('model');
        this.exteriorColorInput = document.getElementById('exteriorColor'); 
        this.descriptionInput = document.getElementById('description');
        this.carResult = document.getElementById('carResult');
        this.carImage = document.getElementById('carImage');
        this.carTitle = document.getElementById('carTitle');
        this.carEngine = document.getElementById('carEngine');
        this.carHorsepower = document.getElementById('carHorsepower');
        this.carTopSpeed = document.getElementById('carTopSpeed');
        this.car0to60 = document.getElementById('car0to60');
        this.carDescriptionText = document.getElementById('carDescriptionText');
        this.carDrivetrain = document.getElementById('carDrivetrain');
        this.carTransmission = document.getElementById('carTransmission');
        this.carTorque = document.getElementById('carTorque');
        this.carFuelEconomy = document.getElementById('carFuelEconomy');
        this.carPrice = document.getElementById('carPrice');
        this.carKeyFeatures = document.getElementById('carKeyFeatures');
        this.carExteriorFeatures = document.getElementById('carExteriorFeatures');
        this.carInteriorFeatures = document.getElementById('carInteriorFeatures');
        this.carMarketsList = document.getElementById('carMarketsList');
        
        this.carWheelbase = document.getElementById('carWheelbase');
        this.carCurbWeight = document.getElementById('carCurbWeight');
        this.carHeight = document.getElementById('carHeight');
        this.carWidth = document.getElementById('carWidth');
        
        this.carSeatingCapacity = document.getElementById('carSeatingCapacity');
        this.carCargoVolume = document.getElementById('carCargoVolume');
        this.carGroundClearance = document.getElementById('carGroundClearance');
        this.carTurningCircle = document.getElementById('carTurningCircle');
        this.carCylinders = document.getElementById('carCylinders');
        this.carWheelSize = document.getElementById('carWheelSize');
        this.carQuarterMile = document.getElementById('carQuarterMile');
        this.carChargeTime = document.getElementById('carChargeTime');
        this.carDragCoefficient = document.getElementById('carDragCoefficient');
        
        this.carTireType = document.getElementById('carTireType');
        this.carBrakeSystem = document.getElementById('carBrakeSystem');
        this.carSuspension = document.getElementById('carSuspension');
        this.carFuelCapacity = document.getElementById('carFuelCapacity');
        this.carBatteryCapacity = document.getElementById('carBatteryCapacity');
        this.carInfotainment = document.getElementById('carInfotainment');
        this.carSafetyRating = document.getElementById('carSafetyRating');
        this.carProductionYears = document.getElementById('carProductionYears');
        this.carSegmentSelect = document.getElementById('carSegment'); 
        
        this.carNumberOfDoors = document.getElementById('carNumberOfDoors');
        this.carSteeringType = document.getElementById('carSteeringType');
        this.carCoolingSystem = document.getElementById('carCoolingSystem');
        this.carChassisType = document.getElementById('carChassisType');
        this.carHeadlightType = document.getElementById('carHeadlightType');
        this.carPayloadCapacity = document.getElementById('carPayloadCapacity');
        this.carTowingCapacity = document.getElementById('carTowingCapacity');
        this.carNumberOfAirbags = document.getElementById('carNumberOfAirbags');
        this.carEmoji = document.getElementById('carEmoji'); 
        this.isSpinning = false;
        
        this.soundEnabled = true;
        this.loadingSound = new Audio('loading-sound.mp3');
        this.successSound = new Audio('success-sound.mp3');
        this.tankLoadingSound = new Audio('tank-loading-sound.mp3');
        this.tankSuccessSound = new Audio('tank-success-sound.mp3');
        this.planeLoadingSound = new Audio('plane-loading-sound.mp3');
        this.planeSuccessSound = new Audio('plane-success-sound.mp3');
        this.boatLoadingSound = new Audio('boat-loading-sound.mp3');
        this.boatSuccessSound = new Audio('boat-success-sound.mp3');
        this.trainLoadingSound = new Audio('train-loading-sound.mp3');
        this.trainSuccessSound = new Audio('train-success-sound.mp3');
        this.soundToggle = document.getElementById('soundToggle');
        this.soundOnIcon = document.querySelector('.sound-on');
        this.soundOffIcon = document.querySelector('.sound-off');

        this.settingsBtn = document.getElementById('settingsBtn');
        this.settingsModal = document.getElementById('settingsModal');
        this.closeSettingsBtn = document.getElementById('closeSettingsBtn');

        this.backgroundSelect = document.getElementById('backgroundSelect');
        this.backgroundThemes = {
            'default': { primary: '#f5f7fa', secondary: '#c3cfe2' },
            'dark-blue': { primary: '#2c3e50', secondary: '#34495e' },
            'light-grey': { primary: '#e0e0e0', secondary: '#f0f0f0' },
            'warm-gradient': { primary: '#fceabb', secondary: '#f8b500' },
            'sunset-orange': { primary: '#ff9966', secondary: '#ff5e62' },
            'forest-green': { primary: '#0ba360', secondary: '#3cba92' }
        };
        
        this.fontSelect = document.getElementById('fontSelect');

        this.windowBackgroundSelect = document.getElementById('windowBackgroundSelect');
        this.customWindowBackgroundColor = document.getElementById('customWindowBackgroundColor');
        this.windowThemes = {
            'default': { bg: '#ffffff', text: '#1a1a1a', textSecondary: '#555', specBg: '#f8f8f8', border: '#e5e5e5' },
            'light-blue': { bg: '#eef8ff', text: '#1a1a1a', textSecondary: '#557', specBg: '#e0f0ff', border: '#d0e0f0' },
            'light-green': { bg: '#f0fff4', text: '#1a1a1a', textSecondary: '#575', specBg: '#e2f5e8', border: '#d2e5d8' },
            'light-gold': { bg: '#fffbeb', text: '#1a1a1a', textSecondary: '#765', specBg: '#fff2d4', border: '#f0e2c4' },
            'dark-mode': { bg: '#2d3748', text: '#f7fafc', textSecondary: '#a0aec0', specBg: '#4a5568', border: '#4a5568' },
            'light-purple': { bg: '#f5f0ff', text: '#1a1a1a', textSecondary: '#657', specBg: '#e8e0ff', border: '#d8d0f0' },
            'light-coral': { bg: '#fff0f0', text: '#1a1a1a', textSecondary: '#755', specBg: '#ffe0e0', border: '#f0d0d0' },
            'light-cyan': { bg: '#e0ffff', text: '#1a1a1a', textSecondary: '#577', specBg: '#d0f0f0', border: '#c0e0e0' },
            'dark-purple': { bg: '#2d1a3a', text: '#f7f0fc', textSecondary: '#b0a0c0', specBg: '#4a3558', border: '#4a3558' },
            'dark-green': { bg: '#1a2d1a', text: '#f0fcf0', textSecondary: '#a0c0a0', specBg: '#2a4a2a', border: '#2a4a2a' }
        };

        this.cornerRadiusSelect = document.getElementById('cornerRadiusSelect');

        this.modeSelect = document.getElementById('modeSelect');
        this.title = document.querySelector('.title');
        this.subtitle = document.querySelector('.subtitle');
        this.instructions = document.querySelector('.instructions');
        this.sharePrompt = document.querySelector('.share-prompt');
        this.isCarMode = true;

        this.bodyTypeLabel = document.getElementById('bodyTypeLabel');
        this.carSegmentLabel = document.getElementById('carSegmentLabel');
        this.modelLabel = document.getElementById('modelLabel');
        this.fuelTypeLabel = document.getElementById('fuelTypeLabel'); 
        this.drivetrainInputLabel = document.getElementById('drivetrainInputLabel'); 

        this.generatedCountElement = document.getElementById('generatedCount');

        this.init();
    }

    async init() {
        if (!this.room.initialized) {
            await this.room.initialize();
        }

        this.room.query('SELECT COUNT(*) AS total_generations FROM public.generation')
            .subscribe((result) => {
                if (result && result.length > 0) {
                    const count = parseInt(result[0].total_generations, 10);
                    this.updateGeneratedCountDisplay(count);
                } else {
                    this.updateGeneratedCountDisplay(0); 
                }
            });

        this.generateBtn.addEventListener('click', () => this.generateCar());
        
        [this.manufacturerInput, this.yearInput, this.modelInput, this.exteriorColorInput, this.descriptionInput].forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    if (input.tagName.toLowerCase() === 'textarea') {
                        e.preventDefault();
                    }
                    this.generateCar();
                }
            });
        });
        
        this.soundToggle.addEventListener('click', () => this.toggleSound());

        this.settingsBtn.addEventListener('click', () => this.openSettingsModal());
        this.closeSettingsBtn.addEventListener('click', () => this.closeSettingsModal());
        window.addEventListener('click', (event) => {
            if (event.target == this.settingsModal) {
                this.closeSettingsModal();
            }
        });
        this.setupAudio(); 

        this.backgroundSelect.addEventListener('change', () => this.handleBackgroundChange());
        this.loadBackgroundPreference();

        this.windowBackgroundSelect.addEventListener('change', () => this.handleWindowBackgroundChange());
        this.customWindowBackgroundColor.addEventListener('input', () => this.handleCustomWindowBackgroundChange());
        this.loadWindowBackgroundPreference();

        this.fontSelect.addEventListener('change', () => this.handleFontChange());
        this.loadFontPreference();

        this.cornerRadiusSelect.addEventListener('change', () => this.handleCornerRadiusChange());
        this.loadCornerRadiusPreference();

        this.modeSelect.addEventListener('change', () => this.handleModeChange());
        this.loadModePreference(); 
    }

    handleModeChange() {
        const selectedMode = this.modeSelect.value;
        this.isCarMode = selectedMode === 'car';
        this.updateUIForMode();
        localStorage.setItem('modePreference', selectedMode);
    }

    loadModePreference() {
        const savedMode = localStorage.getItem('modePreference');
        if (savedMode) {
            this.modeSelect.value = savedMode;
            this.isCarMode = savedMode === 'car';
        }
        this.updateUIForMode(); 
    }

    updateUIForMode() {
        if (this.isCarMode) {
            this.title.innerHTML = 'مولد السيارات الذكي <span id="carEmoji" class="emoji-car">🚗</span>';
            this.subtitle.textContent = 'توليد سيارات واقعية باستخدام الذكاء الاصطناعي';
            this.instructions.textContent = 'املأ الحقول أدناه لوصف سيارة أحلامك. سيقوم الذكاء الاصطناعي بتوليد تصميم مفصل، يشمل المواصفات والميزات وصورة فريدة!';
            this.sharePrompt.textContent = '✨ شارك إبداعك! علق أدناه بالسيارة التي قمت بتوليدها.';
            this.bodyTypeLabel.innerHTML = '🚙 Car Body Type';
            this.bodyTypeSelect.innerHTML = this.getCarBodyTypeOptions();
            this.carSegmentLabel.innerHTML = '🏷️ Car Segment';
            this.carSegmentSelect.innerHTML = this.getCarSegmentOptions();
            this.designEraSelect.innerHTML = this.getCarDesignEraOptions(); 
            this.modelLabel.innerHTML = '🏷️ Car Model/Name';
            this.fuelTypeLabel.innerHTML = '⛽ Fuel Type'; 
            this.fuelTypeSelect.innerHTML = this.getCarFuelTypeOptions(); 
            this.drivetrainInputLabel.innerHTML = '⚙️ Drivetrain'; 
            this.drivetrainInput.innerHTML = this.getCarDrivetrainOptions(); 
            document.getElementById('manufacturer').placeholder = 'e.g., Porsche, Ford, Toyota';
            document.getElementById('model').placeholder = 'e.g., 911 Turbo S, F8 Tributo';
            document.body.classList.remove('tank-mode');
            
            document.getElementById('engineLabel').innerHTML = '⚙️ Engine';
            document.getElementById('horsepowerLabel').innerHTML = '🐎 Horsepower';
            document.getElementById('topSpeedLabel').innerHTML = '🚀 Top Speed';
            document.getElementById('accelerationLabel').innerHTML = '⏱️ 0-60 mph';
            document.getElementById('fuelEconomyLabel').innerHTML = '🍃 Fuel Economy';
            document.getElementById('wheelbaseLabel').innerHTML = '📏 Wheelbase';
            document.getElementById('weightLabel').innerHTML = '⚖️ Curb Weight';
            document.getElementById('seatingLabel').innerHTML = '🧑‍🤝‍🧑 Seating Capacity';
            document.getElementById('cargoLabel').innerHTML = '📦 Cargo Volume';
            document.getElementById('cylindersLabel').innerHTML = '⚙️ Cylinders';
            document.getElementById('wheelSizeLabel').innerHTML = '🛞 Wheel Size';
            document.getElementById('quarterMileLabel').innerHTML = '⏱️ Acceleration (1/4 mile)';
            document.getElementById('chargeTimeLabel').innerHTML = '🔋 Charge Time (Electric)';
            document.getElementById('dragCoefficientLabel').innerHTML = '🔝 Aero Cd';
            document.getElementById('batteryLabel').innerHTML = '🔋 Battery Capacity';
            document.getElementById('infotainmentLabel').innerHTML = '📡 Infotainment';
            document.getElementById('safetyLabel').innerHTML = '🛡️ Safety Rating';
            document.getElementById('doorsLabel').innerHTML = '🚪 Number of Doors';
            document.getElementById('chassisLabel').innerHTML = '🏗️ Chassis Type';
            document.getElementById('headlightLabel').innerHTML = '💡 Headlight Type';
            document.getElementById('towingLabel').innerHTML = '🔗 Towing Capacity';
            document.getElementById('airbagsLabel').innerHTML = ' airbag';
        } else if (this.modeSelect.value === 'tank') {
            this.title.innerHTML = 'AI Tank Generator <span id="carEmoji" class="emoji-car">🛡️</span>';
            this.subtitle.textContent = 'Generate military tanks with AI-powered specifications';
            this.instructions.textContent = 'Fill in the fields below to describe your combat vehicle. Our AI will generate detailed tank specifications, features, and a unique image!';
            this.sharePrompt.textContent = '✨ Share your creation! Comment below with the tank you generated.';
            this.bodyTypeLabel.innerHTML = '🪖 Tank Body Type';
            this.bodyTypeSelect.innerHTML = this.getTankBodyTypeOptions();
            this.carSegmentLabel.innerHTML = '🛡️ Tank Segment';
            this.carSegmentSelect.innerHTML = this.getTankSegmentOptions();
            this.designEraSelect.innerHTML = this.getTankDesignEraOptions(); 
            this.modelLabel.innerHTML = '🏷️ Tank Model/Name';
            this.fuelTypeLabel.innerHTML = '⛽ Propulsion Type'; 
            this.fuelTypeSelect.innerHTML = this.getTankFuelTypeOptions(); 
            this.drivetrainInputLabel.innerHTML = '⚙️ Mobility System'; 
            this.drivetrainInput.innerHTML = this.getTankDrivetrainOptions(); 
            document.getElementById('manufacturer').placeholder = 'e.g., Krauss-Maffei, BAE Systems, Uralvagonzavod';
            document.getElementById('model').placeholder = 'e.g., Abrams, T-90, Leopard 2';
            document.body.classList.add('tank-mode'); 
            
            document.getElementById('engineLabel').innerHTML = '🔫 Main Gun';
            document.getElementById('horsepowerLabel').innerHTML = '💥 Ammunition';
            document.getElementById('topSpeedLabel').innerHTML = '🛡️ Armor Thickness';
            document.getElementById('accelerationLabel').innerHTML = '🔫 Secondary Weapons';
            document.getElementById('fuelEconomyLabel').innerHTML = '🛣️ Operational Range';
            document.getElementById('wheelbaseLabel').innerHTML = '📏 Track Width';
            document.getElementById('weightLabel').innerHTML = '⚖️ Combat Weight';
            document.getElementById('seatingLabel').innerHTML = '👥 Crew Size';
            document.getElementById('cargoLabel').innerHTML = '💥 Ammunition Storage';
            document.getElementById('cylindersLabel').innerHTML = '🎯 Fire Control System';
            document.getElementById('wheelSizeLabel').innerHTML = '🔗 Track Type';
            document.getElementById('quarterMileLabel').innerHTML = '🎯 Max Range';
            document.getElementById('chargeTimeLabel').innerHTML = '⏱️ Reload Time';
            document.getElementById('dragCoefficientLabel').innerHTML = '📡 Stabilization';
            document.getElementById('batteryLabel').innerHTML = '🔋 Power System';
            document.getElementById('infotainmentLabel').innerHTML = '💻 Battle Management System';
            document.getElementById('safetyLabel').innerHTML = '🛡️ Protection Level';
            document.getElementById('doorsLabel').innerHTML = '🚪 Hatches';
            document.getElementById('chassisLabel').innerHTML = '🏗️ Hull Type';
            document.getElementById('headlightLabel').innerHTML = '👁️ Vision Systems';
            document.getElementById('towingLabel').innerHTML = '📦 Payload Capacity';
            document.getElementById('airbagsLabel').innerHTML = '🛡️ Safety Systems';
        } else if (this.modeSelect.value === 'boat') {
            this.title.innerHTML = 'AI Boat Generator <span id="carEmoji" class="emoji-car">🚢</span>';
            this.subtitle.textContent = 'Generate boats with AI-powered specifications';
            this.instructions.textContent = 'Fill in the fields below to describe your boat. Our AI will generate detailed specifications, features, and a unique image!';
            this.sharePrompt.textContent = '✨ Share your creation! Comment below with the boat you generated.';
            this.bodyTypeLabel.innerHTML = '🛥️ Boat Type';
            this.bodyTypeSelect.innerHTML = this.getBoatBodyTypeOptions();
            this.carSegmentLabel.innerHTML = '⚓ Segment';
            this.carSegmentSelect.innerHTML = this.getBoatSegmentOptions();
            this.designEraSelect.innerHTML = this.getBoatDesignEraOptions();
            this.modelLabel.innerHTML = '🔢 Model/Name';
            this.fuelTypeLabel.innerHTML = '⛽ Propulsion';
            this.fuelTypeSelect.innerHTML = this.getBoatPropulsionOptions();
            this.drivetrainInputLabel.innerHTML = '🛞 Configuration';
            this.drivetrainInput.innerHTML = this.getBoatConfigurationOptions();
            document.getElementById('manufacturer').placeholder = 'e.g., Brunswick, Viking, Azimut';
            document.getElementById('model').placeholder = 'e.g., Sea Ray, Legend 43, 65 Flybridge';
            document.body.classList.remove('tank-mode');
            
            document.getElementById('engineLabel').innerHTML = '⚙️ Engine';
            document.getElementById('horsepowerLabel').innerHTML = '🐎 Horses/hp';
            document.getElementById('topSpeedLabel').innerHTML = '🚀 Top Speed';
            document.getElementById('accelerationLabel').innerHTML = '⚓ Handling';
            document.getElementById('fuelEconomyLabel').innerHTML = '🛢️ Range';
            document.getElementById('wheelbaseLabel').innerHTML = '📏 Length';
            document.getElementById('weightLabel').innerHTML = '⚖️ Gross Weight';
            document.getElementById('seatingLabel').innerHTML = '🧑‍🤝‍🧑 Capacity';
            document.getElementById('cargoLabel').innerHTML = '📦 Storage';
            document.getElementById('cylindersLabel').innerHTML = '🔧 Cylinders';
            document.getElementById('wheelSizeLabel').innerHTML = '⛵ Beam';
            document.getElementById('quarterMileLabel').innerHTML = '🌊 Draft';
            document.getElementById('chargeTimeLabel').innerHTML = '⚡ Systems';
            document.getElementById('dragCoefficientLabel').innerHTML = '💧 Hull Type';
            document.getElementById('batteryLabel').innerHTML = '🔋 Power';
            document.getElementById('infotainmentLabel').innerHTML = '📡 Nav Systems';
            document.getElementById('safetyLabel').innerHTML = '🛟 Safety';
            document.getElementById('doorsLabel').innerHTML = '🚪 Access Points';
            document.getElementById('chassisLabel').innerHTML = '🛠️ Construction';
            document.getElementById('headlightLabel').innerHTML = '💡 Lighting';
            document.getElementById('towingLabel').innerHTML = '🚤 Towing';
            document.getElementById('airbagsLabel').innerHTML = '🛟 Safety Systems';
        } else if (this.modeSelect.value === 'train') {
            this.title.innerHTML = 'AI Train Generator <span id="carEmoji" class="emoji-car">🚂</span>';
            this.subtitle.textContent = 'Generate trains with AI-powered specifications';
            this.instructions.textContent = 'Fill in the fields below to describe your train. Our AI will generate detailed specifications, features, and a unique image!';
            this.sharePrompt.textContent = '✨ Share your creation! Comment below with the train you generated.';
            this.bodyTypeLabel.innerHTML = '🚂 Train Type';
            this.bodyTypeSelect.innerHTML = this.getTrainBodyTypeOptions();
            this.carSegmentLabel.innerHTML = '🚂 Train Segment';
            this.carSegmentSelect.innerHTML = this.getTrainSegmentOptions();
            this.designEraSelect.innerHTML = this.getTrainDesignEraOptions();
            this.modelLabel.innerHTML = '🔢 Model/Name';
            this.fuelTypeLabel.innerHTML = '⛽ Propulsion';
            this.fuelTypeSelect.innerHTML = this.getTrainPropulsionOptions();
            this.drivetrainInputLabel.innerHTML = '🛞 Configuration';
            this.drivetrainInput.innerHTML = this.getTrainConfigurationOptions();
            document.getElementById('manufacturer').placeholder = 'e.g., CRRC, Siemens, Alstom';
            document.getElementById('model').placeholder = 'e.g., China Railway CR400AF, ICE 3, TGV Duplex';
            document.body.classList.remove('tank-mode');
            
            document.getElementById('engineLabel').innerHTML = '🔋 Power System';
            document.getElementById('horsepowerLabel').innerHTML = '🌟 Maximum Speed';
            document.getElementById('topSpeedLabel').innerHTML = '🕒 Acceleration';
            document.getElementById('accelerationLabel').innerHTML = '🚂 Braking System';
            document.getElementById('fuelEconomyLabel').innerHTML = '🌈 Energy Efficiency';
            document.getElementById('wheelbaseLabel').innerHTML = '📏 Length';
            document.getElementById('weightLabel').innerHTML = '⚖️ Gross Weight';
            document.getElementById('seatingLabel').innerHTML = '🧑‍🤝‍🧑 Capacity';
            document.getElementById('cargoLabel').innerHTML = '📦 Cargo Volume';
            document.getElementById('cylindersLabel').innerHTML = '🔧 Number of Cars';
            document.getElementById('wheelSizeLabel').innerHTML = '🛞 Wheel Size';
            document.getElementById('quarterMileLabel').innerHTML = '🌊 Maximum Gradient';
            document.getElementById('chargeTimeLabel').innerHTML = '⚡ Charging Time';
            document.getElementById('dragCoefficientLabel').innerHTML = '💨 Aerodynamic Drag';
            document.getElementById('batteryLabel').innerHTML = '🔋 Battery Type';
            document.getElementById('infotainmentLabel').innerHTML = '📡 Passenger Information System';
            document.getElementById('safetyLabel').innerHTML = '🛡️ Safety Features';
            document.getElementById('doorsLabel').innerHTML = '🚪 Number of Doors';
            document.getElementById('chassisLabel').innerHTML = '🛠️ Chassis Type';
            document.getElementById('headlightLabel').innerHTML = '💡 Lighting System';
            document.getElementById('towingLabel').innerHTML = '🚂 Towing Capacity';
            document.getElementById('airbagsLabel').innerHTML = '🛡️ Safety Systems';
        } else {
            this.title.innerHTML = 'AI Plane Generator <span id="carEmoji" class="emoji-car">✈️</span>';
            this.subtitle.textContent = 'Generate aircraft with AI-powered specifications';
            this.instructions.textContent = 'Fill in the fields below to describe your aircraft. Our AI will generate detailed plane specifications, features, and a unique image!';
            this.sharePrompt.textContent = '✨ Share your creation! Comment below with the plane you generated.';
            this.bodyTypeLabel.innerHTML = '✈️ Aircraft Type';
            this.bodyTypeSelect.innerHTML = this.getPlaneBodyTypeOptions();
            this.carSegmentLabel.innerHTML = '🛩️ Aircraft Segment';
            this.carSegmentSelect.innerHTML = this.getPlaneSegmentOptions();
            this.designEraSelect.innerHTML = this.getPlaneDesignEraOptions();
            this.modelLabel.innerHTML = '🏷️ Aircraft Model/Name';
            this.fuelTypeLabel.innerHTML = '⛽ Propulsion Type';
            this.fuelTypeSelect.innerHTML = this.getPlaneFuelTypeOptions();
            this.drivetrainInputLabel.innerHTML = '🛩️ Configuration';
            this.drivetrainInput.innerHTML = this.getPlaneDrivetrainOptions();
            document.getElementById('manufacturer').placeholder = 'e.g., Boeing, Airbus, Lockheed Martin';
            document.getElementById('model').placeholder = 'e.g., 777-300ER, A320neo, F-22 Raptor';
            document.body.classList.remove('tank-mode');
            
            document.getElementById('engineLabel').innerHTML = '🚁 Engines';
            document.getElementById('horsepowerLabel').innerHTML = '💨 Thrust';
            document.getElementById('topSpeedLabel').innerHTML = '🚀 Max Speed';
            document.getElementById('accelerationLabel').innerHTML = '📈 Climb Rate';
            document.getElementById('fuelEconomyLabel').innerHTML = '🛣️ Range';
            document.getElementById('wheelbaseLabel').innerHTML = '📏 Wingspan';
            document.getElementById('weightLabel').innerHTML = '⚖️ Max Takeoff Weight';
            document.getElementById('seatingLabel').innerHTML = '🧑‍🤝‍🧑 Passenger Capacity';
            document.getElementById('cargoLabel').innerHTML = '📦 Cargo Volume';
            document.getElementById('cylindersLabel').innerHTML = '🛩️ Avionics';
            document.getElementById('wheelSizeLabel').innerHTML = '🛞 Landing Gear';
            document.getElementById('quarterMileLabel').innerHTML = '🛫 Service Ceiling';
            document.getElementById('chargeTimeLabel').innerHTML = '⛽ Fuel Capacity';
            document.getElementById('dragCoefficientLabel').innerHTML = '🌊 Wing Loading';
            document.getElementById('batteryLabel').innerHTML = '⚡ Electrical System';
            document.getElementById('infotainmentLabel').innerHTML = '📡 Navigation System';
            document.getElementById('safetyLabel').innerHTML = '🛡️ Safety Rating';
            document.getElementById('doorsLabel').innerHTML = '🚪 Cabin Doors';
            document.getElementById('chassisLabel').innerHTML = '🏗️ Fuselage Type';
            document.getElementById('headlightLabel').innerHTML = '💡 Lighting Systems';
            document.getElementById('towingLabel').innerHTML = '📦 Payload Capacity';
            document.getElementById('airbagsLabel').innerHTML = '🛡️ Safety Systems';
        }
        
        this.isCarMode = this.modeSelect.value === 'car';
        
        this.carEmoji = document.getElementById('carEmoji');
        if (this.toggleSpinHandler) { 
            this.carEmoji.removeEventListener('click', this.toggleSpinHandler); 
        }
        this.toggleSpinHandler = () => this.toggleSpin(); 
        this.carEmoji.addEventListener('click', this.toggleSpinHandler);
        this.updateGenerateButtonText();
    }

    getTankBodyTypeOptions() {
        return `
            <option value="">Select Tank Type</option>
            <option value="Main Battle Tank">Main Battle Tank (MBT)</option>
            <option value="Light Tank">Light Tank</option>
            <option value="Heavy Tank">Heavy Tank</option>
            <option value="Medium Tank">Medium Tank</option>
            <option value="Tank Destroyer">Tank Destroyer</option>
            <option value="Self-Propelled Artillery">Self-Propelled Artillery (SPA)</option>
            <option value="Armored Recovery Vehicle">Armored Recovery Vehicle (ARV)</option>
            <option value="Amphibious Tank">Amphibious Tank</option>
            <option value="Infantry Fighting Vehicle">Infantry Fighting Vehicle (IFV)</option>
            <option value="Armored Personnel Carrier">Armored Personnel Carrier (APC)</option>
            <option value="Reconnaissance Tank">Reconnaissance Tank</option>
            <option value="Bridge Layer Tank">Bridge Layer Tank</option>
            <option value="Anti-Aircraft Tank">Anti-Aircraft Tank (SPAAG)</option>
            <option value="Mine Clearing Tank">Mine Clearing Tank</option>
            <option value="Command Tank">Command Tank</option>
            <option value="Flame Tank">Flame Tank</option>
            <option value="Missile Tank">Missile Tank</option>
            <option value="Engineering Tank">Engineering Tank (AVLB/AVRE)</option>
            <option value="Prototype Tank">Prototype Tank</option>
            <option value="Armored Combat Earthmover">Armored Combat Earthmover (ACE)</option>
            <option value="Armored Medical Evacuation Vehicle">Armored Medical Evacuation Vehicle (AMEV)</option>
            <option value="Self-Propelled Mortar">Self-Propelled Mortar</option>
            <option value="Armored Logistics Vehicle">Armored Logistics Vehicle</option>
            <option value="Unmanned Ground Vehicle (UGV)">Unmanned Ground Vehicle (UGV)</option>
            <option value="Assault Gun">Assault Gun</option>
            <option value="Artillery Command Vehicle">Artillery Command Vehicle</option>
            <option value="Internal Security Vehicle">Internal Security Vehicle</option>
            <option value="Modular Combat System">Modular Combat System</option>
            <option value="Coastal Defense Vehicle">Coastal Defense Vehicle</option>
            <option value="Desert Reconnaissance Vehicle">Desert Reconnaissance Vehicle</option>
            <option value="Polar Expeditionary Tank">Polar Expeditionary Tank</option>
            <option value="Heavy Armored Personnel Carrier">Heavy Armored Personnel Carrier (HAPC)</option>
            <option value="Self-Propelled Anti-Tank Gun">Self-Propelled Anti-Tank Gun (SPATG)</option>
            <option value="Mobile Missile Launcher">Mobile Missile Launcher (MML)</option>
            <option value="Airborne Light Tank">Airborne Light Tank</option>
            <option value="Electronic Warfare (EW) Vehicle">Electronic Warfare (EW) Vehicle</option>
            <option value="Counter-IED Vehicle">Counter-IED Vehicle</option>
            <option value="Mobile Artillery System">Mobile Artillery System</option>
            <option value="Counter-Battery Radar Carrier">Counter-Battery Radar Carrier</option>
            <option value="Robotized Combat Platform">Robotized Combat Platform</option>
            <option value="Drone Carrier Vehicle">Drone Carrier Vehicle</option>
            <option value="Tank Recovery Vehicle">Tank Recovery Vehicle</option>
        `;
    }

    getTankSegmentOptions() {
        return `
            <option value="Main Battle Tank">Main Battle Tank</option>
            <option value="Light Tank">Light Tank</option>
            <option value="Medium Tank">Medium Tank</option>
            <option value="Heavy Tank">Heavy Tank</option>
            <option value="Light Combat Vehicle">Light Combat Vehicle</option>
            <option value="Armored Support Vehicle">Armored Support Vehicle</option>
            <option value="Reconnaissance Vehicle">Reconnaissance Vehicle</option>
            <option value="Artillery System">Artillery System</option>
            <option value="Anti-Air System">Anti-Air System</option>
            <option value="Engineering Vehicle">Engineering Vehicle</option>
            <option value="Experimental/Prototype">Experimental/Prototype</option>
            <option value="Infantry Support">Infantry Support</option>
            <option value="Logistics and Utility">Logistics and Utility</option>
            <option value="Specialized Combat">Specialized Combat</option>
            <option value="Counter-IED/Mine Warfare">Counter-IED/Mine Warfare</option>
            <option value="Amphibious Operations">Amphibious Operations</option>
            <option value="Urban Warfare">Urban Warfare</option>
            <option value="Rapid Deployment Force">Rapid Deployment Force</option>
            <option value="Export/Budget Model">Export/Budget Model</option>
            <option value="Future Warfare Concept">Future Warfare Concept</option>
            <option value="Heavy Breakthrough Vehicle">Heavy Breakthrough Vehicle</option>
            <option value="Desert / Arid Combat">Desert / Arid Combat</option>
            <option value="Mountain Warfare Specialist">Mountain Warfare Specialist</option>
            <option value="Cyber-Physical Warfare Platform">Cyber-Physical Warfare Platform</option>
            <option value="Arctic / Cold Weather Operations">Arctic / Cold Weather Operations</option>
            <option value="Naval Shore Bombardment">Naval Shore Bombardment</option>
            <option value="Autonomous Reconnaissance">Autonomous Reconnaissance</option>
            <option value="Stealth Penetration Unit">Stealth Penetration Unit</option>
            <option value="Mobile Command Center">Mobile Command Center</option>
            <option value="Swarm Control Vehicle">Swarm Control Vehicle</option>
            <option value="Advanced Force Entry">Advanced Force Entry</option>
        `;
    }

    getTankDesignEraOptions() {
        return `
            <option value="">Select Design Era</option>
            <option value="Cold War Era (1950s-1980s)">Cold War Era (1950s-1980s)</option>
            <option value="Post-Cold War (1990s-2000s)">Post-Cold War (1990s-2000s)</option>
            <option value="Modern & Digital (2010s-Present)">Modern & Digital (2010s-Present)</option>
            <option value="Interwar Period (1920s-1930s)">Interwar Period (1920s-1930s)</option>
            <option value="World War II (1939-1945)">World War II (1939-1945)</option>
            <option value="Early Tank Development (WWI)">Early Tank Development (WWI)</option>
            <option value="Stealth & Future Combat">Stealth & Future Combat</option>
            <option value="Urban Warfare Optimized">Urban Warfare Optimized</option>
            <option value="Desert/Arid Combat">Desert/Arid Combat</option>
            <option value="Arctic Warfare Optimized">Arctic Warfare Optimized</option>
            <option value="Counter-Insurgency (COIN)">Counter-Insurgency (COIN)</option>
            <option value="Experimental / Concept">Experimental / Concept</option>
            <option value="Robotic / Autonomous">Robotic / Autonomous</option>
            <option value="Modular & Multi-role">Modular & Multi-role</option>
            <option value="Heavy Assault">Heavy Assault</option>
            <option value="Rapid Deployment">Rapid Deployment</option>
            <option value="Amphibious Operations">Amphibious Operations</option>
            <option value="Advanced Composite Armor">Advanced Composite Armor</option>
            <option value="Active Protection Systems (APS)">Active Protection Systems (APS)</option>
            <option value="Network-Centric Warfare">Network-Centric Warfare</option>
            <option value="Hybrid Electric Drive">Hybrid Electric Drive</option>
            <option value="Unmanned Turret System">Unmanned Turret System</option>
            <option value="Quantum Stealth">Quantum Stealth</option>
            <option value="Nanotech Armor">Nanotech Armor</option>
            <option value="Hover Combat Platform">Hover Combat Platform</option>
            <option value="AI-Piloted Swarm">AI-Piloted Swarm</option>
            <option value="Energy Shield Defense">Energy Shield Defense</option>
        `;
    }

    getTankFuelTypeOptions() {
        return `
            <option value="">Select Propulsion Type</option>
            <option value="Diesel">Diesel</option>
            <option value="Turbine (Jet Fuel)">Turbine (Jet Fuel)</option>
            <option value="Multi-fuel">Multi-fuel</option>
            <option value="Electric Hybrid">Electric Hybrid</option>
            <option value="Hydrogen Fuel Cell">Hydrogen Fuel Cell</option>
        `;
    }

    getTankDrivetrainOptions() {
        return `
            <option value="">Select Mobility System</option>
            <option value="Tracked">Tracked</option>
            <option value="Wheeled (4x4)">Wheeled (4x4)</option>
            <option value="Wheeled (6x6)">Wheeled (6x6)</option>
            <option value="Wheeled (8x8)">Wheeled (8x8)</option>
            <option value="Half-track">Half-track</option>
            <option value="Hybrid (Tracked/Wheeled)">Hybrid (Tracked/Wheeled)</option>
            <option value="Articulated Chassis">Articulated Chassis</option>
            <option value="All-Terrain Wheels">All-Terrain Wheels (ATW)</option>
            <option value="Magneto-Hydrodynamic Drive">Magneto-Hydrodynamic Drive</option>
            <option value="Omni-directional Wheels">Omni-directional Wheels</option>
            <option value="Legged (e.g., Hexapod)">Legged (e.g., Hexapod)</option>
        `;
    }

    getCarBodyTypeOptions() {
        return `
            <option value="">Select Body Type</option>
            <option value="Ambulance">Ambulance</option>
            <option value="Amphibious Vehicle">Amphibious Vehicle</option>
            <option value="Adventure Van">Adventure Van</option>
            <option value="Armored Car">Armored Car</option>
            <option value="Autonomous Pod">Autonomous Pod</option>
            <option value="Autonomous Shuttle">Autonomous Shuttle</option>
            <option value="Baja Truck">Baja Truck</option>
            <option value="Barchetta">Barchetta</option>
            <option value="Beach Wagon">Beach Wagon</option>
            <option value="Berlinetta">Berlinetta</option>
            <option value="Brougham">Brougham</option>
            <option value="Buggy">Buggy</option>
            <option value="Cab Forward">Cab Forward</option>
            <option value="Cabriolet">Cabriolet</option>
            <option value="Camper Van">Camper Van</option>
            <option value="Cargo Box Truck">Cargo Box Truck</option>
            <option value="Cargo Van">Cargo Van</option>
            <option value="Chassis Cab">Chassis Cab</option>
            <option value="City Car">City Car</option>
            <option value="City Hatchback">City Hatchback</option>
            <option value="Compact Crossover">Compact Crossover</option>
            <option value="Compact Electric Car">Compact Electric Car</option>
            <option value="Compact Executive Car">Compact Executive Car</option>
            <option value="Compact MPV">Compact MPV</option>
            <option value="Compact Sedan">Compact Sedan</option>
            <option value="Compact SUV">Compact SUV</option>
            <option value="Convertible">Convertible</option>
            <option value="Conversion Van">Conversion Van</option>
            <option value="Coupe">Coupe</option>
            <option value="Coupe SUV">Coupe SUV</option>
            <option value="Coupe de Ville">Coupe de Ville</option>
            <option value="Crossover">Crossover</option>
            <option value="Crossover Coupe">Crossover Coupe</option>
            <option value="Crossover Sedan">Crossover Sedan</option>
            <option value="Custom Build / Kit Car">Custom Build / Kit Car</option>
            <option value="Delivery Van">Delivery Van</option>
            <option value="Dragster">Dragster</option>
            <option value="Drophead Coupe">Drophead Coupe</option>
            <option value="Dual Cab Pickup">Dual Cab Pickup</option>
            <option value="Dune Buggy">Dune Buggy</option>
            <option value="Electric Crossover">Electric Crossover</option>
            <option value="Electric Sedan">Electric Sedan</option>
            <option value="Executive Sedan">Executive Sedan</option>
            <option value="Executive SUV">Executive SUV</option>
            <option value="Fastback">Fastback</option>
            <option value="Fastback Coupe">Fastback Coupe</option>
            <option value="Fastback Sedan">Fastback Sedan</option>
            <option value="Flatbed Truck">Flatbed Truck</option>
            <option value="Food Truck">Food Truck</option>
            <option value="Formula Car">Formula Car</option>
            <option value="Full-Size Crossover">Full-Size Crossover</option>
            <option value="Full-Size Pickup Truck">Full-Size Pickup Truck</option>
            <option value="Full-Size Sedan">Full-Size Sedan</option>
            <option value="Grand Tourer">Grand Tourer</option>
            <option value="Grand Tourer Convertible">Grand Tourer Convertible</option>
            <option value="Hardtop">Hardtop</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Heavy Duty Pickup Truck">Heavy Duty Pickup Truck</option>
            <option value="Hearse">Hearse</option>
            <option value="Hot Hatch">Hot Hatch</option>
            <option value="Hot Rod">Hot Rod</option>
            <option value="Hypercar">Hypercar</option>
            <option value="K-Car">K-Car</option>
            <option value="Kei Car">Kei Car</option>
            <option value="Kei Truck">Kei Truck</option>
            <option value="Landaulet">Landaulet</option>
            <option value="Liftback">Liftback</option>
            <option value="Light Commercial Truck">Light Commercial Truck</option>
            <option value="Light Duty Truck">Light Duty Truck</option>
            <option value="Limousine">Limousine</option>
            <option value="Luxury Convertible">Luxury Convertible</option>
            <option value="Luxury SUV">Luxury SUV</option>
            <option value="Microbus">Microbus</option>
            <option value="Microcar">Microcar</option>
            <option value="Micro-SUV">Micro-SUV</option>
            <option value="Microvan">Microvan</option>
            <option value="Mid-Size Crossover">Mid-Size Crossover</option>
            <option value="Mini MPV">Mini MPV</option>
            <option value="Minivan">Minivan</option>
            <option value="Monster Truck">Monster Truck</option>
            <option value="Multi-Purpose Vehicle (MPV)">Multi-Purpose Vehicle (MPV)</option>
            <option value="Muscle Car">Muscle Car</option>
            <option value="Notchback">Notchback</option>
            <option value="Off-Road Pickup">Off-Road Pickup</option>
            <option value="Off-Road Vehicle">Off-Road Vehicle</option>
            <option value="Panel Van">Panel Van</option>
            <option value="Passenger Van">Passenger Van</option>
            <option value="Personal Luxury Car">Personal Luxury Car</option>
            <option value="Phaeton">Phaeton</option>
            <option value="Pickup Truck">Pickup Truck</option>
            <option value="Police Car">Police Car</option>
            <option value="Pony Car">Pony Car</option>
            <option value="Prototype / Concept Car">Prototype / Concept Car</option>
            <option value="Quadricycle">Quadricycle</option>
            <option value="Race Car">Race Car</option>
            <option value="Rally Car">Rally Car</option>
            <option value="Recreational Off-road Vehicle (ROV)">Recreational Off-road Vehicle (ROV)</option>
            <option value="Roadster">Roadster</option>
            <option value="Sedan">Sedan</option>
            <option value="Shooting Brake">Shooting Brake</option>
            <option value="Speedster">Speedster</option>
            <option value="Sportback">Sportback</option>
            <option value="Sportback Sedan">Sportback Sedan</option>
            <option value="Sports Activity Coupe (SAC)">Sports Activity Coupe (SAC)</option>
            <option value="Sports Car">Sports Car</option>
            <option value="Sport Sedan">Sport Sedan</option>
            <option value="Spyder">Spyder</option>
            <option value="Streamliner">Streamliner</option>
            <option value="Subcompact Crossover">Subcompact Crossover</option>
            <option value="Subcompact Hatchback">Subcompact Hatchback</option>
            <option value="Supercar">Supercar</option>
            <option value="SUV">SUV</option>
            <option value="T-top">T-top</option>
            <option value="Targa">Targa</option>
            <option value="Three-Wheeler">Three-Wheeler</option>
            <option value="Town Car">Town Car</option>
            <option value="Truck (Heavy-Duty)">Truck (Heavy-Duty)</option>
            <option value="Ute">Ute</option>
            <option value="Wagon">Wagon</option>
        `;
    }

    getCarSegmentOptions() {
        return `
            <option value="Standard">Standard</option>
            <option value="Classic/Vintage">Classic/Vintage</option>
            <option value="Collector's/Heritage">Collector's/Heritage</option>
            <option value="Commercial">Commercial</option>
            <option value="Compact">Compact</option>
            <option value="Crossover">Crossover</option>
            <option value="Economy">Economy</option>
            <option value="Electric Vehicle (EV)">Electric Vehicle (EV)</option>
            <option value="Enthusiast/Niche">Enthusiast/Niche</option>
            <option value="Executive">Executive</option>
            <option value="Family">Family</option>
            <option value="Full-Size">Full-Size</option>
            <option value="Grand Tourer">Grand Tourer</option>
            <option value="Hypercar">Hypercar</option>
            <option value="Light Commercial Vehicle (LCV)">Light Commercial Vehicle (LCV)</option>
            <option value="Luxury">Luxury</option>
            <option value="Mid-Size">Mid-Size</option>
            <option value="Minivan/MPV">Minivan/MPV</option>
            <option value="Off-Road">Off-Road</option>
            <option value="Performance">Performance</option>
            <option value="Pickup Truck">Pickup Truck</option>
            <option value="Sports">Sports</option>
            <option value="SUV">SUV</option>
            <option value="Subcompact">Subcompact</option>
            <option value="Supermini">Supermini</option>
            <option value="Ultra-Luxury">Ultra-Luxury</option>
            <option value="Van/Minibus">Van/Minibus</option>
        `;
    }

    getCarFuelTypeOptions() {
        return `
            <option value="">Select Fuel Type</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Hydrogen">Hydrogen</option>
        `;
    }

    getCarDrivetrainOptions() {
        return `
            <option value="">Select Drivetrain</option>
            <option value="Front-Wheel Drive (FWD)">Front-Wheel Drive (FWD)</option>
            <option value="Rear-Wheel Drive (RWD)">Rear-Wheel Drive (RWD)</option>
            <option value="All-Wheel Drive (AWD)">All-Wheel Drive (AWD)</option>
            <option value="Four-Wheel Drive (4WD)">Four-Wheel Drive (4WD)</option>
        `;
    }

    getCarDesignEraOptions() {
        return `
            <option value="">Select Design Era</option>
            <option value="Modern & Sleek">Modern & Sleek</option>
            <option value="Afrofuturism">Afrofuturism</option>
            <option value="Aggressive & Track-Focused">Aggressive & Track-Focused</option>
            <option value="American Muscle">American Muscle</option>
            <option value="Art Deco (1930s)">Art Deco (1930s)</option>
            <option value="Art Nouveau">Art Nouveau</option>
            <option value="Bauhaus">Bauhaus</option>
            <option value="Bio-Organic">Bio-Organic</option>
            <option value="British Sports">British Sports</option>
            <option value="Brutalist">Brutalist</option>
            <option value="Bubble Era (1990s Japan)">Bubble Era (1990s Japan)</option>
            <option value="Classic & Elegant (50s/60s)">Classic & Elegant (50s/60s)</option>
            <option value="Cyberpunk">Cyberpunk</option>
            <option value="De Stijl">De Stijl</option>
            <option value="Deconstructivist">Deconstructivist</option>
            <option value="Dieselpunk">Dieselpunk</option>
            <option value="Euro Classic">Euro Classic</option>
            <option value="French Avant-Garde">French Avant-Garde</option>
            <option value="Futurism (Early 20th Century)">Futurism (Early 20th Century)</option>
            <option value="German Engineering">German Engineering</option>
            <option value="Googie (1950s Futurism)">Googie (1950s Futurism)</option>
            <option value="High-Tech (late 20th century)">High-Tech (late 20th century)</option>
            <option value="Industrial">Industrial</option>
            <option value="Italian GT">Italian GT</option>
            <option value="JDM (Japanese Domestic Market)">JDM (Japanese Domestic Market)</option>
            <option value="Kustom (Hot Rod Culture)">Kustom (Hot Rod Culture)</option>
            <option value="Lowrider">Lowrider</option>
            <option value="Minimalist & Eco-Friendly">Minimalist & Eco-Friendly</option>
            <option value="Muscle Car Era (1960s/70s)">Muscle Car Era (1960s/70s)</option>
            <option value="Neo-Classic (Modern Retro)">Neo-Classic (Modern Retro)</option>
            <option value="Opulent & Luxury">Opulent & Luxury</option>
            <option value="Post-Apocalyptic">Post-Apocalyptic</option>
            <option value="Postmodern">Postmodern</option>
            <option value="Retro-Futurism (80s/90s)">Retro-Futurism (80s/90s)</option>
            <option value="Rugged & Off-Road">Rugged & Off-Road</option>
            <option value="Scandinavian Minimalism">Scandinavian Minimalism</option>
            <option value="Space Age">Space Age</option>
            <option value="Steampunk">Steampunk</option>
            <option value="Streamline Moderne (1940s)">Streamline Moderne (1940s)</option>
            <option value="Vaporwave">Vaporwave</option>
            <option value="Zen">Zen</option>
            <option value="Aero Design (1980s)">Aero Design (1980s)</option>
            <option value="Art Car Movement">Art Car Movement</option>
            <option value="Biomorphic Design">Biomorphic Design</option>
            <option value="Cubic/Boxy (1970s-80s)">Cubic/Boxy (1970s-80s)</option>
            <option value="Expressionist">Expressionist</option>
            <option value="Organic Flow">Organic Flow</option>
            <option value="Pop Art">Pop Art</option>
            <option value="Rationalist">Rationalist</option>
            <option value="Sculptural & Dynamic">Sculptural & Dynamic</option>
            <option value="Sustainable & Modular">Sustainable & Modular</option>
            <option value="Neo-Futurism">Neo-Futurism</option>
            <option value="Cyber-Gothic">Cyber-Gothic</option>
            <option value="Biomechanical">Biomechanical</option>
            <option value="Solarpunk">Solarpunk</option>
            <option value="Holographic Minimalism">Holographic Minimalism</option>
        `;
    }

    getPlaneBodyTypeOptions() {
        return `
            <option value="">Select Aircraft Type</option>
            <option value="Commercial Airliner">Commercial Airliner</option>
            <option value="Regional Jet">Regional Jet</option>
            <option value="Business Jet">Business Jet</option>
            <option value="Light Aircraft">Light Aircraft</option>
            <option value="Fighter Jet">Fighter Jet</option>
            <option value="Bomber">Bomber</option>
            <option value="Transport Aircraft">Transport Aircraft</option>
            <option value="Cargo Plane">Cargo Plane</option>
            <option value="Helicopter">Helicopter</option>
            <option value="Glider">Glider</option>
            <option value="Seaplane">Seaplane</option>
            <option value="Ultralight">Ultralight</option>
            <option value="Experimental Aircraft">Experimental Aircraft</option>
            <option value="VTOL Aircraft">VTOL Aircraft</option>
            <option value="Supersonic Transport">Supersonic Transport</option>
            <option value="Attack Aircraft">Attack Aircraft</option>
            <option value="Reconnaissance Aircraft">Reconnaissance Aircraft</option>
            <option value="Trainer Aircraft">Trainer Aircraft</option>
            <option value="Agricultural Aircraft">Agricultural Aircraft</option>
            <option value="Search and Rescue Aircraft">Search and Rescue Aircraft</option>
            <option value="Stealth Aircraft">Stealth Aircraft</option>
            <option value="Drone/UAV">Drone/UAV</option>
            <option value="Amphibious Aircraft">Amphibious Aircraft</option>
            <option value="Tiltrotor Aircraft">Tiltrotor Aircraft</option>
            <option value="Flying Wing">Flying Wing</option>
            <option value="Airship/Blimp">Airship/Blimp</option>
            <option value="Autogyro">Autogyro</option>
            <option value="Hypersonic Aircraft">Hypersonic Aircraft</option>
            <option value="Spaceplane">Spaceplane</option>
            <option value="Ground-effect Vehicle">Ground-effect Vehicle</option>
            <option value="Biplane">Biplane</option>
            <option value="Triplane">Triplane</option>
            <option value="Tiltwing">Tiltwing</option>
            <option value="Gyrocopter">Gyrocopter</option>
            <option value="Paramotor">Paramotor</option>
            <option value="Water Bomber / Firefighting Aircraft">Water Bomber / Firefighting Aircraft</option>
            <option value="Airborne Early Warning & Control (AEW&C)">Airborne Early Warning & Control (AEW&C)</option>
            <option value="Electronic Warfare Aircraft">Electronic Warfare Aircraft</option>
            <option value="Maritime Patrol Aircraft">Maritime Patrol Aircraft</option>
            <option value="Air Ambulance / Medevac">Air Ambulance / Medevac</option>
            <option value="Weather Reconnaissance Aircraft">Weather Reconnaissance Aircraft</option>
            <option value="Lighter-than-air Hybrid Airship">Lighter-than-air Hybrid Airship</option>
            <option value="Personal Air Vehicle (PAV)">Personal Air Vehicle (PAV)</option>
            <option value="Canard Aircraft">Canard Aircraft</option>
            <option value="Tandem Wing Aircraft">Tandem Wing Aircraft</option>
        `;
    }

    getPlaneSegmentOptions() {
        return `
            <option value="Commercial Aviation">Commercial Aviation</option>
            <option value="Military Aviation">Military Aviation</option>
            <option value="General Aviation">General Aviation</option>
            <option value="Business Aviation">Business Aviation</option>
            <option value="Cargo Aviation">Cargo Aviation</option>
            <option value="Regional Aviation">Regional Aviation</option>
            <option value="Supersonic Aviation">Supersonic Aviation</option>
            <option value="Experimental Aviation">Experimental Aviation</option>
            <option value="Agricultural Aviation">Agricultural Aviation</option>
            <option value="Emergency Services">Emergency Services</option>
            <option value="Training Aviation">Training Aviation</option>
            <option value="Recreation Aviation">Recreation Aviation</option>
            <option value="Unmanned Aviation">Unmanned Aviation</option>
            <option value="Luxury Aviation">Luxury Aviation</option>
            <option value="Urban Air Mobility">Urban Air Mobility</option>
            <option value="Government/VIP Transport">Government/VIP Transport</option>
            <option value="Special Operations">Special Operations</option>
            <option value="Flight Test & Research">Flight Test & Research</option>
            <option value="Air Racing">Air Racing</option>
            <option value="Aerobatic/Stunt Flying">Aerobatic/Stunt Flying</option>
            <option value="Law Enforcement & Surveillance">Law Enforcement & Surveillance</option>
            <option value="Charter & Air Taxi Services">Charter & Air Taxi Services</option>
            <option value="Historical & Vintage Aircraft">Historical & Vintage Aircraft</option>
            <option value="Humanitarian & Disaster Relief">Humanitarian & Disaster Relief</option>
            <option value="Space Tourism & Suborbital Flight">Space Tourism & Suborbital Flight</option>
        `;
    }

    getPlaneDesignEraOptions() {
        return `
            <option value="">Select Design Era</option>
            <option value="Pioneer Era (1903-1914)">Pioneer Era (1903-1914)</option>
            <option value="World War I (1914-1918)">World War I (1914-1918)</option>
            <option value="Golden Age (1918-1939)">Golden Age (1918-1939)</option>
            <option value="World War II (1939-1945)">World War II (1939-1945)</option>
            <option value="Jet Age (1945-1970)">Jet Age (1945-1970)</option>
            <option value="Wide-body Era (1970-1990)">Wide-body Era (1970-1990)</option>
            <option value="Modern Aviation (1990-2010)">Modern Aviation (1990-2010)</option>
            <option value="Digital Age (2010-Present)">Digital Age (2010-Present)</option>
            <option value="Next Generation (Future)">Next Generation (Future)</option>
            <option value="Supersonic Era">Supersonic Era</option>
            <option value="Stealth Technology">Stealth Technology</option>
            <option value="Eco-Friendly Aviation">Eco-Friendly Aviation</option>
            <option value="Electric Aviation">Electric Aviation</option>
            <option value="Hybrid Propulsion">Hybrid Propulsion</option>
            <option value="Autonomous Flight">Autonomous Flight</option>
            <option value="Cold War Reconnaissance">Cold War Reconnaissance</option>
            <option value="Soviet Brutalism">Soviet Brutalism</option>
            <option value="American X-Plane Program">American X-Plane Program</option>
            <option value="Canard-Pusher Design">Canard-Pusher Design</option>
            <option value="Flying Boat Elegance">Flying Boat Elegance</option>
            <option value="V/STOL Experimental">V/STOL Experimental</option>
            <option value="Trans-Oceanic Clipper">Trans-Oceanic Clipper</option>
            <option value="Lifting Body Research">Lifting Body Research</option>
            <option value="Blended Wing Body">Blended Wing Body</option>
            <option value="Ultralight Minimalism">Ultralight Minimalism</option>
            <option value="Early Jet Fighter Aesthetics">Early Jet Fighter Aesthetics</option>
            <option value="Post-War Private Aviation Boom">Post-War Private Aviation Boom</option>
            <option value="Supersonic Business Jet Concept">Supersonic Business Jet Concept</option>
            <option value="Hydrogen Propulsion Concepts">Hydrogen Propulsion Concepts</option>
            <option value="Modular Aircraft Design">Modular Aircraft Design</option>
        `;
    }

    getPlaneFuelTypeOptions() {
        return `
            <option value="">Select Propulsion Type</option>
            <option value="Jet Fuel (Kerosene)">Jet Fuel (Kerosene)</option>
            <option value="Aviation Gasoline">Aviation Gasoline</option>
            <option value="Turboprop">Turboprop</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid Electric">Hybrid Electric</option>
            <option value="Hydrogen">Hydrogen</option>
            <option value="Solar Powered">Solar Powered</option>
        `;
    }

    getPlaneDrivetrainOptions() {
        return `
            <option value="">Select Configuration</option>
            <option value="Single Engine">Single Engine</option>
            <option value="Twin Engine">Twin Engine</option>
            <option value="Tri-jet">Tri-jet</option>
            <option value="Quad Engine">Quad Engine</option>
            <option value="Pusher Configuration">Pusher Configuration</option>
            <option value="Tractor Configuration">Tractor Configuration</option>
            <option value="Tandem Engine">Tandem Engine</option>
            <option value="Distributed Propulsion">Distributed Propulsion</option>
            <option value="Canard Wing">Canard Wing</option>
            <option value="Delta Wing">Delta Wing</option>
            <option value="Swept Wing">Swept Wing</option>
            <option value="Variable-Sweep Wing">Variable-Sweep Wing</option>
            <option value="Flying Wing">Flying Wing</option>
            <option value="T-tail">T-tail</option>
            <option value="V-tail">V-tail</option>
            <option value="Twin Boom">Twin Boom</option>
            <option value="Blended Wing Body">Blended Wing Body</option>
            <option value="Open Rotor Engine">Open Rotor Engine</option>
            <option value="Electric Ducted Fan (EDF)">Electric Ducted Fan (EDF)</option>
            <option value="Ramjet Engine">Ramjet Engine</option>
            <option value="Scramjet Engine">Scramjet Engine</option>
            <option value="Rocket Engine">Rocket Engine</option>
            <option value="Rotary Wing">Rotary Wing</option>
            <option value="Box Wing / Joined Wing">Box Wing / Joined Wing</option>
            <option value="Gull Wing">Gull Wing</option>
            <option value="Inverted Gull Wing">Inverted Gull Wing</option>
            <option value="Forward-Swept Wing">Forward-Swept Wing</option>
            <option value="Cruciform Tail">Cruciform Tail</option>
            <option value="H-Tail / Twin Tail">H-Tail / Twin Tail</option>
            <option value="Unducted Fan (UDF)">Unducted Fan (UDF)</option>
            <option value="Over-wing Engines">Over-wing Engines</option>
            <option value="High-wing">High-wing</option>
            <option value="Mid-wing">Mid-wing</option>
            <option value="Low-wing">Low-wing</option>
            <option value="Asymmetrical Design">Asymmetrical Design</option>
        `;
    }

    toggleSpin() {
        this.isSpinning = !this.isSpinning;
        if (this.isSpinning) {
            this.carEmoji.classList.add('spinning');
        } else {
            this.carEmoji.classList.remove('spinning');
        }
    }

    setupAudio() {
        this.loadingSound.loop = true;
        this.loadingSound.preload = 'auto';
        this.successSound.preload = 'auto';
        this.tankLoadingSound.loop = true;
        this.tankLoadingSound.preload = 'auto';
        this.tankSuccessSound.preload = 'auto';
        this.planeLoadingSound.loop = true;
        this.planeLoadingSound.preload = 'auto';
        this.planeSuccessSound.preload = 'auto';
        this.boatLoadingSound.loop = true;
        this.boatLoadingSound.preload = 'auto';
        this.boatSuccessSound.preload = 'auto';
        this.trainLoadingSound.loop = true;
        this.trainLoadingSound.preload = 'auto';
        this.trainSuccessSound.preload = 'auto';
        this.updateAudioVolume();
    }

    updateAudioVolume() {
        const volume = this.soundEnabled ? 1 : 0;
        this.loadingSound.volume = volume;
        this.successSound.volume = volume;
        this.tankLoadingSound.volume = volume;
        this.tankSuccessSound.volume = volume;
        this.planeLoadingSound.volume = volume;
        this.planeSuccessSound.volume = volume;
        this.boatLoadingSound.volume = volume;
        this.boatSuccessSound.volume = volume * 0.7;
        this.trainLoadingSound.volume = volume;
        this.trainSuccessSound.volume = volume;
    }

    fadeOutAudio(audio, duration = 1000) {
        if (audio.paused) return;
        
        const initialVolume = audio.volume;
        const startTime = Date.now();
        
        const fadeOut = () => {
            const elapsed = Date.now() - startTime;
            if (elapsed >= duration) {
                audio.pause();
                audio.currentTime = 0;
                audio.volume = initialVolume; 
            } else {
                audio.volume = initialVolume * (1 - elapsed / duration);
                requestAnimationFrame(fadeOut);
            }
        };
        
        fadeOut();
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        this.soundOnIcon.style.display = this.soundEnabled ? 'inline' : 'none';
        this.soundOffIcon.style.display = this.soundEnabled ? 'none' : 'inline';
        this.updateAudioVolume(); 
    }

    openSettingsModal() {
        this.settingsModal.style.display = 'flex'; 
    }

    closeSettingsModal() {
        this.settingsModal.style.display = 'none';
    }

    handleBackgroundChange() {
        const selectedTheme = this.backgroundSelect.value;
        this.applyBackground(selectedTheme);
        localStorage.setItem('backgroundPreference', selectedTheme);
    }

    applyBackground(themeName) {
        const theme = this.backgroundThemes[themeName];
        if (theme) {
            document.documentElement.style.setProperty('--bg-primary', theme.primary);
            document.documentElement.style.setProperty('--bg-secondary', theme.secondary);
        }
    }

    loadBackgroundPreference() {
        const savedTheme = localStorage.getItem('backgroundPreference');
        if (savedTheme && this.backgroundThemes[savedTheme]) {
            this.backgroundSelect.value = savedTheme;
            this.applyBackground(savedTheme);
        } else {
            this.applyBackground('default'); 
        }
    }

    handleWindowBackgroundChange() {
        const selectedTheme = this.windowBackgroundSelect.value;
        if (selectedTheme === 'custom') {
            this.handleCustomWindowBackgroundChange();
        } else {
            this.applyWindowBackground(selectedTheme);
            localStorage.setItem('windowBackgroundPreference', selectedTheme);
        }
    }
    
    handleCustomWindowBackgroundChange() {
        const customColor = this.customWindowBackgroundColor.value;
        this.applyCustomWindowBackground(customColor);
        localStorage.setItem('windowBackgroundPreference', 'custom');
        localStorage.setItem('customWindowBackgroundColor', customColor);
        if (this.windowBackgroundSelect.value !== 'custom') {
            this.windowBackgroundSelect.value = 'custom';
        }
    }

    applyWindowBackground(themeName) {
        const theme = this.windowThemes[themeName];
        if (theme) {
            const root = document.documentElement.style;
            root.setProperty('--window-bg-color', theme.bg);
            root.setProperty('--window-text-color', theme.text);
            root.setProperty('--window-text-secondary-color', theme.textSecondary);
            root.setProperty('--window-spec-bg', theme.specBg);
            root.setProperty('--window-border-color', theme.border);
        }
    }
    
    applyCustomWindowBackground(hexColor) {
        const isLight = this.isColorLight(hexColor);
        const textColor = isLight ? '#1a1a1a' : '#f7fafc';
        const textSecondaryColor = isLight ? '#555555' : '#a0aec0';
        
        function shadeColor(color, percent) {
            let R = parseInt(color.substring(1, 3), 16);
            let G = parseInt(color.substring(3, 5), 16);
            let B = parseInt(color.substring(5, 7), 16);
    
            R = parseInt(R * (1.0 + percent));
            G = parseInt(G * (1.0 + percent));
            B = parseInt(B * (1.0 + percent));
    
            R = (R < 255) ? R : 255;
            G = (G < 255) ? G : 255;
            B = (B < 255) ? B : 255;
    
            const RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16));
            const GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16));
            const BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16));
    
            return "#" + RR + GG + BB;
        }

        const specBg = shadeColor(hexColor, isLight ? -0.05 : 0.1);
        const borderColor = shadeColor(hexColor, isLight ? -0.1 : 0.2);

        const root = document.documentElement.style;
        root.setProperty('--window-bg-color', hexColor);
        root.setProperty('--window-text-color', textColor);
        root.setProperty('--window-text-secondary-color', textSecondaryColor);
        root.setProperty('--window-spec-bg', specBg);
        root.setProperty('--window-border-color', borderColor);
    }
    
    isColorLight(hex) {
        const color = (hex.charAt(0) === '#') ? hex.substring(1, 7) : hex;
        const r = parseInt(color.substring(0, 2), 16);
        const g = parseInt(color.substring(2, 4), 16);
        const b = parseInt(color.substring(4, 6), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
        return luminance > 160;
    }

    loadWindowBackgroundPreference() {
        const savedTheme = localStorage.getItem('windowBackgroundPreference');
        if (savedTheme === 'custom') {
            const savedColor = localStorage.getItem('customWindowBackgroundColor') || '#ffffff';
            this.windowBackgroundSelect.value = 'custom';
            this.customWindowBackgroundColor.value = savedColor;
            this.applyCustomWindowBackground(savedColor);
        } else if (savedTheme && this.windowThemes[savedTheme]) {
            this.windowBackgroundSelect.value = savedTheme;
            this.applyWindowBackground(savedTheme);
        } else {
            this.applyWindowBackground('default');
        }
    }

    handleFontChange() {
        const selectedFont = this.fontSelect.value;
        this.applyFont(selectedFont);
        localStorage.setItem('fontPreference', selectedFont);
    }

    applyFont(fontFamily) {
        document.documentElement.style.fontFamily = fontFamily;
    }

    loadFontPreference() {
        const savedFont = localStorage.getItem('fontPreference');
        if (savedFont) {
            this.fontSelect.value = savedFont;
            this.applyFont(savedFont);
        } else {
            this.fontSelect.value = 'Inter, sans-serif'; 
            this.applyFont('Inter, sans-serif'); 
        }
    }

    handleCornerRadiusChange() {
        const selectedRadius = this.cornerRadiusSelect.value;
        this.applyCornerRadius(selectedRadius);
        localStorage.setItem('cornerRadiusPreference', selectedRadius);
    }

    applyCornerRadius(radiusValue) {
        document.documentElement.style.setProperty('--ui-border-radius', radiusValue);
    }

    loadCornerRadiusPreference() {
        const savedRadius = localStorage.getItem('cornerRadiusPreference');
        if (savedRadius) {
            this.cornerRadiusSelect.value = savedRadius;
            this.applyCornerRadius(savedRadius);
        } else {
            this.cornerRadiusSelect.value = '8px'; 
            this.applyCornerRadius('8px'); 
        }
    }

    async generateCar() {
        const manufacturer = this.manufacturerInput.value;
        const bodyType = this.bodyTypeSelect.value;
        const fuelType = this.fuelTypeSelect.value;
        const drivetrain = this.drivetrainInput.value; 
        const year = this.yearInput.value;
        const designEra = this.designEraSelect.value;
        const model = this.modelInput.value;
        const exteriorColor = this.exteriorColorInput.value; 
        const userDescription = this.descriptionInput.value; 
        const segment = this.carSegmentSelect.value; 

        if (!manufacturer || !bodyType || !fuelType || !year || !model || !drivetrain) { 
            alert('Please fill in all required fields');
            return;
        }

        this.setLoading(true);

        try {
            const title = `${year} ${manufacturer} ${model}`;
            let imagePrompt;
            
            if (this.isCarMode) {
                imagePrompt = `Professional automotive photography of a ${year} ${manufacturer} ${model} ${bodyType}. It is a ${segment} segment vehicle with ${fuelType} fuel and a ${drivetrain} drivetrain. The car's design is best described as '${designEra}'. Photorealistic, studio lighting, high-end luxury car photography, detailed, glossy paint finish, dramatic shadows, showroom quality, highly realistic, no text.`;
            } else if (this.modeSelect.value === 'tank') {
                imagePrompt = `Cinematic action shot of a unique concept tank, the ${manufacturer} ${model}. This is a ${bodyType} tank, part of the ${segment} segment. It uses ${fuelType} propulsion and features a ${drivetrain} mobility system. The tank's design, technology, and overall appearance must strictly reflect the given year: ${year}. The vehicle's visual style is also influenced by the '${designEra}' philosophy. Key visual features should be appropriate for a tank from ${year}, such as riveted or welded hull construction, specific camouflage patterns, and armament technology of that era. Photorealistic rendering, hyper-detailed textures, volumetric lighting, and a dynamic environment, highly realistic, no text.`;
            } else if (this.modeSelect.value === 'boat') {
                imagePrompt = `Professional marine photography of a unique concept boat, the ${year} ${manufacturer} ${model}.
This is a ${bodyType}, part of the ${segment} segment. It uses ${fuelType} propulsion and features a ${drivetrain} configuration.
The boat's design, technology, and overall appearance must strictly reflect the given year: ${year}.
The vessel's visual style is also heavily influenced by the '${designEra}' philosophy.
Key visual features should emphasize ${bodyType} characteristics (like the hull shape, deck layout) and design elements typical of ${designEra}.
Photorealistic rendering, hyper-detailed textures, dynamic water with realistic waves and reflections, and a scenic marine environment, highly realistic, no text.`;
            } else if (this.modeSelect.value === 'train') {
                imagePrompt = `Professional train photography of a unique concept train, the ${year} ${manufacturer} ${model}.
This is a ${bodyType}, part of the ${segment} segment. It uses ${fuelType} propulsion and features a ${drivetrain} configuration.
The train's design, technology, and overall appearance must strictly reflect the given year: ${year}.
The locomotive's visual style is also heavily influenced by the '${designEra}' philosophy.
Key visual features should emphasize ${bodyType} characteristics (like the locomotive body, carriage design) and design elements typical of ${designEra}.
Photorealistic rendering, hyper-detailed textures, dynamic lighting with realistic shadows, and a scenic railway environment, highly realistic, no text.`;
            } else {
                imagePrompt = `Cinematic action shot of a unique concept aircraft. This is a ${year} ${manufacturer} ${model}.
It is a ${bodyType} aircraft, part of the ${segment} segment.
It uses ${fuelType} propulsion and features a ${drivetrain} configuration.
Its design is strongly influenced by the '${designEra}' philosophy, ensuring it looks visually consistent with that era/style.
Key visual features should emphasize ${bodyType} characteristics, and design elements typical of ${designEra}.
Photorealistic rendering, hyper-detailed textures, dramatic sky with volumetric clouds, and a dynamic flight angle, highly realistic, no text.`;
            }
            
            if (exteriorColor) {
                imagePrompt += ` in ${exteriorColor}`;
            }

            if(userDescription) {
                imagePrompt += `. Additional user-provided details: ${userDescription}`;
            }

            const imageResult = await websim.imageGen({
                prompt: imagePrompt,
                aspect_ratio: "16:9"
            });

            const carSpecs = await this.generateCarSpecs(manufacturer, year, model, bodyType, fuelType, drivetrain, designEra, userDescription, segment, exteriorColor);

            this.displayCarResult(title, imageResult.url, carSpecs);

        } catch (error) {
            console.error('Error generating car:', error);
            alert('Failed to generate car. Please try again.');
        } finally {
            this.setLoading(false);
        }
    }

    async generateCarSpecs(manufacturer, year, model, bodyType, fuelType, drivetrain, designEra, userDescription, segment, exteriorColor) {
        let systemPrompt;
        if (this.isCarMode) {
            systemPrompt = `You are a world-renowned automotive expert and historian. Your task is to generate highly realistic and plausible specifications for a given car concept.
                    You must adhere strictly to real-world automotive principles, brand identities, and historical context.
                    
                    CRITICAL: If the manufacturer name provided is fictional, non-existent, or not a real car company, you must create completely original specifications that match the fictional brand's implied characteristics. DO NOT default to real-world vehicles like Volkswagen Beetle or any existing car models. Instead, invent appropriate specifications that would logically fit the fictional manufacturer's name and style.
                    
                    Respond with JSON only, following this schema:
                    {
                        "engine": "string (e.g., '6.2L V8 Twin-Turbo' or '110 kWh Battery, Dual-Motor')",
                        "horsepower": "string (e.g., '650 hp')",
                        "topSpeed": "string (e.g., '205 mph')",
                        "acceleration": "string (e.g., '3.2 seconds 0-60 mph')",
                        "drivetrain": "string (e.g., 'RWD', 'AWD', 'FWD')",
                        "transmission": "string (e.g., '8-speed Dual-Clutch', 'Single-Speed Automatic', '6-speed Manual')",
                        "torque": "string (e.g., '600 lb-ft')",
                        "fuelEconomy": "string (e.g., '25 MPG combined' or '310 miles range / 95 MPGe')",
                        "price": "string (e.g., '$150,000 USD est.')",
                        "wheelbase": "string (e.g., '108.5 in' or '2750 mm')",
                        "curbWeight": "string (e.g., '3,500 lbs' or '1600 kg')",
                        "height": "string (e.g., '55.0 in' or '1400 mm')",
                        "width": "string (e.g., '75.0 in' or '1900 mm')",
                        "seatingCapacity": "string (e.g., '5 passengers')",
                        "cargoVolume": "string (e.g., '20.5 cu ft / 580 liters')",
                        "groundClearance": "string (e.g., '7.5 in / 190 mm')",
                        "description": "string (A detailed and evocative at least 12 sentence description. For fictional manufacturers, create an original backstory and characteristics that fit the brand name. It must realistically reflect the car's supposed brand identity, era, performance, and design philosophy. Weave in the 'Design Era' seamlessly.)",
                        "keyFeatures": ["string", "string", "string", "string", "string", "string", "string", "string"],
                        "exteriorFeatures": ["string", "string", "string", "string", "string"],
                        "interiorFeatures": ["string", "string", "string", "string", "string"],
                        "countries": ["string", "string", "string", "string", "string"],
                        "turningCircle": "string (e.g., '35.8 ft')",
                        "cylinders": "string (e.g., '4-cylinder' or 'V8')",
                        "wheelSize": "string (e.g., '19-inch alloy wheels')",
                        "quarterMile": "string (e.g., '12.9 seconds')",
                        "chargeTime": "string (e.g., '30 min (10-80%)' for non-gasoline vehicles)",
                        "dragCoefficient": "string (e.g., '0.28 Cd')",
                        "tireType": "string (e.g., 'All-season run-flat')",
                        "brakeSystem": "string (e.g., 'Brembo 6-piston calipers')",
                        "suspension": "string (e.g., 'Adaptive air suspension')",
                        "fuelCapacity": "string (e.g., '18.5 gallons')",
                        "batteryCapacity": "string (e.g., '100 kWh')",
                        "infotainment": "string (e.g., '12.3-inch touchscreen')",
                        "safetyRating": "string (e.g., '5-star NHTSA')",
                        "productionYears": "string (e.g., '2023-present')",
                        "numberOfDoors": "string (e.g., '2-door', '4-door', '5-door')",
                        "steeringType": "string (e.g., 'Electric Power-Assisted', 'Hydraulic Power-Assisted')",
                        "coolingSystem": "string (e.g., 'Liquid-cooled', 'Air-cooled')",
                        "chassisType": "string (e.g., 'Monocoque', 'Body-on-frame', 'Space-frame')",
                        "headlightType": "string (e.g., 'LED Matrix with Adaptive High-beam', 'Halogen', 'Laser')",
                        "payloadCapacity": "string (e.g., '1,500 lbs / 680 kg' or 'N/A')",
                        "towingCapacity": "string (e.g., '10,000 lbs / 4,535 kg' or 'N/A')",
                        "numberOfAirbags": "string (e.g., '8 (Front, Side, Knee)', '6')"
                    }
                    
                    CRITICAL REALISM CONSTRAINTS:
                    1.  **Brand Identity:** For real manufacturers, respect their known characteristics. For fictional manufacturers, infer logical brand characteristics from the name and create consistent specifications that would fit that fictional brand's identity.
                    2.  **Historical Accuracy:** Specs must be period-correct. A car from 1970 should not have an 8-speed dual-clutch transmission or a large touchscreen infotainment system. Performance figures must align with the technology of that year.
                    3.  **Technical Plausibility:** The combination of engine, drivetrain, horsepower, and body type must make sense. A heavy SUV won't have the same acceleration as a lightweight supercar with the same engine.
                    4.  **Market Realism:** The list of primary markets ('countries') must be logical for the car's brand, type, and price. A budget-friendly hatchback will be sold globally, while an expensive hypercar will be limited to affluent regions.
                    5.  **Cohesion:** All generated data points must tell a single, coherent story about the vehicle, strongly guided by the provided 'Design Philosophy / Era'. If the user gives a custom description, integrate its themes into the final output while maintaining realism.
                    6.  **Fictional Brand Handling:** When dealing with fictional manufacturers, do not reference or default to any real-world car models. Create entirely original concepts that fit the fictional brand's implied identity.
                    
                    Respond with JSON only, following the above schema.
                    `;
        } else if (this.modeSelect.value === 'tank') {
            systemPrompt = `You are a world-renowned military vehicle expert and historian. Your task is to generate highly realistic and plausible specifications for a given tank or combat vehicle concept.
                    You must adhere strictly to real-world military engineering principles, manufacturer capabilities, and historical context.
                    
                    **CORE INSTRUCTIONS:**
                    1.  **Strict Adherence to Inputs:** The generated vehicle's characteristics MUST be a direct and accurate reflection of the user's provided inputs: 'Body Type', 'Market Segment', and especially the 'Design Philosophy / Era'. These are not suggestions; they are constraints.
                    2.  **Historical and Technical Realism:** All specifications (engine, armor, speed, systems) must be historically and technologically plausible for the given 'Year' and 'Design Philosophy / Era'.
                    3.  **Consistency Check:** The 'Year' and 'Design Philosophy / Era' must be consistent. For example, a vehicle from '1942' should align with the 'World War II' era. If there's a conflict, the 'Design Philosophy / Era' is the primary source of truth for the vehicle's characteristics.
                    
                    Respond with JSON only, following this schema:
                    {
                        "engine": "string (e.g., '1,500 hp Gas Turbine' or '1,200 hp V12 Diesel')",
                        "mainGun": "string (e.g., '120mm L/44 smoothbore cannon', '125mm 2A46M gun')",
                        "ammunition": "string (e.g., 'APFSDS, HEAT, HE rounds', '40 rounds main gun')",
                        "armorThickness": "string (e.g., '900mm RHA equivalent frontal', 'Composite+ERA')",
                        "secondaryWeapons": "string (e.g., '12.7mm HMG, 7.62mm coax MG')",
                        "horsepower": "string (e.g., '1,500 hp')",
                        "topSpeed": "string (e.g., '70 km/h on road')",
                        "acceleration": "string (e.g., '0-32 km/h in 6 seconds')",
                        "drivetrain": "string (e.g., 'Tracked', '8x8')",
                        "transmission": "string (e.g., 'Hydrokinetic Automatic', 'Manual')",
                        "torque": "string (e.g., '4,700 lb-ft')",
                        "operationalRange": "string (e.g., '500 km operational range')",
                        "price": "string (e.g., '$8.5 Million USD est.')",
                        "trackWidth": "string (e.g., '3.38 m track width')",
                        "combatWeight": "string (e.g., '62 tons combat loaded')",
                        "height": "string (e.g., '2.4 m')",
                        "width": "string (e.g., '3.7 m')",
                        "crewSize": "string (e.g., '4 crew (commander, gunner, loader, driver)')",
                        "ammunitionStorage": "string (e.g., '40 main gun rounds, 12,400 machine gun rounds')",
                        "groundClearance": "string (e.g., '0.5 m')",
                        "description": "string (A detailed and evocative at least 12 sentence description, focusing on military capabilities, deployment history, and combat effectiveness. It must realistically reflect the vehicle's supposed brand identity, era, performance, and design philosophy. Weave in the 'Design Era' seamlessly.)",
                        "keyFeatures": ["string", "string", "string", "string", "string", "string", "string", "string"],
                        "exteriorFeatures": ["string", "string", "string", "string", "string"],
                        "interiorFeatures": ["string", "string", "string", "string", "string"],
                        "countries": ["string", "string", "string", "string", "string"],
                        "turningCircle": "string (e.g., 'Pivot turning' or '15 m')",
                        "fireControlSystem": "string (e.g., 'Digital FCS with thermal imaging')",
                        "trackType": "string (e.g., 'Rubber-padded steel tracks')",
                        "maxRange": "string (e.g., '4.2 km effective range main gun')",
                        "reloadTime": "string (e.g., '6 seconds autoloader cycle')",
                        "stabilization": "string (e.g., '2-plane gun stabilization')",
                        "tireType": "string (e.g., 'Tracked, Rubber-padded' or 'Run-flat military tires')",
                        "brakeSystem": "string (e.g., 'Multi-plate disc brakes')",
                        "suspension": "string (e.g., 'Hydropneumatic', 'Torsion bar')",
                        "fuelCapacity": "string (e.g., '1,200 liters')",
                        "powerSystem": "string (e.g., 'APU + main engine electrical')",
                        "battleManagementSystem": "string (e.g., 'Digital BMS with satellite comms')",
                        "protectionLevel": "string (e.g., 'STANAG 4569 Level 6')",
                        "productionYears": "string (e.g., '1980-present')",
                        "hatches": "string (e.g., '4 crew hatches + 1 driver hatch')",
                        "steeringType": "string (e.g., 'Hydrostatic', 'Stick steering')",
                        "coolingSystem": "string (e.g., 'Liquid-cooled with NBC protection')",
                        "hullType": "string (e.g., 'Welded steel monocoque', 'Composite hull')",
                        "visionSystems": "string (e.g., 'Thermal/IR vision, day/night optics')",
                        "payloadCapacity": "string (e.g., '8 tons of ammunition/equipment')",
                        "recoveryCapability": "string (e.g., 'Can recover vehicles up to 60 tons')",
                        "crewProtection": "string (e.g., 'NBC protection, spall liners')"
                    }
                    
                    CRITICAL REALISM CONSTRAINTS:
                    1.  **Brand Identity:** For real manufacturers, respect their known characteristics. For fictional manufacturers, infer logical brand characteristics from the name and create consistent specifications that would fit that fictional brand's identity.
                    2.  **Historical Accuracy:** Specs must be period-correct. A tank from 1970 should not have advanced stealth capabilities or active protection systems. Performance figures must align with the technology of that year.
                    3.  **Technical Plausibility:** The combination of engine, drivetrain, armor, and weaponry must make sense.
                    4.  **Market Realism:** The list of primary markets ('countries') must be logical for the vehicle's brand, type, and capabilities.
                    5.  **Cohesion:** All generated data points must tell a single, coherent story about the vehicle, strongly guided by the provided 'Design Philosophy / Era'. If the user gives a custom description, integrate its themes into the final output while maintaining realism.
                    6.  **Fictional Brand Handling:** When dealing with fictional manufacturers, do not reference or default to any real-world tank models. Create entirely original concepts that fit the fictional brand's implied identity.
                    
                    Respond with JSON only, following the above schema.
                    `;
        } else if (this.modeSelect.value === 'boat') {
            systemPrompt = `You are a world-renowned marine expert and historian. Your task is to generate highly realistic and plausible specifications for a given boat or watercraft concept.
                    You must adhere strictly to real-world marine engineering principles, manufacturer capabilities, and historical context.
                    
                    **CORE INSTRUCTIONS:**
                    1.  **Strict Adherence to Inputs:** The generated vehicle's characteristics MUST be a direct and accurate reflection of the user's provided inputs: 'Boat Type', 'Segment', 'Propulsion', 'Configuration', and especially the 'Design Philosophy / Era'. These are not suggestions; they are constraints. The boat's final design should look like a ${bodyType} from the ${designEra} era.
                    2.  **Historical and Technical Realism:** All specifications (engine, speed, systems) must be historically and technologically plausible for the given 'Year' and 'Design Philosophy / Era'.
                    3.  **Consistency Check:** The 'Year' and 'Design Philosophy / Era' must be consistent. For example, a vessel from '1955' should align with the 'Classic' era. If there's a conflict, the 'Design Philosophy / Era' is the primary source of truth for the vehicle's characteristics.
                    
                    CRITICAL: If the manufacturer name provided is fictional, non-existent, or not a real marine company, you must create completely original specifications that match the fictional brand's implied characteristics. DO NOT default to real-world boats like Boston Whaler or any existing boat models. Instead, invent appropriate specifications that would logically fit the fictional manufacturer's name and style.
                    
                    Respond with JSON only, following this schema:
                    {
                        "engine": "string (e.g., '2x 300 hp Outboards' or '1x 1,000 hp Inboard')",
                        "horsepower": "string (e.g., '600 hp')",
                        "topSpeed": "string (e.g., '45 knots')",
                        "acceleration": "string (e.g., '0-30 knots in 10 seconds')",
                        "drivetrain": "string (propulsion system, e.g., 'Outboard', 'Inboard', 'Stern Drive')",
                        "transmission": "string (e.g., 'Direct Drive', 'Hydraulic')",
                        "torque": "string (e.g., 'N/A (Outboard)' or '2,500 ft-lbs')",
                        "fuelEconomy": "string (range, e.g., '250 nautical miles')",
                        "price": "string (e.g., '$200,000 USD est.')",
                        "length": "string (e.g., '25 ft' or '7.6 m')",
                        "beam": "string (e.g., '8 ft' or '2.4 m')",
                        "draft": "string (e.g., '1.5 ft' or '0.45 m')",
                        "displacement": "string (e.g., '5,000 lbs' or '2,268 kg')",
                        "capacity": "string (e.g., '8 passengers')",
                        "cargoVolume": "string (storage, e.g., '100 cu ft' or '2.8 m³')",
                        "description": "string (A detailed and evocative at least 12 sentence description. For fictional manufacturers, create an original backstory and characteristics that fit the brand name. It must realistically reflect the boat's supposed brand identity, era, performance, and design philosophy. Weave in the 'Design Era' seamlessly.)",
                        "keyFeatures": ["string", "string", "string", "string", "string", "string", "string", "string"],
                        "exteriorFeatures": ["string", "string", "string", "string", "string"],
                        "interiorFeatures": ["string", "string", "string", "string", "string"],
                        "countries": ["string", "string", "string", "string", "string"],
                        "handling": "string (e.g., 'Responsive with hydraulic steering', 'Stable deep-V hull')",
                        "cylinders": "string (e.g., 'V6', 'V8', 'Inline-6')",
                        "propeller": "string (e.g., 'Stainless Steel', 'Aluminum')",
                        "depth": "string (hull depth, e.g., '4 ft' or '1.2 m')",
                        "fuelCapacity": "string (e.g., '100 gallons' or '378 liters')",
                        "batteryCapacity": "string (power system, e.g., '2x 12V Batteries')",
                        "infotainment": "string (navigation systems, e.g., '12-inch touchscreen chartplotter')",
                        "safetyRating": "string (safety equipment, e.g., 'NMMA Certified, includes EPIRB')",
                        "productionYears": "string (e.g., '2020-present')",
                        "accessPoints": "string (e.g., '2 side doors + 1 aft door')",
                        "steeringType": "string (e.g., 'Hydraulic', 'Electric')",
                        "coolingSystem": "string (e.g., 'Raw Water', 'Closed Loop')",
                        "hullType": "string (construction material, e.g., 'Fiberglass', 'Aluminum')",
                        "lighting": "string (e.g., 'LED navigation and deck lights')",
                        "towingCapacity": "string (e.g., 'Suitable for watersports', 'Not rated for towing')",
                        "safetySystems": "string (e.g., 'EPIRB, Flare Kit, Life Raft')"
                    }
                    
                    CRITICAL REALISM CONSTRAINTS:
                    1.  **Brand Identity:** For real manufacturers, respect their known characteristics. For fictional manufacturers, infer logical brand characteristics from the name and create consistent specifications that would fit that fictional brand's identity.
                    2.  **Historical Accuracy:** Specs must be period-correct. A boat from 1970 should not have advanced materials or electronics. Performance figures must align with the technology of that year.
                    3.  **Technical Plausibility:** The combination of engine, propulsion, and hull type must make sense.
                    4.  **Market Realism:** The list of primary markets ('countries') must be logical for the boat's brand, type, and price.
                    5.  **Cohesion:** All generated data points must tell a single, coherent story about the boat, strongly guided by the provided 'Design Philosophy / Era'. If the user gives a custom description, integrate its themes into the final output while maintaining realism.
                    6.  **Fictional Brand Handling:** When dealing with fictional manufacturers, do not reference or default to any real-world boat models. Create entirely original concepts that fit the fictional brand's implied identity.
                    
                    Respond with JSON only, following the above schema.
                    `;
        } else if (this.modeSelect.value === 'train') {
            systemPrompt = `You are a world-renowned train expert and historian. Your task is to generate highly realistic and plausible specifications for a given train or locomotive concept.
                    You must adhere strictly to real-world train engineering principles, manufacturer capabilities, and historical context.
                    
                    **CORE INSTRUCTIONS:**
                    1.  **Strict Adherence to Inputs:** The generated train's characteristics MUST be a direct and accurate reflection of the user's provided inputs: 'Train Type', 'Segment', 'Propulsion', 'Configuration', and especially the 'Design Philosophy / Era'. These are not suggestions; they are constraints. The train's final design should look like a ${bodyType} from the ${designEra} era.
                    2.  **Historical and Technical Realism:** All specifications (engine, speed, systems) must be historically and technologically plausible for the given 'Year' and 'Design Philosophy / Era'.
                    3.  **Consistency Check:** The 'Year' and 'Design Philosophy / Era' must be consistent. For example, a train from '1955' should align with the 'Classic' era. If there's a conflict, the 'Design Philosophy / Era' is the primary source of truth for the train's characteristics.
                    
                    CRITICAL: If the manufacturer name provided is fictional, non-existent, or not a real train company, you must create completely original specifications that match the fictional brand's implied characteristics. DO NOT default to real-world trains like the Shinkansen or any existing train models. Instead, invent appropriate specifications that would logically fit the fictional manufacturer's name and style.
                    
                    Respond with JSON only, following this schema:
                    {
                        "engine": "string (e.g., '2x 1,500 hp Electric Motors' or '1x 1,000 hp Diesel-Electric Locomotive')",
                        "horsepower": "string (e.g., '3,000 hp')",
                        "topSpeed": "string (e.g., '250 km/h')",
                        "acceleration": "string (e.g., '0-100 km/h in 10 seconds')",
                        "drivetrain": "string (propulsion system, e.g., 'Electric', 'Diesel-Electric', 'Steam')",
                        "transmission": "string (e.g., 'Direct Drive', 'Hydraulic')",
                        "torque": "string (e.g., 'N/A (Electric)' or '2,500 ft-lbs')",
                        "fuelEconomy": "string (range, e.g., '500 km')",
                        "price": "string (e.g., '$10 Million USD est.')",
                        "length": "string (e.g., '25 meters' or '82 feet')",
                        "width": "string (e.g., '3 meters' or '10 feet')",
                        "height": "string (e.g., '4 meters' or '13 feet')",
                        "seatingCapacity": "string (e.g., '500 passengers')",
                        "cargoVolume": "string (storage, e.g., '100 cubic meters' or '3,500 cubic feet')",
                        "description": "string (A detailed and evocative at least 12 sentence description. For fictional manufacturers, create an original backstory and characteristics that fit the brand name. It must realistically reflect the train's supposed brand identity, era, performance, and design philosophy. Weave in the 'Design Era' seamlessly.)",
                        "keyFeatures": ["string", "string", "string", "string", "string", "string", "string", "string"],
                        "exteriorFeatures": ["string", "string", "string", "string", "string"],
                        "interiorFeatures": ["string", "string", "string", "string", "string"],
                        "countries": ["string", "string", "string", "string", "string"],
                        "handling": "string (e.g., 'Responsive with regenerative braking', 'Stable with advanced suspension')",
                        "cylinders": "string (e.g., '12-cylinder diesel')",
                        "propeller": "string (e.g., 'None (Electric Locomotive)')",
                        "depth": "string (hull depth, e.g., 'N/A')",
                        "fuelCapacity": "string (e.g., '1,000 liters diesel')",
                        "batteryCapacity": "string (power system, e.g., 'N/A')",
                        "infotainment": "string (navigation systems, e.g., 'Digital display with real-time information')",
                        "safetyRating": "string (safety equipment, e.g., 'Compliant with UIC standards')",
                        "productionYears": "string (e.g., '2020-present')",
                        "accessPoints": "string (e.g., 'Multiple doors with automatic opening')",
                        "steeringType": "string (e.g., 'None (Fixed Wheels)')",
                        "coolingSystem": "string (e.g., 'Air-cooled', 'Water-cooled')",
                        "hullType": "string (construction material, e.g., 'Steel', 'Aluminum')",
                        "lighting": "string (e.g., 'LED headlights and taillights')",
                        "towingCapacity": "string (e.g., 'N/A')",
                        "safetySystems": "string (e.g., 'Multiple safety systems including collision avoidance and fire suppression')"
                    }
                    
                    CRITICAL REALISM CONSTRAINTS:
                    1.  **Brand Identity:** For real manufacturers, respect their known characteristics. For fictional manufacturers, infer logical brand characteristics from the name and create consistent specifications that would fit that fictional brand's identity.
                    2.  **Historical Accuracy:** Specs must be period-correct. A train from 1970 should not have advanced materials or electronics. Performance figures must align with the technology of that year.
                    3.  **Technical Plausibility:** The combination of engine, propulsion, and train type must make sense.
                    4.  **Market Realism:** The list of primary markets ('countries') must be logical for the train's brand, type, and price.
                    5.  **Cohesion:** All generated data points must tell a single, coherent story about the train, strongly guided by the provided 'Design Philosophy / Era'. If the user gives a custom description, integrate its themes into the final output while maintaining realism.
                    6.  **Fictional Brand Handling:** When dealing with fictional manufacturers, do not reference or default to any real-world train models. Create entirely original concepts that fit the fictional brand's implied identity.
                    
                    Respond with JSON only, following the above schema.
                    `;
        } else {
            systemPrompt = `You are a world-renowned aviation expert and aerospace historian. Your task is to generate highly realistic and plausible specifications for a given aircraft concept.
                    You must adhere strictly to real-world aviation principles, manufacturer capabilities, and historical context.
                    
                    CRITICAL: If the manufacturer name provided is fictional, non-existent, or not a real aerospace company, you must create completely original specifications that match the fictional brand's implied characteristics. DO NOT default to real-world aircraft like Boeing 737 or any existing aircraft models. Instead, invent appropriate specifications that would logically fit the fictional manufacturer's name and style.
                    
                    Respond with JSON only, following this schema:
                    {
                        "engine": "string (e.g., '2x CFM56-7B turbofan' or '4x Pratt & Whitney F135')",
                        "horsepower": "string (e.g., '33,000 lbf thrust each' or '43,000 lbf thrust')",
                        "topSpeed": "string (e.g., 'Mach 0.85' or '575 mph')",
                        "acceleration": "string (e.g., '3,500 ft/min climb rate')",
                        "drivetrain": "string (e.g., 'Twin Engine', 'Single Engine')",
                        "transmission": "string (e.g., 'Direct Drive', 'Geared Turbofan')",
                        "torque": "string (e.g., 'N/A (Jet)' or '2,500 ft-lbs')",
                        "fuelEconomy": "string (e.g., '3,500 nautical miles range')",
                        "price": "string (e.g., '$125 Million USD est.')",
                        "wheelbase": "string (wingspan, e.g., '117.5 ft' or '35.8 m')",
                        "curbWeight": "string (max takeoff weight, e.g., '174,200 lbs' or '79 tons')",
                        "height": "string (e.g., '41.2 ft' or '12.6 m')",
                        "width": "string (length, e.g., '129.5 ft' or '39.5 m')",
                        "seatingCapacity": "string (e.g., '162 passengers' or '2 crew + 4 passengers')",
                        "cargoVolume": "string (e.g., '1,555 cu ft' or '44 m³')",
                        "groundClearance": "string (service ceiling, e.g., '41,000 ft' or '12,500 m')",
                        "description": "string (A detailed and evocative at least 12 sentence description. For fictional manufacturers, create an original backstory and characteristics that fit the brand name. It must realistically reflect the aircraft's supposed brand identity, era, performance, and design philosophy. Weave in the 'Design Era' seamlessly.)",
                        "keyFeatures": ["string", "string", "string", "string", "string", "string", "string", "string"],
                        "exteriorFeatures": ["string", "string", "string", "string", "string"],
                        "interiorFeatures": ["string", "string", "string", "string", "string"],
                        "countries": ["string", "string", "string", "string", "string"],
                        "turningCircle": "string (fuel capacity, e.g., '6,875 gallons' or '26,020 liters')",
                        "cylinders": "string (avionics, e.g., 'Glass cockpit with EFIS')",
                        "wheelSize": "string (landing gear, e.g., 'Tricycle retractable gear')",
                        "quarterMile": "string (service ceiling, e.g., '41,000 ft')",
                        "chargeTime": "string (fuel capacity, e.g., '6,875 gallons')",
                        "dragCoefficient": "string (wing loading, e.g., '105 lb/sq ft')",
                        "tireType": "string (e.g., 'Michelin aircraft tires')",
                        "brakeSystem": "string (e.g., 'Carbon disc brakes with anti-skid')",
                        "suspension": "string (e.g., 'Oleo-pneumatic landing gear')",
                        "fuelCapacity": "string (e.g., '6,875 gallons')",
                        "batteryCapacity": "string (electrical system, e.g., '115V/400Hz AC system')",
                        "infotainment": "string (navigation, e.g., 'Honeywell FMS with GPS')",
                        "safetyRating": "string (e.g., 'FAA certified' or 'EASA certified')",
                        "productionYears": "string (e.g., '2016-present')",
                        "numberOfDoors": "string (cabin doors, e.g., '4 cabin doors + 2 emergency exits')",
                        "steeringType": "string (e.g., 'Fly-by-wire', 'Mechanical controls')",
                        "coolingSystem": "string (e.g., 'Engine bleed air cooling')",
                        "chassisType": "string (fuselage type, e.g., 'Semi-monocoque aluminum')",
                        "headlightType": "string (lighting systems, e.g., 'LED navigation lights')",
                        "payloadCapacity": "string (e.g., '46,300 lbs payload')",
                        "towingCapacity": "string (payload capacity, e.g., '46,300 lbs payload')",
                        "numberOfAirbags": "string (safety systems, e.g., 'Emergency oxygen, life vests')"
                    }
                    
                    CRITICAL REALISM CONSTRAINTS:
                    1.  **Brand Identity:** For real manufacturers, respect their known characteristics. For fictional manufacturers, infer logical brand characteristics from the name and create consistent specifications that would fit that fictional brand's identity.
                    2.  **Historical Accuracy:** Specs must be period-correct. An aircraft from 1940 should not have jet engines or glass cockpits. Performance figures must align with the technology of that year.
                    3.  **Technical Plausibility:** The combination of engines, weight, speed, and aircraft type must make sense. A heavy cargo plane won't have the same performance as a lightweight fighter.
                    4.  **Market Realism:** The list of primary markets ('countries') must be logical for the aircraft's brand, type, and price.
                    5.  **Cohesion:** All generated data points must tell a single, coherent story about the aircraft, strongly guided by the provided 'Design Philosophy / Era'. If the user gives a custom description, integrate its themes into the final output while maintaining realism.
                    6.  **Fictional Brand Handling:** When dealing with fictional manufacturers, do not reference or default to any real-world aircraft models. Create entirely original concepts that fit the fictional brand's implied identity.
                    
                    Respond with JSON only, following the above schema.
                    `;
        }

        let userPrompt = `Generate specifications for a ${year} ${manufacturer} ${model}.
-   Body Type: ${bodyType}
-   Fuel Type: ${fuelType}
-   Drivetrain: ${drivetrain}
-   Design Philosophy / Era: ${designEra}
-   Market Segment: ${segment}`;
        if (exteriorColor) {
            userPrompt += `
-   Exterior Color: ${exteriorColor}`;
        }
        if(userDescription) {
            userPrompt += `
-   Custom user description to consider: ${userDescription}`;
        }

        const completion = await websim.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: userPrompt
                }
            ],
            json: true
        });

        return JSON.parse(completion.content);
    }

    displayCarResult(title, imageUrl, specs) {
        this.carTitle.textContent = title;
        this.carImage.src = imageUrl;
        this.carImage.alt = title;
        
        if (this.isCarMode) {
            this.carEngine.textContent = specs.engine;
            this.carHorsepower.textContent = specs.horsepower;
            this.carTopSpeed.textContent = specs.topSpeed;
            this.car0to60.textContent = specs.acceleration;
            this.carDrivetrain.textContent = specs.drivetrain;
            this.carTransmission.textContent = specs.transmission;
            this.carTorque.textContent = specs.torque;
            this.carFuelEconomy.textContent = specs.fuelEconomy;
            this.carWheelbase.textContent = specs.wheelbase;
            this.carCurbWeight.textContent = specs.curbWeight;
            this.carHeight.textContent = specs.height;
            this.carWidth.textContent = specs.width;
            this.carSeatingCapacity.textContent = specs.seatingCapacity;
            this.carCargoVolume.textContent = specs.cargoVolume;
            this.carGroundClearance.textContent = specs.groundClearance;
            this.carDescriptionText.textContent = specs.description;
            this.carTurningCircle.textContent = specs.turningCircle;
            this.carCylinders.textContent = specs.cylinders;
            this.carWheelSize.textContent = specs.wheelSize;
            this.carQuarterMile.textContent = specs.quarterMile;
            this.carChargeTime.textContent = specs.chargeTime;
            this.carDragCoefficient.textContent = specs.dragCoefficient;
            this.carTireType.textContent = specs.tireType;
            this.carBrakeSystem.textContent = specs.brakeSystem;
            this.carSuspension.textContent = specs.suspension;
            this.carFuelCapacity.textContent = specs.fuelCapacity;
            this.carBatteryCapacity.textContent = specs.batteryCapacity;
            this.carInfotainment.textContent = specs.infotainment;
            this.carSafetyRating.textContent = specs.safetyRating;
            this.carProductionYears.textContent = specs.productionYears;
            this.carNumberOfDoors.textContent = specs.numberOfDoors;
            this.carSteeringType.textContent = specs.steeringType;
            this.carCoolingSystem.textContent = specs.coolingSystem;
            this.carChassisType.textContent = specs.chassisType;
            this.carHeadlightType.textContent = specs.headlightType;
            this.carPayloadCapacity.textContent = specs.payloadCapacity;
            this.carTowingCapacity.textContent = specs.towingCapacity;
            this.carNumberOfAirbags.textContent = specs.numberOfAirbags;
        } else if (this.modeSelect.value === 'tank') {
            this.carEngine.textContent = specs.mainGun || specs.engine;
            this.carHorsepower.textContent = specs.ammunition || specs.horsepower;
            this.carTopSpeed.textContent = specs.armorThickness || specs.topSpeed;
            this.car0to60.textContent = specs.secondaryWeapons || specs.acceleration;
            this.carDrivetrain.textContent = specs.drivetrain;
            this.carTransmission.textContent = specs.transmission;
            this.carTorque.textContent = specs.torque;
            this.carFuelEconomy.textContent = specs.operationalRange || specs.fuelEconomy;
            this.carWheelbase.textContent = specs.trackWidth || specs.wheelbase;
            this.carCurbWeight.textContent = specs.combatWeight || specs.curbWeight;
            this.carHeight.textContent = specs.height;
            this.carWidth.textContent = specs.width;
            this.carSeatingCapacity.textContent = specs.crewSize || specs.seatingCapacity;
            this.carCargoVolume.textContent = specs.ammunitionStorage || specs.cargoVolume;
            this.carGroundClearance.textContent = specs.groundClearance;
            this.carDescriptionText.textContent = specs.description;
            this.carTurningCircle.textContent = specs.turningCircle;
            this.carCylinders.textContent = specs.fireControlSystem || specs.cylinders;
            this.carWheelSize.textContent = specs.trackType || specs.wheelSize;
            this.carQuarterMile.textContent = specs.maxRange || specs.quarterMile;
            this.carChargeTime.textContent = specs.reloadTime || specs.chargeTime;
            this.carDragCoefficient.textContent = specs.stabilization || specs.dragCoefficient;
            this.carTireType.textContent = specs.tireType;
            this.carBrakeSystem.textContent = specs.brakeSystem;
            this.carSuspension.textContent = specs.suspension;
            this.carFuelCapacity.textContent = specs.fuelCapacity;
            this.carBatteryCapacity.textContent = specs.powerSystem || specs.batteryCapacity;
            this.carInfotainment.textContent = specs.battleManagementSystem || specs.infotainment;
            this.carSafetyRating.textContent = specs.protectionLevel || specs.safetyRating;
            this.carProductionYears.textContent = specs.productionYears;
            this.carNumberOfDoors.textContent = specs.hatches || specs.numberOfDoors;
            this.carSteeringType.textContent = specs.steeringType;
            this.carCoolingSystem.textContent = specs.coolingSystem;
            this.carChassisType.textContent = specs.hullType || specs.chassisType;
            this.carHeadlightType.textContent = specs.visionSystems || specs.headlightType;
            this.carPayloadCapacity.textContent = specs.payloadCapacity;
            this.carTowingCapacity.textContent = specs.recoveryCapability || specs.towingCapacity;
            this.carNumberOfAirbags.textContent = specs.crewProtection || specs.numberOfAirbags;
        } else if (this.modeSelect.value === 'boat') {
            this.carEngine.textContent = specs.engine;
            this.carHorsepower.textContent = specs.horsepower;
            this.carTopSpeed.textContent = specs.topSpeed;
            this.car0to60.textContent = specs.acceleration;
            this.carDrivetrain.textContent = specs.drivetrain;
            this.carTransmission.textContent = specs.transmission;
            this.carTorque.textContent = specs.torque;
            this.carFuelEconomy.textContent = specs.fuelEconomy;
            this.carWheelbase.textContent = specs.length;
            this.carCurbWeight.textContent = specs.displacement;
            this.carHeight.textContent = specs.height;
            this.carWidth.textContent = specs.beam;
            this.carSeatingCapacity.textContent = specs.capacity;
            this.carCargoVolume.textContent = specs.cargoVolume;
            this.carGroundClearance.textContent = specs.draft;
            this.carDescriptionText.textContent = specs.description;
            this.carTurningCircle.textContent = specs.draft;
            this.carCylinders.textContent = specs.cylinders;
            this.carWheelSize.textContent = specs.propeller;
            this.carQuarterMile.textContent = specs.depth;
            this.carChargeTime.textContent = specs.fuelCapacity;
            this.carDragCoefficient.textContent = specs.dragCoefficient;
            this.carTireType.textContent = specs.tireType;
            this.carBrakeSystem.textContent = specs.brakeSystem;
            this.carSuspension.textContent = specs.suspension;
            this.carFuelCapacity.textContent = specs.fuelCapacity;
            this.carBatteryCapacity.textContent = specs.batteryCapacity;
            this.carInfotainment.textContent = specs.infotainment;
            this.carSafetyRating.textContent = specs.safetyRating;
            this.carProductionYears.textContent = specs.productionYears;
            this.carNumberOfDoors.textContent = specs.accessPoints;
            this.carSteeringType.textContent = specs.steeringType;
            this.carCoolingSystem.textContent = specs.coolingSystem;
            this.carChassisType.textContent = specs.hullType;
            this.carHeadlightType.textContent = specs.lighting;
            this.carPayloadCapacity.textContent = specs.payloadCapacity;
            this.carTowingCapacity.textContent = specs.towingCapacity;
            this.carNumberOfAirbags.textContent = specs.safetySystems;
        } else if (this.modeSelect.value === 'train') {
            this.carEngine.textContent = specs.engine;
            this.carHorsepower.textContent = specs.horsepower;
            this.carTopSpeed.textContent = specs.topSpeed;
            this.car0to60.textContent = specs.acceleration;
            this.carDrivetrain.textContent = specs.drivetrain;
            this.carTransmission.textContent = specs.transmission;
            this.carTorque.textContent = specs.torque;
            this.carFuelEconomy.textContent = specs.fuelEconomy;
            this.carWheelbase.textContent = specs.length;
            this.carCurbWeight.textContent = specs.curbWeight;
            this.carHeight.textContent = specs.height;
            this.carWidth.textContent = specs.width;
            this.carSeatingCapacity.textContent = specs.seatingCapacity;
            this.carCargoVolume.textContent = specs.cargoVolume;
            this.carGroundClearance.textContent = specs.groundClearance;
            this.carDescriptionText.textContent = specs.description;
            this.carTurningCircle.textContent = specs.turningCircle;
            this.carCylinders.textContent = specs.cylinders;
            this.carWheelSize.textContent = specs.wheelSize;
            this.carQuarterMile.textContent = specs.quarterMile;
            this.carChargeTime.textContent = specs.chargeTime;
            this.carDragCoefficient.textContent = specs.dragCoefficient;
            this.carTireType.textContent = specs.tireType;
            this.carBrakeSystem.textContent = specs.brakeSystem;
            this.carSuspension.textContent = specs.suspension;
            this.carFuelCapacity.textContent = specs.fuelCapacity;
            this.carBatteryCapacity.textContent = specs.batteryCapacity;
            this.carInfotainment.textContent = specs.infotainment;
            this.carSafetyRating.textContent = specs.safetyRating;
            this.carProductionYears.textContent = specs.productionYears;
            this.carNumberOfDoors.textContent = specs.accessPoints;
            this.carSteeringType.textContent = specs.steeringType;
            this.carCoolingSystem.textContent = specs.coolingSystem;
            this.carChassisType.textContent = specs.hullType;
            this.carHeadlightType.textContent = specs.lighting;
            this.carPayloadCapacity.textContent = specs.payloadCapacity;
            this.carTowingCapacity.textContent = specs.towingCapacity;
            this.carNumberOfAirbags.textContent = specs.safetySystems;
        } else {
            this.carEngine.textContent = specs.engine;
            this.carHorsepower.textContent = specs.horsepower;
            this.carTopSpeed.textContent = specs.topSpeed;
            this.car0to60.textContent = specs.acceleration;
            this.carDrivetrain.textContent = specs.drivetrain;
            this.carTransmission.textContent = specs.transmission;
            this.carTorque.textContent = specs.torque;
            this.carFuelEconomy.textContent = specs.fuelEconomy;
            this.carWheelbase.textContent = specs.wheelbase;
            this.carCurbWeight.textContent = specs.curbWeight;
            this.carHeight.textContent = specs.height;
            this.carWidth.textContent = specs.width;
            this.carSeatingCapacity.textContent = specs.seatingCapacity;
            this.carCargoVolume.textContent = specs.cargoVolume;
            this.carGroundClearance.textContent = specs.groundClearance;
            this.carDescriptionText.textContent = specs.description;
            this.carTurningCircle.textContent = specs.turningCircle;
            this.carCylinders.textContent = specs.cylinders;
            this.carWheelSize.textContent = specs.wheelSize;
            this.carQuarterMile.textContent = specs.quarterMile;
            this.carChargeTime.textContent = specs.chargeTime;
            this.carDragCoefficient.textContent = specs.dragCoefficient;
            this.carTireType.textContent = specs.tireType;
            this.carBrakeSystem.textContent = specs.brakeSystem;
            this.carSuspension.textContent = specs.suspension;
            this.carFuelCapacity.textContent = specs.fuelCapacity;
            this.carBatteryCapacity.textContent = specs.batteryCapacity;
            this.carInfotainment.textContent = specs.infotainment;
            this.carSafetyRating.textContent = specs.safetyRating;
            this.carProductionYears.textContent = specs.productionYears;
            this.carNumberOfDoors.textContent = specs.numberOfDoors;
            this.carSteeringType.textContent = specs.steeringType;
            this.carCoolingSystem.textContent = specs.coolingSystem;
            this.carChassisType.textContent = specs.chassisType;
            this.carHeadlightType.textContent = specs.headlightType;
            this.carPayloadCapacity.textContent = specs.payloadCapacity;
            this.carTowingCapacity.textContent = specs.towingCapacity;
            this.carNumberOfAirbags.textContent = specs.numberOfAirbags;
        }

        this.carPrice.textContent = specs.price;

        this.carKeyFeatures.innerHTML = '';
        specs.keyFeatures.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            this.carKeyFeatures.appendChild(li);
        });

        this.carExteriorFeatures.innerHTML = '';
        specs.exteriorFeatures.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            this.carExteriorFeatures.appendChild(li);
        });

        this.carInteriorFeatures.innerHTML = '';
        specs.interiorFeatures.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            this.carInteriorFeatures.appendChild(li);
        });

        this.carMarketsList.innerHTML = '';
        specs.countries.forEach(country => {
            const marketTag = document.createElement('span');
            marketTag.className = 'market-tag';
            marketTag.textContent = country;
            this.carMarketsList.appendChild(marketTag);
        });

        this.carResult.style.display = 'block';
        this.carResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.room.collection('generation').create({}).catch(err => console.error('Error recording generation:', err));
    }

    updateGenerateButtonText() {
        const btnText = this.generateBtn.querySelector('.btn-text');
        if (this.isCarMode) {
            btnText.textContent = 'Generate Car';
        } else if (this.modeSelect.value === 'tank') {
            btnText.textContent = 'Generate Tank';
        } else if (this.modeSelect.value === 'boat') {
            btnText.textContent = 'Generate Boat';
        } else if (this.modeSelect.value === 'train') {
            btnText.textContent = 'Generate Train';
        } else {
            btnText.textContent = 'Generate Plane';
        }
    }

    setLoading(isLoading) {
        const btnText = this.generateBtn.querySelector('.btn-text');
        const spinner = this.generateBtn.querySelector('.loading-spinner');

        if (isLoading) {
            btnText.textContent = 'Generating...';
            spinner.style.display = 'block';
            this.generateBtn.disabled = true;
        } else {
            this.updateGenerateButtonText(); 
            spinner.style.display = 'none';
            this.generateBtn.disabled = false;
        }

        if (this.soundEnabled) {
            const currentMode = this.modeSelect.value;
            if (isLoading) {
                this.loadingSound.pause();
                this.tankLoadingSound.pause();
                this.planeLoadingSound.pause();
                this.boatLoadingSound.pause();
                this.trainLoadingSound.pause();

                if (currentMode === 'car') {
                    this.loadingSound.play().catch(e => console.log("Audio playback prevented:", e));
                } else if (currentMode === 'tank') {
                    this.tankLoadingSound.play().catch(e => console.log("Audio playback prevented:", e));
                } else if (currentMode === 'boat') {
                    this.boatLoadingSound.play().catch(e => console.log("Audio playback prevented:", e));
                } else if (currentMode === 'train') {
                    this.trainLoadingSound.play().catch(e => console.log("Audio playback prevented:", e));
                } else if (currentMode === 'plane') {
                    this.planeLoadingSound.play().catch(e => console.log("Audio playback prevented:", e));
                }
            } else {
                this.loadingSound.pause();
                this.loadingSound.currentTime = 0;
                this.tankLoadingSound.pause();
                this.tankLoadingSound.currentTime = 0;
                this.planeLoadingSound.pause();
                this.planeLoadingSound.currentTime = 0;
                this.boatLoadingSound.pause();
                this.boatLoadingSound.currentTime = 0;
                this.trainLoadingSound.pause();
                this.trainLoadingSound.currentTime = 0;
                
                if (currentMode === 'car') {
                    this.successSound.play().catch(e => console.log("Audio playback prevented:", e));
                } else if (currentMode === 'tank') {
                    this.fadeOutAudio(this.tankSuccessSound);
                    this.tankSuccessSound.play().catch(e => console.log("Audio playback prevented:", e));
                } else if (currentMode === 'boat') {
                    this.boatSuccessSound.play().catch(e => console.log("Audio playback prevented:", e));
                } else if (currentMode === 'train') {
                    this.trainSuccessSound.play().catch(e => console.log("Audio playback prevented:", e));
                } else if (currentMode === 'plane') {
                    this.planeSuccessSound.play().catch(e => console.log("Audio playback prevented:", e));
                }
            }
        }
    }

    updateGeneratedCountDisplay(count) {
        this.generatedCountElement.textContent = count;
    }

    incrementGeneratedCount() {
        const currentCount = this.room.roomState.generatedCount || 0;
        const newCount = currentCount + 1;
        this.room.updateRoomState({
            generatedCount: newCount
        });
        this.updateGeneratedCountDisplay(newCount);
    }

    getBoatBodyTypeOptions() {
        return `
            <option value="">Select Boat Type</option>
            <option value="Speedboat">Speedboat</option>
            <option value="Fishing Boat">Fishing Boat</option>
            <option value="Yacht">Yacht</option>
            <option value="Catamaran">Catamaran</option>
            <option value="Pontoon Boat">Pontoon Boat</option>
            <option value="Sailboat">Sailboat</option>
            <option value="Cabin Cruiser">Cabin Cruiser</option>
            <option value="Trawler">Trawler</option>
            <option value="Rigid Inflatable Boat (RIB)">Rigid Inflatable Boat (RIB)</option>
            <option value="Jet Ski">Personal Watercraft/Jet Ski</option>
            <option value="Tugboat">Tugboat</option>
            <option value="Houseboat">Houseboat</option>
            <option value="Bass Boat">Bass Boat</option>
            <option value="Deck Boat">Deck Boat</option>
            <option value="Center Console">Center Console</option>
            <option value="Express Cruiser">Express Cruiser</option>
            <option value="Sportfisher">Sportfisher</option>
            <option value="Walkaround Cabin">Walkaround Cabin</option>
            <option value="Cuddy Cabin">Cuddy Cabin</option>
            <option value="Bowrider">Bowrider</option>
            <option value="Dinghy">Dinghy</option>
            <option value="Kayak">Kayak</option>
            <option value="Canoe">Canoe</option>
            <option value="Rowboat">Rowboat</option>
            <option value="Skiff">Skiff</option>
            <option value="Jon Boat">Jon Boat</option>
            <option value="Bay Boat">Bay Boat</option>
            <option value="Dual Console">Dual Console</option>
            <option value="Superyacht">Superyacht</option>
            <option value="Megayacht">Megayacht</option>
            <option value="Pilot Boat">Pilot Boat</option>
            <option value="Ferry Boat">Ferry Boat</option>
        `;
    }

    getBoatSegmentOptions() {
        return `
            <option value="Recreational">Recreational</option>
            <option value="Fishing">Fishing</option>
            <option value="Racing">Racing</option>
            <option value="Cruising">Cruising</option>
            <option value="Sailing">Sailing</option>
            <option value="Commercial">Commercial</option>
            <option value="Military">Military</option>
            <option value="Rescue">Rescue</option>
            <option value="Towing">Towing</option>
            <option value="Ferry">Ferry</option>
            <option value="Tourism">Tourism</option>
        `;
    }

    getBoatDesignEraOptions() {
        return `
            <option value="">Select Design Era</option>
            <option value="Classic">Classic</option>
            <option value="Retro">Retro</option>
            <option value="Modern">Modern</option>
            <option value="Futuristic">Futuristic</option>
            <option value="Vintage">Vintage</option>
            <option value="Antique">Antique</option>
            <option value="Historical">Historical</option>
            <option value="Corsair Revival (1930s-1960s)">Corsair Revival (1930s-1960s)</option>
            <option value="Steampunk Nautical (Victorian-Neo)">Steampunk Nautical (Victorian-Neo)</option>
            <option value="Mediterranean Clinker (1500s-1700s)">Mediterranean Clinker (1500s-1700s)</option>
            <option value="Caribbean Schooner Golden Age (1720-1820)">Caribbean Schooner Golden Age (1720-1820)</option>
            <option value="Art Deco Ocean Liner (1920s-1940s)">Art Deco Ocean Liner (1920s-1940s)</option>
            <option value="Cold War Utility Vessels">Cold War Utility Vessels</option>
            <option value="Pacific Outrigger Traditional">Pacific Outrigger Traditional</option>
            <option value="Dutch Fluyts (Golden Age)">Dutch Fluyts (Golden Age)</option>
            <option value="Industrial Age Trawlers (1880-1920)">Industrial Age Trawlers (1880-1920)</option>
            <option value="Bio-Inspired Fluid Dynamics">Bio-Inspired Fluid Dynamics</option>
            <option value="Mid-Century Runabout (1950s-60s)">Mid-Century Runabout (1950s-60s)</option>
            <option value="Explorer Research Vessels">Explorer Research Vessels</option>
            <option value="Solar-Powered Eco Design">Solar-Powered Eco Design</option>
            <option value="Riveted Steel Industrial">Riveted Steel Industrial</option>
            <option value="Hydrofoil Racing">Hydrofoil Racing</option>
        `;
    }

    getBoatPropulsionOptions() {
        return `
            <option value="">Select Propulsion Type</option>
            <option value="Outboard">Outboard</option>
            <option value="Inboard">Inboard</option>
            <option value="Stern Drive">Stern Drive</option>
            <option value="Jet Drive">Jet Drive</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
        `;
    }

    getBoatConfigurationOptions() {
        return `
            <option value="">Select Configuration</option>
            <option value="Monohull">Monohull</option>
            <option value="Catamaran">Catamaran</option>
            <option value="Trimaran">Trimaran</option>
            <option value="Pontoon">Pontoon</option>
            <option value="Rigid Inflatable">Rigid Inflatable</option>
        `;
    }

    getTrainBodyTypeOptions() {
        return `
            <option value="">Select Train Type</option>
            <option value="High-Speed Rail">High-Speed Rail</option>
            <option value="Maglev">Maglev</option>
            <option value="Electric Multiple Unit (EMU)">Electric Multiple Unit (EMU)</option>
            <option value="Diesel Multiple Unit (DMU)">Diesel Multiple Unit (DMU)</option>
            <option value="Steam Locomotive">Steam Locomotive</option>
            <option value="Diesel Locomotive">Diesel Locomotive</option>
            <option value="Electric Locomotive">Electric Locomotive</option>
            <option value="Hybrid Locomotive">Hybrid Locomotive</option>
            <option value="Monorail">Monorail</option>
            <option value="Suspension Railway">Suspension Railway</option>
            <option value="Cable Railway">Cable Railway</option>
            <option value="Funicular">Funicular</option>
            <option value="Light Rail">Light Rail</option>
            <option value="Commuter Rail">Commuter Rail</option>
            <option value="Freight Train">Freight Train</option>
            <option value="Passenger Train">Passenger Train</option>
            <option value="Tourist Train">Tourist Train</option>
            <option value="Heritage Train">Heritage Train</option>
            <option value="Alpine Cog Railway">Alpine Cog Railway</option>
            <option value="Underground Metro">Underground Metro</option>
            <option value="Pendolino Tilting Train">Pendolino Tilting Train</option>
            <option value="Tram-Train">Tram-Train</option>
            <option value="Narrow-Gauge Tourist">Narrow-Gauge Tourist</option>
            <option value="Heavy Industry Shunter">Heavy Industry Shunter</option>
            <option value="Intermodal Freight">Intermodal Freight</option>
            <option value="Magnetic Levitation">Magnetic Levitation</option>
            <option value="Vacuum Tube Transport">Vacuum Tube Transport</option>
            <option value="Hyperloop Capsule">Hyperloop Capsule</option>
        `;
    }

    getTrainSegmentOptions() {
        return `
            <option value="Commuter">Commuter</option>
            <option value="Intercity">Intercity</option>
            <option value="High-Speed">High-Speed</option>
            <option value="Freight">Freight</option>
            <option value="Passenger">Passenger</option>
            <option value="Tourist">Tourist</option>
            <option value="Heritage">Heritage</option>
            <option value="Luxury">Luxury</option>
            <option value="Budget">Budget</option>
            <option value="Regional">Regional</option>
            <option value="Alpine/Mountain">Alpine/Mountain</option>
            <option value="Desert Service">Desert Service</option>
            <option value="Polar Expedition">Polar Expedition</option>
            <option value="Ocean-Going Railway">Ocean-Going Railway</option>
            <option value="Orbital Transport">Orbital Transport</option>
        `;
    }

    getTrainDesignEraOptions() {
        return `
            <option value="">Select Design Era</option>
            <option value="Vintage (1920s-1940s)">Vintage (1920s-1940s)</option>
            <option value="Classic (1950s-1960s)">Classic (1950s-1960s)</option>
            <option value="Modern (1970s-1980s)">Modern (1970s-1980s)</option>
            <option value="Contemporary (1990s-2000s)">Contemporary (1990s-2000s)</option>
            <option value="Future (2010s-Present)">Future (2010s-Present)</option>
            <option value="Steam Age">Steam Age</option>
            <option value="Diesel Age">Diesel Age</option>
            <option value="Electric Age">Electric Age</option>
            <option value="Maglev Era">Maglev Era</option>
            <option value="Hyperloop Era">Hyperloop Era</option>
            <option value="Industrial Revolution (1820s-1850s)">Industrial Revolution (1820s-1850s)</option>
            <option value="Gilded Age Express (1880s-1900)">Gilded Age Express (1880s-1900)</option>
            <option value="Streamlined Art Deco (1930s)">Streamlined Art Deco (1930s)</option>
            <option value="War Production (1940s)">War Production (1940s)</option>
            <option value="Post-War Modernism (1950s)">Post-War Modernism (1950s)</option>
            <option value="Space Age Futurism (1960s)">Space Age Futurism (1960s)</option>
            <option value="Bauhaus Minimalism">Bauhaus Minimalism</option>
            <option value="Brutalist Heavy Haul">Brutalist Heavy Haul</option>
            <option value="Cyber-Industrial">Cyber-Industrial</option>
            <option value="Ecological Passenger">Ecological Passenger</option>
            <option value="Retro-Futurist Hyperloop">Retro-Futurist Hyperloop</option>
            <option value="Bio-Inspired Fluid Dynamics">Bio-Inspired Fluid Dynamics</option>
            <option value="Cryogenic Magnetism">Cryogenic Magnetism</option>
            <option value="Neo-Victorian Steampunk">Neo-Victorian Steampunk</option>
            <option value="Solar-Deceleration">Solar-Deceleration</option>
        `;
    }

    getTrainPropulsionOptions() {
        return `
            <option value="">Select Propulsion Type</option>
            <option value="Steam">Steam</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Maglev">Maglev</option>
            <option value="Hyperloop">Hyperloop</option>
            <option value="Hydrogen Fuel Cell">Hydrogen Fuel Cell</option>
            <option value="Battery Electric (for non-catenary lines)">Battery Electric (for non-catenary lines)</option>
            <option value="Biodiesel">Biodiesel</option>
            <option value="Natural Gas">Natural Gas</option>
            <option value="Hybrid Electric (Diesel-Battery)">Hybrid Electric (Diesel-Battery)</option>
        `;
    }

    getTrainConfigurationOptions() {
        return `
            <option value="">Select Configuration</option>
            <option value="Locomotive-Hauled">Locomotive-Hauled</option>
            <option value="Multiple Unit">Multiple Unit</option>
            <option value="Push-Pull">Push-Pull</option>
            <option value="Fixed Consist">Fixed Consist</option>
            <option value="Variable Consist">Variable Consist</option>
            <option value="Articulated Bogie">Articulated Bogie</option>
            <option value="Garratt Articulated">Garratt Articulated</option>
            <option value="Duplex Steam Locomotive">Duplex Steam Locomotive</option>
            <option value="Triplex Steam Locomotive">Triplex Steam Locomotive</option>
            <option value="Tilting Train">Tilting Train</option>
            <option value="Distributed Power">Distributed Power</option>
            <option value="Double-Decker Consist">Double-Decker Consist</option>
            <option value="Shuttle Train">Shuttle Train</option>
            <option value="Rack Railway">Rack Railway</option>
            <option value="Regenerative Braking">Regenerative Braking</option>
            <option value="Catenary/Battery Hybrid">Catenary/Battery Hybrid</option>
            <option value="Supercapacitor Energy Storage">Supercapacitor Energy Storage</option>
            <option value="Dynamic Charging">Dynamic Charging</option>
            <option value="Autonomous Control System">Autonomous Control System</option>
            <option value="Maglev Guideway Transition">Maglev Guideway Transition</option>
        `;
    }
}

const room = new WebsimSocket();

document.addEventListener('DOMContentLoaded', async () => {
    const generator = new CarGenerator(room);
});