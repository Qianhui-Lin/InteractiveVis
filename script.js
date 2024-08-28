const header = document.getElementById('header');
    header.classList.add('header');

    
    const subheader = document.getElementById('subheader');
    subheader.classList.add('subheader');

    const vaccinatedHerpesArray = document.getElementById('vaccinated-herpes');
    const placeboHerpesArray = document.getElementById('placebo-herpes');
    const vaccinatedAdverseArray = document.getElementById('vaccinated-adverse');
    const placeboAdverseArray = document.getElementById('placebo-adverse');
    const stimulateButton = document.getElementById('stimulate');
    const currentstimulationsSpan = document.getElementById('stimulations_current');
    const stimulationsSpan = document.getElementById('stimulations');
    const avgVaccinatedHerpesSpan = document.getElementById('avg-vaccinated-herpes');
    const avgVaccinatedAdverseSpan = document.getElementById('avg-vaccinated-adverse');
    const avgPlaceboHerpesSpan = document.getElementById('avg-placebo-herpes');
    const avgPlaceboAdverseSpan = document.getElementById('avg-placebo-adverse');
    const avgNntSpan = document.getElementById('avg-nnt');
    const vaccinatedHerpesCasesSpan = document.getElementById('vaccinated-herpes-cases');
    const placeboHerpesCasesSpan = document.getElementById('placebo-herpes-cases');
    const vaccinatedAdverseCasesSpan = document.getElementById('vaccinated-adverse-cases');
    const placeboAdverseCasesSpan = document.getElementById('placebo-adverse-cases');

    const stimulate10Button = document.getElementById('stimulate-10');
    const resetButton = document.getElementById('reset');

//Initialization
    let stimulations = 0;
    let totalVaccinatedHerpes = 0;
    let totalVaccinatedAdverse = 0;
    let totalPlaceboHerpes = 0;
    let totalPlaceboAdverse = 0;

    function createDots(container) {
        for (let i = 0; i < 1000; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            container.appendChild(dot);
        }
    }

    function resetDots() {
        document.querySelectorAll('.dot').forEach(dot => {
            dot.classList.remove('red', 'blue');
        });
    }
//simulation and update of color & data
    function stimulate() {
        resetDots();

        const vaccinatedHerpesProbability = Math.random() * (19 - 14) / 1000 + 14 / 1000;
        const vaccinatedAdverseProbability = Math.random() * (26 - 21) / 1000 + 21 / 1000;
        const placeboHerpesProbability = Math.random() * (36 - 30) / 1000 + 30 / 1000;
        const placeboAdverseProbability = Math.random() * (24 - 20) / 1000 + 20 / 1000;
        

        const vaccinatedHerpesCases = Array.from(vaccinatedHerpesArray.children).reduce((count, dot) => {
            if (Math.random() < vaccinatedHerpesProbability) {
                dot.classList.add('red');
                return count + 1;
            }
            return count;
        }, 0);

        const vaccinatedAdverseCases = Array.from(vaccinatedAdverseArray.children).reduce((count, dot) => {
            if (Math.random() < vaccinatedAdverseProbability) {
                dot.classList.add('blue');
                return count + 1;
            }
            return count;
        }, 0);

        const placeboHerpesCases = Array.from(placeboHerpesArray.children).reduce((count, dot) => {
            if (Math.random() < placeboHerpesProbability) {
                dot.classList.add('red');
                return count + 1;
            }
            return count;
        }, 0);

        const placeboAdverseCases = Array.from(placeboAdverseArray.children).reduce((count, dot) => {
            if (Math.random() < placeboAdverseProbability) {
                dot.classList.add('blue');
                return count + 1;
            }
            return count;
        }, 0);

        stimulations++;
        totalVaccinatedHerpes += vaccinatedHerpesCases;
        totalVaccinatedAdverse += vaccinatedAdverseCases;
        totalPlaceboHerpes += placeboHerpesCases;
        totalPlaceboAdverse += placeboAdverseCases;

        stimulationsSpan.textContent = stimulations;
        currentstimulationsSpan.textContent = stimulations;
        avgVaccinatedHerpesSpan.textContent = (totalVaccinatedHerpes / stimulations).toFixed(2);
        avgVaccinatedAdverseSpan.textContent = (totalVaccinatedAdverse / stimulations).toFixed(2);
        avgPlaceboHerpesSpan.textContent = (totalPlaceboHerpes / stimulations).toFixed(2);
        avgPlaceboAdverseSpan.textContent = (totalPlaceboAdverse / stimulations).toFixed(2);
        avgNntSpan.textContent = ((totalPlaceboHerpes / stimulations).toFixed(2)-(totalVaccinatedHerpes / stimulations).toFixed(2)).toFixed(2)

        vaccinatedHerpesCasesSpan.textContent = vaccinatedHerpesCases;
        vaccinatedAdverseCasesSpan.textContent = vaccinatedAdverseCases;
        placeboHerpesCasesSpan.textContent = placeboHerpesCases;
        placeboAdverseCasesSpan.textContent = placeboAdverseCases;
    }
//simulate 10 times
    function stimulateMultipleTimes(times) {
        let count = 0;
        const button = document.getElementById('stimulate-10');
        button.disabled = true;
        const interval = setInterval(() => {
            if (count < times) {
                stimulate();
                count++;
            } else {
                clearInterval(interval);
                button.disabled = false;
            }
        }, 500);
    }


    createDots(vaccinatedHerpesArray);
    createDots(placeboHerpesArray);
    createDots(vaccinatedAdverseArray);
    createDots(placeboAdverseArray);

    stimulateButton.addEventListener('click', stimulate);
    stimulate10Button.addEventListener('click', () => stimulateMultipleTimes(10));
    resetButton.addEventListener('click', () => location.reload());