// --- Mission Gate: repo.js (Central Logic) ---

let currentTheme = 'dark';
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', currentTheme);
}

let step = 1;
let missionData = { name: '', tier: '', op: '' };

function openGate() {
    document.getElementById('stepEnvelope').classList.add('hidden');
    document.getElementById('stepGate').classList.remove('hidden');
    renderQuestion();
}

function renderQuestion() {
    document.getElementById('errorMsg').innerText = '';
    document.getElementById('btnBack').classList.toggle('hidden', step === 1);
    document.getElementById('stepIndicator').innerText = `Mission Stage ${step} of 3`;

    let title = '', desc = '', html = '';

    if (step === 1) {
        title = "Mission / Target Name";
        desc = "Ilagay ang pangalan ng operasyon o target project.";
        html = `<input type="text" id="ansVal" placeholder="Project Titan" value="${missionData.name}">`;
    } else if (step === 2) {
        title = "Security Tier / Level";
        desc = "Piliin ang clearance level ng misyon.";
        html = `<select id="ansVal">
            <option value="">Pili ng Tier...</option>
            <option value="Tier 1 - Alpha">Tier 1 - Alpha ⚡</option>
            <option value="Tier 2 - Bravo">Tier 2 - Bravo 🛡️</option>
            <option value="Tier 3 - Omega">Tier 3 - Omega 💎</option>
        </select>`;
    } else if (step === 3) {
        title = "Operational Focus (OP)";
        desc = "Ilagay ang pangunahing layunin o layon ng operasyon.";
        html = `<input type="text" id="ansVal" placeholder="System Migration & Deployment" value="${missionData.op}">`;
        document.getElementById('btnNext').innerText = "Initialize Mission ➔";
    }

    if (step < 3) document.getElementById('btnNext').innerText = "Susunod ➔";

    document.getElementById('qTitle').innerText = title;
    document.getElementById('qDesc').innerText = desc;
    document.getElementById('inputContainer').innerHTML = html;
}

function nextStep() {
    const valElem = document.getElementById('ansVal');
    const err = document.getElementById('errorMsg');
    const val = valElem ? valElem.value.trim() : '';

    if (!val) {
        err.innerText = "⚠️ Paki-fill up muna ang kinakailangang detalye.";
        return;
    }

    if (step === 1) missionData.name = val;
    if (step === 2) missionData.tier = val;
    if (step === 3) {
        missionData.op = val;
        showSuccess();
        return;
    }

    step++;
    renderQuestion();
}

function prevStep() {
    if (step > 1) {
        step--;
        renderQuestion();
    }
}

function showSuccess() {
    document.getElementById('stepGate').classList.add('hidden');
    
    document.getElementById('resName').innerText = missionData.name;
    document.getElementById('resTier').innerText = missionData.tier;
    document.getElementById('resOp').innerText = missionData.op;
    document.getElementById('resCode').innerText = 'SEC-OP-' + Math.random().toString(36).substring(2, 7).toUpperCase();
    
    document.getElementById('stepPass').classList.remove('hidden');
}
